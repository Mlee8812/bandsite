const link = "https://project-1-api.herokuapp.com/comments";
const apiKey = "?api_key=afdcbcc1-e37a-423f-a461-44db821825d0";
//function takes in comment data and return html card with format
function displayComment(comment){
    const commentLi = document.createElement("li");
    commentLi.classList.add("item");
    commentsList.appendChild(commentLi);

    const itemImg = document.createElement("img");
    itemImg.classList.add("item__img");
    itemImg.setAttribute("src", " ");
    commentLi.appendChild(itemImg);

    const itemSection = document.createElement("div");
    itemSection.classList.add("item__section");
    commentLi.appendChild(itemSection);

    const itemHeader = document.createElement("div");
    itemHeader.classList.add("item__title");
    itemSection.appendChild(itemHeader);

    const itemName = document.createElement("p");
    itemName.classList.add("item__name");
    itemName.innerHTML = comment.name;
    itemHeader.appendChild(itemName);

    const itemDate = document.createElement("p");
    itemDate.classList.add("item__date");
    itemDate.innerText = new Date(comment.timestamp).toLocaleDateString(
        "en-US"
    );
    itemHeader.appendChild(itemDate);

    const itemBody = document.createElement("div");
    itemBody.classList.add("item__body");
    itemSection.appendChild(itemBody);

    const bodyCopy = document.createElement("p");
    bodyCopy.innerText = comment.comment;
    itemBody.appendChild(bodyCopy);

    const itemFooter = document.createElement("div");
    itemFooter.classList.add("item__footer");
    itemSection.appendChild(itemFooter);

    const likeImgLink = document.createElement("a");
    likeImgLink.classList.add("item__actions", "item__actions--like");
    likeImgLink.setAttribute("data-id", comment.id);
    // likeImgLink.setAttribute("onclick", "liked(this)");
    likeImgLink.setAttribute("value", "like");
    itemFooter.appendChild(likeImgLink);

    const likeImg = document.createElement("img");
    likeImg.classList.add("like-img");
    likeImg.setAttribute("src", "./assets/Icons/SVG/icon-like.svg");
    likeImg.setAttribute("data-id", comment.id);
    likeImg.setAttribute("value", "like");
    likeImgLink.appendChild(likeImg);

    const likeCounter = document.createElement("p");
    likeImg.classList.add("like-counter");
    likeCounter.innerText = comment.likes;
    likeImgLink.appendChild(likeCounter);

    const deleteLink = document.createElement("a");
    deleteLink.classList.add("item__actions", "item__actions--delete");
    deleteLink.setAttribute("data-id", comment.id);
    deleteLink.innerText = "Delete";
    // deleteLink.setAttribute("onclick", "deleteComment(this)");
    deleteLink.setAttribute("value", "delete");
    itemFooter.appendChild(deleteLink);
}
//function returns comments card list from api response data
function showCommentsList() {
    const getComments = axios.get(link + apiKey);
    getComments.then((res) => {
        const commentsData = res.data;
        const commentsArrey = commentsData.sort(
            (a, b) => b.timestamp - a.timestamp
        );
        commentsList.innerHTML = "";
        commentsArrey.forEach((comment) => {
            displayComment(comment);

        });
    });
}

const form = document.querySelector(".form");
const commentsList = document.querySelector(".comments__list");
showCommentsList();
//add comment once the submit button is clicked
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submittedName = event.target.formName;
    const submittedComment = event.target.formComment;
    if (formValidation(submittedName,submittedComment)) {
        const postedComment = {
            name: submittedName.value,
            comment: submittedComment.value,
        };
        const addComment = axios.post(link + apiKey, postedComment);
        addComment.then((res) => {
            event.target.reset();
            showCommentsList();
        });
    }
});

// listens for clicks on comment like and delete button of a comment and takes action accordingly
const itemActions = document.querySelector(".comments__list");

itemActions.addEventListener("click", (event) => {

    if (event.target.getAttribute("data-id")) {
        const userId = event.target.getAttribute("data-id");
        if (event.target.getAttribute("value") === "like") {
            const addLike = axios.put(link + "/" + userId + "/like" + apiKey);
            addLike.then((res) => {
                showCommentsList();
            });
        } else {
            const delComment = axios.delete(link + "/" + userId + apiKey);
            delComment.then((res) => {
                showCommentsList();
            });
        }
    }
});

//function check if the text added in the field is valid characters
function formValidation (nameField, commentField) {
    const re = /^[a-zA-Z]/
    if (!re.test(nameField.value)) {
        nameField.focus();
        nameField.value = "";
        nameField.classList.add("form__input--error");
        return false

    } else if (!re.test(commentField.value)) {
        commentField.focus();
        commentField.value = ""
        commentField.classList.add("form__input--error");
        return false
    } else {
        return true
    }
}