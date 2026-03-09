---
date: 2026-03-04T00:00:00.000Z
title: Cube Sorter
description: A robot arm that sorts colored cubes using a vision model and depth camera.
status: building
stack:
  - Viam
  - Python
  - RealSense
  - uFactory Lite6
repo: https://github.com/HipsterBrown/cube-sorter
---

A vision-guided robot arm build using a RealSense depth camera, Jetson Nano, and uFactory Lite6 arm — all orchestrated via Viam.

## How it works

The RealSense camera captures depth-aligned RGB frames. A vision model classifies the cube color and the depth data determines the pickup position. The Lite6 arm executes the pick-and-place sequence via Viam's motion planning API.

## Status

Active build. Vision pipeline is working; full pick-and-place sequence is in progress.
