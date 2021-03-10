
const fromTextBox = document.getElementById("fromTextBox")
const toTextBox = document.getElementById("toTextBox")
const leaveDateTextBox = document.getElementById("leaveDateTextBox")
const returnDateTextBox = document.getElementById("returnDateTextBox")


const flightSelectionDropDown = document.getElementById("flightSelectionDropDown")
const roundTripSelection = document.getElementById("roundTripSelection")
const oneWayTripSelection = document.getElementById("oneWayTripSelection")

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
        <div class="flightInfo">
            <h2>${result.Carriers[0].Name}</h2>
            <p>${formattedDate}</p>
            <p>From: ${result.Places[0].Name} (${result.Places[0].IataCode})</p>
            <p>To: ${result.Places[1].Name} (${result.Places[1].IataCode})</p>
            <p>$${priceByPassengers}</p>
        </div>
    `
}

function flightReturnDisplay(result2) {
    
    let date = result2.Quotes[0].OutboundLeg.DepartureDate
    let formattedDate = date.slice(6, 10) + "-" + date.slice(0, 4)
    let priceByPassengers = result2.Quotes[0].MinPrice * globalNumOfPassengers

    displayReturnFlight.innerHTML = `
        <div class="returnFlightInfo">
            <h2>${result2.Carriers[0].Name}</h2>
            <p>${formattedDate}</p>
            <p>From: ${result2.Places[1].Name} (${result2.Places[1].IataCode})</p>
            <p>To: ${result2.Places[0].Name} (${result2.Places[0].IataCode})</p>
            <p>$${priceByPassengers}</p>
        </div>
    `
}

flightSelectionDropDown.addEventListener('change', function() {

    if (flightSelectionDropDown.value == "oneWayTripSelection") {
        returnDateTextBox.style.display = "none"
    } else if (flightSelectionDropDown.value == "roundTripSelection") {
        returnDateTextBox.style.display = ""
    }
})

submitBtn.addEventListener('click', function() {
    console.log(numberOfPassengersDropDown.value)

    const from = fromTextBox.value 
    const to = toTextBox.value 
    const leaveDate = leaveDateTextBox.value 
    const returnDate = returnDateTextBox.value
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

    if(carrier == "Spirit Airlines") {
        flightLink.innerHTML = `<a href="https://www.spirit.com/">Buy Ticket</a>`
    }else if(carrier == "Frontier Airlines"){
        flightLink.innerHTML = `<a href="https://www.flyfrontier.com/">Buy Ticket</a>`
    }else if(carrier == "American Airlines"){
        flightLink.innerHTML = `<a href="https://www.aa.com/homePage.do">Buy Ticket</a>`
    }else if(carrier == "Delta"){
        flightLink.innerHTML = `<a href="https://www.delta.com/">Buy Ticket</a>`
    }else if(carrier == "United"){
        flightLink.innerHTML = `<a href="https://www.united.com/">Buy Ticket</a>`
    }else if(carrier == "jetBlue"){
        flightLink.innerHTML = `<a href="https://www.jetblue.com/">Buy Ticket</a>`
    }else if(carrier == "Southwest Airlines"){
        flightLink.innerHTML = `<a href="https://www.southwest.com/">Buy Ticket</a>`
    }else if(carrier == "Alaska Airlines"){
        flightLink.innerHTML = `<a href="https://www.alaskaair.com/">Buy Ticket</a>`
    }else if(carrier == "Hawaiian Airlines"){
        flightLink.innerHTML = `<a href="https://www.hawaiianairlines.com/">Buy Ticket</a>`
    }else if(carrier == "Virgin Atlantic"){
        flightLink.innerHTML = `<a href="https://www.virginatlantic.com/">Buy Ticket</a>`
    }else if(carrier == "Air Canada"){
        flightLink.innerHTML = `<a href="https://www.aircanada.com/us/en/aco/home.html">Buy Ticket</a>`
    }else if(carrier == "Virgin America"){
        flightLink.innerHTML = `<a href="https://www.virginatlantic.com/">Buy Ticket</a>`
    }else if(carrier == "Air France"){
        flightLink.innerHTML = `<a href="https://www.airfrance.com/">Buy Ticket</a>`
    }else if(carrier == "Qatar Airways"){
        flightLink.innerHTML = `<a href="https://www.qatarairways.com/en-us/homepage.html">Buy Ticket</a>`
    }else if(carrier == "KLM Royal Dutch Airlines"){
        flightLink.innerHTML = `<a href="https://www.klm.com/">Buy Ticket</a>`
    }else if(carrier == "Emirates"){
        flightLink.innerHTML = `<a href="https://www.emirates.com/us/english/">Buy Ticket</a>`
    }else if(carrier == "Allegiant Air"){
        flightLink.innerHTML = `<a href="https://www.allegiantair.com/">Buy Ticket</a>`
    }else if(carrier == "Japan Airlines"){
        flightLink.innerHTML = `<a href="https://www.jal.co.jp/jp/en/">Buy Ticket</a>`
    }else if(carrier == "Air New Zealand"){
        flightLink.innerHTML = `<a href="https://www.airnewzealand.com/">Buy Ticket</a>`
    }else if(carrier == "Fly Dubai"){
        flightLink.innerHTML = `<a href="https://www.flydubai.com/">Buy Ticket</a>`
    }else if(carrier == "Egyptair"){
        flightLink.innerHTML = `<a href="https://www.egyptair.com/">Buy Ticket</a>`
    }else if(carrier == "Malaysia Airlines"){
        flightLink.innerHTML = `<a href="https://www.malaysiaairlines.com/">Buy Ticket</a>`
    }else if(carrier == "Turkish Airlines"){
        flightLink.innerHTML = `<a href="https://www.turkishairlines.com/">Buy Ticket</a>`
    }else if(carrier == "AirAsia"){
        flightLink.innerHTML = `<a href="https://www.airasia.com/en/gb">Buy Ticket</a>`
    }else {
        flightLink.innerHTML = `<a href="https://www.skyscanner.com/">Buy Ticket</a>`
    }
}

























