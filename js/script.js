// API Address to current weather condition
let currentWeatherAPI = 'https://api.weatherapi.com/v1/current.json?key=e1b28bab47bf4381b9c71958241501';

// Parameter location
let paramLocation = '';

// Default location. Get location from user's IP Address
if(paramLocation === ''){
  currentWeatherAPI += '&q=auto:ip';
}


fetch(currentWeatherAPI)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('API REQUEST FAILED');
    }
  })
  .then((data) => {
    // Temperature
    const temp = document.querySelector('.temp');
    temp.innerText = data.current.temp_c + '\u00B0C';

    // Icon based on weather
    const icon = document.querySelector('.temperature img');
    icon.setAttribute('src', data.current.condition.icon);

    // Location name
    const locationDisplay = document.querySelector('.location h3');
    locationDisplay.innerHTML = data.location.name;
    console.log(data);

  })
  .catch((error) => {
    console.error(error);
  });






















// const searchButton = document.querySelector('button');
// searchButton.addEventListener('click', function(){
//   const inputSearch = document.getElementById('input-loc');
//   locationParam = inputSearch.value;
//   console.log(locationParam);

//   const locationName = document.querySelector('.location h3');
//   locationName.innerHTML = `${locationParam}`;  
// });





























// const now = new Date();
// const hour = now.getHours();
// const minute = now.getMinutes();
// const date = now.getDate();
// const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const dayIndex = now.getDay();
// const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const monthIndex = now.getMonth();
// const year = now.getFullYear();

// const timeSelector = document.querySelector('.time');
// const dateSelector = document.querySelector('.date');
// // timeSelector.innerHTML = ``
// dateSelector.innerHTML = `${daysList[dayIndex]}, ${date} ${monthList[monthIndex]} ${year}`;