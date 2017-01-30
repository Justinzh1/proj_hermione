# PROJECT HERMIONE
Hermione is a project developed by the ASUC CTO that analyzes lectures using computer vision technology to transcribe and enhance the learning experience. This repo is for the web portal aspect. It allows professors to create classes and upload videos, while allowing students to view recorded lectures and search for certain topics they are interested in learning more about. 


## Getting Started
To run the portal first install clone the repo and run `npm install` to install the needed modules.

A MongoDB database is used to store user and class information. To configure this I have created a data folder. From inside the data folder run `mongod --dbpath=.` to start MongoDB. 

To start the server I use nodemon to watch and update files as they are changed. Run `nodemon` to start the portal.


## Current Status
This project is currently undergoing development and not all the features are working yet. The current version exists solely to showcase basic functionality. It features a view of the "student view dashboard". We have selected EE16A and CS160, two classes at UC Berkeley, to be featured in this version. Users and Students have been implemented in a previous version; however, they have been disabled in this version for showcase purposes.
