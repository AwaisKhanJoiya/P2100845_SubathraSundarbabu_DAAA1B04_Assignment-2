"use strict"
/*

 class:DAAA/1B/04
Name: Subathra Sundarbabu
Admin no.: P2100845


*/

/*Function is named as time*/
function Time() {
   var date = new Date();
   var year = date.getYear();
         if(year < 1000){
            year += 1900
         }
   var day = date.getDay();
   var month = date.getMonth();
   var dailydate = date.getDate();
   /*Array created for the days and months*/
   var dayarray = new Array("Sunday,","Monday,","Tuesday,","Wednesday,","Thursday,","Friday,","Saturday,");
   var montharray = new Array("January","February","March","April","May","June","July","August","September","October","November","December");


   /*Methods to calculate for the hours, minutes and seconds*/
   var currentTime = new Date();
   var hours = currentTime.getHours();
   var minutes = currentTime.getMinutes();
   var seconds = currentTime.getSeconds();
   /*if caluse used to program the minutes, hours and seconds daily*/
       if (hours == 24) {
          hours = 0;
       } else if (hours > 12) {
          hours = hours -0;
       }
       if (hours < 10) {
          hours = "0" + hours;
       }
       if (minutes < 10){
         minutes = "0" + minutes;
       }
       if (seconds < 10) {
         seconds = "0" + seconds;
       }
       var clock = document.getElementById("clock");
       /*To display in this form in the webpage*/
       clock.textContent = " " + dayarray[day] + " " + dailydate + " " + montharray[month] + " " + year + " | " + hours + " : " + minutes + " : " + seconds;
       clock.innerText = " " + dayarray[day] + " " + dailydate + " " + montharray[month] + " " + year + " | " + hours + " : " + minutes + " : " + seconds;

       setTimeout("Time()" , 1000);
}
Time();
