---
slug: gitflow-with-prs
title: GitFlow with Pull Requests
description: Through this video walkthrough, I'll show you how I've adapted the traditional GitFlow model to leverage pull requests at various stages.
createdAt: 2018-02-07
author: Chris Plowman
tags: Git, GitFlow, SourceTree
image: /images/for-posts/branches.jpg
headerTextColor: white
backgroundColor: rgba(0,0,0,0.5)

---

In the olden times, there was a great darkness that swept over developers everywhere.  It stole productivity, turned developer against developer, and forced individuals into a solitary abyss from which there was no help.  This darkness had a name: Centralized Version Control!  It was a cruelty like no other, where a simple merge could drive even the most experienced guru to madness.  Thankfully, Distributed Version Control arrived to shine a light, banishing the darkness...except in some cold, masochistic shops that clung to the past.  Like yours perhaps?

Hyperbole aside, once you have overcome the initial learning curve of working with distributed version control systems, you'll wonder how (and why!) you ever worked without it.  I switched to Mercurial and Git more than a decade ago and honestly didn't realize people were still using tools like Subversion and TFVC, the built-in version control in TFS, until I joined Magenic and saw them in use at several clients.  If you work someplace that's still using a tool like this, I feel terrible for you and hope that you and your fellow developers are fighting for change!  Being a developer is hard, you shouldn't have to fight against tooling that limits you, especially when better options exist and have since 2005!

As you switch over to a source control system like Git, you'll quickly see the benefits that lightweight, frequent branching and merging gives you.  However, it will also illustrate that your previously branching strategies from the centralized days don't extend well in this new paradigm.  Thankfully, there are existing models, like the very popular [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/) strategy, that you can learn from and adapt to your specific needs.  In the video below, I'll walk you through a branching process that has worked well for me.  This is largely just the standard GitFlow process with pull requests incorporated in to provide an additional level for oversight and approvals.  Again, I don't believe there to be a panacea that addresses everything any team will ever need; customization is important so take what you like and leave the rest.

In the video, I'm using [BitBucket](https://bitbucket.org/) and [Sourcetree](https://www.sourcetreeapp.com/), which are both tools that I have really enjoyed working with and highly recommend.  However, the process is going to be the same and should be easy to follow along with in your tools of choice.

[![video walkthrough of GitFlow process incorporating pull requests](/images/for-posts/gitflow-video.png)](https://youtu.be/ZEX67ogT658)

Happy Coding!