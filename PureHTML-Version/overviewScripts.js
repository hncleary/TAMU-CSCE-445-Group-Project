/////////////////////

// Temperature Set Point Overview Wheel
//Current Temperature of Circuit
if (localStorage.getItem("TemperatureUnitsSetting") == "celsius"){
  $('#tempCurrent').html(220);
  $('#tempSetPoint').html(223);
}
else{
  $('#tempCurrentF').html(430);
  $('#tempSetPoint').html(428);
};



//Current Heater Current
$('#heaterCurrent').html(0);

//Current Ground Current
$('#groundCurrent').html(0);
