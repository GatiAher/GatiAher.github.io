---
title: "Procedural Graph Generation For More Realistic Simulations"
date: 2021-12-18T23:23:16-05:00
tags: ["Olin College: FA2021 Discrete Mathematics"]
categories: ["Concepts & Theory"]
featured: true
draft: false
readmore: true
covertype: "gslides"
cover: "https://docs.google.com/presentation/d/e/2PACX-1vRoVNJKtW84R-zlSBe9CBJO1PGcZwgc7_wVDoCUYklCmjqXsDLeqK1ipSAd0XweKgvaql3kSxRcF7YA/embed?start=false&loop=false&delayms=3000"
shorttitle: "Generating Realistic Graphs"
shortsummary: "Algorithms and implementations for small-world (local clustering) and scale-free (hubs) graphs"
---

Many real world systems can be modeled with graphs. Most stable and complex graphs have **small-world** (local clustering) and **scale-free** (hubs) properties. In this project, we (1) identified algorithms that generated small-world and scale-free graphs, (2) studied and implemented generation functions for each type of algorithm, (3) created custom animations of graph generation process, and (4) verified that our graphs exhibited the expected structural properties.

{{< custom-action href="https://github.com/GatiAher/network-generation" text="Visit GitHub" icon="brands fa-github">}}

{{< gslides src="https://docs.google.com/presentation/d/e/2PACX-1vRoVNJKtW84R-zlSBe9CBJO1PGcZwgc7_wVDoCUYklCmjqXsDLeqK1ipSAd0XweKgvaql3kSxRcF7YA/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true">}}

<!--more-->

## Reflection

I ran into this topic when I was first researching properties of stable microbial communities. Since microbial communities are real, stable, and complex, researchers expect that their dependency and interaction networks have hub and cluster characteristics. Hubs can indicate the presence of a keystone species and clusters can indicate that several microbes fall into a similar ecological and functional niche. In some papers, researchers simulated microbial community stability with randomly generated graphs, so I wanted to take a closer look at graph generation algorithms.

## Teammate Contributions

My group consisted of Mira, Aydin, and myself. We approached the deep dive by each studying and implementing a graph generation algorithm. We then divided up the remaining coding tasks.

- **Mira:** BA algorithm, animation GIFs
- **Aydin:** WS algorithm, deep dive on ring lattice properties
- **Gati (me):** KE algorithm, structural verifications, network comparison panels

## My Contributions

I proposed the initial focus and scope of the project, found the main paper we used as a resource, and explained small-world and scale-free properties to my teammates. I was responsible for implementing the KE graph generation algorithm and explaining how it worked to my team. Next, I read about checking structural verifications, found the corresponding Networkx functions, and created a panel to display figures and properties to compare generated networks. Finally, I worked on the initial technical slide deck and made the final slide decks based on Professor Sarah and my teammates suggestions.
