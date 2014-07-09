---
layout: musing
title: Design for Convenience - A Pebble App Design
description: Pebble apps started off as fun and cheap tricks for a few minutes of amusement—now that the platform is evolving, it's time for those apps to start evolving and adding convenience for its users.
categories:
- musings
- musing
tags:
- design
- development
---

Pebble apps started off as fun and cheap tricks for a few minutes of amusement—now, that the platform is evolving, and it's time for those apps to start evolving too. This blog post serves as my personal guide on what Pebble app makers should consider when creating fantastic experiences for this new medium on their wrists. I have even included a proof-of-concept Pebble app design combining my favorite smartwatch and [Twitter client](http://tapbots.com/software/tweetbot/) to create Pebblebot, a companion app for powerful Twitter notifications.

<img src="https://s3.amazonaws.com/Hip_Musings/images/Concept_Preview%402x.png" alt="Pebblebot Icon" style="width: 200px" />

The adorable Pebblebot icon

##What's Your Watch For?

Ever since I first got my Pebble in the mail, even before then, I've kept tabs on what awesome app ideas were being shared and created by the great community surrounding this product. Then I started using some of the basic ones that were being shared through sites like [My Pebble Faces](http://www.mypebblefaces.com) and [Pebble Barn](http://pebblebarn.com), but most of those apps stayed on my Pebble for about a week or less because I had no need for a counter, timer, or magic 8-ball app to constantly reside on my watch. After the release of httpebble, app developers could now communicate information from iOS and Android smartphones to Pebble and create "smart status" applications. It sounded great to always have the current weather, stock price, battery life, and the time available without taking your phone out of your pocket! Yet, I still went back to a standard watch face and music control app for day to day use of my Pebble because I constantly needed to check if my Pebble was still connected to the third-party iOS apps. The thing that was really missing from all these third-party applications was thoughtful, emotional design—so I set out to discover what that meant for that tiny screen hanging out on nearly 200,000 wrists worldwide.

The first thing I realized was that Pebble is a device of convenience. Its users don't need it—they can get all the same tools and information from the smartphone sitting in their pocket. They bought a Pebble so they could control their music or see the latest phone notification <em>conveniently</em> from their wrists—because that power over their mobile devices felt so magical and unique. That is the exact same emotion and convenience that needs to be evoked in the design of other Pebble apps. This initial revelation led to the idea for Pebblebot, giving its users more control over their Tweetbot notifications but nothing that couldn't be done by pulling out their phones and opening the app.

##Good Design is Invisible

If you're a designer, you've heard that phrase at least once in your career and it's an intense philosophy to follow when drawing your ideas in Sketch or Photoshop— it is a philosophy of convenience and letting the design get out of the user's way. This was the path I took when creating Pebblebot—it would be invisible to the user until it was needed. Some of the inspiration for this idea came from the RunKeeper app embed within the Pebble firmware. It only comes up when you start a run with the iOS app and hides again as soon as you're done with it. It adds the convenience of knowing your current pace and time, as well as being able to pause the activity without taking your phone out of your pocket, backpack, or armband.

Pebblebot would be an in-app purchase for Tweetbot for iPhone customers who want an equally awesome Twitter experience on their Pebbles. Unlike the Twitter apps that currently exist in the smartwatch ecosystem, it would not just show the latest 5 or less tweets on screen because that means the user had to go through at least 2 button presses and press a few more buttons when they wanted to refresh the feed. Pebblebot is all about notifications and giving the user to do something with them just as soon as they receive them.

For example, I get a Mention from someone and this would show up:

<img src="https://s3.amazonaws.com/Hip_Musings/images/PB_Mention%402x.png" alt="Pebblebot Mention Screen" style="width: 300px" />

From that screen, I can instantly Retweet or Favorite that Mention without ever touching my phone. Should I choose to Reply to the Mention, I can press the middle button to activate an alert asking me open my phone, taking me straight to the Tweetbot Reply screen. All three actions available to me can also be done by taking my phone out of my pocket and using the Tweetbot for iPhone app, however, I saved a few seconds and a little hassle by using my <em>convenient</em> watch app. Other users may be fine just seeing a notification from Twitter and waiting until later to respond in some way but instant gratification is the popular stigma in this day and age.

##Keep it Simple Stupid

The greatest thing about Pebblebot is its utter simplicity in design. It's mostly a text-based interface with a few recognizable icons to symbolize its essential functionality and that is only when it is needed. With the notifications that one of your tweets has been Favorited or Retweeted, the screen is nearly identical to a normal Pebble notification:

<img src="https://s3.amazonaws.com/Hip_Musings/images/PB_Fav%402x.png" alt="Pebblebot Fav Screen" style="width: 300px" />

<img src="https://s3.amazonaws.com/Hip_Musings/images/PB_RT%402x.png" alt="Pebblebot RT Screen" style="width: 300px" />

These screens are designed for maximum readability and shows all necessary information but needs no additionally functionality like the Mention screen.

Also keeping to the theme of simplicity is the fact that none of settings for the watch app is found on the watch, rather all of that control is held within the Tweetbot app settings, including the ability to buy the Pebblebot. Because Pebblebot is a notification app, it is logically controlled under Tweebot's Notifications settings as shown below:

<img src=" https://s3.amazonaws.com/Hip_Musings/images/TB_BuyBanner%402x.png" alt="Pebblebot Banner Screen" style="max-width: 30%; min-width: 300px;" />

Once Pebblebot is bought and downloaded to the users smartwatch, they will be taken back to the Notifcations screen again to ensure their Pebble is connected to Tweetbot and given additional controls for that functionality.

<img src=" https://s3.amazonaws.com/Hip_Musings/images/TB_Notifications%402x.png" alt="Tweetbot Notifications Screen"  />

The user's Tweetbot notifications can remain independent of their Pebblebot notifications, just as Pebble's notifications can remain separate from your phone. The ultimate goal of staying simple and beautiful is always kept in mind.

##A Little Something Extra

During the creation of this app concept, I thought about what feature could make Pebblebot a truly powerful and useful watch app for the die-hard Twitter users. The idea for this added functionality stemmed from a feature that has been a part of Twitter for a while, albeit poorly implemented on their side. The final feature of Pebblebot you may have seen in the Tweetbot screens above—presenting the Pebblebot SuperFollower notification, a.k.a stalker mode.

<img src="https://s3.amazonaws.com/Hip_Musings/images/PB_SuperFollow%402x.png" alt="Pebblebot Super Screen" style="width: 300px" />

Just like the Mention screen, the user is given the ability Favorite, Reply, or Retweet anyone they choose to stalk/SuperFollow via their Pebble. Twitter has tried the same thing via text messages or their own mobile apps, however the settings and control over that feature is complex for most users to figure out. In Tweetbot, once you have connected to Pebblebot, you can go to any user's profile and have to ability to SuperFollow them in the same action as you would follow them normally in the app. Shown below:

<img src=" https://s3.amazonaws.com/Hip_Musings/images/TB_Profile%402x.png" alt="Tweetbot Profile Screen" style="max-width: 30%; min-width: 300px;" />

Then, should you grow tired of that user's constant Walking Dead live tweeting, you don't have to navigate back to their profile—instead, you can go to your Notification Settings and tap SuperFollowings:

<img src=" https://s3.amazonaws.com/Hip_Musings/images/TB_SuperFollow%402x.png" alt="Tweetbot SuperFollow Settings Screen" style="max-width: 30%; min-width: 300px;" />

Through a simple swipe gesture you can temporarily disable a user's SuperFollow notifications or remove them entirely from the list. This is a much better way to control this feature, rather than going through an entire following list trying to remember which once you've chosen to SuperFollow.

##Wrap-Up

Overall, Pebblebot is the best representative for how Pebble can be integrated with the powerful services already found on our smartphones. It is not trying to reinvent the wheel by replacing these services—it just turbo-charges the vehicle for a little added fun. Pebble is [already doing great things by working with third-party services](https://developer.getpebble.com) and improving the SDK for better two-way communication. It all makes me so excited for the future of this medium, and I hope that Pebblebot can serve as an example for other Pebble app creators to follow for their next development project.

Finally, Pebblebot is merely a figment of my imagination. I have neither the skills or resources to make such a product possible, but if you really wanted this watch app to exist, be sure to bug @Tapbots_Paul, @MarkJardine, and @Pebble on Twitter and show them this article. Or you can just share it for the sake of sharing. I would love to hear anyone's thoughts on this concept in the comments below, on Twitter (@HipsterBrown), or via email from my Contact page.

Cheers and thanks for reading this post, or at least looking at all the pretty pictures. Stay hip.

P.S.

I've added my slides from my talk at [Design Orlando](http://designorlan.do) to SpeakerDeck [here](https://speakerdeck.com/hipsterbrown/designing-for-convenience).
