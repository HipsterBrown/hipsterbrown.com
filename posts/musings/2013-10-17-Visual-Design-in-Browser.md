---
layout: musing
title: Visual Design in the Browser
description: Wireframes and UI design seems to be making it's way to browser first, leaving the Photoshop, Illustrator, Sketch work to the visual designers instead. However, a small trend is happening—moving visual design into the browser.
categories:
- musings
- musing
tags:
- design
- development
---

There is a style of workflow in web design called designing in the browser<sup>[1](#one)</sup> that has designers re-thinking the way they do their job. The basis of this idea is to skip the wireframes and static mockups in Photoshop, Sketch, etc, and start directly with code—usually within the console of the web designer's preferred browser. Some of the greatest advantages of following this philosophy is saving time, keeping the design process DRY (don't repeat yourself), flexible & responsive environment, and instantaneous prototype testing. So while the wireframes and UI design responsibilities is has been passed on to the browser, tools like Photoshop are left to handle the visual design side of the web, i.e. logos, icons, and illustrations. However, I think that can start to change as well.  

I was first inspired about visual design in the browser while reading an interesting article about creating geometric patterns in Illustrator<sup>[2](#two)</sup>, and I thought about how much easier this would be in Sketch—then how much easier it would be with HTML & CSS. So I spent some time in CodePen, making some CSS magic with a little help from Sass and Borbon in order recreate the article's first example without any images. The end result was this:

<p data-height="384" data-theme-id="0" data-slug-hash="yHafJ" data-user="HipsterBrown" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/HipsterBrown/pen/yHafJ'>Cubical Pattern Background</a> by Nick Hehr (<a href='http://codepen.io/HipsterBrown'>@HipsterBrown</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

CSS certainly has come a long way from just changing basic color and size changes in web design.

That pen got such a nice response from the CodePen community, I decided to finish off the article's examples with a second recreation in code:

<p data-height="384" data-theme-id="0" data-slug-hash="qnBja" data-user="HipsterBrown" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/HipsterBrown/pen/qnBja'>Triangular Pattern Background</a> by Nick Hehr (<a href='http://codepen.io/HipsterBrown'>@HipsterBrown</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

These pens were so much fun to make, partly because they look so great and partly because they helped me flex the ol' creative muscle when thinking about how to solve this challenge. Nowadays, with the right amount of creative thinking and knowledge, you can create works of art with code. With that thought, I wondered why visual design couldn't move to the browser as well. As I continued thinking, I realized the numerous advantages of following this visual design practice.

Visual design in the browser leads to:

- ~ less http requests, just one solid style sheet
- ~ lighter pages & speedy load times
- ~ quicker design changes on the fly, i.e. color, size, and layout.
- ~ the ability to add additional animated effects for interactive emphasis
- ~ always Retina/HD/4K ready assets

This doesn't replace the visual designer—rather, it challenges the front-end designers to think outside the box in order to implement the visual idea conceptualized originally by the visual designers and illustrators. And of course, not everything can be done with some fancy CSS, but there is a surprising amount of things that can be accomplished. I have even started a Collection of visual design examples<sup>[3](#three)</sup> on CodePen to showcase the ability and ingenuity of brilliant front-end folks in that community.

So the next time you get an image asset of a simple company logo or a set of navigation icons, why not try to go the extra mile and build them with all the power a modern browser provides—then share them with the community through sites like CodePen so we can all learn together.

My last example shows the simplicity and ease of generating the CodePen logo and icon with some CSS. First, the vector image I did fairly quickly in Sketch ![CodePen Icon for iOS 7](https://s3.amazonaws.com/Hip_Musings/images/CodePen+Icon%402x.png)

Then, the demo because it did happen:
<p data-height="416" data-theme-id="1847" data-slug-hash="gDbec" data-user="HipsterBrown" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/HipsterBrown/pen/gDbec'>Sassy CodePen Icon</a> by Nick Hehr (<a href='http://codepen.io/HipsterBrown'>@HipsterBrown</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

If you do come up with your own awesome examples, feel free to share them with me on Twitter @HipsterBrown or tag them on CodePen as "hip visual design" and I'll add them to my Collection.  

References & Resources
===================

<p id="one"><sup>1</sup> <a href="http://webdesign.tutsplus.com/articles/workflow/tips-for-designing-in-the-browser/">Tips for Designing in the Browser</a> </p>

<p id="two"><sup>2</sup> <a href="http://veerle.duoh.com/design/article/creating_geometric_patterns_in_illustrator">Veerle Pieters- Creating Geometric Patterns in Illustrator</a></p>

<p id="three"><sup>3</sup> <a href="http://codepen.io/collection/EjmAI" >A Collection of Visual Design Pens</a> </p>

[CodePen FTW](http://codepen.io/)

[CSS Shapes Guide on CSS-Tricks](http://css-tricks.com/examples/ShapesOfCSS/)
