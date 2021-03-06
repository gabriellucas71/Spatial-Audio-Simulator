Spatial Audio Simulator
=======================


A HTML5 application that simulates how audio spatialisation influences in human hearing.
------------------------------------------------------------


The Spatial Audio Simulator implements a virtualization of the effects that a movement in a audio source position or its orientation influences in human hearing.
In difference to a physical experimentation, the Spatial Audio Simulator is a very intuitive application and doesn’t need advanced setup and/or knowledge in audio spatialisation to be executed. **The use of stereo headphones is recommended.**

For more details about audio spatialisation, please check: 

* [Web audio API spatialisation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics "Title") 

**Please, use it with Mozilla Firefox or Chrome.**

Elements:
--------

* Green arrow: Simulates the listener. Please note that the arrow has a nose-like orientation.

* 4 Audio Sources: Simulates audio sources around a listener. Clicking on each one of them will start a sample oscillator noise. Please note that the outer cave is pointing to the front orientation.

* Demonstration button: Starts an animated demonstration.


How does it works:
--------


* **Dragging:** Click and drag objects in the screen to your wanted position relative to the listener or drag the listener itself. The application computes how far or closer a audio source is from the listener and reproduces the spatialisation effect in the headphones. 


* **Rotate:** In order to simulate the listener orientation of your choice, you are able to click on it and set the front orientation manually. Note that, as in real life, inverting the orientation can change the volume.  



* **Demo function:** The demo function starts all 4 oscillator noises and automatically drags the listener around them, in key comparison positions and orientations.



Application Overview
--------

![alt text][id]

[id]: /docs/Overview1.png "Title"







WebAudio Api scheme
--------


![alt text][id2]

[id2]: /docs/Webaudio.png "Title"











© Gabriel Araujo B.Sc. Technische Universität Berlin, Germany. 06/2016 All Rights Reserved.