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

  
//login
$("#loginbutton").click(function(){
    var email = $("#email").val()
    var password = $("#password").val()

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        location.href='../index.html'

    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        //TODO: Try Again 말하는 알림창
    });
})