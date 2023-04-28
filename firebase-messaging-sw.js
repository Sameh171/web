importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
   apiKey: "AIzaSyDogK9WUvJL5bdRJf3JZcXCY0b15mdRH8k",
    authDomain: "mazloum-agri.firebaseapp.com",
    projectId: "mazloum-agri",
    storageBucket: "mazloum-agri.appspot.com",
    messagingSenderId: "865521805197",
    appId: "1:865521805197:web:d64b87d87c3342fed7ffc4"
  databaseURL: "...",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});