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




db.collection('feeds').get().then((result)=>{
  result.forEach((doc)=>{
    console.log(doc.data())
  })
})
// var userid = 'test2'
// var password='test2'
// db.collection('users').add({userid: userid, password:password })



$("#send").click(function(){
  var file= document.querySelector("#image").files[0]
  var storageRef = storage.ref()
  var saveLoc = storageRef.child('image/'+file.name)
  var upload = saveLoc.put(file)

  upload.on('state_changed',
    //변화 시 동작
    null,
    //에러시 동작
    (error)=>{
      console.error=('reason', error)
    },
    //성공 시
    ()=>{
      upload.snapshot.ref.getDownloadURL().then((url)=>{
        console.log('업로드된 경로는', url)
      })
    }
  )
})


