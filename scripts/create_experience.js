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
  //when I want to load an image:
  loadImageData();

//fetching booking data
let bookings = [];
fetch('../data/bookings.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    bookings = data;
  })
  .catch(error => console.error(error));
  console.log('these are the bookings:')
  console.log(bookings)
//Creating a min date, and blocking out dates
let dateInput = document.getElementById('date');
const today = new Date();
today.setDate(today.getDate() + 1);
const minDate = today.toISOString().split('T')[0];
dateInput.min = minDate;
//console.log(minDate); //checking mindate is working
//creating blackout dates could be done using an external library


// Get the date selected
dateInput.addEventListener('change', function() {
    const selectedDate = dateInput.value;
    console.log('Date updated:', selectedDate);
  });

// Define time slots (you can adjust these)
let timeSlots = [
  { value: '15:00', text: '3:00 PM' },
  { value: '16:00', text: '4:00 PM' },
  { value: '17:00', text: '5:00 PM' },
  { value: '18:00', text: '6:00 PM' },
  { value: '19:00', text: '7:00 PM' },
  { value: '20:00', text: '8:00 PM' },
  { value: '21:00', text: '9:00 PM' },
];

function buttonPressed(event) {
    console.log('Button pressed:', event.target.value);
  
}
// Add options to the select element
timeSlots.forEach((timeSlot) => {
  const option = document.createElement('option');
  option.value = timeSlot.value;
  option.text = timeSlot.text;
  timeSelect.appendChild(option);
});

// Get the time selected
let selectedTime = "not selected";
timeSelect.addEventListener('change', (event) => {
    selectedTime = event.target.value;
    console.log('Selected time:', selectedTime);
  });

  console.log('Selected time:', selectedTime);

