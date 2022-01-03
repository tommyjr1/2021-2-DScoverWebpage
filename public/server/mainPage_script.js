$(document).ready(function() {

  // nav toggle
  $(".nav-toggle").click(function() {
    $(".header .nav").slideToggle();
  })
  $(".header .nav a").click(function() {
    if ($(window).width() < 768) {
      $(".header .nav").slideToggle();
    }
  })

  // fixed header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  })
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  var slideIndex = 0;
  showSlides();

  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("work-item");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
  }

  //login Section

  $("#login").click(function() {
    $('.modal-container').css('display', 'inline');
    $('.login-section').css('display', 'inline');
  })
  $(".xBtn").click(function() {
    $('.modal-container').css('display', 'none');
    $('.login-section').css('display', 'none');
  })

  //signup section
  $("#signup").click(function() {
    $('.modal-container').css('display', 'inline');
    $('.signup-section').css('display', 'inline');
  })
  $(".xBtn").click(function() {
    $('.modal-container').css('display', 'none');
    $('.signup-section').css('display', 'none');
  })
      // document.getElementById('board').style.display='inline-block';
        // document.getElementById('board').style.display='inline-block';
})
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
  var username = user.displayName;
  document.getElementById('board').style.display='inline-block'
  document.getElementById('mypage').style.display='inline-block'
  document.getElementById('logout').style.display='inline-block'
  db.collection('users').doc(username).get().then((result)=>{
    console.log(result.data()['manager'])
    if(result.data()['manager']!='X'){
      document.getElementById('manage').style.display='inline-block';
    }
  })
  $('#mypage').click(()=>{
    location.href = 'myPage.html'
  })
  $('#logout').click(()=>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      location.reload();

    }).catch((error) => {
      // An error happened.
    });
  })






} else {
  document.getElementById('recruit').style.display='inline-block'
  document.getElementById('login').style.display='inline-block'
  document.getElementById('signup').style.display='inline-block'
  //login
  $("#loginbutton").click(function(){
    var email = $("#loginemail").val()
    var password = $("#loginpassword").val()

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        location.reload();


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
      db.collection('users').doc(username).set({email: email, password:password, username :username, studentid: studentid,manager: 'X' })
      user.updateProfile({
        displayName: username
      }).then(()=>{
        console.log(user)
        location.reload();
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