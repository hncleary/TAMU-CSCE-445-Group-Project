
//theyre not actually Cookies
//theyre all saved in local localStorage
//values update when pressing save values or update button



//update span value on page load
$(function() {
    console.log( "ready!" );
    $('#currentCircuitSpan').html(localStorage.getItem("currentCircuit"));
    $('#currentCircuitSpan2').html(localStorage.getItem("currentCircuit"));
    initializeDetailsValues();
    initializeCycle();
    overFlowHandler();
    loadValuesDashboard();
    unitConverter();
    checkAlarms();
});


// // // // // // // // // // // // // //
$('#save').on('click', function(){

    $('input[type="text"]').each(function(){
        var id = $(this).attr('id');
        var value = $(this).val();
       localStorage.setItem(id, value);
       console.log("saved");

    });
});

$('#load').on('click', function(){
    $('input[type="text"]').each(function(){
        var id = $(this).attr('id');
        var value = localStorage.getItem(id);

        $(this).val(value);

    });
});
// // // // // // // // // // // // // //


//function for clicking right arrow on the details screens
function rightArrowClick(){
  storeValuesDashboard();
  initializeDetailsValues()
  if(localStorage.getItem("currentCircuit") == localStorage.getItem("activeCircuits")){
    localStorage.setItem("currentCircuit",1);

  }
  /*
  else if(Number.parseInt(localStorage.getItem("currentCircuit")) > Number.parseInt(localStorage.getItem("activeCircuits"))){
    localStorage.setItem("currentCircuit",1);
  }
  */
  else{
      localStorage.setItem("currentCircuit",Number.parseInt(localStorage.getItem("currentCircuit"))+1);
  }
  $('#currentCircuitSpan').html(localStorage.getItem("currentCircuit"));
  $('#currentCircuitSpan2').html(localStorage.getItem("currentCircuit"));
  loadValuesDashboard();
  checkAlarms();
  window.location.reload(true);
};

//function for clicking the left arrow on the details screens
function leftArrowClick(){
  storeValuesDashboard();
  initializeDetailsValues()
  if(localStorage.getItem("currentCircuit") == 1){
    localStorage.setItem("currentCircuit",localStorage.getItem("activeCircuits"));

  }
  else{
      localStorage.setItem("currentCircuit",Number.parseInt(localStorage.getItem("currentCircuit"))-1);
  }
  $('#currentCircuitSpan').html(localStorage.getItem("currentCircuit"));
  $('#currentCircuitSpan2').html(localStorage.getItem("currentCircuit"));
  loadValuesDashboard();
  checkAlarms();
  window.location.reload(true);
};


//if there is is no number assigned for active circuits then
//set the default to be 12
if(localStorage.getItem("activeCircuits") == null) {
  var activeCircuitsSetting = document.getElementById("activeCircuits");
  localStorage.setItem("activeCircuits", 12);
  //activeCircuitsSetting.value = 12;
  console.log("The sctive circuit value is null");
}
else if(localStorage.getItem("activeCircuits") != null){
  var activeCircuitsSetting = document.getElementById("activeCircuits");
  //activeCircuitsSetting.value = localStorage.getItem("activeCircuits");
  console.log("The value is not null.");
};


//if there is no current circuit value then set it equal to one
if(localStorage.getItem("currentCircuit") == null){
  localstorage.setItem = 1;
};


// localStorage.setItem("activeCircuits",activeCircuitsSetting.value);
// for global settings
function storeValues(){
  //value for total active circuits
  var activeCircuitsSetting = document.getElementById("activeCircuits");
  localStorage.setItem("activeCircuits",activeCircuitsSetting.value);

};


//function for storing values on dashboard page
function storeValuesDashboard() {
  //put a function that will save all of the user inputs to local memory
  //high trip input
  localStorage.setItem("highTripInput"+localStorage.getItem("currentCircuit"), $("#highTripInput").text());
  //control band input
  localStorage.setItem("controlBandInput"+localStorage.getItem("currentCircuit"), $("#controlBandInput").text());
  //highAlarmInput
  localStorage.setItem("highAlarmInput"+localStorage.getItem("currentCircuit"), $("#highAlarmInput").text());
  //maintainInput
  localStorage.setItem("maintainInput"+localStorage.getItem("currentCircuit"), $("#maintainInput").text());
  //lowAlarmInput
  localStorage.setItem("lowAlarmInput"+localStorage.getItem("currentCircuit"), $("#lowAlarmInput").text());
  //highTripHeaterInput
  localStorage.setItem("highTripHeaterInput"+localStorage.getItem("currentCircuit"), $("#highTripHeaterInput").text());
  //lowAlarmHeaterInput
  localStorage.setItem("lowAlarmHeaterInput"+localStorage.getItem("currentCircuit"), $("#lowAlarmHeaterInput").text());
  //highTripGroundInput
  localStorage.setItem("highTripGroundInput"+localStorage.getItem("currentCircuit"), $("#highTripGroundInput").text());
  //highAlarmGroundInput
  localStorage.setItem("highAlarmGroundInput"+localStorage.getItem("currentCircuit"), $("#highAlarmGroundInput").text());
  //manual input temperature
  localStorage.setItem("manualTemperatureControlInput"+localStorage.getItem("currentCircuit"), $("#manualTemperatureControlInput").text());
    ///dispatchEvent(new Event('load'));
    //manualHeaterCurrentControlInput
  localStorage.setItem("manualHeaterCurrentControlInput"+localStorage.getItem("currentCircuit"), $("#manualHeaterCurrentControlInput").text());
  //manualGroundCurrentControlInput
  localStorage.setItem("manualGroundCurrentControlInput"+localStorage.getItem("currentCircuit"), $("#manualGroundCurrentControlInput").text());


};

function loadValuesDashboard(){
  initializeDetailsValues();

};


//set all the starting values if they were null before when the page loads
// if the user has not changed the values, then the defaults will be loaded
function initializeDetailsValues(){
    if (localStorage.getItem("TemperatureUnitsSetting") == "celsius"){
      //currentCircuit
      if (localStorage.getItem("currentCircuit") == null){
        localStorage.setItem("currentCircuit", 1);
      }
      //high trip input temp
      if (localStorage.getItem("highTripInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highTripInput"+localStorage.getItem("currentCircuit"), 325);
      }
      $("#highTripInput").text(localStorage.getItem("highTripInput"+localStorage.getItem("currentCircuit")));

      //control band input temp
      if (localStorage.getItem("controlBandInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("controlBandInput"+localStorage.getItem("currentCircuit"), 10);
      }
      $("#controlBandInput").text(localStorage.getItem("controlBandInput"+localStorage.getItem("currentCircuit")));

      //highAlarmInput temp
      if (localStorage.getItem("highAlarmInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highAlarmInput"+localStorage.getItem("currentCircuit"), 300);
      }
      $("#highAlarmInput").text(localStorage.getItem("highAlarmInput"+localStorage.getItem("currentCircuit")));

      //maintainInput temp
      if (localStorage.getItem("maintainInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("maintainInput"+localStorage.getItem("currentCircuit"), 220);
      }
      $("#maintainInput").text(localStorage.getItem("maintainInput"+localStorage.getItem("currentCircuit")));

      //lowAlarmInput
      if (localStorage.getItem("lowAlarmInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("lowAlarmInput"+localStorage.getItem("currentCircuit"), 5);
      }
      $("#lowAlarmInput").text(localStorage.getItem("lowAlarmInput"+localStorage.getItem("currentCircuit")));

      //highTripHeaterInput
      if (localStorage.getItem("highTripHeaterInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highTripHeaterInput"+localStorage.getItem("currentCircuit"), 50);
      }
      $("#highTripHeaterInput").text(localStorage.getItem("highTripHeaterInput"+localStorage.getItem("currentCircuit")));

      //highAlarmHeaterInput
      if (localStorage.getItem("highAlarmHeaterInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highAlarmHeaterInput"+localStorage.getItem("currentCircuit"), 30);
      }
      $("#highAlarmHeaterInput").text(localStorage.getItem("highAlarmHeaterInput"+localStorage.getItem("currentCircuit")));

      //lowAlarmHeaterInput
      if (localStorage.getItem("lowAlarmHeaterInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("lowAlarmHeaterInput"+localStorage.getItem("currentCircuit"), 0);
      }
      $("#lowAlarmHeaterInput").text(localStorage.getItem("lowAlarmHeaterInput"+localStorage.getItem("currentCircuit")));

      //highTripGroundInput
      if (localStorage.getItem("highTripGroundInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highTripGroundInput"+localStorage.getItem("currentCircuit"), 50);
      }
      $("#highTripGroundInput").text(localStorage.getItem("highTripGroundInput"+localStorage.getItem("currentCircuit")));

      //highAlarmGroundInput
      if (localStorage.getItem("highAlarmGroundInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highAlarmGroundInput"+localStorage.getItem("currentCircuit"), 30);
      }
      $("#highAlarmGroundInput").text(localStorage.getItem("highAlarmGroundInput"+localStorage.getItem("currentCircuit")));

      //manual temperature controlBandInput
      if (localStorage.getItem("manualTemperatureControlInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("manualTemperatureControlInput"+localStorage.getItem("currentCircuit"), 220);
      }
      $("#manualTemperatureControlInput").text(localStorage.getItem("manualTemperatureControlInput"+localStorage.getItem("currentCircuit")));
      //manualHeaterCurrentControlInput
      if (localStorage.getItem("manualHeaterCurrentControlInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("manualHeaterCurrentControlInput"+localStorage.getItem("currentCircuit"), 24);
      }
      $("#manualHeaterCurrentControlInput").text(localStorage.getItem("manualHeaterCurrentControlInput"+localStorage.getItem("currentCircuit")));
      //manualGroundCurrentControlInput
      if (localStorage.getItem("manualGroundCurrentControlInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("manualGroundCurrentControlInput"+localStorage.getItem("currentCircuit"), 20);
      }
      $("#manualGroundCurrentControlInput").text(localStorage.getItem("manualGroundCurrentControlInput"+localStorage.getItem("currentCircuit")));

    }
    else{
      //currentCircuit
      if (localStorage.getItem("currentCircuit") == null){
        localStorage.setItem("currentCircuit", 1);
      }
      //high trip input temp
      if (localStorage.getItem("highTripInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highTripInput"+localStorage.getItem("currentCircuit"), 617);
      }
      $("#highTripInput").text(localStorage.getItem("highTripInput"+localStorage.getItem("currentCircuit")));

      //control band input temp
      if (localStorage.getItem("controlBandInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("controlBandInput"+localStorage.getItem("currentCircuit"), 10);
      }
      $("#controlBandInput").text(localStorage.getItem("controlBandInput"+localStorage.getItem("currentCircuit")));

      //highAlarmInput temp
      if (localStorage.getItem("highAlarmInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highAlarmInput"+localStorage.getItem("currentCircuit"), 572);
      }
      $("#highAlarmInput").text(localStorage.getItem("highAlarmInput"+localStorage.getItem("currentCircuit")));

      //maintainInput temp
      if (localStorage.getItem("maintainInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("maintainInput"+localStorage.getItem("currentCircuit"), 428);
      }
      $("#maintainInput").text(localStorage.getItem("maintainInput"+localStorage.getItem("currentCircuit")));

      //lowAlarmInput
      if (localStorage.getItem("lowAlarmInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("lowAlarmInput"+localStorage.getItem("currentCircuit"), 104);
      }
      $("#lowAlarmInput").text(localStorage.getItem("lowAlarmInput"+localStorage.getItem("currentCircuit")));

      //highTripHeaterInput
      if (localStorage.getItem("highTripHeaterInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highTripHeaterInput"+localStorage.getItem("currentCircuit"), 50);
      }
      $("#highTripHeaterInput").text(localStorage.getItem("highTripHeaterInput"+localStorage.getItem("currentCircuit")));

      //highAlarmHeaterInput
      if (localStorage.getItem("highAlarmHeaterInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highAlarmHeaterInput"+localStorage.getItem("currentCircuit"), 30);
      }
      $("#highAlarmHeaterInput").text(localStorage.getItem("highAlarmHeaterInput"+localStorage.getItem("currentCircuit")));

      //lowAlarmHeaterInput
      if (localStorage.getItem("lowAlarmHeaterInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("lowAlarmHeaterInput"+localStorage.getItem("currentCircuit"), 0);
      }
      $("#lowAlarmHeaterInput").text(localStorage.getItem("lowAlarmHeaterInput"+localStorage.getItem("currentCircuit")));

      //highTripGroundInput
      if (localStorage.getItem("highTripGroundInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highTripGroundInput"+localStorage.getItem("currentCircuit"), 50);
      }
      $("#highTripGroundInput").text(localStorage.getItem("highTripGroundInput"+localStorage.getItem("currentCircuit")));

      //highAlarmGroundInput
      if (localStorage.getItem("highAlarmGroundInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("highAlarmGroundInput"+localStorage.getItem("currentCircuit"), 30);
      }
      $("#highAlarmGroundInput").text(localStorage.getItem("highAlarmGroundInput"+localStorage.getItem("currentCircuit")));

      //manual temp control initialization
      //manual temperature controlBandInput
      if (localStorage.getItem("manualTemperatureControlInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("manualTemperatureControlInput"+localStorage.getItem("currentCircuit"), 428);
      }
      $("#manualTemperatureControlInput").text(localStorage.getItem("manualTemperatureControlInput"+localStorage.getItem("currentCircuit")));
      //manualHeaterCurrentControlInput
      if (localStorage.getItem("manualHeaterCurrentControlInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("manualHeaterCurrentControlInput"+localStorage.getItem("currentCircuit"), 24);
      }
      $("#manualHeaterCurrentControlInput").text(localStorage.getItem("manualHeaterCurrentControlInput"+localStorage.getItem("currentCircuit")));
      //manualGroundCurrentControlInput
      if (localStorage.getItem("manualGroundCurrentControlInput"+localStorage.getItem("currentCircuit")) == null){
        localStorage.setItem("manualGroundCurrentControlInput"+localStorage.getItem("currentCircuit"), 20);
      }
      $("#manualGroundCurrentControlInput").text(localStorage.getItem("manualGroundCurrentControlInput"+localStorage.getItem("currentCircuit")));

    };
};


//checks to see what units are currently selected and what units are being used
// runs one of the two converter functions if the units are different
function unitConverter(){
  console.log("hello there");
  //if page units have not been assigned then they become the currently selected Units
  //this is to check and see if the page has been initialized with another unit of temperature
  if (localStorage.getItem("pageUnits") == null){
    localStorage.setItem("pageUnits",localStorage.getItem("TemperatureUnitsSetting"));
  }
  //checking to see if there has been a change of units and conversion is needed
  if(localStorage.getItem("pageUnits") != localStorage.getItem("TemperatureUnitsSetting")){
    console.log("the units do not match");
    if (localStorage.getItem("TemperatureUnitsSetting") == "fahrenheit"){
      convertValuesToFar();
    }
    else if (localStorage.getItem("TemperatureUnitsSetting") == "celsius") {
      convertValuesToCel();
    }
  }
  else{
    console.log("the units do match");
  }
};

//function for converting pre-existing values to F when they are already in C
function convertValuesToFar(){
  console.log("Converting Values from Celsius to Fahrenheit");
  for(var i = 1; i <=localStorage.getItem("activeCircuits"); i++){
    console.log("converting values for circuit " + i);
    localStorage.setItem("highTripInput"+i, Math.round(localStorage.getItem("highTripInput"+i)*(9/5)+32));
    localStorage.setItem("highAlarmInput"+i, Math.round(localStorage.getItem("highAlarmInput"+i)*(9/5)+32));
    localStorage.setItem("maintainInput"+i, Math.round(localStorage.getItem("maintainInput"+i)*(9/5)+32));
    localStorage.setItem("lowAlarmInput"+i, Math.round(localStorage.getItem("lowAlarmInput"+i)*(9/5)+32));
    //note --> don't convert values that aren't temperatures
    localStorage.setItem("manualTemperatureControlInput"+i, Math.round(localStorage.getItem("manualTemperatureControlInput"+i)*(9/5)+32));
    localStorage.setItem("pageUnits","fahrenheit");
  };
};
//fuction for converting pre-existing values to C when they are already in F
function convertValuesToCel(){
  console.log("Converting values from Fahrenheit to Celsius");
  for(var i = 1; i <=localStorage.getItem("activeCircuits"); i++){
    console.log("converting values for circuit " + i);
    localStorage.setItem("highTripInput"+i, Math.round((localStorage.getItem("highTripInput"+i)-32)*(5/9)));
    localStorage.setItem("highAlarmInput"+i, Math.round((localStorage.getItem("highAlarmInput"+i)-32)*(5/9)));
    localStorage.setItem("maintainInput"+i, Math.round((localStorage.getItem("maintainInput"+i)-32)*(5/9)));
    localStorage.setItem("lowAlarmInput"+i, Math.round((localStorage.getItem("lowAlarmInput"+i)-32)*(5/9)));
    //note --> don't convert values that aren't temperatures
    //localStorage.setItem("highAlarmGroundInput"+i, Math.round((localStorage.getItem("highAlarmGroundInput"+i)-32)*(5/9)));
    localStorage.setItem("manualTemperatureControlInput"+i, Math.round((localStorage.getItem("manualTemperatureControlInput"+i)-32)*(5/9)));
    localStorage.setItem("pageUnits","celsius");
  };
};

// cycles through a number of times equal to the activeCircuits
// initializes details values for every circuit based on whether the units are C or F
function initializeCycle(){
  var lastCircuit = localStorage.getItem("currentCircuit");
  for(var i = 0; i <= localStorage.getItem("activeCircuits"); i++){
    localStorage.setItem("currentCircuit", i);
    initializeDetailsValues();
  };
  localStorage.setItem("currentCircuit", lastCircuit);
};


//function for updating graph on details dashboard page
//stores values, then forces the refresh of the page
function graphUpdateButton(){
  storeValuesDashboard();
  window.location.reload(true);
};


//function for checking to see alarms need to be triggered
function checkAlarms(){
  //get alarm symbol elements
  var alarmSymbol = document.getElementById("alarmSymbolBox");
  var alarmSymbol2 = document.getElementById("alarmSymbolBox2");
  //console.log(alarmsymbol + " " + alarmSymbol2);
  //get values for alarm checking
  var currentCircuit = localStorage.getItem("currentCircuit");
  var tempValue = localStorage.getItem("manualTemperatureControlInput"+currentCircuit);
  var alarmValue = localStorage.getItem("highAlarmInput"+currentCircuit);
  var groundAlarmValue = localStorage.getItem("highAlarmGroundInput"+currentCircuit);
  var groundCurrentValue = localStorage.getItem("manualGroundCurrentControlInput"+currentCircuit);
  var heaterCurrentValue = localStorage.getItem("manualHeaterCurrentControlInput"+currentCircuit);
  var heaterAlarmValue = localStorage.getItem("highAlarmHeaterInput"+currentCircuit);

  //compare values to see if manual temp exceeds alarm temperature
  if (tempValue >= alarmValue ){
    alarmSymbol.style.display = "block";
    alarmSymbol2.style.display = "block";
  }
  else if(heaterCurrentValue >= heaterAlarmValue){
    alarmSymbol.style.display = "block";
    alarmSymbol2.style.display = "block";
  }
  else if(groundCurrentValue >= groundAlarmValue){
    alarmSymbol.style.display = "block";
    alarmSymbol2.style.display = "block";
  }
  else{
    alarmSymbol.style.display = "none";
    alarmSymbol2.style.display = "none";
  };
};

//if the frontend somehow manages to think its in a circuit thats one above the total
//number of active circuits, this will reset its value back to the maximum amount allowed
function overFlowHandler(){
  if (Number.parseInt(localStorage.getItem("currentCircuit")) > Number.parseInt(localStorage.getItem("activeCircuits"))){
    localStorage.setItem("currentCircuit",localStorage.getItem("activeCircuits"));
  }
};

function clearMemoryStorage(){
  localStorage.clear();
  window.location.href = './overview.html';
  window.location.reload(true);
};
function clearMemoryStorageDetails(){
  localStorage.clear();
  window.location.href = '../overview.html';
  window.location.reload(true);
};
