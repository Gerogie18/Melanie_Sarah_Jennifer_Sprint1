//Name: Jenn
//Date: Oct 23, 2024 - 
//Description: JS to manipulate DOM for a pick user to create and book a party.

console.log("JS loaded")

//fetching image data when needed 
let imageData = ""
async function loadImageData() {
    try {
      const response = await fetch('../data/images.json');
      const data = await response.json();
      imageData = data;
      //console.log(imageData); //error handling - see json data
    } catch (error) {
      console.error(error);
    }
  }

loadImageData();

//fetching booking data
var bookings = {};

async function fetchBookings() {
  try {
    const response = await fetch('../data/bookings.json');
    bookings = await response.json();
    console.log('These are the bookings:');
    console.log(bookings);
  } catch (error) {
    console.error(error);
  }
}



function populateTimeSlots(timeSelect, ageRange) {
    // Define time slots
    var timeSlots = [
      { value: '', text: 'Select Start Time: ' },
      { value: '15:00', text: '3:00 PM' },
      { value: '16:00', text: '4:00 PM' },
      { value: '17:00', text: '5:00 PM' },
      { value: '18:00', text: '6:00 PM' },
      { value: '19:00', text: '7:00 PM' },
      { value: '20:00', text: '8:00 PM' },
      { value: '21:00', text: '9:00 PM' },
    ];
  
    // Remove existing options
    for (let i = timeSelect.options.length - 1; i >= 0; i--) {
      timeSelect.remove(i);
    }
  
    // Filter time slots based on age range
    if (ageRange === 'ageRange3-6') {
      timeSlots.splice(3, 5);
    }
    if (ageRange === 'ageRange7-11') {
        timeSlots.splice(4, 4);
        timeSlots.splice(1,1);
    }
    if (ageRange === 'ageRange12-18') {
        timeSlots.splice(6, 2);
        timeSlots.splice(1, 2);
    }
    if (ageRange === 'ageRange19+') {
        timeSlots.splice(1, 4);
    }
    // fetch bookings and take off time slots
    //let bookings = fetchBookings();
    //let bookedDate = bookings['Date'];
    //console.log(bookedDate);
    //let bookedTime = bookings['Time'];
    //console.log(bookedTime);
    //if (selectedDate === bookedDate)  {
    //  timeSlots.forEach((timeSlot) => {
    //    if (timeSlot.value === bookedTime) {
    //      timeSlots.splice(timeSlots.indexOf(timeSlot), 1);
    //    }
    //  });
    //}
    //Change value to booked if no time slots available
    if (timeSlots.length === 1) {
        timeSlots[0].text = 'No available time slots';
    }

    // Populate time slots
    timeSlots.forEach((timeSlot) => {
      const option = document.createElement('option');
      option.value = timeSlot.value;
      option.text = timeSlot.text;
      timeSelect.appendChild(option);
    });
  }

//Creating a min date, and blocking out dates
let dateInput = document.getElementById('date');
const today = new Date();
today.setDate(today.getDate() + 1);
const minDate = today.toISOString().split('T')[0];
dateInput.min = minDate;
//console.log(minDate); //checking mindate is working
//creating blackout dates could be done using an external library


// Get the selected date
dateInput.addEventListener('change', function() {
    const selectedDate = dateInput.value;
    console.log('Date updated:', selectedDate);
  });


// Accessing the Age Range buttons
const ageRangeButtons = document.querySelectorAll('.ageRange');
var ageRange = '';
// Event listeners for each button
ageRangeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    // Remove .clicked class from previously clicked button
    const previouslyClickedButton = document.querySelector('.ageRange.selected');
    if (previouslyClickedButton) {
      previouslyClickedButton.className = 'ageRange';
    }

    // Add selected class to current button
    button.className = 'ageRange selected';
    ageRange = button.getAttribute('Value');
    console.log(ageRange);

    //resetting the timeslots 
    populateTimeSlots(timeSelect, ageRange); 
    // checking to see if logging correctly
    console.log(`Clicked button value: ${button.getAttribute('value') || button.textContent}`); 
  });
  
});

//Accessing Group Size
const groupSizeButtons = document.querySelectorAll('.groupSize');
let groupSize = '';

groupSizeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    // Remove .selected class from previously clicked button
    const previouslyClickedButton = document.querySelector('.groupSize.selected');
    if (previouslyClickedButton) {
      previouslyClickedButton.className = 'groupSize';
    }

    // Add .selected class to current button
    button.className = ('groupSize selected');
    groupSize = button.getAttribute('value');
    console.log(`Selected group size: ${groupSize}`);
  });
});

//looping through bookings to grey out timeslots:
for (let i = 0; i < bookings.length; i++) {
    if (bookings.Date === selectedDate) {

    }
}


// Get the time selected
let selectedTime = '';
timeSelect.addEventListener('change', (event) => {
    selectedTime = event.target.value;
    console.log('Selected Time:', selectedTime);
  });

  console.log('Selected Time:', selectedTime);

