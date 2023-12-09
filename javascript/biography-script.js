let commContent = [
    {
        name: "Connor Walton",
        date: Date.parse('02/17/2021'),
        // PARSED THE DATE STRING INTO A FUNCTION THAT TURNED IT INTO MILSECONDS
        content: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        name: "Emilie Beach",
        date: Date.parse('01/09/2021'),
        content: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        name: "Miles Acosta",
        date: Date.parse('12/20/2020'),
        content: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

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
var aDay = 24*60*60*1000;
console.log(timeSince(new Date(Date.now()-aDay)));
console.log(timeSince(new Date(Date.now()-aDay*2)));
/// COMMENTS SECTION
// COMMENTS HEADER
// COMMENTS WRAPPER
// COMMENTS FORM
// COMMENTS__PAST-WRAPPER
const loadComments = () => {
    const commPastParent = document.querySelector(".comments__past-wrapper");

    commContent.forEach(commContentObj => {
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
        commDate.innerText = timeSince(commContentObj.date);
        // COMMENTS CONTENT
        let commContent = document.createElement('div');
        commContent.classList.add("comments__past-comment");
        commInfo.appendChild(commContent);
        commContent.innerText = commContentObj.content;
    });
};

window.onload = () => {
    loadComments();
};

const form = document.querySelector('form');
// SETS 'FORM' AS THE ELEMENT FOR THE LISTENER
form.addEventListener('submit', (eventObj) => {
    eventObj.preventDefault();
    let newCommObject = {};
    newCommObject.name = eventObj.target.name.value;
    // CREATES A TIME STAMP VALUE FOR WHEN THE SUBMIT BUTTON IS PRESSED
    newCommObject.date = Date.now();
    newCommObject.content = eventObj.target.comment.value;

    commContent.unshift(newCommObject);
    console.log(commContent);
    clearAll();
    loadComments();
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
