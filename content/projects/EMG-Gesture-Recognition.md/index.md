---
title: "EMG Gesture Recognition"
date: 2021-05-10T21:39:39-05:00
tags: ["Olin College: SP2021 Neurotechnology: Brains and Machines"]
categories: ["Data Analysis"]
featured: false
draft: false
readmore: false
---

This project followed the topological data analysis steps laid out in [Phinyomark et al (2017) "Navigating features: a topologically informed chart of electromyographic features space"](http://doi.org/10.1098/rsif.2017.0734) to analyze 43 features extracted from surface EMG signals of three gestures (rock, paper, scissors) performed by a single subject.

I used sklearn's topological data analysis tools with the Kepler Mapper and Ward's minimum variance method as the criterion for hierarchial clustering in order to analyze feature redundancy. Comparison of feature class separability was analyzed by calculating Davies-Bouldin index (DBI) and Fisher's linear discriminant index (FLDI), and measuring misclassification rates. 5-fold cross validation Linear Discriminant Analysis and Support Vector Machine were employed as classifiers.

{{< custom-action href="https://github.com/GatiAher/EMG_Gesture_Recognition" text="Visit GitHub" icon="brands fa-github">}}

<!--more-->
