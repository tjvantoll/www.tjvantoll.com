---
layout: post
title: "I’ll Never Build an Ugly Demo Again"
comments: true
---

As a long-time developer advocate, one constant struggle of mine has been building good-looking demo applications. I have little-to-no design talent, and although I’ve worked with many talented designers over the years, I’ve always been hesitant to “waste” their time on the trivial sample apps I build.

But over the last few weeks I’ve increasingly realized that this will never be a problem for me again because of AI.

For example, last month I wrote a sample app showing [Blues](https://blues.com/) users how to change their [Notecard](https://blues.com/products/notecard/)’s Wi-Fi network using our API. The initial functioning version of that sample looked like this:

<img src="/images/posts/2025-03-05/wifi-before.png" class="plain" />

The initial app was a simple `<form>` that worked, but obviously needed a bit of design before I’d be comfortable sharing it with the world.

Previously, at this point in the process I would’ve reached for a design library like [shadcn](https://ui.shadcn.com/) to help clean up my unstyled HTML. And although tools like that are still useful, I found an even better trick: I asked [GitHub Copilot](https://github.com/features/copilot) to “make this look professional”, and it turned out to look surprisingly decent, first try.

<img src="/images/posts/2025-03-05/wifi-after.png" class="plain" />

The implementation was a little verbose as the AI used a lot of [Tailwind](https://tailwindcss.com/) class names, but I still found the sample easy enough to understand. (The focus of the sample was on using the API anyways.) The full source code is [available on GitHub](https://github.com/tjvantoll/notecard-wifi-management) if you want to check it out for yourself.

Since then I’ve started to use this approach for every small thing I build, on both work and personal projects. For example, I’ve long maintained a [Pokémon GO checklist app](https://github.com/tjvantoll/GOChecklists) that I’ve always thought looked pretty ugly.

<img src="/images/posts/2025-03-05/pokemon-before.png" class="plain" />

To improve the design I again asked Copilot to simply “make this look professional”, and I was once again blown away.

<img src="/images/posts/2025-03-05/pokemon-after.png" class="plain" />

Are there broader societal implications of AI trivializing a task like this? Maybe. But am I ever going to build an ugly demo app again? No, I will not.

And for those curious—I’m using GitHub Copilot with Claude 3.5 Sonnet as a model. In my limited testing [Claude 3.7 in “extended thinking” mode](https://www.anthropic.com/news/claude-3-7-sonnet) produces even-better-looking sites, but it’s very pricey to use on its own and not available in GitHub Copilot quite yet.
