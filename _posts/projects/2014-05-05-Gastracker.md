---
layout: project
title: Gastracker
description: A design-in-the-browser crack at a single page web app
img_excerpt: http://hip.projects.s3.amazonaws.com/GasTracker/gastracker.png
live_link: http://hipsterbrown.com/GasTracker/index.html
categories:
- project
- built
---

With GasTracker, I decided to take a real crack at single-page webapp design. I came up with the idea for GasTracker from my daily use of RunKeeper during my bike rides to and from school, work, etc. I wanted to calculate how much gas I was saving by biking instead of driving and use the RunKeeper data to do that. I created an HTML/CSS prototype for the design with plans to implement the working JavaScript sometime in the future.

So the original intention of the GasTracker was to create a full-fledged SPA, or single page application, before I really knew what went into making web apps. As I stated before, I was using RunKeeper a lot to track how many miles I was riding my bike each day rather than driving to school or work. That got me thinking about how money I might be saving by traveling on two wheels instead of four, so I thought I might be able to figure this out programmatically by hooking into the RunKeeper and GasBuddy APIs along with a car model database to figure out the average gallon per mile for various cars and calculating it all together for a total sum of savings. It would mostly be for personal use but I wanted to share it with the world anyway and, of course, challenge myself to make it good enough for the world.

It was my first shot at a data-driven, single page web app for design as well as development, although I knew it didn't have to be much more than a simple form. I chose that form-factor because it was familiar to people who frequent the web and easy enough for me to impliment the HTML & CSS. It was my first big project to design in Sketch, so I was having fun diving into all of those features as well. I kept the app at such a thin container so it would easily scale to a mobile web app size if needed. I showed the static mockup at a local design meetup to display my use of Sketch and get some constructive feedback on my ideas; it was a very enlightening experience on how ambitious I should be will some of the custom form elememts, like dropdowns, and better user navigation through a form.

I styled everything except for the GasTracker logo with CSS; the GasTracker font was similar to RunKeeper's but with each letter displayed at odd indiviudal angles natively, so straightened each letter in Sketch and exported the image. Looking back, I could have done it in CSS with a pinch of JavaScript or using SVG text but this was the easy way out for this project. I even created a custom Twitter button because I didn't really care for the native styles the "drop-in" buttons provided.

All in all, I had a lot of fun creating this simple design, even if I could not make it functional at that time. It is now one of those projects I will eventually iterate on and complete, but for now it's a nice sample of my front-end styling work. 
