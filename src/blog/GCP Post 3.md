---
slug: gcp-dotnet-part3
title: Running .NET on GCP, Moving to PaaS
description: Up to this point in the series, we took a traditionally architected ASP.NET site and migrated it to virtual machines in GCP, eliminating the need to manage hardware.  In this post, we'll discuss the limitations of the current approach and how we can begin to make modifications to the app to better leverage the scalability of the cloud and increase our efficiency.
createdAt: 2018-02-09
author: Chris Plowman
tags: GCP, .NET, PaaS, .NET Core, Cloud Storage
image: /images/for-posts/keys.jpg
headerTextColor: #222222
backgroundColor: transparent

---


# Part 3: Benefits of Managed Services
Up to this point in the series, we took a traditionally architected ASP.NET site and migrated it to virtual machines in GCP, eliminating the need to manage hardware ([Part 2: Migration to GCE](https://chrispycode.ninja/blog-article/gcp-dotnet-part1)).  While this is a good start, it doesn't provide the promised scalability of the cloud due to limitations in the architecture.  In this post and the accompanying videos, we'll discuss the limitations of the current approach and how we can begin to make modifications to the app to better leverage the scalability of the cloud and increase our efficiency.  In the video below, I discuss these architectural issues in further detail as well as how we can use managed, platform as a service (PaaS) offerings in GCP to overcome these shortcomings.

[![GCP Managed Services Overview Video](/images/for-posts/GCPSeries3/managedServicesOverviewVideo.png)](https://youtu.be/raJNN9tJOo0)

Now that we understand the issues, let's start rectifying the issues!  The first barrier is the local storage of images and this is a perfect candidate for Cloud Storage.  Perhaps the only thing more impressive than the scalability of Cloud Storage is the price.  At the time of this article, nearline storage is only $0.01 per GB per month, that's an incredible bargain!  Check out the current pricing on the [Google Cloud pricing page](https://cloud.google.com/storage/pricing#storage-pricing).  Plus, as you'll see from the walkthrough below, it is pretty quick and easy to implement.

[![Cloud Storage implementation walkthrough video](/images/for-posts/GCPSeries3/cloudStorage.png)](https://youtu.be/xEzviuw4hyE)

Stay tuned for the next post where I'll continue the migration to PaaS services by moving to a managed relational database in GCP.

In the meantime, happy coding!