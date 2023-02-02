// Add onclick listeners to buttons
document.getElementById("startTimerButton").onclick = function(){
    console.log("Timer start button clicked");
    var HoursInputFieldValue = parseInt(document.getElementById("timerInputHoursField").value);
    var MinutesInputFieldValue = parseInt(document.getElementById("timerInputMinutesField").value);
    var SecondsInputFieldValue = parseInt(document.getElementById("timerInputSecondsField").value);
    var HoursInputFieldValueString = document.getElementById("timerInputHoursField").value;
    var MinutesInputFieldValueString = document.getElementById("timerInputMinutesField").value;
    var SecondsInputFieldValueString = document.getElementById("timerInputSecondsField").value;
    console.log("Hours = " + HoursInputFieldValue + " Minutes = " + MinutesInputFieldValue + " Seconds = " + SecondsInputFieldValue);
    if(!(HoursInputFieldValue < 0 || HoursInputFieldValueString.indexOf("NaN") == -1 || MinutesInputFieldValue < 0 || MinutesInputFieldValueString.indexOf("NaN") == -1 || SecondsInputFieldValue < 0 || SecondsInputFieldValueString.indexOf("NaN") == -1)){
        console.log("Exception check passed");
    }
}