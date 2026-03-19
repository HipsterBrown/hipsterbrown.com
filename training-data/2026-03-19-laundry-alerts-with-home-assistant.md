---
draft: false
date: 2026-03-18T23:16:00.000-04:00
title: Laundry Alerts with Home Assistant
description: Fixing the forgotten laundry problem, finally
templateEngineOverride: md
type: long-form
tags:
  - home-assistant
  - automation
---

Yet another project I put off due to a compulsion to build it all from scratch; my personal case of not invented here syndrome.

TL;DR Skip to the bottom for my Home Assistant automation setup to get notifications when the laundry is done.

## The Problem

In my home, my laundry machines live in the basement. This is great for keeping the noise, heat, and general mess of gathering dirty clothes away from the rest of the house. However, it's bad for my penchant to forget when it's "out of sight, out of mind." This leads to soggy or wrinkled clothes that should have been put away sooner and frustration with myself. I've tried setting timers for myself, based on the expected completion time for the load; however, the machines estimate about as well as software engineers (wrong just enough to be annoying over time). Also, timers are easy to dismiss and forget in the moments after. I really needed something to notify me when either machine was done with its current load. It would be even better if it could notify anyone at home about this as well. 

## Early Attempts

As a programmer, self-proclaimed "maker", and generally frugal person, I tend to want to build a solution myself when it seems possible and none of the off-the-shelf solutions fit within my values of ownership and privacy. My initial plan was to set up a movement or vibration sensor wired up to a microcontroller placed on the machines somewhere to track the laundry activity. Then I fell into a rabbit hole of improving the developer tooling around the project rather than implementing the project itself (classic). I also wasn't sure where to report the data or how to notify myself based on the data. I eventually moved on to more pressing needs within my home.

Then, after starting my role as [Viam](https://viam.com), I got the opportunity to try solving this annoyance as a proof-of-concept for work. This time it would involve a sensor wired up to a Raspberry Pi that captured data to Viam and allowed me to quickly visualize it in a dashboard. Having solved that part of the problem so easily, I decided to shift the goal posts to include using machine learning for recognizing loads and detect anomalies in the behavior of the washer & dryer. This was far beyond my current experience with ML, so the interest lapsed and the problem went unsolved yet again.

## Catalyst

These days, I have two young kids and no real time to tinker extensively with hand-crafted solutions for problems that people have already solved and documented. It was during my parental leave that I finally committed to just getting the damn thing done. While I was going through the long-pending maintenance of my Home Assistant setup, I realized that this was the perfect scenario for the open source home automation community. 

After doing some research and planning with Claude, I settled on the initial approach: a power-monitoring smart plug for the washer and a wireless vibration sensor for the dryer. Since my dryer is fully electric, there was no viable smart plug that could support the high-voltage connection. As for connectivity, the smart plug (made by Shelly) supported Matter and the vibration sensor used Zigbee. I prefer Matter for most of my smart home devices these days for the sake of ecosystem portability and offline availability, but the same USB adapter connected to my [Home Assistant Green](https://www.home-assistant.io/green/) provides Zigbee along with Thread and Matter due to shared radio frequency for the protocols. 

As part of my research and a big influence into choosing a smart plug for monitoring the washer, I also learned about a Home Assistant community integration called [WashData](https://github.com/3dg1luk43/ha_washdata). This plugin abstracted over the power monitoring data from the smart plug to display it as a device (or entity) within Home Assistant, including activity states (starting, running, completing, idle), progress, and detected load type. It enabled this metadata through a learned heuristic by manually capturing a few "episodes" of data for each load type you expect to run. This sort of setup also makes it conducive to supporting other appliances with varying power draw like dryers, diswashers, air fryers, and heat pumps. 

## Implementation 

You've made it through the backstory to the actual recipe you came for: the automations.  

My original goal was to get a notification when my washer or dryer completed a load, with the stretch goal of being able to inform anyone at home about that status. I'm happy to say I accomplished both fairly well. 

Because I have the Home Assistant companion app on my phone, I could easily add an action to send a push notification through the app when the laundry was done. This has a beneficial side-effect from "Apple Intelligence" highlighting this notification as high priority, which makes it hard to ignore. 

In order to inform the rest of the house, I used the local text-to-speech integration to make an announcement through the HomePod Mini in the kitchen! I'm thoroughly impressed by the performance and availability of such a feature native to Home Assistant. 

Here is the washer notification config:

```yaml
alias: Washer Done Notification
description: ""
triggers:
  - type: turned_off
    device_id: 35386f2b898ea435eb3020651caacbce
    entity_id: 44016cbcbca307fc01bbe4b158912d56
    domain: binary_sensor
    trigger: device
    for:
      hours: 0
      minutes: 2
      seconds: 0
conditions: []
actions:
  - action: notify.persistent_notification
    metadata: {}
    data:
      message: Laundry is ready to be changed to the dryer!
      title: Laundry Done
  - action: notify.mobile_app_kitchen_hub
    metadata: {}
    data:
      message: Washer is ready to be changed over!
      title: Laundry Ready
  - action: notify.mobile_app_nick_s_phone_pro
    metadata: {}
    data:
      message: Laundry is ready
      title: Change over laundry
  - sequence:
      - action: media_player.volume_set
        metadata: {}
        target:
          entity_id: media_player.kitchen
        data:
          volume_level: 0.7
      - action: tts.speak
        metadata: {}
        target:
          entity_id: tts.piper
        data:
          cache: true
          media_player_entity_id: media_player.kitchen
          message: Washer laundry is done
      - action: media_player.volume_set
        metadata: {}
        target:
          entity_id: media_player.kitchen
        data:
          volume_level: 0.3
mode: single
```

Keen-eyed readers may have noticed the "Kitchen Hub" device being notified as well. That's a separate project that I'll be writing about soon.


Here are the two automation configs to track the dryer state based on the vibration sensor and notify me when it is complete:

```yaml
alias: Start Dryer Cycle
description: ""
triggers:
  - type: motion
    device_id: 7e1ee4370e56ac4372e3024b45974639
    entity_id: 21d145753fe00339f165648f7461a928
    domain: binary_sensor
    trigger: device
    for:
      hours: 0
      minutes: 5
      seconds: 0
conditions: []
actions:
  - action: input_boolean.turn_on
    metadata: {}
    target:
      entity_id: input_boolean.dryer_running
    data: {}
mode: single
```

```yaml
alias: Dryer Load Complete
description: ""
triggers:
  - type: no_motion
    device_id: 7e1ee4370e56ac4372e3024b45974639
    entity_id: 21d145753fe00339f165648f7461a928
    domain: binary_sensor
    trigger: device
    for:
      hours: 0
      minutes: 2
      seconds: 0
conditions:
  - condition: state
    entity_id: input_boolean.dryer_running
    state:
      - "on"
actions:
  - action: input_boolean.turn_off
    metadata: {}
    target:
      entity_id: input_boolean.dryer_running
    data: {}
  - action: notify.persistent_notification
    metadata: {}
    data:
      message: Time to take out the laundry from the dryer.
      title: Dryer Complete
  - action: notify.mobile_app_nick_s_phone_pro
    metadata: {}
    data:
      message: Time to get the laundry from the dryer
      title: Dryer Done!
  - action: notify.mobile_app_kitchen_hub
    metadata: {}
    data:
      message: Dryer is done!
  - sequence:
      - action: media_player.volume_set
        metadata: {}
        target:
          entity_id: media_player.kitchen
        data:
          volume_level: 0.7
      - action: tts.speak
        metadata: {}
        target:
          entity_id: tts.piper
        data:
          cache: true
          media_player_entity_id: media_player.kitchen
          message: Dryer laundry is done
      - action: media_player.volume_set
        metadata: {}
        target:
          entity_id: media_player.kitchen
        data:
          volume_level: 0.3
mode: single
```

## Wrap It Up

Overall, I'm glad I finally got this project done using whatever means necessary. I'm finding it genuinely useful, and my family is delighted by the laundry announcements that occasionally ring from the kitchen. It's taught me to embrace the quirks with home automation and let me explore more interesting ways to use Home Assistant. I'd still like to build the complete DIY approach someday, but it's nice knowing I have working solution in the meantime. 
