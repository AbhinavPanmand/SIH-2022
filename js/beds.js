$(document).ready(function () {
  // Color Change
  var content_vacancy = $("td#game");
  var elements = $("h5.vac-under50");
  for (i = 0, len = elements.length; i < len; i++) {
    if (content_vacancy[i].innerHTML >= 50) {
      elements[i].style.color = "#06A3DA";
    }
    if (content_vacancy[i].innerHTML < 50) {
      elements[i].style.color = "#F57E57";
    }
    if (content_vacancy[i].innerHTML == 0) {
      elements[i].style.color = "#dc3545";
    }
  }




  //Loaction Dropdown
  // document.getElementById("select").onclick = function () {
  //   document.getElementById("list").classList.toggle("open");
  // };

  //Filtering based on location
  var rows = $("table#beds tbody > tr");
  var hiddenRows;
  for (option of document.getElementsByClassName("options")) {
    option.onclick = function () {
      for (i = 0; i < rows.length; i++) {
        rows[i].classList.remove("hidden");
        if (this.innerHTML != "All") {
          rows[i].style.display =
            rows[i].cells[1].innerHTML == this.innerHTML ? "" : "none";
          if (rows[i].style.display == "none") {
            rows[i].classList.add("hidden");
          }
        } else {
          rows[i].style.display = "";
        }
      }

      //Search Placeholder
      document.getElementById("selectText").innerHTML = this.innerHTML;
      document.getElementById("inputfield").placeholder =
        "Search for Hospitals in " + selectText.innerHTML;
    };
  }
});

//Search hospital from seleted location
function searchHospital() {
  var input, filter, td, i, txtValue;
  input = document.getElementById("inputfield");
  filter = input.value.toUpperCase();
  var rows = $("table#beds tbody > tr:not(.hidden)");
  for (i = 0; i < rows.length; i++) {
    td = rows[i].cells[0].innerHTML;
    if (td) {
      if (td.toUpperCase().indexOf(filter) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

//Buttons
function filerHospitals(type) {
  var rows = $("table#beds tr.visible");
  if (rows.length == 0) {
    rows = $("table#beds tbody > tr");
  }
  for (i = 0; i < rows.length; i++) {
    td = rows[i].getElementsByTagName("td")[4];
    if (type == "success") {
      rows[i].style.display = td.innerText > 50 ? "" : "none";
    } else if (type == "warning") {
      rows[i].style.display =
        td.innerText < 50 && td.innerText > 0 ? "" : "none";
    } else {
      rows[i].style.display = td.innerText == 0 ? "" : "none";
    }
  }
}

//Calculating Number of beds
function calculateNoOfBeds() {
  var table = document.getElementById("beds");
  var subtotal = 0;
  let vacantNumber = 0;
  let occupiedNumber = 0;
  Array.from(table.rows)
    .slice(1)
    .reduce((index, row) => {
      if (index != 0) {
        occupiedNumber += parseFloat(row.cells[4].innerHTML);
        vacantNumber += parseFloat(row.cells[3].innerHTML);
      }
    }, 0);
  subtotal = vacantNumber + occupiedNumber;
  document.getElementById("total").innerHTML = subtotal.toFixed(0);
  document.getElementById("vacant").innerHTML = vacantNumber.toFixed(0);
  document.getElementById("occupied").innerHTML = occupiedNumber.toFixed(0);
}

function filerByLocation(value) {
  var rows = $("table#beds tbody > tr");
  for (let index = 1; index < rows.length; index++) {
    const element = rows[index];
    element.classList.remove("hidden");
    if (value == "all") {
      element.style.display = "";
    } else {
      element.style.display =
        value !== element.cells[1].innerHTML.toLowerCase() ? "none" : "";
      if (element.style.display == "none") {
        element.classList.add("hidden");
      }
    }
  }
  document.getElementById("inputfield").placeholder =
    "Search for Hospitals in " + value;
}
