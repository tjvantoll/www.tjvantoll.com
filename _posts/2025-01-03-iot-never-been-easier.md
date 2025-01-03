---
layout: post
title: "It’s Never Been Easier to Start in IoT—Because of AI"
comments: true
---

IoT development is super hard. I know this first hand as a long-time web developer that started at [Blues](https://blues.com/) 3+ years ago, and suddenly found myself needing to learn a bit of electrical engineering, how to read a hardware datasheet, and the basics of memory management in C.

It was overwhelming.

And I’m not going to lie—it still is today. Building physical things is hard, and most companies that do it at scale have people that specialize in each niche task required to bring a product to life.

But I’d argue starting in IoT today is significantly easier because of one main factor: AI.

## How AI helps new IoT developers

When I need help with a topic in the web development world I can usually find it from a quick Google search. Platforms like GitHub and Stack Overflow have served the software world for decades, and have proved invaluable for me as I’ve learned tools like jQuery and React over the years.

But while these sort of resources exist in the IoT world, they’re both significantly less common (there are way fewer IoT developers), and significantly more fragmented.

If you’re building a new web application today, you’re using a standard set of technologies (HTML, CSS, JavaScript/TypeScript), and then likely one of a handful frameworks one top of the core tech (React, Vue, Angular, etc).

If you’re building a new IoT project today, you have thousands of potential boards you might use, thousand of potential sensors and peripherals you might leverage, multiple operating systems that may run on your boards, and multiple programming languages that can run your firmware. While this choice can be powerful, it can quickly overwhelm new users that just want to know “the right way” to start a new project, and get help when things inevitably go wrong.

This is where AI comes in. Modern AI-powered chatbots have no issue dealing with fragmentation and complexity, and know about every board, OS, and language ever created.

Personally, I’ve found that AI-based answers for IoT questions are not only good, but strangely good—aka higher quality than comparable questions I ask for general software development. And I have a theory for why: hardware companies in the IoT world have a practice of publishing extremely high-quality guides to the boards, sensors, and components they make. [Peruse](https://ww1.microchip.com/downloads/en/Appnotes/90001416a.pdf) [through](https://www.ti.com/lit/an/slvaft2a/slvaft2a.pdf?ts=1735848085868) [some](https://www.silabs.com/documents/login/application-notes/an1290-rs9116w-firmware-update-application-note.pdf) [of](https://sixfab.com/wp-content/uploads/2021/02/Telit_LE910Cx-PSM-Application-Note_r0.pdf) [these](https://www.nxp.com/docs/en/application-note/AN13247.pdf) to see what I mean.

<img alt="Listing of Microchip's help documents" src="/images/posts/2025-01-03/datasheet-listing.png" class="plain">
_Microchip’s document listing showing the 50,000+ docs they make available_

All of these guides make for perfect input for modern AI models to leverage.

## My experience

Doing IoT work is hard because it encompasses so many different skillsets: electrical engineering, hardware design, firmware development, and so on.

Where I’ve personally found AI to be most transformational is with individuals that are already experts at one of these skills, but lack the full skillset to build a real project—for instance an electrical engineer that doesn’t know anything about firmware, or a C developer that knows nothing about hardware.

I’m a perfect example of this. On a recent [Home CO2 Monitor](https://www.hackster.io/tjvantoll/monitoring-home-co2-levels-with-lorawan-0b53a3) I built I had no trouble putting together a quick [web dashboard](https://co2-home-monitor.netlify.app/) because that’s my bread and butter—it was fun actually. But when it came to selecting hardware components, wiring everything together, writing power-efficient firmware, writing C code that doesn’t leak memory, and making an outdoor device that could run off solar power—I needed help. And while what I ended up building isn’t going to win any awards, and isn’t cost- or power-efficient enough to be a product I could sell—it works, and I was able to build it.

And that’s my hope for AI in the IoT world. So many people are intimidated by the idea of building a physical project that they never even attempt it, or they do attempt it, fail, and give up on ever trying again. If this is you and it’s been a few years, I’d encourage you to give it another go now that you can use an AI-powered chatbot as your sidekick. You might be amazed at what you can do.
