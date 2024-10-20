---
layout: post
title: "So You Want to Write a Tech Book"
comments: true
---

<img src="/images/posts/2014-12-29/shelf.jpg" alt="Books on my shelf" style="border: none;">

When I finished *[jQuery UI in Action](http://tjvantoll.com/jquery-ui-in-action.html)* I decided I wanted to write a retrospective to help other aspiring authors. I wanted to release the retrospective around the same time as the book (\*cough\* late September), but as it turns out, it's super easy to legitimize procrastination after you finish writing a book. Playing through the entire suite of Sonic the Hedgehog Genesis games suddenly seems like a *great* idea. (It is, by the way.)

But I did finally get around to doing this. What follows is a semi-coherent series of sentences about my experiences writing a tech book. The target reader is someone curious about how tech books are authored—especially masochistic readers that might be interested in writing a book themselves one day.

<!--more-->

## A timeline

The most frequent questions I get about the book are related to time, so let's start there. Here's how *jQuery UI in Action* went down:

* **April 29th, 2013**: [Manning](http://www.manning.com/?a_aid=tj-vantoll) (the publisher) first contacted me
* **June 26th, 2013**: I signed a contract to write the book
* **August 1st, 2013**: I started writing chapter 1
* **March 26th, 2014**: I completed the first draft of the entire book
* **September 30th, 2014**: *jQuery UI in Action* was published

For those of you counting that's **462 days** from contract to publication. To give you some perspective on how long that is, or possibly just to confuse you with a questionably related statistic, that's also approximately [the gestational period for a grey rhino](http://www.vaughns-1-pagers.com/biology/gestation-periods.htm). It's a long time.

And it definitely seemed long, but after talking to other tech authors this sort of timeline seems to be fairly average. Ilya Grigorik wrote [*High Performance Browser Networking*](http://www.amazon.com/High-Performance-Browser-Networking-performance/dp/1449344763/ref=sr_1_1?s=books&ie=UTF8&qid=1419611457&sr=1-1&keywords=high+performance+browser+networking) (which is almost exactly the same length as *jQuery UI in Action*) in 381 days, which is 81 fewer days than it took me... but his book has “Performance” in the title, so I'd say that checks out.

> That stat is from Ilya's [amazing retrospective of his work on his book](https://www.igvita.com/2013/09/29/retrospective-high-performance-browser-networking/). You should read it, especially if you're interested in detailed data related to the writing process.

Of course, writing time can vary considerably depending on the book's length. *jQuery UI in Action* is twelve chapters long with six appendices. In total the book is **361 pages**, the vast majority of which were written over eight months.

<p>
	<img src="/images/posts/2014-12-29/last-page.png" alt="The last page of jQuery UI in Action">
	<i>See, it is 361 pages. Manning counts the index pages so I will too; don't judge me.</i>
</p>

## Day to day

With the high-level overview out of the way let's get into my day-to-day work. Honestly I wish I had a cool story for how this book was written, but the reality is extremely mundane. It was basically me, my laptop, and an inordinate amount of time in my basement.

<p style="float: right; width: 50%; margin: 1em 0 1em 1em;">
	<img src="/images/posts/2014-12-29/desk.jpg" alt="The desk in my basement" style="max-height: 400px;">
	<i>This is where the magic happens.</i>
</p>

And by inordinate I mean roughly **two hours a day, seven days a week**. I would occasionally take a day off, and I would occasionally work a few extra hours, but overall I was fairly consistent about working **~14 hours per week** on the book.

Before writing *jQuery UI in Action* I had this vision of tech authors that exclusively wrote books. But since writing *jQuery UI in Action* I've had the pleasure of meeting several other authors, and I've learned that almost every tech author has a full time job of some variety. Writing books alone is not enough to pay the bills—not even close. And that's not necessarily a bad thing (I'll get into that later), but it does mean writing a tech book is almost exclusively done in addition to a full-time job.

Personally I was somewhat fortunate because my job was (and is) remote and extraordinarily flexible. (I work as a developer advocate for Telerik.) Working remote afforded me a little extra time everyday, and I was able to use that time to work on the book periodically, which turned out to be invaluable. What worked best for me was handling logistical things during the day—answering emails, performing edits, responding to reviews, and such—so that I could devote my nights to writing without distractions.

Overall, the main thing I learned is that writing a tech book is time and effort on top of your current work and family commitments. In addition to my day job, my four-year-old twin boys made sure that the overwhelming majority of my writing happened between 9:00 PM and midnight, after the boys went to bed.

In general I would advise anyone debating authoring a tech book to make sure your family is on board first. My significant other was extraordinarily helpful and considerate during the process, but I'm pretty sure she wanted to murder me by the end. Actually, in hindsight, I'm more than pretty sure—“I'm going to murder you if you don't finish” might be a direct quote. But for the book's sake I had to keep her happy, and not just for the reasons you would expect—she's a lot better at CSS than me, and I needed her to make my examples work more than a few times.

## Editing

From my earlier timeline you may have noticed that there was a roughly five-month gap between the time the first draft of the book was complete and publication. A couple things were going on during that time, but it was mostly editing. I can't speak for other publishers, but Manning has a lot of processes that are all about producing the best possible book. Off the top of my head this includes the following:

* A review of the original book proposal and TOC (table of contents) by a group of potential readers
* A review after each chapter by [my editor](http://seandennis.com/)
* External reviews by ~8 individuals at three points throughout the book (after chapters 4, 8, and 12 were completed, respectively)
* A copy edit pass for grammar and formatting
* A dedicated technical review
* Two proofreading passes

I have mixed feelings about having this much ceremony to publish a book. On the positive side I have never been more proud of anything I've written in my life. I made a number of beneficial changes to the structure and contents of the book based on the external reviews; I was ecstatic that [Jörn Zaefferer](http://bassistance.de/) agreed to tech review the book; and I learned a lot from going through the copy editing process.

But that being said these review processes can take an extraordinary amount of time and energy. Time spent tweaking wording for clarity could be spent finishing the book sooner, and the [law of diminishing returns](http://en.wikipedia.org/wiki/Diminishing_returns) is at play here. Over time I found that the processes aren't bad as long as you focus on trends and avoid nit picking every little sentence. If one person doesn't like your sentence don't worry about it, but three people are confused by an example it's probably worth addressing.

## Tips for writing a book

I have other tips so I thought I might as well make a section for them. As with my other unsolicited advise, take these tips for what they are: things that worked for me that may or may not work for you.

## Tip #1: Write, write write

Writing a 300+ page book is absurdly time consuming, so wasting time staring at the screen doesn't do you any good. Of course this is easier said than done, and writer's block is a real thing, but getting a first draft done as fast as possible is incredibly important. A first draft can be reviewed for high-level problems, for structure, and for continuity with the rest of the book. There's no point taking an hour to write a perfect introductory paragraph if it's going to have to change later. (Remember those five months of editing I just talked about. You'll have time to get things as perfect as you'd like.)

My advice is to try to make your writing a stream of consciousness as much as possible. Write like you're explaining something to your friend sitting right next to you. You may end up writing some nonsense, but you might surprise yourself by just how coherent and conversational your stream of consciousness is.

## Tip #2: Drink

This tip isn't for everyone, but for some a drink or two can help put your mind at ease and help get words onto paper. (Figuratively of course, if you're literally writing random words on physical paper that's a sign that you've had too many.) Personally I found that the occasional beer could help my creative processes substantially.

There's actually some science to back this up. Studies are now increasingly showing that [alcohol tends to produce better ideas, and that coffee can give you a burst of energy to complete tasks](http://blog.pickcrew.com/coffee-vs-beer-effects-on-creativity/). The phrase “beer for the idea and coffee for the execution” is actually a thing. Ernest Hemingway may have said it best:

> Write drunk; edit sober.

Note: There's a [good chance Hemingway didn't *actually* say this](http://en.wikiquote.org/wiki/Talk:Ernest_Hemingway), but it sound *way* cooler to attribute the quote to Hemingway, so let's assume that he did.

## Tip #3: Don't worry about grammar or formatting

The theme of the previous tips was to help produce a first draft as fast as possible, and this is a continuation of that message. Simply put, while writing a first draft, don't worry about your grammar. You can sort out the “it's” versus “its”, “affect” versus “effect”, and other such issues later.

Along the same lines, don't worry about formatting, indentation, style guides, structure, fonts, code clarity, or any of that stuff. Just write. You can clean all of that up during editing (with coffee of course).

## Tip #4: Sleep on it

The stresses and timelines associated with writing a book can make you feel like you need to write every day no matter what. But writer's block is a real thing, and some days it's impossible to write words no matter how hard you try. Worse, nights that you spend hours accomplishing nothing are extremely detrimental to your morale. You wake up the next day tired and more stressed from the time you just lost.

Over time I started giving up on days where I knew nothing would happen and went to sleep. I did this not only for the obvious benefit of being more rested the next day, but because I also found sleeping to help with the my creative processes. I can think of several occasions that I had no idea how to approach a certain topic, but I woke up with a couple of good ideas.

## Tip #5: Don't do it for the money

I have made some money off of *jQuery UI in Action*, but from an $/hour perspective, I would've been far better doing freelance work, or possibly working at the local McDonald's. I think it's fairly common knowledge that tech authors don't make a whole lot of money, so I'm guessing that doesn't surprise you, but I'm actually going to make a somewhat different point.

Even if tech books paid exorbitant royalties I still think it would be a bad idea to write just for the money. In my opinion you should have some personal reason for wanting to write, for putting yourself through the excruciating process that is producing a tech book. If you don't have something pushing you to continue writing you're likely going to 1) give up, 2) regret the experience, or 3) both.

That being said there are several good non-financial reasons to write a book: career advancement, notoriety, industry status, and the satisfaction associated with teaching others are a few that come to mind. I'll share my personal motivation to give you a better idea of what I mean.

## Why I wrote a book

My primary reason for writing *jQuery UI in Action* was to get what I know about jQuery UI down on paper. I would use the term memoir, but I'm not dying, and I'm still working with jQuery UI, so it doesn't fit. But you get the idea.

<p style="float: right; width: 300px; margin: 0 0 1em 1em;">
	<img src="/images/posts/2014-12-29/usage-stats.png" alt="jQuery UI usage statisics" style="max-height: 400px;">
	<br>
	<i>jQuery UI's usage statistics as of December 2014—~15% of the top million sites!</i>
</p>

jQuery UI is no longer hip; it's no longer sexy; but it's an incredibly robust, extensible, well documented, and accessible library that is used in an astounding number of applications—including a number of mine. I've been involved with jQuery and jQuery UI in some fashion for about six years now. I've went from an overenthusiastic user, to a community member, to a contributor, to a team member, to someone that has been fortunate enough to get to know the people behind code. It's a project that I'm proud to say I'm associated with.

jQuery UI has a lot of good 101-level material scattered throughout the web, but nothing that I felt did the library justice. I also felt that I was in a unique position—as a team member and tech writer—to make the guide I wanted to exist a reality.

My desire to share this information is what gave me the motivation to keep going. If I set out to write a 101-level book on jQuery UI I would've lost the desire to write by week three.

To me motivation was everything. There were *many* nights that I had no desire to write but had to find a way to write a few pages. People frequently ask me if I'll write another book, and my answer is that I need a topic compelling enough to spend a year of my life on—something that I want to write about bad enough to put myself through the process again.

I'm sure there is a dollar amount that would give me enough motivation, and who knows, after *jQuery UI in Action* becomes the next *Fifty Shades of Grey* maybe I'll take all of this back.

## Unexpected perks to writing a book

There are some other non-financial benefits to writing a book that I hadn't really thought much of. First of all, getting a book in the mail with your name on it in the mail is a pretty amazing experience.

<p style="float: right; width: 300px; margin: 0 0 1em 1em;">
	<img src="/images/posts/2014-12-29/print-book.jpg" alt="jQuery UI in Action—the physical book" style="max-height: 400px;">
	<br>
	<i>I can't lie, holding a copy of your own book is pretty damn cool.</i>
</p>

An even cooler, and somewhat surreal moment happened when [Amazon sent me an email that recommended my own book to me](https://twitter.com/tjvantoll/status/521996479314296832). It was also cool when I [randomly discovered that *jQuery UI in Action* had four 5-star reviews on its Amazon page](https://twitter.com/tjvantoll/status/536549375670231040)

But the biggest unexpected perk for me was learning to be a better writer. Manning has a lot of really smart editors—people that produce books for a living. Over the last year and a half I've learned about the best way to structure content, how to teach through writing effectively, how to attract a potential reader's interest, and ways to hold a reader's attention.

I've learned a lot about grammar that I'm pretty sure they didn't teach me in high school. I now know what en and em dashes are and how to use them. I know that you can use `Option` + `Shift` + `-` to type an em dash on a Mac. I know what an Oxford comma is and why I don't like people that omit them. I have a stance on open grammar style issues, like whether to capitalize complete sentences after a colon and whether to place spaces around em dashes (nope on both, by the way).

I'm certainly not a grammar expert, and I definitely don't feel like a professional writer, but I'm far more knowledgeable than I was when I started, and that's kind of cool. Even if you're a coder, writing effectively is still an incredibly valuable skill—even if you're just using it to argue for tabs over spaces in a GitHub comment.

## Wrapping Up

I'm not sure I have a concise or coherent way of summing all of this up. I warned you there would be rambling and hopefully I didn't disappoint. If for some reason you enjoyed this you may enjoy [reading *jQuery UI in Action*](http://tjvantoll.com/jquery-ui-in-action.html). If you *have* read and enjoyed *jQuery UI in Action*, I'd love a [review on Amazon](http://www.amazon.com/jQuery-UI-Action-T-VanToll/dp/1617291935/). It's amazing how much seeing a positive review can put a smile on my face. Having gone through the process myself I'm making a concerted effort to leave positive reviews on books I've enjoyed reading—tech books and otherwise.
