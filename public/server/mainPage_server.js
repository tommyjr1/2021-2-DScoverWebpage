const firebaseConfig = {
    apiKey: "AIzaSyAOQi3EpBaza0qVrFTTx-rBNMWlfjTv5to",
    authDomain: "dscover-3d912.firebaseapp.com",
    projectId: "dscover-3d912",
    storageBucket: "dscover-3d912.appspot.com",
    messagingSenderId: "722420553295",
    appId: "1:722420553295:web:ce829a7660c4d1be157c3a",
        measurementId: "${config.measurementId}"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const db = firebase.firestore();
  const storage = firebase.storage()

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });


