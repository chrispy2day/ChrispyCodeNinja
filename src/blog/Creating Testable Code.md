---
slug: creating-testable-code
title: Creating Testable Code
description: Architecting code to be testable from the beginning of the project can yield immense cost and time savings down the road.  This posts focuses on why this is the case and how to start implementing testable patterns in your own code.
createdAt: 2017-06-28
author: Chris Plowman
tags: Testing, Dependency Injection, Inversion of Control
image: /images/for-posts/testableCodeBgnd.jpg
headerTextColor: white
backgroundColor: transparent

---

As a developer, you know that testing is important. Often times, the first pass through the code is 90% perfect, but that 10% of edge cases and things you didn't think of right off the bat is going to be the bane of your existence.  It will come back to bite you and the later that bite comes, the more painful it is going to be.  So we do everything we can to test and resolve issues as soon as possible. That's not always easy and will never be perfect, but depending on our architecture, we can make our lives easier or much *much* harder.

Take a second and think about the bugs that have been the hardest for you to track down. I think about scenarios where there were layers upon layers of code, jumping from one section of code to another, from one source file to another to another and back again, all while trying to keep track of where I am in this giant chain of calls.  You do remember where this started and what it's supposed to be doing, right?  I remember one project in particular where after my second time of getting lost in the code, I pulled out a piece of paper and charted out the classes and methods that were being called just so I wouldn't lose track.  Once I finally figured out the bug, I'd gone through around 30 layers in the code all originating from the one public method exhibiting the bug.

That was awful.  It doesn't have to be that way.  It *shouldn't* be that way.  And if you spend a little time upfront thinking about testability in your architecture, it won't be that way.

## Testing Mindset
I think the first, and most critical, step in creating testable code is changing your mindset.  If you think about how you are going to test your code after it's written you're in for a frustrating experience.  When trying to get something to work as quickly as possible, we often create dependencies on other objects that may have problems of their own or overlook possible error conditions like connectivity problems.  This will make it very difficult to create tests to verify expected behaior even in these non-ideal scenarios.  If we instead approach each method with testability in mind, we will be looking for areas that may cause problems and not only write the code to properly handle these cases, but also look for ways to be able to test these edge conditions.  Let's look at a single example to illustrate what I'm talking about.

*Code for API call*

Problems: network issues or other request errors, dependency on settings, etc

Talk about IoC / Dependency Injection as a way to facilitate testing

*Code reworked with DI for settings*

Mocking objects for test cases

*Testing code with Moq*

Test-first / Behavior Driven Development talk