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

//signup
$("#signbutton").click(function(){
  var email = $("#email").val()
  var password = $("#password").val()
  var username = $("#username").val()
  var studentid = $("#studentid").val()


  firebase.auth().createUserWithEmailAndPassword( email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    db.collection('users').add({email: email, password:password, username :username, studentid: studentid})
    user.updateProfile({
      displayName: username
    }).then(()=>{
      console.log(user)
      location.href='../index.html'
    })

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
})


