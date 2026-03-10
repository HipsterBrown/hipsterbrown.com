---
draft: false
date: 2026-03-09T20:17:00.000-04:00
title: Helpers in Home Assistant
description: Learning about how helpful helpers are for smart homes
type: til
tags:
  - home-assistant
---
TIL about helpers in Home Assistant. I had heard about them briefly before to support pre-configured timers that could be placed on dashboards. But I didn’t know the extent of their use. 

I ended up using one to create a “Dropdown” to hold state for cycling a pattern of lights for my bathroom vanity based on the press of a Zigbee remote button. It seems like helpers are bits of state you can define in your Home Assistant system to use for all sorts of triggers, actions, scripts, etc. I enjoyed building up this automation because it could all by done using the UI editor, even though I was given a head start with a YAML config from Claude. It felt trivial to accomplish it all from just my phone. 

The script I ended up with:

```yaml
alias: Cycle Bathroom Lights
description: Cycle the bathroom lights patterns
triggers:
  - device_id: 61c9e2xxxxxxxxxxxxxxxxx
    domain: zha
    type: remote_button_short_press
    subtype: right
    trigger: device
conditions: []
actions:
  - action: script.turn_off
    metadata: {}
    target:
      entity_id: script.party_mode_loop
    data: {}
  - data:
      cycle: true
    target:
      entity_id: input_select.bathroom_light_pattern
    action: input_select.select_next
  - choose:
      - conditions:
          - condition: state
            entity_id: input_select.bathroom_light_pattern
            state: yellow
        sequence:
          - data:
              rgb_color:
                - 255
                - 190
                - 0
              transition: 0.5
            action: light.turn_on
            target:
              area_id: bathroom
      - conditions:
          - condition: state
            entity_id: input_select.bathroom_light_pattern
            state: white
        sequence:
          - data:
              transition: 0.5
              rgb_color:
                - 255
                - 255
                - 255
              brightness_pct: 50
            action: light.turn_on
            target:
              area_id: bathroom
      - conditions:
          - condition: state
            entity_id: input_select.bathroom_light_pattern
            state: rainbow
        sequence:
          - data:
              rgb_color:
                - 255
                - 0
                - 0
              transition: 0.5
            action: light.turn_on
            target:
              entity_id: light.first_vanity_light_light
          - data:
              rgb_color:
                - 255
                - 100
                - 0
              transition: 0.5
            action: light.turn_on
            target:
              entity_id: light.second_vanity_light_light
          - data:
              rgb_color:
                - 255
                - 220
                - 0
              transition: 0.5
            action: light.turn_on
            target:
              entity_id: light.third_vanity_light_light
          - data:
              rgb_color:
                - 0
                - 200
                - 0
              transition: 0.5
            action: light.turn_on
            target:
              entity_id: light.fourth_vanity_light_light
          - data:
              rgb_color:
                - 0
                - 80
                - 255
              transition: 0.5
            action: light.turn_on
            target:
              entity_id: light.fifth_vanity_light_light_2
      - conditions:
          - condition: state
            entity_id: input_select.bathroom_light_pattern
            state: blue
        sequence:
          - data:
              rgb_color:
                - 0
                - 80
                - 255
              transition: 0.5
            action: light.turn_on
            target:
              area_id: bathroom
      - conditions:
          - condition: state
            entity_id: input_select.bathroom_light_pattern
            state:
              - party
        sequence:
          - action: script.turn_on
            metadata: {}
            target:
              entity_id: script.party_mode_loop
            data: {}
mode: single
```

Bonus `Party Mode` light cycling:

```yaml
alias: Party Mode Loop
mode: restart
sequence:
  - repeat:
      while:
        - condition: state
          entity_id: input_select.bathroom_light_pattern
          state: party
      sequence:
        - parallel:
            - data:
                hs_color:
                  - "{{ (repeat.index * 30) % 360 }}"
                  - 100
                transition: 1.5
              action: light.turn_on
              target:
                entity_id: light.first_vanity_light_light
            - data:
                hs_color:
                  - "{{ (repeat.index * 30 + 72) % 360 }}"
                  - 100
                transition: 1.5
              action: light.turn_on
              target:
                entity_id: light.second_vanity_light_light
            - data:
                hs_color:
                  - "{{ (repeat.index * 30 + 144) % 360 }}"
                  - 100
                transition: 1.5
              action: light.turn_on
              target:
                entity_id: light.third_vanity_light_light
            - data:
                hs_color:
                  - "{{ (repeat.index * 30 + 216) % 360 }}"
                  - 100
                transition: 1.5
              action: light.turn_on
              target:
                entity_id: light.fourth_vanity_light_light
            - data:
                hs_color:
                  - "{{ (repeat.index * 30 + 288) % 360 }}"
                  - 100
                transition: 1.5
              action: light.turn_on
              target:
                entity_id: light.fifth_vanity_light_light_2
        - delay:
            hours: 0
            minutes: 0
            seconds: 0
            milliseconds: 250
description: Rainbow wave effect through lights
icon: mdi:party-popper
```
