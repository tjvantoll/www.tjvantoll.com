---
layout: post
title: "The Shocking Viability of Vibecoding"
comments: true
---

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The hottest new programming language is English</p>&mdash; Andrej Karpathy (@karpathy) <a href="https://twitter.com/karpathy/status/1617979122625712128?ref_src=twsrc%5Etfw">January 24, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

I’ve been aware of “vibecoding” and the growing set of tools that allow you create apps without writing code, but it wasn’t until the term [made it to the front page of the New York Times](https://www.nytimes.com/2025/02/27/technology/personaltech/vibecoding-ai-software-programming.html) that I decided to take these tools seriously. From the article:

> “Since talking about my vibecoding experience on my podcast last week, I’ve heard from dozens of other people who have been building their own tools with A.I. assistance. Colleagues have told me about the nutrition apps they’ve built to help them stick to their diets, or the tools they’re using to summarize the email newsletters they get. Readers have sent in websites they’ve built to track the price of eggs, or scrape Zillow listings in Los Angeles to discover instances of rent-gouging after the Palisades fire.”

I knew the day would come where non-technical people would be able to build useful applications with AI, but I didn’t think that day had come quite yet.

In my view, AI was useful for _learning_ to code, but “real” applications would still require an experienced developer who uses AI as a junior assistant or copilot. Addy Osmani phrased it well in his writeup, [The 70% problem: Hard truths about AI-assisted coding](https://addyo.substack.com/p/the-70-problem-hard-truths-about).

> “Here's the most counterintuitive thing I've discovered: AI tools help experienced developers more than beginners. This seems backward – shouldn't AI democratize coding?
The reality is that AI is like having a very eager junior developer on your team. They can write code quickly, but they need constant supervision and correction. The more you know, the better you can guide them.”

And while I still believe most of that conclusion is true, as I’ve started heavily vibecoding over the last few weeks I’ve been _shocked_ at what I’ve been able to create without code.

I’m writing this article because I believe professional developers need to take these vibecoding tools seriously, as I think that everyone—technical and non technical—can find useful things to build while vibecoding today. I’ll share my own experiments so you can see what I mean.

## My First Experiment

There are a lot of tools that allow you to vibecode ([Cursor](https://www.cursor.com/), [Windsurf](https://codeium.com/windsurf), [GitHub Copilot](https://github.com/features/copilot), [Bolt](https://bolt.new/), [Replit](https://replit.com/), [V0](https://v0.dev/), etc). I experimented with most of these tools but ended up sticking with Cursor because it’s a Visual Studio Code-based text editor (so I can still see code in a familiar environment when I need to), and because they have excellent tooling for AI agents to control a whole project. For example, I love that they have a [Yolo mode](https://docs.cursor.com/context/model-context-protocol#yolo-mode) that allows their agent to run automatically without approval.

Honestly though, all these tools are more similar than they are different. They all provide a chat panel that is the primary way you interact with their AI agent, and they all use the same underlying LLMs under the hood (typically Claude Sonnet 3.5 or 3.7).

Once I got Cursor downloaded and installed I wanted to start by building something fun, so I asked Cursor’s agent to build me an open-world racing game where I could drive around and interact with AI cars. I was stunned at what it built.

<img alt="An open-world racing game I built with Cursor" src="/images/posts/2025-03-17/open-world-racing.png" class="plain" />

My “Open World Driving Game” isn’t perfect—the cars look a bit odd, there are trees in the roads, and so on—but the game works; the game runs in the browser, and the AI even built a freakin’ minimap (that works amazingly) without me asking.

I’m capable of building an open-world racing game like this on my own, but only with a lot of time and research. Building something like this would easily take me several days and maybe several weeks.

Yet, suddenly I was able to say things like “add a command that lets the cars jump” or “add buildings to the world”, and instead of having to take an hour or two to code that myself, I could see those features implemented in 1–2 minutes. I was able to be creative in ways I never was before.

But being a longtime software developer I was still skeptical. Sure, I can vibecode my way through a silly useless game, but I couldn’t build anything _actually_ useful with it, right?

## Solving Simple Problems

I work as a developer advocate at [Blues](https://blues.com/), and through that role I end up working on a lot of small projects. When I have small problems I frequently end up thinking about this [infamous “Is It Worth the Time” comic from xkcd](https://xkcd.com/1205/).

![A famous xkcd comic on productivity](/images/posts/2025-03-17/xkcd.png)

Vibecoding has fundamentally changed how I approach these sort of one-off problems, as I find I’m able to automate things in minutes or hours that previously would’ve taken me days or weeks. I’ll give you an example.

At Blues one of our products takes GPS/GNSS readings in a very configurable way. That configurability is awesome, but it also leads to a lot of situations I need to help test something out, or maybe help debug an issue a user hit.

And so for years there was a debugging tool that existed only as an idea in my head: I wanted an app that could load data from our backend, plot any locations it found on a a map, show each location with its corresponding timestamp, and provide a slider that controls which locations should display based on time.

I’m capable of building a map with features like this, but coding that app by hand would take me a few days to do right. And that’s a lot of time to justify spending for a one-off thing I only intend to use to debug my own problems.

However, because I had been looking for an excuse to vibecode for science, I decided to go back to Cursor to see what I could get done—and I built exactly what I wanted in under an hour.

![A map application I built with Cursor](/images/posts/2025-03-17/maps.gif)

As I’m writing this I’m still shocked I was able to build my map debugging tool so easily. While this app isn’t solving the world’s most difficult software problem—it’s not solving a trivial problem either.

But as I’ve continued to experiment I’ve found that this was actually a perfect use case for vibecoding. My app had clear requirements, and I didn’t have to incorporate my output into an existing application with constraints or integration challenges.

Interestingly this idea of using vibecoding to solve specific, one-off problems like my map also came up in the New York Times vibecoding article.

> “My own vibecoding experiments have been aimed at making what I call “software for one” — small, bespoke apps that solve specific problems in my life. These aren’t the kinds of tools a big tech company would build. There’s no real market for them, their features are limited and some of them only sort of work.”

Is vibecoding the right fit for every problem? Of course not. But if you understand how these tools work, you can better identify when a problem is a good fit for vibecoding. And when vibecoding is appropriate, you might be able to accomplish tasks that weren’t possible (or pragmatic) before—and every software developer can benefit from that.

I’ll end with one last story.

## Building Full Dashboards

My company, Blues, exists in the IoT world, and the IoT world loves dashboards. There are literally dozens of IoT companies that exist solely to help users build dashboards to view data from their devices.

At Blues we help users build dashboards too, but we’re not a full dashboarding platform. If you want to build dashboards with us you have to [route your data to another platform](https://dev.blues.io/guides-and-tutorials/routing-data-to-cloud/general-http-https/), or create something on your own using [our API](https://dev.blues.io/api-reference/notehub-api/api-introduction/).

Web developers like me have no issues using our APIs, but we have users of all backgrounds coming to our platform, and many of them are not capable of building a web dashboard with an HTTP-based API.

However, based on my recent vibecoding experience I thought about this scenario in a different way: could I build a web dashboard for my Blues projects while writing zero code?

The short answer is [yes](https://airiq.netlify.app/).

<img alt="Image of an AirIQ dashboard I built while vibecoding" src="/images/posts/2025-03-17/airiq.png" class="plain" />

The longer answer is yes, BUT you will start to hit some of the limits of vibecoding as the complexity of your dashboard increases. When I started asking for more advanced filtering of my data, for example, I would frequently get in infinite loops, where the LLM would struggle to match the date filters it used to load data from the backend with the date/time pickers it would create on the front end.

Can you get advanced functionality like date filtering to work through vibecoding alone? Absolutely. However, through trial and error I’ve found that the simpler I can present a task to the AI, the more likely I am to get a usable and trustable result. Notice, for example, how my UI above uses time ranges of “Last 24 Hours” and “Last 3 Days” instead of providing an open-ended picker.

This is where I feel like this quote I cited from Addy Osmani earlier still holds true:

> “Here’s the most counterintuitive thing I’ve discovered: AI tools help experienced developers more than beginners. This seems backward – shouldn’t AI democratize coding? The reality is that AI is like having a very eager junior developer on your team. They can write code quickly, but they need constant supervision and correction. The more you know, the better you can guide them.”

I’ve found that Vibecoding starts to fall apart on complicated apps solving complicated problems—unless you are an experienced developer that can offer guidance that points the AI in the right direction.

However, two things:

1) These vibecoding tools are only getting better, and are getting a ton of investment. Anysphere (the developer of Cursor) [raised $100 million Series B at a valuation of $2.6 billion](https://techcrunch.com/2024/12/19/in-just-4-months-ai-coding-assistant-cursor-raised-another-100m-at-a-2-5b-valuation-led-by-thrive-sources-say/); Codium (the developer of Windsurf) [raised a $150 million Series C at a valuation of $1.25 billion](https://techcrunch.com/2024/08/29/github-copilot-competitor-codeium-raises-150m-at-a-1-25b-valuation/); and StackBlitz (the company behind Bolt) [raised over $80 million at a valuation of $700 million](https://www.bloomberg.com/news/articles/2025-01-21/ai-speech-to-code-startup-stackblitz-is-in-talks-for-a-700-million-valuation). These tools also benefit from advancements in their underlying LLMs, and the companies behind those LLMs aren’t short on cash either.

2) A lot of the problems we solve everyday are not super complicated. You might not use vibecoding for your next database refactor, but I guarantee you everyone reading this has some workflow that could benefit from vibecoding. These might be items in your backlog, or they might be tasks that only help you get your job done faster. They might even be ideas for side projects you’ve been meaning to build but haven’t had the time.

All professional developers should try to vibecode today. These tools can help you solve real problems, and knowing when to reach for agents (and when not to reach for agents), is going to be a valuable skill for any software developer moving forward.

If you’re looking for a more detailed guide on the approaches I’ve been taking, I recorded a 34-minute video of myself vibecoding a dashboard from scratch.

<iframe width="560" height="315" src="https://www.youtube.com/embed/uJIe5iw3Blk?si=fELPPreMjCQUBeAM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
