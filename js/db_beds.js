import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlk8i5tEPlqosAbDP-Ogir8BGRqVRsAxE",
  authDomain: "swaystya.firebaseapp.com",
  databaseURL: "https://swaystya-default-rtdb.firebaseio.com",
  projectId: "swaystya",
  storageBucket: "swaystya.appspot.com",
  messagingSenderId: "565865735826",
  appId: "1:565865735826:web:4f290f03bc70e1c19fe84b",
  measurementId: "G-ER6C8H148Z",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
var tbody = document.getElementById("tableBody");
var count = 0;



function AddItemToTable(element) {
  count += 1;

  var trow = document.getElementById("defaultRow");
  var newRow = trow.cloneNode(true);
  newRow.cells[0].childNodes.forEach((el) => {
    if (el.nodeName == "H5") {
      el.innerHTML = element.nameOfHospital;
      localStorage.setItem('nameofHospital',element.nameOfHospital);
    
    }
    if (el.nodeName == "ADDRESS") {
      el.innerHTML = element.address;
    }
    if (el.nodeName == "DIV") {
      el.childNodes[2].innerHTML = element.phoneNo;
      var embed =
        "https://maps.google.com/maps?&amp;q=" +
        encodeURIComponent(element.address) +
        "&amp;output=embed'>";
      el.childNodes[4].href = embed;

      // var geocoder = new google.maps.Geocoder();

      //       geocoder.geocode( { 'address': element.address}, function(results, status) {

      //           if (status == google.maps.GeocoderStatus.OK) {
      //               var latitude = results[0].geometry.location.lat();
      //               var longitude = results[0].geometry.location.lng();
      //           }

      //           // var myLatLng = {lat: latitude, lng: longitude};

      //           // var map = new google.maps.Map(document.getElementById('map'), {
      //           //     zoom: 4,
      //           //     center: myLatLng
      //           // });

      //           // var marker = new google.maps.Marker({
      //           //     position: myLatLng,
      //           //     map: map,
      //           //     title: 'Hello World!'
      //           // });

      //      });
    }
    if (el.nodeName == "P") {
      el.innerHTML = "Last updated at: " + element.time;
    }
    
  });


  newRow.cells[1].innerHTML = element.location;
  newRow.cells[2].childNodes[1].innerHTML = element.type;
  let selectedBedType = document.querySelector(
    'input[name="typeofbed"]:checked'
  ).id;

  newRow.cells[3].innerHTML = 4-(element[selectedBedType]);
  newRow.cells[4].innerHTML = element[selectedBedType];
 
  if (newRow.cells[3].innerHTML == 0) {
    alert('NO VACANT BEDS -');
    alert(element.nameOfHospital);
    // console.log("HEllo");('NO VACANT BEDS -')
    // console.log("HEllo");(element.nameOfHospital)

  }

  console.log(element[selectedBedType]);

  newRow.cells[5].innerHTML = 4;

  newRow.removeAttribute("hidden");
  newRow.setAttribute("id", count);

  tbody.appendChild(newRow);
}

function GetAllDataOnce() {
  const dbRef = ref(db);

  get(child(dbRef, "Beds")).then((snapshot) => {
    var students = [];

    snapshot.forEach((childSnapshot) => {
      students.push(childSnapshot.val());
    });

    AddAllItemsToTable(students);
  });
}

function AddAllItemsToTable(hospitalData) {
  count = 0;
  document.querySelectorAll("tbody tr:not(#defaultRow)").forEach((tr) => {
    tr.remove();
  });

  hospitalData.forEach((element) => {
    AddItemToTable(element);
  });
  calculateNoOfBeds();
}

function GetAllDataRealtime() {
  localStorage.clear();
  const dbRef = ref(db, "Beds");
  onValue(dbRef, (snapshot) => {
    var hospitalData = [];

    snapshot.forEach((childSnapshot) => {
      hospitalData.push(childSnapshot.val());
    });
    localStorage.setItem("hospitalData", JSON.stringify(hospitalData));
    AddAllItemsToTable(hospitalData);
  });
}

$(document).ready(function () {
  GetAllDataRealtime();
  var rad = document.querySelectorAll('input[name="typeofbed"]');
  var prev = null;
  for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener("change", function () {
      if (this !== prev) {
        let data = JSON.parse(localStorage.getItem("hospitalData") || "[]");
        AddAllItemsToTable(data);
        prev = this;
      }
    });
  }
});
