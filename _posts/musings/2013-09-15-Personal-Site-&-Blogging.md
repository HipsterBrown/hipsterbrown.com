---
layout: musing
title: A Personal Site and Delicious New Blogging Service
description: I'm always looking for something new to work on in my spare time because I can't help just not being productive, even after hours of class or work. This new project started out as a way to test out an interesting new blogging platform I had stumbled across called Postachio and the process of creating a personal site/blog around it. But as the project began to take shape, it became more about working on a personal brand and creative site with a blog attached.
categories:
- musings
- musing
tags:
- development
- design
- projects
---

I'm always looking for something new to work on in my spare time because I can't help just not being productive, even after hours of class or work. This new project started out as a way to test out an interesting new blogging platform I had stumbled across called [Postachio](http://postach.io) and the process of creating a personal site/blog around it. But as the project began to take shape, it became more about working on a personal brand and creative site with a blog attached.

When I said I stumbled upon Postachio, it was more like they had stumbled upon me, and more specifically, my Twitter.
After mentioning to a friend the want to learn about the Evernote API, I suddenly got a new follower called [@PostachioApp](https://twitter.com/postachioapp). Quite curious about what an "Evernote Powered Blogging Community" could possibly be, I took a quick look at their website. From my brief glance, this seemed like a novel, yet simple, idea.

<img src="https://s3.amazonaws.com/Hip_Musings/images/Postachio_Home.png" alt="Postachio Homepage"/>

Developed for the [Evernote Devcup 2013](http://blog.evernote.com/blog/2013/08/02/announcing-the-devcup-2013-category-winners/), the folks behind Postachio had turned the universal note-keeping app into the perfect tool for drafting and publishing a blog post from nearly any device. I already use Evernote for keeping all my class notes in one place and drafting my Hip Musings, so the ability to publish those musings straight to my blog from my iPhone, iPad, Mac, or any computer from the web, astounded me. In order to test out the practical use of such a service, I really wanted to give Postachio a fresh, honest assessment, not just create a sample blog that I would never use since I had just rebuilt my current one. So it was my girlfriend's need for a personal website that inspired me to finally give Postachio a shot in a real world situation and create a personal site/brand for someone other than myself.

<img src="https://s3.amazonaws.com/Hip_Musings/images/Moleskin_Sketch.jpg" alt="Moleskine Sketches"  />

I started out the project as I do with most, in my Moleskine notebook with a couple a sketches.The greatest advantage I had by making this for Leah, my girlfriend, rather than a paying client was the amount of exploratory freedom because my girlfriend had almost no ideas for what she would like in her site, where a client would have some clue in advance for what they want. The inspiration for clouds as the central theme of the site came from a poem Leah wrote two years ago, which can be read by clicking the tagline below the clouds. I wanted to make the site a light, airy space for people to visit and enjoy just staring at it for a while, as well as a unique environment for visitors to learn more about her. The original idea for her personal branding was "Just Leah", honoring one of her favorite books called Just Ella, which also reflected her enjoyment of the Cinderella story with a modern twist. But she found the name too forcefully humble, and we ended up brainstorming a few more ideas until we thought of "Finding Leah." The brand can be used in various ways if she decides to expand the site and matches the cloud links of Seeker (résumé), Storyteller (writing samples), and Time-Traveler (book review blog) for visitors to find out more about Leah. I strived to make it interesting but not childish and capture the creativity that a writer's website should have.

<img src="https://s3.amazonaws.com/Hip_Musings/images/Sketch.png" alt="Site Mock-Up"  />

From there I switched over to Sketch and started creating a quick mock-up of the site. I still enjoy making high-fidelity mock-ups to play around with colors, typefaces, and layouts much easier than going straight to the browser. I planned to use a stoic sans-serif for most of the display text on the site and a playful script font for her name. I eventually found Lavanderia from [Lost Type](http://www.losttype.com/font/?name=lavanderia) and Dense by [Charles Daoud](http://www.behance.net/gallery/Dense-typeface/10231891). Dense seemed to fit everywhere except for the tagline, Head in the Clouds, so I ended up creating a lighter version using Sketch's vector text tool. I chose the blue background as it was Leah's favorite color and it went great as a pseudo sky for the clouds to cover. After the mock-up was approved, I exported my image assets and started work in Sublime Text.

This project was also an excuse for me to get more practice using Git and GitHub for version control. So as I set up my development environment with git, Sass, and Bourbon, I also set up a new public repository on GitHub to keep a back up of my changes. You can find all the source code [here](https://github.com/HipsterBrown/postachio_project). I quickly connected local project with the GitHub repo and began creating the site layout.

<img src="https://s3.amazonaws.com/Hip_Musings/images/Finding_Leah.png" alt="Finding Leah"  />

As soon as the layout and styling matched the mock-up, I began implementing the more interactive elements that would make this site more appealing for its visitors. My initial idea was to give the clouds some life with some continual CSS3 animations. I tested out several different animation times, directions, and patterns until I got the alternating clouds just right so they were not distracting but still enticing. Eventually it came down to creating pages for the résumé and writing samples, which was one of the more difficult decisions of the project.

I could have easily made additional pages for the résumé and sample content to sit on and the clouds linked to externally, but that seemed so impersonal and dragged the user away for the main page. I had never created any sort of modal window for any of my past projects, but I figured this was the best time to try and implement one or two. Modals can be annoying for users just trying to complete a simple task and often times take longer than their worth to load in content. So I took a new approach to this old idea by having all the content loaded with the page, rather than loading it in later after the user clicked on the matching link, and created custom modals to bring that content into view when needed. Since it was just a small amount of information to add to the original page, it was worth the sacrifice of milliseconds during the initial load.

<img src="https://s3.amazonaws.com/Hip_Musings/images/Modal_Samples.png" alt="Writing Sample Modal"  style="width: 500px; margin: 0 auto;"/>

<img src="https://s3.amazonaws.com/Hip_Musings/images/Modal_Resume.png" alt="Résumé Modal"  />

The layout of each modal was inspired by Google's well-known card style seen in Google Now and spreading to its various other services. I really enjoy the easy separation of unrelated content by using these cards to differentiate writing samples and résumé categories. It was also a clean and modern look that matched the blog and main page of the site. I added the download links for the writing samples and résumé so that potential employers could keep a record of their interest in Leah. The buttons were the only things not custom designed by me; instead I used Bourbon's great, built-in button mixin for Sass. I decided to design the modals in the browser because of the simplicity behind the design.

Finally, it came down to working with Postachio and creating the custom book review blog for Leah to use.

<img src="https://s3.amazonaws.com/Hip_Musings/images/Postachio_Details.png" alt="Site Form"  />

Signing up and getting a default blog up and running is fairly straight forward; just authorize Postachio with your Evernote account and you can start arranging your blog details within a minute.
The blog creation form is short and sweet:
- Pick a subdomain to host your site
- Give it a name
- Give it the blog author's name
- Decide which Evernote notebook to sync all the articles with or create a new one
- Choose what social media links to include
- Hook up your disqus commenting
- Decide whether or not to use Markdown
I personally love using Markdown in my current blogging environment, Anchor CMS, and it is awesome for Postachio to give users more control of their formatting by including it.  

<img src="https://s3.amazonaws.com/Hip_Musings/images/Postachio_Themes.png" alt="Theme Browser"  />

<img src="https://s3.amazonaws.com/Hip_Musings/images/Postachio_Source.png" alt="Source Code"  />

Styling your Postachio blog can go one of two ways; you can either choose one of the pre-built themes or style it by hand by diving into the source code. I obviously chose the source code route for further control and soon discovered that the default theme is built with the Twitter Bootstrap framework and the Liquid layout language from the folks at Shopify. Twitter Bootstrap is a popular framework for developers to get their projects looking pretty with minimal effort during the prototyping stage, but the numerous naming conventions and fairly bulky size make it a little too much for running small blog, especially since Postchio is hosting all the accounts themselves. Targeting any of the blog elements for styling meant going into the Web Inspector and checking to see exactly what the developers called it. Once you got past that issue, you could be assured that the blog was mobile friendly because Bootstrap was in use. I did not see the use in changing too much of the format, it was mostly color choices, but it was probably more than the average user would want to try and figure out. It felt a lot like the old MySpace days when you found bits of code to paste into your site's customizing area and hoping it would work the way you wanted it.

<img src="https://s3.amazonaws.com/Hip_Musings/images/Blog.png" alt="Leah's Blog"  />

My final thoughts for Postachio would be that it is a brilliant concept that just needs a little more work to make it one of the most popular tools for blogging. Lightening the browser load by dropping Bootstrap for a custom default framework would be beneficial in the future, not just for their users but their servers as well. I would highly suggest this tool over anything like Wordpress, which has become far too bloated for setting up a simple blog, but I do not yet see it as a tool for creating an entire website. At the moment users can set up multiple pages for free but the creators are planning on making that a premium feature later on. I think it is smart for them to be thinking in line with Evernote's pricing strategy, give a nice amount of features away for free and then create some really awesome features for the users willing to pay for them.

Ultimately, I felt the site was a success from start to finish. It gave me a fantastic new experience of working with a client to create a personal site that would interest potential employers and give her something she is proud to put on her future job applications. I will continue to maintain the latest writing samples and résumé for the site until I find a better way for Leah to implement them herself. Hopefully she will enjoy the use of Evernote to draft her book reviews and publish them to her blog from wherever she likes. Only time will tell but from my brief experience, I think it's the perfect tool for creating a custom, lightweight blog for clients to post to with ease. You can see the live project [here](http://hipsterbrown.com/postachio/index.html) and Leah's live site at [LeahMarks.com](http://leahmarks.com).

Now it is time for me to get on to my next project, whatever that may be, and keep my eyes out for some more interesting tools to test.
