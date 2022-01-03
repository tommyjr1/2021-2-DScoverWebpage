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

function maketable(data) {
  var table = document.querySelector('#memberTable')
  var tr = document.createElement('tr')

  var name = document.createElement('td')
  name.innerText = data['username']
  var Department = document.createElement('td')
  Department.innerText = data['department']
  var StudentID = document.createElement('td')
  StudentID.innerText = data['studentid']
  var Year = document.createElement('td')
  Year.innerText = data['year']
  var Manager = document.createElement('td')

  var select = document.createElement('select')
  select.className = 'form-select'
  select.setAttribute('aria-label', 'Default select example')

  var op1 = document.createElement('option')
  op1.innerText = 'X'
  op1.setAttribute('value', 'false')
  var op2 = document.createElement('option')
  op2.innerText = '운영채널'
  op2.setAttribute('value', '운영채널')

  var op3 = document.createElement('option')
  op3.innerText = '회계채널'
  op3.setAttribute('value', '회계채널')

  var op4 = document.createElement('option')
  op4.innerText = '학습채널'
  op4.setAttribute('value', '학습채널')

  var op5 = document.createElement('option')
  op5.innerText = '홍보채널'
  op5.setAttribute('value', '홍보채널')




  select.appendChild(op1)
  select.appendChild(op2)
  select.appendChild(op3)
  select.appendChild(op4)
  select.appendChild(op5)

  Manager.appendChild(select)

  if (data['manager'] == '운영채널') {
    op2.setAttribute('selected', 'selected')
  } else if (data['manager'] == '회계채널') {
    op3.setAttribute('selected', 'selected')
  } else if (data['manager'] == '학습채널') {
    op4.setAttribute('selected', 'selected')
  } else if (data['manager'] == '홍보채널') {
    op5.setAttribute('selected', 'selected')
  } else {
    op1.setAttribute('selected', 'selected')
  }

  tr.appendChild(name)
  tr.appendChild(Department)
  tr.appendChild(StudentID)
  tr.appendChild(Year)
  tr.appendChild(Manager)

  table.appendChild(tr)

}

db.collection('users').get().then((results) => {
  results.forEach((docs) => {
    maketable(docs.data())
  })
  $('#managerSaveBtn').click(() => {
    var table = document.getElementById('memberTable')
    var trs = table.getElementsByTagName('tr')

    for (let i = 0; i < trs.length; i++) {
      var username = trs[i].children[0].innerText
      var sel = trs[i].children[4].children[0]
      var chgManage = sel.options[sel.selectedIndex].text

      db.collection('users').doc(username).update({
        manager: chgManage
      })

    }

    alert('updated')
  })
})


function makeFeed(data) {
  var listContainer = document.querySelector("#myTab")
  if (listContainer != null) {
    var addFeed = document.createElement('a')
    addFeed.className = "list-group-item list-group-item-action"
    addFeed.href = "#"
    addFeed.setAttribute('data-bs-toggle', "list")
    addFeed.setAttribute('role', "tab")

    var feedTitleDiv = document.createElement('div')
    feedTitleDiv.className = "d-flex w-100 justify-content-between"

    var feedTitle = document.createElement('h5')
    feedTitle.className = "mb-1"
    feedTitle.innerText = data['title']

    feedTitleDiv.appendChild(feedTitle)

    var feedDate = document.createElement('small')
    feedDate.className = "text-muted"
    feedDate.innerHTML = data['last_update'].toDate().toDateString()
    feedTitleDiv.appendChild(feedDate)

    addFeed.appendChild(feedTitleDiv)

    var feedContext = document.createElement('p')
    feedContext.className = "mb-1"
    feedContext.innerHTML = data['context']
    addFeed.appendChild(feedContext)


    var feedWriter = document.createElement('small')
    feedWriter.className = "text-muted"
    feedWriter.innerHTML = data['writer']
    addFeed.appendChild(feedWriter)

    listContainer.appendChild(addFeed)
  }
}


db.collection('feeds').orderBy('last_update', 'desc').get().then((results) => {
  results.forEach(docs => {
    makeFeed(docs.data())
  });
  var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
  triggerTabList.forEach(function(triggerEl) {
    triggerEl.addEventListener('click', function(event) {
      event.preventDefault()
      title = triggerEl.querySelector("div h5").innerText
      $('#myToast').toast('show')

      $('#delPostBtn').click(() => {
        db.collection('feeds').doc(title).get().then((result)=>{
          if (result.data()['filename']!=''){
            var filename = result.data()['filename']
            console.log(filename)
            var storageRef = storage.ref()
            var desertRef = storageRef.child('post/'+filename)
            // Delete the file
            desertRef.delete().then(() => {
              // File deleted successfully
              alert('게시글 삭제 중.')

            }).catch((error) => {
              // Uh-oh, an error occurred!
              alert('게시글 삭제못함.')
            });
          }
        }).then(()=>{
          db.collection('feeds').doc(title).delete().then(() => {
            alert('게시글 삭제 완료.')

            location.reload()
            //posts 활성화 시키기
            console.log(title)
          })
        })


      })


    })

  })
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    document.getElementById('board').style.display = 'inline-block'
    document.getElementById('manage').style.display = 'inline-block'
    document.getElementById('mypage').style.display = 'inline-block'
    document.getElementById('logout').style.display = 'inline-block'
    $('#mypage').click(() => {
      location.href = 'myPage.html'
    })
    $('#logout').click(() => {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        location.href = 'index.html';

      }).catch((error) => {
        // An error happened.
      });
    })

  } else {
    location.href = 'index.html'
  }
})
