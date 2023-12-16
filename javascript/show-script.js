const bandSite_API = "7aff767f-c1fc-485c-9772-4ad04735c565"

function getFunc(param) {
    let sortArr = []
    param.forEach(i => {
        sortArr.push(i)
    })
    console.log(sortArr);
    loadShows(sortArr);
}
///////////// AXIOS GET REQUEST ///////////////
axios.get(`https://project-1-api.herokuapp.com/showdates?api_key=${bandSite_API}`, {
}).then(res => {
    getFunc(res.data);
}).catch(err => {
    console.log(err);
});
////////////////////////////////////////////////
const loadShows = (sortArr) => {
    // TOUR PARENT ELEMENT
    const tourParent = document.querySelector(".tour");
    // TOUR TABLE
    let tourTable = document.createElement("div");
    tourTable.classList.add("tour__table");
    tourParent.appendChild(tourTable);
    // TOUR HEADING
    let tourHeading = document.createElement("h2");
    tourHeading.classList.add("tour__heading");
    tourTable.appendChild(tourHeading);
    tourHeading.innerText = "Shows";
    // UPON PAGE LOAD, JAVASCRIPT WILL LOAD THE FOLLOWING ABOVE
    // BELOW, THE FOREACH LOOP WILL KEEP CREATING NEW ELEMENTS UNTIL THE ARRAY OF OBJECTS ENDS.
    sortArr.forEach(showContentObj => {
        // TOUR WRAPPER
        let tourWrapper = document.createElement("div");
        tourWrapper.classList.add("tour__wrapper");
        tourWrapper.classList.add("main__tour");
        tourTable.appendChild(tourWrapper);

        let tourSectionDate = document.createElement("div");
        tourSectionDate.classList.add("tour__section");
        tourSectionDate.classList.add("tour__date");
        tourWrapper.appendChild(tourSectionDate);
        // TOUR DATE
        let tourDate = document.createElement("div");
        tourDate.classList.add("date__input");
        tourDate.classList.add("main__date");
        tourSectionDate.appendChild(tourDate);
        tourDate.innerText = "DATE";

        // TOUR DATE TITLE
        let tourDateInfo = document.createElement("div");
        tourDateInfo.classList.add("date__title");
        tourSectionDate.appendChild(tourDateInfo);
        tourDateInfo.innerText = showContentObj.date;

        let tourSectionVenue = document.createElement("div");
        tourSectionVenue.classList.add("tour__section");
        tourSectionVenue.classList.add("tour__venue");
        tourWrapper.appendChild(tourSectionVenue);

        let tourVenue = document.createElement("div");
        tourVenue.classList.add("venue__input");
        tourVenue.classList.add("main__venue");
        tourSectionVenue.appendChild(tourVenue);
        tourVenue.innerText = "VENUE";

        // TOUR VENUE TITLE
        let tourVenueInfo = document.createElement("div");
        tourVenueInfo.classList.add("venue__title");
        tourSectionVenue.appendChild(tourVenueInfo);
        tourVenueInfo.innerText = showContentObj.place;

        let tourSectionLocation = document.createElement("div");
        tourSectionLocation.classList.add("tour__section");
        tourSectionLocation.classList.add("tour__location");
        tourWrapper.appendChild(tourSectionLocation);

        let tourLocation = document.createElement("div");
        tourLocation.classList.add("location__input");
        tourLocation.classList.add("main__location");
        tourSectionLocation.appendChild(tourLocation);
        tourLocation.innerText = "LOCATION";

        let tourLocationInfo = document.createElement("div");
        tourLocationInfo.classList.add("venue__title");
        tourSectionLocation.appendChild(tourLocationInfo);
        tourLocationInfo.innerText = showContentObj.location;

        let tourButton = document.createElement("div");
        tourButton.classList.add("tour__button");
        tourWrapper.appendChild(tourButton);
        tourButton.innerText = "BUY TICKETS";
    });
};