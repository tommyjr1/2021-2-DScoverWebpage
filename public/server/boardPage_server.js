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
    //posting Section
    $('.modal-container').css('display', 'none');
    $("#addPost").click(function() {
        $('.modal-container').css('display', 'inline');
    })
    $(".xBtn").click(function() {
        $('.modal-container').css('display', 'none');
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

function makeFeed(data){
    var listContainer = document.querySelector("#myTab")
    if(listContainer!= null){
        var addFeed = document.createElement('a')
        addFeed.className = "list-group-item list-group-item-action"
        addFeed.href = "#"
        addFeed.setAttribute('data-bs-toggle',"list")
        addFeed.setAttribute('role',"tab")

        var feedTitleDiv = document.createElement('div')
        feedTitleDiv.className =  "d-flex w-100 justify-content-between"

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
        feedContext.className ="mb-1"
        feedContext.innerHTML = data['context']
        addFeed.appendChild(feedContext)


        var feedWriter = document.createElement('small')
        feedWriter.className = "text-muted"
        feedWriter.innerHTML = data['writer']
        addFeed.appendChild(feedWriter)

        listContainer.appendChild(addFeed)
    }
    }


db.collection('feeds').orderBy('last_update', 'desc').get().then((results)=>{
    results.forEach(docs => {
        makeFeed(docs.data())
    });
    var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
    triggerTabList.forEach(function (triggerEl) {
        console.log(triggerEl.querySelector("div h5").innerText)
        triggerEl.addEventListener('click', function (event) {
            event.preventDefault()

            title = triggerEl.querySelector("div h5").innerText
            location.href='showPost.html?title='+title
        })
    })
})

function getParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var patId = getParameter('title');
console.log('title is'+patId)
if(patId!=null){
    var downloadBtn = document.getElementById('postDownload')

    db.collection('feeds').where('title','==',patId).get().then((results)=>{
        results.forEach((doc)=>{
            console.log('title is'+doc.data()['writer'])
            document.getElementById('postTitle').innerText = patId
            document.getElementById('postDate').innerText = doc.data()['last_update'].toDate().toDateString()
            document.getElementById('postWriter').innerText = doc.data()['writer']
            document.getElementById('postContext').innerText = doc.data()['context']
            if((doc.data()['fileurl'])==''){
                downloadBtn.style.display='None'
            }
            else{
                downloadBtn.addEventListener('click',()=>{
            
                    location.href = doc.data()['fileurl']
    
                })
            }
            
            
        })
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
}


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var username = user.displayName;

        document.getElementById('board').style.display='inline-block'
        db.collection('users').doc(username).get().then((result)=>{
            console.log(result.data()['manager'])
            if(result.data()['manager']!='X'){
                document.getElementById('manage').style.display='inline-block';
            }
        })
        document.getElementById('mypage').style.display='inline-block'
        document.getElementById('logout').style.display='inline-block'
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
        $("#back").click(()=>{
            location.href='boardPage.html'
        })


        var uid = user.uid;
        var name = user.displayName;
        console.log(name)

        $("#postBtn").click(()=>{
            var title = $("#floatingTextarea").val()
            var context = $("#floatingTextarea2").val()
            var now = new Date()

            var file= document.querySelector("#inputGroupFile02").files[0]
            if(file!=null){
                var storageRef = storage.ref()
                var saveLoc = storageRef.child('post/'+file.name)
                var upload = saveLoc.put(file)
                upload.on('state_changed',
                        //?????? ??? ??????
                        alert('????????? ???. ????????? ????????? ?????????.'),
                        //????????? ??????
                        (error)=>{
                        console.error=('reason', error)
                        },
                        //?????? ???
                        ()=>{
                        upload.snapshot.ref.getDownloadURL().then((url)=>{
                            console.log('???????????? ?????????', url)
                            db.collection('feeds').doc(title).set({title: title, context:context, filename: file.name, fileurl:url.toString(), last_update: now, writer:name}).then(()=>{
                                alert('????????? ????????? ??????.')
                                window.location.reload();

                            })
                        })
                    })
            }else{
                db.collection('feeds').doc(title).set({title: title, context:context, filename:'', fileurl:'', last_update: now, writer:name}).then(()=>
                {
                    alert('????????? ????????? ??????.')
                    window.location.reload();

                })

            }
            $('.modal-container').css('display', 'none');
           
        })

    } else {
        location.href='index.html'
    }
});
