---
slug: NetCore-to-GCP-AppFlex
title: .Net Core to GCP App Engine Flex
description: This posts walks you through deploying a .Net Core app to Google Cloud Platform's App Engine Flexible environment.  
createdAt: 2017-03-17
author: Chris Plowman
tags: .Net Core, Cloud
image: /images/for-posts/cloud.jpg
headerTextColor: black
backgroundColor: transparent

---

Fresh on the heels of Google NEXT 2017, I thought it would be the perfect time to create a .Net Core app and push it up to App Engine.  So let's get started...

# Uh, wait...what, .Net on Google?!
So yeah, I suppose before diving in a little background is in order.  You may be surprised that Windows workloads are even supported on the Google Cloud Platform (GCP), but they definitely are have gotten some great attention of late.  Windows support started a while back (~18 months) and capabilities have continued to expand making GCP a completely viable solution for your workloads.

App Engine is the platform-as-a-service 

## References
[GCP .Net Core Quickstart](https://cloud.google.com/appengine/docs/flexible/dotnet/quickstart)


# Enough Talk, Do It!
Ok, so since the goal here is just to show a .Net Core app running on App Engine Flex, I'm not going to spend any time on the app itself.  If you need some assistance on .Net Core, there are a lot of posts and tutorials on that, but that's not my focus for this post.  So let's just use the simplest app possible and get it running.

## Create the App
1. Open [Visual Studio 2017]() - go get it if you don't have it.  I'll wait...
2. 