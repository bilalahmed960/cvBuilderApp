#Code can be found in master branch
# Cv Builder App

The app is used for creating and storing multiple resume's. 

## Installation

(Utility ngrok is used that gives valid domain name for 7 hrs which needs to be added in the code.)

-->To install run command:
```bash
npm ngrok -g
```

  --> to run ngrok hit command
```bash
ngrok http (port number)
```
(port number on which app is running. Mine was 3000)  -->to run ngrok

copy and paste the ip created above inside 3 of the files (CreateCv.js, Home.js, Profile.js inside the screens folder in code) variable named Url.


```python

 // add the Ngrok created link to the below Url eg-->
 //const Url="http://9bc4a20e9985.ngrok.io"
 const Url="paste link here"
```

Install server using command in cmd inside server folder of app using command:
```bash
install nodemon -g
```
-->start server
```bash
nodemon app
```

Install  expo using command
```bash
npm install -g expo-cli
```

install expo app on your phone in order to run the app.
once installed hit command:

```bash
npm start android
```
(in cmd from inside the app folder)
 then scan Qr Code and there you go.  




