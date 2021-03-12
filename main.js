const fromTextBox = document.getElementById("fromTextBox")
const toTextBox = document.getElementById("toTextBox")
const leaveDateTextBox = document.getElementById("leaveDateTextBox")
const returnDateTextBox = document.getElementById("returnDateTextBox")


const flightSelectionDropDown = document.getElementById("flightSelectionDropDown")
const roundTripSelection = document.getElementById("roundTripSelection")
const oneWayTripSelection = document.getElementById("oneWayTripSelection")
const lineImage = document.getElementById("lineImage")

const numberOfPassengersDropDown = document.getElementById("numberOfPassengersDropDown")

const submitBtn = document.getElementById("submitBtn")

const dateSelectionContainer = document.getElementById("dateSelectionContainer")
const displayFlight = document.getElementById("displayFlight")
const displayReturnFlight = document.getElementById("displayReturnFlight")
const flightLink = document.getElementById("flightLink")

function fetchFlight(from, to, leaveDate, returnDate) {

    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${from}-sky/${to}-sky/${leaveDate}?inboundpartialdate=`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "e118aa187bmsh51dce0dd58837e0p1bcfe5jsn469699bec0df",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    }).then(response => {
        console.log(response);
        return response.json();
    }).then((result) => {
        console.log(result);
        flightDisplay(result)
    }).catch(err => {
        displayFlight.innerHTML = `<h6 class="errorAlert">The flight you are searching is not available</h6>`
        console.error(err);
    });

    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${to}-sky/${from}-sky/${returnDate}?inboundpartialdate=`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "e118aa187bmsh51dce0dd58837e0p1bcfe5jsn469699bec0df",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    }).then(response => {
        console.log(response);
        return response.json();
    }).then((result2) => {
        console.log(result2);
        flightReturnDisplay(result2)
    }).catch(err => {
        if (flightSelectionDropDown.value == "roundTripSelection") {
            displayReturnFlight.innerHTML = `<h6 class="errorAlert">The return flight you are searching is not available</h6>`
        }
        console.error(err);
    });
}

function flightDisplay(result) {

    let date = result.Quotes[0].OutboundLeg.DepartureDate
    let formattedDate = date.slice(6, 10) + "-" + date.slice(0, 4)
    let priceByPassengers = result.Quotes[0].MinPrice * globalNumOfPassengers

    displayFlight.innerHTML = `
        <a target="_blank" id="flightLink" href="${directLinkToFlight}">
            <div class="flightInfo">
                <h2>${result.Carriers[0].Name}</h2>
                <p class="dateDisplay">${formattedDate}</p>
                <div class="mapArrowWithNames">
                    <p>${result.Places[0].IataCode}</p>
                    <img src="images/map-arrow.svg" id="mapArrow" class="mapArrow"/>
                    <p>${result.Places[1].IataCode}</p>
                </div>
                <p class="priceDisplay">$${priceByPassengers}</p>
            </div>
        </a>
    `
}

function flightReturnDisplay(result2) {

    let date = result2.Quotes[0].OutboundLeg.DepartureDate
    let formattedDate = date.slice(6, 10) + "-" + date.slice(0, 4)
    let priceByPassengers = result2.Quotes[0].MinPrice * globalNumOfPassengers

    displayReturnFlight.innerHTML = `
        <a target="_blank" id="flightLink" href="${directLinkToReturnFlight}">
            <div class="returnFlightInfo">
                <h2>${result2.Carriers[0].Name}</h2>
                <p class="dateDisplay">${formattedDate}</p>
                <div class="mapArrowWithNames">
                    <p>${result2.Places[0].IataCode}</p>
                    <img src="images/map-arrow.svg" id="mapArrowReverse" class="mapArrow"/>
                    <p>${result2.Places[1].IataCode}</p>
                </div>
                <p class="priceDisplay">$${priceByPassengers}</p>
            </div>
        </a>
    `
}

flightSelectionDropDown.addEventListener('change', function() {

    if (flightSelectionDropDown.value == "oneWayTripSelection") {
        returnDateTextBox.style.display = "none"
        returnDateTextBox.value = ""
        lineImage.style.display = "none"

    } else if (flightSelectionDropDown.value == "roundTripSelection") {
        returnDateTextBox.style.display = ""
        lineImage.style.display = ""
    }
})

submitBtn.addEventListener('click', function() {
    displayFlight.innerHTML = ""
    displayReturnFlight.innerHTML = ""

    date = leaveDateTextBox.value
    formattedDate = date.slice(6,10) + "-" + date.slice(0,2) + "-" + date.slice(3,5)
    dateReturn = returnDateTextBox.value
    formattedReturnDate = dateReturn.slice(6,10) + "-" + dateReturn.slice(0,2) + "-" + dateReturn.slice(3,5)
    linkDate = date
    formattedLinkDate = linkDate.slice(8,10) + linkDate.slice(0,2) + linkDate.slice(3,5)
    linkDateReturn = dateReturn
    formattedLinkDateReturn = linkDateReturn.slice(8,10) + linkDateReturn.slice(0,2) + linkDateReturn.slice(3,5)
    
    const from = fromTextBox.value
    const to = toTextBox.value
    const leaveDate = formattedDate
    const returnDate = formattedReturnDate
    const numberOfPassengers = numberOfPassengersDropDown.value
    globalNumOfPassengers = numberOfPassengers

    directLinkToFlight = `https://www.skyscanner.com/transport/flights/${from}/${to}/${formattedLinkDate}/?adults=1&adultsv2=${numberOfPassengers}&cabinclass=economy&children=0&childrenv2=&destinationentityid=27536644&inboundaltsenabled=false&infants=0&originentityid=27541735&outboundaltsenabled=false&preferdirects=false&preferflexible=false&ref=home&rtn=0`
    directLinkToReturnFlight = `https://www.skyscanner.com/transport/flights/${to}/${from}/${formattedLinkDateReturn}/?adults=1&adultsv2=${numberOfPassengers}&cabinclass=economy&children=0&childrenv2=&destinationentityid=27536644&inboundaltsenabled=false&infants=0&originentityid=27541735&outboundaltsenabled=false&preferdirects=false&preferflexible=false&ref=home&rtn=0`
    fetchFlight(from, to, leaveDate, returnDate)
    fromTextBox.value = ''
    toTextBox.value = ''
    leaveDateTextBox.value = ''
    returnDateTextBox.value = ''
    numberOfPassengersDropDown.value = '1'
})
