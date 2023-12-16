const bandSite_API = "7aff767f-c1fc-485c-9772-4ad04735c565"

function getFunc(param) {
    let sortArr = []
    param.forEach(i => {
        sortArr.push(i)
    })
    let revArr = sortArr.reverse();
    console.log(revArr);
    loadComments(revArr);
}
// sort api array based on timestamp.

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}
var aDay = 24 * 60 * 60 * 1000;
console.log(timeSince(new Date(Date.now() - aDay)));
console.log(timeSince(new Date(Date.now() - aDay * 2)));
///////////// AXIOS GET REQUEST WORKS ///////////////
axios.get(`https://project-1-api.herokuapp.com/comments?api_key=${bandSite_API}`, {

}).then(res => {
    getFunc(res.data);
}).catch(err => {
    console.log(err);
});
///////////////////////////////////////////////////////////

const loadComments = (arr) => {
    const commPastParent = document.querySelector(".comments__past-wrapper");

    arr.forEach(commContentObj => {

        // COMMENTS PAST SHELL
        let commPast = document.createElement('div');
        commPast.classList.add("comments__past");
        commPastParent.appendChild(commPast);
        // COMMENTS PAST PHOTO
        let commPastPhoto = document.createElement('div');
        commPastPhoto.classList.add("comments__past-photo");
        commPast.appendChild(commPastPhoto);
        // COMMENTS INFO
        let commInfo = document.createElement('div');
        commInfo.classList.add("comments__info");
        commPast.appendChild(commInfo);
        // COMMENTS NAME
        let commName = document.createElement('div');
        commName.classList.add("comments__name");
        commInfo.appendChild(commName);
        commName.innerText = commContentObj.name;
        // COMMENTS DATE
        let commDate = document.createElement('div');
        commDate.classList.add("comments__date");
        commInfo.appendChild(commDate);
        commDate.innerText = timeSince(commContentObj.timestamp);
        // COMMENTS CONTENT
        let commContent = document.createElement('div');
        commContent.classList.add("comments__past-comment");
        commInfo.appendChild(commContent);
        commContent.innerText = commContentObj.comment;
    });
};

const form = document.querySelector('form');
// SETS 'FORM' AS THE ELEMENT FOR THE LISTENER
form.addEventListener('submit', (eventObj) => {
    eventObj.preventDefault();
    let newCommObject = {};
    newCommObject.name = eventObj.target.name.value;
    // CREATES A TIME STAMP VALUE FOR WHEN THE SUBMIT BUTTON IS PRESSED
    newCommObject.date = Date.now();
    newCommObject.comment = eventObj.target.comment.value;
    // commContent.unshift(newCommObject); ////////// NEED SYNTAX FOR API ARRAY
    // console.log(commContent);

    ///////AXIOS POST REQUESTS///////////////
    axios.post(`https://project-1-api.herokuapp.com/comments?api_key=${bandSite_API}`, {
        name: newCommObject.name,
        comment: newCommObject.comment
    }).then(res => {
        axios.get(`https://project-1-api.herokuapp.com/comments?api_key=${bandSite_API}`, {

        }).then(res => {
            // let sortArr = []
            // res.data.forEach(i => {
            //   sortArr.push(i)
            // })
            // let revArr = sortArr.reverse(); ///// CHANGE THIS TO SORT BY TIMESTAMP ****
            // console.log(revArr);
            // res.data.sort
            // console.log(res.data);
            getFunc(res.data);
            // loadComments(revArr);
        }).catch(err => {
            console.log(err);
        });
        console.log(res);
        // loadComments(res);/////////////////
    }).catch(err => {
        console.log(err);
    });
    /////////////////////////////////////////////
    clearAll();
    form.reset();
});

function clearAll() {
    //CREATED A PARENT
    const newparent = document.querySelector(".comments__past-wrapper");
    // CREATED A CHILD
    let child = newparent.getElementsByClassName("comments__past");
    // RAN A LOOP THE LENGTH OF ALL THE CURRENT COMMENTS. ON EACH ITERATION OF THE LOOP IT WOULD REMOVE THE CHILD ELEMENT (COMMENT).
    for (let i = child.length; i > 0; i--) {
        newparent.removeChild(child[i - 1]);
    }
};
// TURN FOR LOOP HERE INTO A FOREACH FUNCTION TO DELETE EACH COMMENT IN MY COMMENT SECTION.

let apiForm = document.querySelector('form');
console.log(form);
