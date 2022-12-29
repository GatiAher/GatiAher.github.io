---
title: "IMU Gesture Recognition"
date: 2022-05-15T14:53:05-04:00
tags: ["Olin College: SP2022 Social Technology Enterprise with Purpose (STEP)"]
categories: ["Data Analysis"]
featured: false
draft: false
readmore: true
---

This project analyzed and prepared a baseline machine learning model to perform gesture recognition on data collected with [MbientLab MMRL IMU](https://mbientlab.com/store/metamotionrl/) rubber-banded to a two_finger ring. The final baseline model was trained with data from sessions 4, 5, and 7 consisting of 1,212 total instances of 4 gestures collected across 27 people. 

When trained with a train-test split of 80:20, the model had an accuracy of 75%. The final model trained with full data (no train-test split) had reasonably robust performance in the real-time system (successfully generalized its gestures predictions to other people when integrated with the software demo app).

This report provides details on deciding on a gesture set, building and refining the gesture data collection process, and steps to integrate the model with the software iOS demo app.

{{< custom-action href="https://github.com/OlinSTEP/signal-processing-gesture-data-collection" text="Visit GitHub" icon="brands fa-github">}}

{{< gslides src="https://docs.google.com/presentation/d/e/2PACX-1vT1MJqD9l2cEu7DgdtxDkJb_aH5ysP1NklfoNUuvb3sVjp9z3MezS0HFBOv-fLhV7ESwZks_xU1Z-wQ/embed?start=false&loop=true&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true">}}


<!--more-->

{{< table_of_contents >}}

## Baseline Model

A simple baseline model was used to verify the general robustness of the gesture set and performance of the model. This baseline was comprised of sklearn's standard scalar, Principal Component Analysis (PCA) with the maximum number of components, and a Support Vector Classifier (SVC). 

This model was intentionally kept very simple in order to serve as a comparison baseline and use initial prototyping time to build out the data collection and software integration infrastructure.

```python
# very simple baseline model
# x_train and x_test are arrays of sample_number by 300 (100 time-points of each x, y, and z accelerations)
# y_train and y_test are a lists of true gesture labels 
clf = make_pipeline(StandardScaler(), PCA(n_components=n_pc), SVC())
clf.fit(x_train, y_train)
pred_test = clf.predict(x_test)
acc = accuracy_score(y_test, pred_test)
```

### Principal Component Analysis (PCA)

{{< figure 
src="img/pca_session_4_and_5_and_7.png" 
caption="PCA plot: each point is a train-set gesture colored by gesture number as projected onto the first two PCA axes (directions of most and second-most variance in the data set)."
>}} 

Gesture Numbers:
* 1: flick
* 2: downward tap
* 3: counter clockwise circle
* 4: swipe right)

PCA, the first part of the baseline model, finds a multi-dimensional feature space defined by directions of most variance within the data. It is commonly used as dimensionality-reduction and signal-cleaning measure before applying machine learning. In this case, each gesture is x, y, and z accelerations taken over 100 time-points, for 300 points in total. Some of these points contain redundant (i.e. correlated) information, so PCA summarizes the redundant information and essentially creates an easier signal to learn. [(Read more about PCA)](https://gatiaher.github.io/projects/facial-recognition-using-principal-component-analysis/).

### Support Vector Classifier (SVC)

SVC, the second part of the baseline model, takes the data as projected onto the PCA feature space and learns a line to best separate the classes. If the PCA separates the points well, the SVC has an easier time.

{{< figure 
src="img/confusion_matrix_session_4_and_5_and_7.png" 
caption="Confusion Matrix shows model performance on the test-set. The diagonal counts data points that were correctly predicted (i.e. true label == predicted label). This model was 75% accurate."
>}} 

Confusion (incorrect predictions) occurred most frequently between gesture 1 (flick) and the other gestures, with most confusion happening when the model predicted gesture 1 (flick) when the true label was gesture 2 (downwards tap) (21 instances).

Confusion over the flick gesture was expected, as based on user feedback over the course of data collection sessions 4, 5, and 7, the flick gesture was gradually altered to become more comfortable.

## Gesture Set Creation Process

### Meta-Data Spreadsheets:
* Session 1, 2, 3, 4: [Gati - exploratory data collection trials](https://docs.google.com/spreadsheets/d/1KgfBDTNwSJSkqkBWl58ZlKFpmN-8T7DxcsZyOiCF7l0/edit#gid=0)
* Session 5: [Big-2-Finger-Ring-Dataset: Internal Use - Gati & Jerry](https://docs.google.com/spreadsheets/d/1Vl-UpshacoG6l6ha3ogqCW6fWm9wacj1TBtei_HN2yo/edit#gid=1745147814)
* Session 6, 7: [Yellow Prompts Data Collection -- STEP & Olin Subjects](https://docs.google.com/spreadsheets/d/1WjEH-O8SLWliBAOO7MYLe_ogYH4gCEWHYkiBPFWLnXo/edit#gid=1124057491)

### Session 1 and Session 2 (March 30): Trouble-Shooting Process**
* *Gesture Collection App - v1:* had to tap on screen to record start and ends of gestures, a separate python script on laptop randomly shuffled gesture order and prompted subject to perform gestures. Prompt "make gesture" window of 6 seconds
* *Gesture Set - v1:* 14 gestures, included swipes, circles, V/checkmark motions, taps
* *Trials:* 
  * session 1: 5 trials of 14 gestures each, collected on 1 subject (Gati)
  * session 2: 9 trials of 14 gestures each, collected on 1 subject (Gati)

#### Findings / Process Iterations:
* Assume user's hand always returns to neutral after finishing gesture
  * Otherwise hand flies away (ex: do 10 right swipes without returning to neutral/starting position)
  * Record gesture and return to neutral position as full gesture signal
* Gestures must be more creative than just swipe up, swipe down, swipe left, swipe right
  * In swipes, return motion can be confused for a different gesture (ex: do double swipe up, then do double swipe down. Notice that they are the same acceleration patterns)
* Gave subject 6 seconds to perform gesture, but that feels very long. Shorten gesture window to collect more gestures and value subjects' time 
* Ask someone (Jerry) to work on redesigning app - it is hard to consistently tap with one hand and gesture with other

### Session 3 (March 30): Successful Data Collection
* *Gesture Collection App - v1*
* *Gesture Set - v1:* 14 gestures, give subject 6 seconds to perform a gesture to not risk cutting off a gesture
* *Trials:* 9 trials of 14 gestures each, collected on 1 subject (Gati) at 9 different hand orientations (90 deg -- face level to -90 deg -- below chair) to create extra noise

#### Findings / Process Iterations:
* downloaded json's stored in firebase: tricky because json names are random strings and hard to easily match them to the meta data. Using time-stamps for now, but one accidentally recorded trial could mess everything up?
* jupyter notebook `session_3/explore_data_session_3.ipynb` has code for loading, processing, and analyzing the data
* Sample rate is 0.1 ms (100 time points in 1 second)
* Window size is typically under 2 seconds long (as recorded from taps to mark beginning and end of gesture)
* Note: some taps were awkwardly long because (a) subject forgot to tap, or (b) subject forgot to return hand back to position. Not a perfect intuitive data collection system yet.
* It was more common to remember the start tap and forget the end tap

{{< figure 
src="img/tap_diff_determine_window_histogram.png" 
caption="Histogram of seconds (x-axis) between start and end tap vs. occurance count (y-axis)"
>}}

{{< figure 
src="img/session_3_traces.png" 
caption="Plot of all gesture 1 (swipe left) instances in train-set (x-acceleration only, trace of window 200 ms after starting tap)"
>}}

#### Process to Evaluate Best Gesture Set

* Train data: 6 of 9 trials
* Test data: 3 of 9 trials (trials 1, 4, and 5 -- randomly chosen (note that test and train data are from different trials, so the test gestures were performed at a different hand orientation from the train gestures. This is a way of checking for gesture robustness)
* Data: 600 time points, 200 from each of x, y, and z acceleration
* Accuracy on model trained and tested on all 14 gestures was very poor (10-20% accuracy).
* Did gesture set robustness determination by training and testing a different model on each of the 14 choose 4 = 1001 combinations of 4 gestures (so trained on 24 gestures, tested on 12)
  * 11 models got an accuracy of 83%
  * Of these 11 models, counted the occurrences of specific gestures in their gesture sets

{{< figure 
src="img/session_3_good_gestures.png" 
caption="Table of combinations of gestures with accuracy higher than 80%* a gesture set comprising of 2 (swipe right), 4 (tap), 6 (counter clock-wise circle), and 9 (poke) was determined to be the most robustly differentiable."
>}}

{{< figure 
src="img/session_3_good_gestures_histogram.png" 
caption="Histogram of gesture number (x-axis) vs. occurrence count in the 11 good models (y-axis)"
>}}

The most robustly differentiable gesture set is:
* 2 (swipe right)
* 4 (downward swipe) -- aka "downward tap", as if typing on a laptop keyboard
* 6 (counter-clockwise circle starting from the bottom)
* 9 (forward tap) -- aka "poke", as if pressing a elevator button

Swipe right, downward swipe, and forward tap all have acceleration and return movement most strongly around a distinct axis (x, y, and z-axis). Counter-clockwise circle starting from the bottom has a distinct pattern of multiple acceleration directions and those directions are opposite to the movements in the other gestures (i.e. it starts with an upward movement whereas downward swipe is going down at that time point). Thus, even with common-sense reasoning this gesture set seems to make sense.

### Session 4 (April 2) Successful Data Collection -- 1st Big Data Set -- 1 Subject (Gati)

* *Gesture Collection App - v1* 
* *Gesture Set - v1:* 4 gestures, give subject 3 seconds to perform a gesture
* *Trials:* 15 trials of 4 gestures each repeated 10 times (40 gestures per trial), collected on 1 subject (Gati) at 6 different hand orientations (90 deg -- face level to -90 deg -- below chair) to create extra noise
* Also attempted 4 times to collect data while walking, but app kept stopping mid-way through trial + hard to see gesture prompts when walking around

#### Findings / Process Iterations:
* jupyter notebook `session_4/explore_data_session_4.ipynb` has code for loading, processing, and analyzing the data
* taps were messy (expected 80 start and end taps, got 78, 79, etc.)
  * Decided to write code to detect start of gestures
    * Find when acceleration in x, y, or z crosses threshold of `0.4`. This is a peak indicating that an intentional movement has been started. 
    * Extract window `25 time points before peak`. This is the detected start.
    * Extract window `75 time points after peak`. This is the detected end.
    * Have windows of 100 time points (shorter window to get even closer to the active gesture period)

{{< figure 
src="img/session_4_traces_g2.png" 
caption="Plot of all gesture 2 (swipe right) instances in train-set (x-acceleration only, trace of window 200 ms after starting tap)"
>}}

{{< figure 
src="img/session_4_traces_g4.png" 
caption="Plot of all gesture 4 (swipe left) instances in train-set (x-acceleration only, trace of window 200 ms after starting tap)"
>}}

{{< figure 
src="img/session_4_traces_g6.png" 
caption="Plot of all gesture 6 (counter-clockwise circle starting from the bottom) instances in train-set (x-acceleration only, trace of window 200 ms after starting tap)"
>}}

{{< figure 
src="img/session_4_traces_g9.png" 
caption="Plot of all gesture 9 (tap forward) instances in train-set (x-acceleration only, trace of window 200 ms after starting tap)"
>}}

#### Model Performance
* Train data: 12 of 15 trials
* Test data: 3 of 15 trials (cross validation, hold out all combinations of 3 test trials. Note that test and train data are from different trials, so the test gestures were performed at a different hand orientation from the train gestures. This is a way of checking for gesture robustness)
* Data: 300 time points, 100 from each of x, y, and z acceleration
* Accuracy was good enough for a baseline model

{{< figure 
src="img/session_4_cross_validation_accuracy.png" 
caption="session 4 cross validation accuracy"
>}}

Model tends to have accuracy greater than 50% (4 gestures random chance guessing is 25%). Note that this test of accuracy is harder than normal trials would be because each trial is at a different hand orientation (some of which are very extreme and unrealistic). So the model learning this pattern is a good sign of gesture robustness.
 
### Session 5 (April 5) Successful Data Collection -- 2nd Big Data Set -- 16 subjects (STEP students)

* *Gesture Collection App - v2:* random order gesture prompts incorporated into the app. Start and end of window recorded by app (no need for start and end mark taps). Ability to name trials in the app (aid mapping to metadata file)
  * App prompts users to
    * STUDY prompt (2 seconds)
    * MAKE gesture (3 seconds)
    * STOP gesture (2 seconds)
* *Gesture Set - v2:* 4 gestures, give subject 3 seconds to perform a gesture
* *Trials:* 55 total trials of 4 gestures each repeated 3 times (12 gestures per trial), collected on 26 subjects (STEP students) at 3 different realistic trial conditions
  * A. comfortable hand is supported (least noisy)
  * B. comfortable but hand is not supported (little noisy)
  * C. discrete / hidden gesture (most noisy, lets see what people do)

#### Findings / Process Iterations:
* jupyter notebook `session_5/explore_data_session_5.ipynb` has code for loading, processing, and analyzing the data
* Lots of people did a false start during the STUDY prompt, had to manually inspect and remove 20 trials because the peak-based windowing code does not work if there are 2 gestures within a gesture window period (kept 35 trials)
* People have very different ideas of how to be sneaky. Tends to be either small motion in plain sight, or regular motion but with hand hidden in lap or under table.
* PEOPLE DO NOT LIKE FORWARD TAP! They do not want to move on the z-axis (forward) when all other gestures are in the same x-y plane
  * People more open to the idea of a "flick" motion 

{{< figure 
src="img/session_5_good_trial.png" 
caption="Example of good trial: no false starts. Orange dots mark the start timestamp of the MAKE prompt, purple dots mark the detected start (-25 from the first threshold crossing) timestamp. Starts plotted separately for clarity and ease of manual review."
>}}

{{< figure 
src="img/session_5_bad_trial.png" 
caption="Example of trial with false starts: many false starts. False starts ruin the gesture windowing process."
>}}

Model tended to have decent accuracy (around 70%+) on the cross validation accuracy tests (same manner as session 4)

{{< figure 
src="img/session_4_cross_validation_accuracy.png" 
caption="session 4 cross validation accuracy"
>}}

The reasonably high model accuracy is a very good sign because in some of the cross validation instances, the test set gestures came from different people/trial conditions than the train set gestures and the model still generalized well.

### Demo Day 1 (April 7)

* The demo day model consisted of gestures from session 4 and session 5
* The app detected the starts and windowed the (-25 before the peak, +75 after the peak) IMU data 
* A flask web service running the model responded to HTTP requests made from the app with model predictions
  * The "flick" motion is frequently classified as "forward tap" so they are interchangeable. Henceforth, "flick" replaced forward tap.

### Unfortunate Timing (April 10 - April 23)
* Gati had 6 hour play rehearsals or performances *every day* for 2 weeks and did not have time to collect data

### Session 6 (April 25) Trouble-Shooting Process

* *Gesture Collection App - v3:* 
  * Redesign of App to lessen false starts by having prompts only for
    * MAKE gesture (3 seconds)
    * STOP gesture (2 seconds) + black out to indicate that user should stop making the gesture
  * Clean up visual layout of the app
  * Try to make trial shorter whenever possible -- reduce amount of time to name trial in order to start trial quicker
  * Chime sound when data is successfully uploaded to firebase

#### Findings / Process Iterations:
* When cleaning-up visual layout of the app, the print outs of IMU accelerations were removed. Unfortunately, while ugly, those very necessary -- they give the data collecting person an idea of whether the App and IMU are connected. Very anxiety inducing to collect data without knowing if it was being recorded. Asked for the print-outs to come back.
* Not enough time to enter trial name (was asking for people to give Olin username as a unique ID). Could not actually collect trials reasonably.
* Did have conversations/surveyed people about activation gestures. People tended to like the twist gesture for activation
  *  Twist gesture is easily detectable (180 flip in hand/ring orientation and then 180 back)
  *  But was eliminated initially from the machine learning gesture recognition because a twist is performed differently on right vs. left hand and controlling for that would be a hassle (training separate models for rings on left vs. right hands, an extra configuration setting)
  *  But great as a wake up gesture! Making a note here, but wake-up gesture would be a software demo app implementation task, not a signal-processing machine learning task,

### Session 7 (April 27-28) Successful Data Collection -- 3rd Big Data Set -- 16 subjects (Olin / Prospective students)

* *Gesture Collection App - v4:* fixed major issues in app, now decently workable
* *Gesture Set - v3:* 4 gestures ("flick" replaced "forward tap"), give subject 3 seconds to perform a gesture
* *Trials:* 36 total trials of 4 gestures each repeated 3 times (12 gestures per trial), collected on 13 subjects (mainly Olin and prospective students at SLAC event) at 2 different realistic trial conditions
  * A. comfortable
  * B. discrete gesture: strange orientation, either with arm at side or arms crossed

#### Findings / Process Iterations:
* Documented proper way to do gestures in a [slideshow](https://docs.google.com/presentation/d/16hITbMB7vJ_tKl1JPVFF_6W_iE291YWYdGt78I2dObw/edit?usp=sharing). People don't like reading text, but the pictures were helpful to point at when explaining gestures to people
* Most people are fine with twist as a wake-up gesture

### Demo Day 2 (May 2) Successful ML-Model Integration

* The demo day model consisted of gestures from session 4, session 5, and session 7
  * final model: `demo_day/pca_svm_full_model_session_4_and_5_and_7.pkl`, accuracy roughly 75%
  * most common error mode: "flick" vs. "downward tap"
* The app detected the starts and windowed the (-25 before the peak, +75 after the peak) IMU data 
* A flask web service running the model responded to HTTP requests made from the app with model predictions

## Next Steps

### Model

Failure Mode 1: confusion between "flick" vs. "downward tap"
* Potential Solution: incorporate orientation information from the IMU gyroscope sensor
* Can probably express quaternians in terms of relative change in respect to the first quaternian of the detected gesture
  * Orientation respective to gravity DOES NOT MATTER -- people want to do gestures at strange orientations (at side, in pockets, in bed)
* Should talk to Paul Ruvolo about future work on this

Failure Mode 2: inherent time problems with time-based signal (i.e. if you do the gesture too slowly, if you speed up and slow down at different points than people in the train set)
* Potential Solution: CNN + DTW
  * Convolutional Neural Network (CNN): pools values so that is signal is shifted it still registers as roughly the same signal
  * Dynamic Time Warping (DTW): learns pattern of matching time signals to a template, warps signal to match template   
* Both of these are deep learning techniques that require far more data to learn effectively

### Data Collection

* The data collection pipeline is now solid!
* Maybe more work can be done for effectively isolating and discarding individual gestures (instead of tossing the entire trial)
* The bottle neck in data collection is teaching people the gestures (always takes ~3 minutes) and then people only have about 2 minutes of patience left to actually collect data
* Collecting data in the last month of school was a mistake (too many things happening, people are too busy, nobody has time to really give you more than 2 minutes of time)

### Software Integration

* Twist as a wake up gesture
* Running model inside Swift iOS app (compared to external Flask Service)