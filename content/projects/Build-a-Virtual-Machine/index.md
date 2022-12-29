---
title: "GarbageEater: Simple Virtual Machine"
date: 2021-04-07T22:05:00-05:00
tags: ["Olin College: SP2021 Software Systems in C"]
categories: ["Software Development"]
featured: false
draft: false
readmore: false
---

Little Computer 3 (LC-3) is a reduced instruction set computer (RISC). This means that its architecture uses a limited set of optimized instructions to complete tasks. We implemented a virtual machine (VM) in C that can run compiled LC-3 assembly. Given program code in a compiled OBJ file, the VM can execute the instructions in the file. 

In order to do this, it uses the memory structure defined in the LC-3 specification, including program memory, program registers, and condition flags. It reads and writes to these memory structures and manages I/O through the terminal. Our VM successfully plays game files!

{{< custom-action href="https://github.com/GatiAher/SoftSysGarbageEaters/blob/main/reports/report.md" text="Visit GitHub" icon="brands fa-github">}}
{{< custom-action href="https://trello.com/b/s83l2eWJ/softsys-garbagecollectors" text="Visit Trello" icon="brands fa-trello">}}

<!--more-->