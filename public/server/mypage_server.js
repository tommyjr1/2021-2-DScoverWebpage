$(document).ready(function(){
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

function myFeed(data) {
  var listContainer = document.querySelector("#nav-card")
  if (listContainer != null) {

    var addFeed = document.createElement('div')
    addFeed.className = 'card'

    var cardheader = document.createElement('div')
    cardheader.className = 'card-header'

    var deleteBtn = document.createElement('button')
    deleteBtn.className = 'xBtn'

    var times = document.createElement('i')
    times.className = 'fa fa-times'

    deleteBtn.appendChild(times)
    cardheader.appendChild(deleteBtn)

    var cardbody = document.createElement('div')
    cardbody.className = 'card-body'

    var title = document.createElement('h5')
    title.className = 'card-title'
    title.innerText = data['title']

    var date = document.createElement('h6')
    date.className = 'card-subtitle mb-2 text-muted'
    date.innerText = data['last_update'].toDate().toDateString()

    var context = document.createElement('p')
    context.className = 'card-text'
    context.innerText = data['context']

    var link = document.createElement('p')
    link.className = 'card-link'
    link.href = data['fileurl']

    cardheader.appendChild(title)
    cardbody.appendChild(date)
    cardbody.appendChild(context)
    cardbody.appendChild(link)
    addFeed.appendChild(cardheader)
    addFeed.appendChild(cardbody)
    listContainer.appendChild(addFeed)
  }
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        document.getElementById('board').style.display='inline-block'
        document.getElementById('manage').style.display='inline-block'
        document.getElementById('mypage').style.display='inline-block'
        document.getElementById('logout').style.display='inline-block'
        $('#logout').click(()=>{
            firebase.auth().signOut().then(() => {
            // Sign-out successful.
            location.href='index.html'

            }).catch((error) => {
            // An error happened.
            });
        })
        var uid = user.uid;
        var name = user.displayName
        console.log('Name is ', name)
        db.collection('feeds').where('writer','==',name).orderBy('last_update', 'desc').get().then((results)=>{
            results.forEach((docs)=>{
                myFeed(docs.data())

                var triggerTabList = [].slice.call(document.querySelectorAll('#nav-card .card'))
                triggerTabList.forEach(function (triggerEl) {
                    console.log(triggerEl)
                    triggerEl.addEventListener('click', function (event) {
                        event.preventDefault()

                        title = triggerEl.querySelector(".card-title").innerText
                        db.collection('feeds').doc(title).delete()
                        location.reload()
                    })
                })
            })
        })

        db.collection('users').where('username','==',name).get().then((results)=>{
            results.forEach((docs)=>{

                document.querySelector('#username').innerText = name
                document.querySelector('#email').innerText = user.email
                document.querySelector('#manager').innerText = docs.data()['manager']
                document.querySelector('#password').setAttribute('value',docs.data()['password'])
                document.querySelector('#studentid').setAttribute('value',docs.data()['studentid'])
                if(docs.data()['department']){
                    document.querySelector('#department').setAttribute('value',docs.data()['department'])
                }
                if(docs.data()['year']){
                    document.querySelector('#year').setAttribute('value',docs.data()['year'])
                }
                // console.log($('#studentid').val())

            })
        })

        $('#editprofile').click(()=>{
            passwordv = $('#studentid').val()
            studentidv = $('#studentid').val()
            departmentv = $('#department').val()
            yearv = $('#year').val()

            db.collection('users').doc(name).update({
                password: passwordv,
                studentid: studentidv,
                department: departmentv,
                year:yearv
            })

            // console.log('updated')
            alert("updated");
        })





    } else {
        // User is signed out
        location.href='index.html'
    }
})
