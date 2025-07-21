// --- Constants ---
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

// --- State ---
let currentWeek = 29; // Example: Week 29
let weekStartDate = new Date(2025, 6, 21); // July is month 6 (0-indexed)
let selectedDate = new Date(weekStartDate);

// --- Helpers ---
function getWeekDates(startDate) {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function formatDate(date) {
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatShortDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// --- UI Updates ---
function updateWeekDisplay() {
  const weekDates = getWeekDates(weekStartDate);
  document.getElementById('current-week').textContent =
    `Week ${currentWeek} (${formatShortDate(weekDates[0])} - ${formatShortDate(weekDates[6])})`;
}

function updateDateTabs() {
  const weekDates = getWeekDates(weekStartDate);
  const tabs = weekDates.map((date, idx) => {
    const isActive = date.toDateString() === selectedDate.toDateString();
    return `<button class="${isActive ? 'active' : ''}" onclick="selectDate(${idx})">${formatShortDate(date)}</button>`;
  }).join('');
  document.getElementById('date-tabs').innerHTML = tabs;
}

function updateReportTitle() {
  document.getElementById('report-title').textContent =
    `Weather Report - ${formatDate(selectedDate)}`;
}

function updateWeatherTable() {
  const conditionClasses = {
    "Sunny": "sunny",
    "Cloudy": "cloudy",
    "Rain": "rain",
    "Storm": "storm"
  };
  const rows = US_STATES.map(state => {
    const condition = ["Sunny", "Cloudy", "Rain", "Storm"][Math.floor(Math.random() * 4)];
    return `
      <tr>
        <td>${state}</td>
        <td>${Math.floor(Math.random() * 40) + 60}</td>
        <td class="${conditionClasses[condition]}">${condition}</td>
        <td>${Math.floor(Math.random() * 60) + 20}</td>
        <td>${Math.floor(Math.random() * 20) + 5}</td>
        <td>${(Math.random() * 2).toFixed(2)}</td>
      </tr>
    `;
  }).join('');
  document.getElementById('weather-table-body').innerHTML = rows;
}

// --- Event Handlers ---
window.changeWeek = function(direction) {
  currentWeek += direction;
  weekStartDate.setDate(weekStartDate.getDate() + direction * 7);
  selectedDate = new Date(weekStartDate);
  updateAll();
};

window.selectDate = function(idx) {
  selectedDate = getWeekDates(weekStartDate)[idx];
  updateAll();
};

function updateAll() {
  updateWeekDisplay();
  updateDateTabs();
  updateReportTitle();
  updateWeatherTable();
}

// --- Initial Render ---
updateAll();