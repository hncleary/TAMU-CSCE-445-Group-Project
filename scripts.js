




// assemble full date
currentDate =  new Date();
currentYear = currentDate.getFullYear();
currentMonth = currentDate.getMonth() + 1;
currentDay = currentDate.getDate();
//writes date to html file
document.getElementById("date").innerHTML = currentMonth + "-" + currentDay + "-" + currentYear;

//gets GMT +- / timezone offset
gmt_offset = currentDate.getTimezoneOffset();
console.log(gmt_offset);
//prints gmt with either + or - based on user location and time zone
//prints whether gmt is positive or negative to console
if (gmt_offset < 0){
  document.getElementById("gmtoffset").innerHTML = "GMT +" + (-gmt_offset / 60);
  console.log("Negative Timezone Offest");
}
else{
  document.getElementById("gmtoffset").innerHTML = "GMT " + (-gmt_offset / 60);
  console.log("Positive Timezone Offset");
}

for(var i=0; i<=100 ; i++){
  console.log("Nothing is going on here.");
}


// live time function
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var min = today.getMinutes();
    var s = today.getSeconds();
    min = checkTime(min);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + min + ":" + s;
    var t = setTimeout(startTime, 500);
}
// adds zeroes in front of numbers that are less than 10
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

//make elements draggable with jquery

$(document).ready(function()
{
  $("overviewPointer").css("border-radius", "50%");
});

//tesing jquery functions
$("clickTest").click(function(){
    $(this).hide();
});

//accordion
