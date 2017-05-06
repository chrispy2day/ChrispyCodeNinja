---
slug: creating-testable-code
title: Creating Testable Code
description: Architecting code to be testable from the beginning of the project can yield immense cost and time savings down the road.  This posts focuses on why this is the case and how to start implementing testable patterns in your own code.
createdAt: 2017-01-13
author: Chris Plowman
tags: Testing, Dependency Injection, Inversion of Control
image: /images/for-posts/testableCodeBgnd.jpg
headerTextColor: white

---

As a developer, you know that testing is important. Often times, the first pass through the code is 90% perfect, but that 10% of edge cases and things you didn't think of right off the bat is going to be the bane of your existence.  It will come back to bite you and the later that bite comes, the more painful it is going to be.  So we do everything we can to test and resolve issues as soon as possible. That's not always easy and will never be perfect, but depending on our architecture, we can make our lives easier or much *much* harder.

Take a second and think about the bugs that have been the hardest for you to track down. I think about scenarios where there were layers upon layers of code, jumping from one section of code to another, from one source file to another to another and back again, all while trying to keep track of where I am in this giant chain of calls.  You do remember where this started and what it's supposed to be doing, right?  I remember one project in particular where after my second time of getting lost in the code, I pulled out a piece of paper and charted out the classes and methods that were being called just so I wouldn't lose track.  Once I finally figured out the bug, I'd gone through around 30 layers in the code all originating from the one public method exhibiting the bug.

That was awful.  It doesn't have to be that way.  It *shouldn't* be that way.  And if you spend a little time upfront thinking about testability in your architecture, it won't be that way.

The first step in squashing that pesky bug is identifying where you need to look.  Stepping through a debugger is one way to do this, but that's manual, it's slow, and it's prone to mistakes (crap, just stepped over the method I meant to step into -- start over...grrr), so let's make that a last resort instead of the first one.  If we can write one or more test cases that can exhibit the bug, not only can we identify where we need to focus our attention, but also have an automated regression test to ensure it never rears it's ugly head again!

	Note that this architecture support TDD & BDD