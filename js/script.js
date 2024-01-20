// API Address to current weather condition
const API = {
  baseURL: 'https://api.weatherapi.com/v1',
  key: 'e1b28bab47bf4381b9c71958241501',
  current: 'current.json',
  forecast: 'forecast.json',
};

// Parameter location
let paramLocation = '';

// Default location. Get location from user's IP Address
if (paramLocation === '') {
  paramLocation = 'auto:ip';
}

fetchCurrentWeather();

// Search event listener when press 'Enter'
const searchBar = document.getElementById('search-loc');
searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    paramLocation = searchBar.value;
    fetchCurrentWeather();
    console.log(paramLocation);
    event.preventDefault();
  }
});

// Search event listener when click searh button
const searchButton = document.querySelector('.search-bar button');
searchButton.addEventListener('click', (event) => {
  paramLocation = searchBar.value;
  fetchCurrentWeather();
  console.log(paramLocation);
  event.preventDefault();
});

// Fetch the current weather
function fetchCurrentWeather() {
  fetch(`${API.baseURL}/${API.current}?key=${API.key}&q=${paramLocation}`)
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
}

// Functions to create date and time

function currentDate() {
  const now = new Date();
  const date = now.getDate();
  const dayIndex = now.getDay();
  const daysList = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const monthIndex = now.getMonth();
  const monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const year = now.getFullYear();

  return `${daysList[dayIndex]}, ${date} ${monthList[monthIndex]} ${year}`;
}

function getCurrentTime() {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();

  hour %= 12;
  hour = hour ? hour : 12; // Will return false if hour === 0
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;

  return `${hour}:${minute}`;
}

function getAmPm() {
  const now = new Date();
  let hour = now.getHours();
  return hour >= 12 ? 'PM' : 'AM';
}

// Date and time builder
const timeSelector = document.querySelector('.time');
const dateSelector = document.querySelector('.date');
setInterval(function () {
  timeSelector.innerHTML = `${getCurrentTime()}<span>${getAmPm()}</span>`;
}, 1000);
dateSelector.innerHTML = currentDate();
