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
      document.getElementById('login').style.display = 'none'
      document.getElementById('signup').style.display = 'none'
      document.getElementById('mypage').style.visibility = 'visible'
      document.getElementById('logout').style.visibility = 'visible'
      $('#mypage').click(()=>{
        location.href = 'myPage.html'
      })
      $('#logout').click(()=>{
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          location.href='index.html'

        }).catch((error) => {
          // An error happened.
        });
      })






    } else {
      document.getElementById('mypage').style.display = 'none'
      document.getElementById('logout').style.display = 'none'
      document.getElementById('login').style.visibility = 'visible'
      document.getElementById('signup').style.visibility = 'visible'
      //login
      $("#loginbutton").click(function(){
        var email = $("#loginemail").val()
        var password = $("#loginpassword").val()

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            location.href='index.html'


        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            //TODO: Try Again 말하는 알림창
            console.log(errorMessage)
        });
      })

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
          db.collection('users').doc(username).set({email: email, password:password, username :username, studentid: studentid})
          user.updateProfile({
            displayName: username
          }).then(()=>{
            console.log(user)
            location.href='index.html'
          })

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
      })


    }
  });


