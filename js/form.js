window.onload = initialize;

function initialize () {
  var form = document.getElementById("form");
  form.addEventListener("submit", validateForm);
}

function validateForm () {
  var form = event.target;
  if (form.gk.value == "") {
    event.preventDefault();
    document.getElementById("errorGK").style.display = "block";
  } else {
    document.getElementById("errorGK").style.display = "none";
  } if (form.rb.value == "") {
    event.preventDefault();
    document.getElementById("errorRB").style.display = "block";
  } else {
    document.getElementById("errorRB").style.display = "none";
  } if (form.rcb.value == "") {
    event.preventDefault();
    document.getElementById("errorRCB").style.display = "block";
  } else {
    document.getElementById("errorRCB").style.display = "none";
  } if (form.lcb.value == "") {
    event.preventDefault();
    document.getElementById("errorLCB").style.display = "block";
  } else {
    document.getElementById("errorLCB").style.display = "none";
  } if (form.lb.value == "") {
    event.preventDefault();
    document.getElementById("errorLB").style.display = "block";
  } else {
    document.getElementById("errorLB").style.display = "none";
  } if (form.cdm.value == "") {
    event.preventDefault();
    document.getElementById("errorCDM").style.display = "block";
  } else {
    document.getElementById("errorCDM").style.display = "none";
  } if (form.rcm.value == "") {
    event.preventDefault();
    document.getElementById("errorRCM").style.display = "block";
  } else {
    document.getElementById("errorRCM").style.display = "none";
  } if (form.lcm.value == "") {
    event.preventDefault();
    document.getElementById("errorLCM").style.display = "block";
  } else {
    document.getElementById("errorLCM").style.display = "none";
  } if (form.rw.value == "") {
    event.preventDefault();
    document.getElementById("errorRW").style.display = "block";
  } else {
    document.getElementById("errorRW").style.display = "none";
  } if (form.st.value == "") {
    event.preventDefault();
    document.getElementById("errorST").style.display = "block";
  } else {
    document.getElementById("errorST").style.display = "none";
  } if (form.lw.value == "") {
    event.preventDefault();
    document.getElementById("errorLW").style.display = "block";
  } else {
    document.getElementById("errorLW").style.display = "none";
  } if (form.captain.value == "") {
    event.preventDefault();
    document.getElementById("errorCaptain").style.display = "block";
  } else {
    document.getElementById("errorCaptain").style.display = "none";
  } if (form.makeornot.checked == false) {
    event.preventDefault();
    document.getElementById("errorCopy").style.display = "block";
  } else {
    document.getElementById("errorCopy").style.display = "none";
  } if (form.emailradio.checked == false && form.whatsappradio.checked == false) {
    event.preventDefault();
    document.getElementById("errorSendingOption").style.display = "block";
  } else {
    document.getElementById("errorSendingOption").style.display = "none";
  } if (form.email.value == "") {
    event.preventDefault();
    document.getElementById("errorEmail").style.display = "block";
  } else {
    document.getElementById("errorEmail").style.display = "none";
  } if (form.password.value == "") {
    event.preventDefault();
    document.getElementById("errorPassword").style.display = "block";
  } else {
    document.getElementById("errorPassword").style.display = "none";
  } if (form.passwordrepeat.value == "" && form.password.value != "") {
    event.preventDefault();
    document.getElementById("errorRepeatPassword").style.display = "block";
  } else {
    document.getElementById("errorRepeatPassword").style.display = "none";
  } if (form.password.value != form.passwordrepeat.value && form.passwordrepeat.value != "" && form.password.value != "") {
    event.preventDefault();
    document.getElementById("errortPasswordComparison").style.display = "block";
  } else {
    document.getElementById("errortPasswordComparison").style.display = "none";
  } if (form.phone.value == "") {
    event.preventDefault();
    document.getElementById("errorPhoneNumber").style.display = "block";
  } else {
    document.getElementById("errorPhoneNumber").style.display = "none";
  } if (form.copies.value == "") {
    event.preventDefault();
    document.getElementById("errorNumberCopies").style.display = "block";
  } else {
    document.getElementById("errorNumberCopies").style.display = "none";
  } if (form.copies.value != "" && form.copies.value < 1 || form.copies.value > 10) {
    event.preventDefault();
    document.getElementById("errorCopiesAmount").style.display = "block";
  } else {
    document.getElementById("errorCopiesAmount").style.display = "none";
  }
}
