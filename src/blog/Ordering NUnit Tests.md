---
slug: ordering-unit-tests
title: Ordering NUnit Tests
description: In this post, Chris shows you how you can run tests in a specified order using NUnit.  While this should not be used for regular unit testing, it is an invaluable technique for your end-to-end testing.
createdAt: 2014-11-19
author: Chris Plowman
tags: Testing, NUnit
image: 

---

Hello all! In this blog post I'm going to shows how you can create ordered tests in NUnit. Now before you start screaming that unit tests should not have any order dependencies, let me assure you that I know and agree wholeheartedly. So why create this project and bother with showing how to do this? Simple: there are other kinds of tests besides unit tests, and they often DO have order dependencies.

For example, if you are running database integration tests, a basic CRUD test might look like this:

1.  Perform initial get and assure empty.
2.  Add an item.
3.  Get new item back.
4.  Delete item.
5.  Get empty list again.

Since we want to run this integration all the way through on a real database (hopefully NOT production!), this should be run in order. Without ensuring the order, we would have to do complex, wasteful, and time consuming setup for each step of our tests.

Of course, we have a couple options for doing this ordered test, including not using a testing framework at all. However, NUnit is a great testing framework that many developers are already very familiar with and are likely using for their actual unit tests, so why not leverage this knowledge to make our lives a little easier? Alas, NUnit has been built for unit tests, so it doesn't have any built in mechanisms for running tests in order, but with a little ingenuity it can absolutely be accomplished.

A simple way to run an ordered test would just be to build up one test method with multiple steps and assertions along the way. That might look something like this:

	[TestFixture] 
    public class Test
    {
        public void LongTest()
        {
            // arrange for read
            // act for read
            // assert for read

            // arrange for insert
            // act for insert
            // assert for insert

            // on and on and on...
        }
    }
    
I have done this in the past for some simple tests like the example above. The nice thing with this approach is that if an assertion fails early on, the test will fail without continuing execution. Often this is exactly what you want with ordered tests since if your preconditions are not met, your later tests may not be valid. However, as your tests become more complicated, this single test becomes long and difficult to work with. Also, if you do want to continue after an initial assertion fails, you can't. So this is not a great option for real world development on big projects.

Another option is to prepend an alpha character to your tests. NUnit orders tests alphabetically, so this way you can control the running order. It's obviously a bit of a hack, can be difficult to maintain, and makes for some ugly method names. The other problem is that it could break at any time if NUnit decides to order their tests differently.

I recently stumbled across a very cool approach on [this StackOverflow question](http://stackoverflow.com/questions/1078658/nunit-test-run-order).  There are 2 great code samples provided that I have copied into [the project repository for this post](https://github.com/JC-Chris/Ordering-NUnit-Tests) to make it easier to view them side by side and test.  Let's take a quick look at the posted code to see what they are doing.

The original post, which I have called Example 1 in the repo, uses NUnit's `TestCaseSource` in a very clever way to generate the ordered tests. I won't repost the entire code here since you can see it in the repo and the original SO article, but here's the main clever bit:

	public IEnumerable<TestCaseData> TestSource
    {
        get
        {
            yield return new TestCaseData(
                new TestStructure
                {
                    Test = () =>
                    {
                        Console.WriteLine("This is test one");
                        MyInt.I++; 
                        Assert.That(MyInt.I, Is.EqualTo(1));
                    }
                })
                .SetName(@"Test One");
                
            yield return new TestCaseData(
                new TestStructure
                {
                    Test = () =>
                    {
                        Console.WriteLine("This is test two");
                        MyInt.I++; 
                        Assert.That(MyInt.I, Is.EqualTo(2));
                    }
                }).SetName(@"Test Two");
            yield return new TestCaseData(
                new TestStructure
                {
                    Test = () =>
                    {
                        Console.WriteLine("This is test three");
                        MyInt.I++; 
                        Assert.That(MyInt.I, Is.EqualTo(3));
                    }
                }).SetName(@"Test Three");
        }
    }
    
Notice that where you would normally be returning data for your test, he's created a lambda expression that provides the test implementation. The source method then just calls this `Test` method for each iteration and since test data is always run in the provided order, you can ensure your tests are run the way you want! Super clever approach and kudos to the author.

![Example 1 successfully ordered test run output](/images/for-posts/OrderedNUnitTests/Example1Run.PNG)

The next code block from the answers, which I have called Example 2 in the repo, extends this approach to be a little more developer friendly by utilizing an attribute called `OrderedTest` that has a single `int` property to specify the order. This way you can write your test methods as usual and just decorate them with the new attribute to control the order they will run in. Much nicer syntax and I loved the idea. The main bit of code here is again building the list of "data".

	public IEnumerable<TestCaseData> TestSource
    {
        get
        {
            var assembly =Assembly.GetExecutingAssembly();
            Dictionary<int, List<MethodInfo>> methods = assembly
                .GetTypes()
                .SelectMany(x => x.GetMethods())
                .Where(y => y.GetCustomAttributes().OfType<OrderedTestAttribute>().Any())
                .GroupBy(z => z.GetCustomAttribute<OrderedTestAttribute>().Order)
                .ToDictionary(gdc => gdc.Key, gdc => gdc.ToList());
            foreach (var order in methods.Keys.OrderBy(x => x))
            {
                foreach (var methodInfo in methods[order])
                {
                    MethodInfo info = methodInfo;
                    yield return new TestCaseData(
                        new TestStructure
                            {
                                Test = () =>
                                    {
                                        object classInstance = Activator.CreateInstance(info.DeclaringType, null);
                                        info.Invoke(classInstance, null);
                                    }
                            }).SetName(methodInfo.Name);
                }
            }
        }
    }
    
As you can see, the author uses reflection and his attribute to pull out the test methods. Pretty smart right?! Yeah, I like this approach and it makes for a very clean class. However, there's a bit of a problem, or at least I viewed it as a problem. His reflection is pulling methods for every class in the assembly, not just the current class. This could end up with you running more tests than you actually thought you were going to. I added in the `Example2b` class in the repo to show this. The image below shows the output when I run tests for the `Example2` class. Notice that the 2b tests were run as well, even though they were out of context.

![Example 2 successfully ordered test run output with unintended tests run as well](/images/for-posts/OrderedNUnitTests/Example2Run.PNG)

Finally, for Example 3, I put my own spin on the approach making it even easier to use, at least in my opinion, and resolving the issue of running more tests than you might have intended. By pushing this into its own class, your test class can now inherit from `OrderedTestFixture` and be a bit cleaner. I also removed the `Int` class from the code because I felt it was ugly and unnecessary.

	public class OrderedTestFixture
    {
        public IEnumerable&lt;TestCaseData&gt; TestSource
        {
            get
            {
                var assembly = Assembly.GetExecutingAssembly();
                Dictionary&lt;int, List&lt;MethodInfo&gt;&gt; methods = assembly
                    .GetType(this.GetType().FullName)
                    .GetMethods()
                    .Where(y =&gt; y.GetCustomAttributes().OfType&lt;OrderedTestAttribute&gt;().Any())
                    .GroupBy(z =&gt; z.GetCustomAttribute&lt;OrderedTestAttribute&gt;().Order)
                    .ToDictionary(gdc =&gt; gdc.Key, gdc =&gt; gdc.ToList());
                foreach (var order in methods.Keys.OrderBy(x =&gt; x))
                {
                    foreach (var methodInfo in methods[order])
                    {
                        MethodInfo info = methodInfo;
                        yield return new TestCaseData(
                            new TestStructure
                            {
                                Test = () =&gt;
                                {
                                    object classInstance = Activator.CreateInstance(info.DeclaringType, null);
                                    info.Invoke(classInstance, null);
                                }
                            }).SetName(methodInfo.Name);
                    }
                }
            }
        }
    }
    
As you can see in the screenshot below, you can run tests from 3A or 3B and only the corresponding tests will run.

![Example 3 successfully ordered test run](/images/for-posts/OrderedNUnitTests/Example3Run.PNG)

![Example 3B successfully ordered test run](/images/for-posts/OrderedNUnitTests/Example3bRun.PNG)

I think this makes for some lovely code and should be pretty easy for you to extend further to fit your needs. For example, you could probably add in some logic to short circuit the tests on an error if you like.

Hope that helps my fellow devs. Have a look at the repo and have fun testing! Happy coding!

