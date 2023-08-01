const container = document.querySelector('.container');
//query select all for all classes that are specied and put it in a node list
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
console.log(movieSelect);


populateUI();

let ticketPrice = +movieSelect.value;
console.log(ticketPrice);

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
    
    //Same as one line of code above 
    /*const seatIndex = [...selectedSeats].map(function(seat) {
         return [...seats].indexOf(seat);
     });*/

    // console.log(seatIndex);

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    //console.log(selectedSeatsCount);
};

//Get Data from local storage and populate UI
function populateUI(){

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');

            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie Select Event
movieSelect.addEventListener('change', e =>{

    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
    console.log(ticketPrice);
});

//Seat Click Event
container.addEventListener('click', (e) => {
    
    if (
        e.target.classList.contains('seat') && !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();        
    }       
    //e.target shows the exact element that is clicked on
    //console.log(e.target)
});

// Initial count and total set
updateSelectedCount();