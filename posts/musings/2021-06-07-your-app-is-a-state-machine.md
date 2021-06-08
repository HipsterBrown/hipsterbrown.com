---
layout: musing
title: Your app is already a state machine
description: You just haven't seen it yet
draft: true
categories:
- musings
- musing
tags:
- dev
- state machines

---

In a typical app, you already have routes defined as your top-level finite states at which different pages/views are displayed. Transitioning between those routes are typically done through navigation events when activating links or submitting a form. Some of these states could be compounded/divided by the existence of authentication that could conditionally allow or display different data based on that auth state, or as a guard. 

Working into the individual views / pages themselves, they have their own nested states made up of forms, lazy-loading data, dashboards, etc.

Then there are the invisible state machines that make up some of the backend processes and services, that could reflect the response of various actions from the client. (now we're thinking in actors!)

To actually map all of this out in a state diagram would result in a massive, multi-layered graph that would be nearly impossible to maintain. However, if we take slices of that diagram to model the more complex features of the app, it can help commuicate the behavior of these features among the teams that maintain them. 

So when people respond to introducing statecharts and state diagrams into the feature-building workflow with YAGNI or "it's overly complex for our needs", they're ignoring the reality of the app already. 

Starting with the lense of the state diagram as a way to view the app, building features with statecharts don't need any specific library or framework (although some make it easier to get started and manage). 

