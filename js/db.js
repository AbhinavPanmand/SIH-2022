import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getDatabase, set, ref, } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  var FIRSTNAME = getElementVal("first-name");
  var LASTNAME = getElementVal("last-name");
  var PHONENUMBER = getElementVal("phone-number");
  var EMAIL = getElementVal("email");
  // var GENDER = getElementVal("Male");
  var GENDER = localStorage.getItem("Gender");
  var HOSPITALNAME = getElementVal("hospitalname");
  var DATEOFAPPOINTMENT = getElementVal("date");
  var TIME = getElementVal("Time");
  var SYMPTOMS = getElementVal("symptoms");

  saveMessages(
    FIRSTNAME,
    LASTNAME,
    PHONENUMBER,
    EMAIL,
    GENDER,
    HOSPITALNAME,
    DATEOFAPPOINTMENT,
    TIME,
    SYMPTOMS
  );
  document.getElementById("contactForm").reset();
}

function saveMessages(
  FIRSTNAME,
  LASTNAME,
  PHONENUMBER,
  EMAIL,
  GENDER,
  HOSPITALNAME,
  DATEOFAPPOINTMENT,
  TIME,
  SYMPTOMS
) {
  var abcd = Math.floor(Math.random() * 100);
  set(ref(database, "Appointments/" + abcd), {
    firstname: FIRSTNAME,
    lastname: LASTNAME,
    phonenumber: PHONENUMBER,
    email: EMAIL,
    gender: GENDER,
    hospitalname: HOSPITALNAME,
    dateofappointment: DATEOFAPPOINTMENT,
    time: TIME,
    symptoms: SYMPTOMS,
  });
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
