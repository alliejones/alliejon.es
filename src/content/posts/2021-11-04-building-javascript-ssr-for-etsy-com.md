---
title: Building Javascript SSR for Etsy.com
date: 2021-11-04T12:00:00-04:00
featured: true
---

In 2021 I architected and then tech led the implementation of Etsy's server-side rendered Javascript infrastructure. We used [Preact](https://preactjs.com/) and the [islands architecture](https://jasonformat.com/islands-architecture/), which let us create a smooth developer experience without sacrificing our frontend performance.

![A diagram showing a wireframe webpage, with arrows indicating some areas are statically server-rendered and others are client-hydrates interactive component islands](../../assets/component-islands.webp)

[I wrote about it in detail on the Etsy Engineering blog Code as Craft.](https://www.etsy.com/codeascraft/mobius-adopting-jsx-while-prioritizing-user-experience)
