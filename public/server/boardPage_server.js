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
  
db.collection('feeds').get().then((results)=>{
    results.forEach(docs => {
        makeFeed(docs.data())
    });
})

function makeFeed(data){
    var listContainer = document.querySelector("#myTab")

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

$("#addPost").click(()=>{
    location.href = 'addPost.html'
})
