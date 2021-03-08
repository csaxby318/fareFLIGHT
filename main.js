
const fromTextBox = document.getElementById("fromTextBox")
const toTextBox = document.getElementById("toTextBox")
const leaveDateTextBox = document.getElementById("leaveDateTextBox")
const returnDateTextBox = document.getElementById("returnDateTextBox")
const submitBtn = document.getElementById("submitBtn")

const datesEntered = document.getElementById("datesEntered")
const displayFlight = document.getElementById("displayFlight")


function fetchFlight(from, to, leaveDate, returnDate) {

    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${from}-sky/${to}-sky/${leaveDate}?inboundpartialdate=${returnDate}`, {
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
	console.error(err);
});
}

function flightDisplay(result) {

    displayFlight.innerHTML = `
                            <div class="flightInfo">
                            <h2>${result.Carriers[0].Name}</h2>
                            <p>From: ${result.Places[0].Name} (${result.Places[0].IataCode})</p>
                            <p>To: ${result.Places[1].Name} (${result.Places[1].IataCode})</p>
                            <p>$${result.Quotes[0].MinPrice}</p>
                            </div>
                         `
}

submitBtn.addEventListener('click', function() {

    const from = fromTextBox.value 
    const to = toTextBox.value 
    const leaveDate = leaveDateTextBox.value 
    const returnDate = returnDateTextBox.value 

    datesEntered.innerHTML = `
                        <div class='fightDates'>
                            ${leaveDate} - ${returnDate}
                        </div>
    `

    fetchFlight(from, to, leaveDate, returnDate)
    fromTextBox.value = ''
    toTextBox.value = ''
    leaveDateTextBox.value = ''
    returnDateTextBox.value = ''
})