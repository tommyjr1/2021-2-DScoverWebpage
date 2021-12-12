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


db.collection('feeds').get().then((results)=>{
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
    db.collection('feeds').where('title','==',patId).get().then((results)=>{
        results.forEach((doc)=>{
            console.log('title is'+doc.data()['writer'])
            document.getElementById('postTitle').innerText = patId
            document.getElementById('postDate').innerText = doc.data()['last_update'].toDate().toDateString()
            document.getElementById('postWriter').innerText = doc.data()['writer']
            document.getElementById('postContext').innerText = doc.data()['context']
            document.getElementById('postImg').url = doc.data()['file']
        })
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
}


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        document.getElementById('board').style.display='inline-block'
        document.getElementById('manage').style.display='inline-block'
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

                            db.collection('feeds').add({title: title, context:context, file:url, last_update: now, writer:name})
                        })
                    })
            }else{
                db.collection('feeds').doc(title).set({title: title, context:context, last_update: now, writer:name})
            }

            // window.history.back();
            // window.location.reload();
        })

    } else {
        location.href='index.html'
    }
});
