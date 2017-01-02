---
slug: recognizing-custom-gestures-in-xamarin-forms
title: Recognizing Custom Gestures in Xamarin Forms
description: In this post you will learn how you can use custom renderers in order to react to gestures not natively supported in Xamarin Forms.
createdAt: 2015-01-20
author: Chris Plowman
tags: xamarin forms, custom renderers
image: 

---

Hello again all! Sorry for the delay in my posting activity; things have been a little hectic for me lately. There were, of course, the holidays and all that craziness, but I am also in the process of moving and my wife is pregnant! To top all that off (as if it weren't enough already), I have actually been working on an Android video tutorial, but my screen capture program was giving me some issues and as soon as I got that worked out, my mic broke! Doh! Anyway, eventually I'll get that sorted out and have a new video tutorial for you, but in the meantime, here's a good, old-fashioned, blog post.

So this post is going to be all about recognizing gestures in Xamarin Forms, which is something that most apps with any sort of interesting user interface are going to have to tackle. Unfortunately, for now the Xamarin team only gives us out-of-the-box support for the tap gesture, which is great, but not enough. So, I have created [a simple project on GitHub](https://github.com/JC-Chris/Xamarin-Gestures-Demo) to show how you can listen and respond to your own custom gestures. For the demo I'm using swipes in all directions, but you can follow this same approach to respond to whatever gestures you need to.

Here are the screenshots of the demo app running on all platforms:
![Android Screenshot](/Images/ForPosts/XamarinFormsGestures/androidGesture.gif)
![iOS Screenshot](/Images/ForPosts/XamarinFormsGestures/iosGesture.gif)
![Windows Phone Screenshot](/Images/ForPosts/XamarinFormsGestures/windowsGesture.gif)
	
The magic of this comes from utilizing custom renderers and then leveraging the platform's native features in each specific project. Figuring out each platform was a little tricky, but thankfully I got some help from [Rob Gibbens posts](http://arteksoftware.com/gesture-recognizers-with-xamarin-forms/) as well as [this GitHub project](https://github.com/tkowalczyk/SimpleCustomGestureFrame). Alas, both of those only tackled iOS and Android, so I actually had to do some real work for Window Phone, but thankfully it wasn't too bad.As I mention in the project's ReadMe, you can extend whatever control makes sense for your implementation, but I used a simple `ContentView`. It didn't look like the renderer for this actually created a native component in Windows Phone, so you'll see I created and injected my own control that I use to listen to the gestures. Otherwise, I think the code should be fairly straightforward, so please take a look at the repo and enjoy!

Happy Coding!

