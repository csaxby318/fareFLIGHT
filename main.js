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
        carrierRedirectLink(result.Carriers[0].Name)
    }).catch(err => {
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
        carrierRedirectLink(result2.Carriers[0].Name)
    }).catch(err => {
        console.error(err);
    });
}

function flightDisplay(result) {

    let date = result.Quotes[0].OutboundLeg.DepartureDate
    let formattedDate = date.slice(6, 10) + "-" + date.slice(0, 4)
    let priceByPassengers = result.Quotes[0].MinPrice * globalNumOfPassengers

    displayFlight.innerHTML = `
        <a target="_blank" id="flightLink" href="https://www.skyscanner.com/">
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
        <a target="_blank" id="flightLink" href="https://www.skyscanner.com/">
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

    const from = fromTextBox.value
    const to = toTextBox.value
    const leaveDate = formattedDate
    const returnDate = formattedDate
    const numberOfPassengers = numberOfPassengersDropDown.value
    globalNumOfPassengers = numberOfPassengers

    fetchFlight(from, to, leaveDate, returnDate)
    fromTextBox.value = ''
    toTextBox.value = ''
    leaveDateTextBox.value = ''
    returnDateTextBox.value = ''
    numberOfPassengersDropDown.value = '1'
})

function carrierRedirectLink(carrier) {

    if (carrier == "Spirit Airlines") {
        document.getElementById("flightLink").href = "https://www.spirit.com/";
    } else if (carrier == "Frontier Airlines") {
        document.getElementById("flightLink").href = "https://www.flyfrontier.com/";
    } else if (carrier == "American Airlines") {
        document.getElementById("flightLink").href = "https://www.aa.com/homePage.do";
    } else if (carrier == "Delta") {
        document.getElementById("flightLink").href = "https://www.delta.com/";
    } else if (carrier == "United") {
        document.getElementById("flightLink").href = "https://www.united.com/";
    } else if (carrier == "jetBlue") {
        document.getElementById("flightLink").href = "https://www.jetblue.com/";
    } else if (carrier == "Southwest Airlines") {
        document.getElementById("flightLink").href = "https://www.southwest.com/";
    } else if (carrier == "Alaska Airlines") {
        document.getElementById("flightLink").href = "https://www.alaskaair.com/";
    } else if (carrier == "Hawaiian Airlines") {
        document.getElementById("flightLink").href = "https://www.hawaiianairlines.com/";
    } else if (carrier == "Virgin Atlantic") {
        document.getElementById("flightLink").href = "https://www.virginatlantic.com/";
    } else if (carrier == "Air Canada") {
        document.getElementById("flightLink").href = "https://www.aircanada.com/us/en/aco/home.html";
    } else if (carrier == "Virgin America") {
        document.getElementById("flightLink").href = "https://www.virginatlantic.com/";
    } else if (carrier == "Air France") {
        document.getElementById("flightLink").href = "https://www.airfrance.com/";
    } else if (carrier == "Qatar Airways") {
        document.getElementById("flightLink").href = "https://www.qatarairways.com/en-us/homepage.html";
    } else if (carrier == "KLM Royal Dutch Airlines") {
        document.getElementById("flightLink").href = "https://www.klm.com/";
    } else if (carrier == "Emirates") {
        document.getElementById("flightLink").href = "https://www.emirates.com/us/english/";
    } else if (carrier == "Allegiant Air") {
        document.getElementById("flightLink").href = "https://www.allegiantair.com/";
    } else if (carrier == "Japan Airlines") {
        document.getElementById("flightLink").href = "https://www.jal.co.jp/jp/en/";
    } else if (carrier == "Air New Zealand") {
        document.getElementById("flightLink").href = "https://www.airnewzealand.com/";
    } else if (carrier == "Fly Dubai") {
        document.getElementById("flightLink").href = "https://www.flydubai.com/";
    } else if (carrier == "Egyptair") {
        document.getElementById("flightLink").href = "https://www.egyptair.com/";
    } else if (carrier == "Malaysia Airlines") {
        document.getElementById("flightLink").href = "https://www.malaysiaairlines.com/";
    } else if (carrier == "Turkish Airlines") {
        document.getElementById("flightLink").href = "https://www.turkishairlines.com/";
    } else if (carrier == "AirAsia") {
        document.getElementById("flightLink").href = "https://www.airasia.com/en/gb";
    } else {
        document.getElementById("flightLink").href = "https://www.skyscanner.com/";
    }
}