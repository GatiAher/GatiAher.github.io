---
title: "Deep Dive Into Huffman Coding"
date: 2021-10-25T00:46:56-05:00
tags: ["Olin College: FA2021 Discrete Mathematics"]
categories: ["Concepts & Theory"]
featured: false
draft: false
readmore: true
---

Huffman coding is a variation on prefix codes that optimize lossless data compression. In this deep dive, we (1) introduced how Huffman Codes work, (2) explored the theoretical limits of Huffman compression, (3) analyzed resilience to error, and (4) followed the evolution of research on using choice of Huffman tables to encode secret messages in MP3 files.

{{< gpdf src="https://drive.google.com/file/d/1qZT_iiq8OeSeb5d5wkv4Jp9Ie-83-cm0/preview" width="640" height="480" allow="autoplay">}}

<!--more-->

{{< table_of_contents >}}

## Teammate Contributions

My group consisted of Ducan, Alex, Robin, and myself. We approached the deep dive by each researching an aspect of Huffman codes usage. We did preliminary research and final proofreading together. We also explained findings to each other during our weekly group meeting.

* **Robin:** Part 1 - Introduction to Huffman Coding
* **Duncan:** Part 2 - How far can Huffman compression go?
* **Alex:** Part 3 - Error Correction and Resilience:  What resilience do HuffmanCodes have to errors?
* **Gati (me):** Part 4 - MP3 Stenography:  How are Huffman tables used to communicate secret messages?

## My Contributions

I put in a total of 15 hours to research the usage of Huffman codes. Originally, I was also looking more broadly into patterns and qualities that could be inferred from the statistical distributions of the choice of MP3 Huffman table, but I decided to focus the writeup on stenography because that was the usage I was most interested in diving deeper into. I created the figures used in my section in order to fully explore the patterns and choices made by each proposed scheme. I also learned how the Huffman compression worked with the other compression techniques used to make MP3. Overall, this topic was fun to read about and discuss!
