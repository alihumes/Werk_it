
var tbody = d3.select("tb")
// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");

var $dateInput = document.querySelector("#datetime");
var $searchBtn = document.querySelector("#filter-btn");


// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

/// from data.js
var tableData = data;

// renderTable renders the filteredData to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < tableData.length; i++) {
    // Get get the current data object and its fields
    var sightingNow = tableData[i];
    var fields = Object.keys(sightingNow);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);

    for (var j = 0; j < fields.length; j++) {
      // For every field in the data object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sightingNow[field];
    }
  }
}

function handleSearchButtonClick(event) {
  // prevent page from refreshing
  event.preventDefault();

  var filterDate = $dateInput.value.trim();

  if (filterDate.length != 0) {
    tableData = data.filter(function (sightingNow) {
      var sightingDate = sighting.datetime;
      return sightingDate === filterDate;
    });
  }

  var filterCity = $cityInput.value.trim().toLowerCase();
  if (filterCity.length !=0) {
    tableData = data.filter(function(sightingNow) {
      var sightingCity = sighting.city.toLowerCase();
      return sightingCity === filterCity;
    });
  };
  var filterState = $stateInput.value.trim().toLowerCase();
  if (filterState.length !=0) {
    tableData = data.filter(function(sightingNow) {
      var sightingState = sighting.state.toLowerCase();
      return sightingState === filterState;
    });
  };

  var filterCountry = $countryInput.value.trim().toLowerCase();
  if (filterCountry!="") {
    tableData = data.filter(function(sightingNow) {
      var dsightingCountry = sighting.country.toLowerCase();
      return sightingCountry === filterCountry;
    });
  };

  var filterShape = $shapeInput.value.trim().toLowerCase();
  if (filterShape.length!="") {
    tableData = data.filter(function(sightingNow) {
      var sightingShape = sighting.shape.toLowerCase();
      return sightingShape === filterShape;
    });
  }
  else{
      tableData = data;
  }
  renterTable();
}

function resetData() {
  tableData = data;
  $dateInput.value = "";
  $cityInput.value = "";
  $stateInput.value = "";
  $countryInput.value = "";
  $shapeInput.value = "";
  renderTable();
}

function resetForm() {
  document.getElementById("myForm").reset();
}

// Render the table for the first time on page load
renderTable();

