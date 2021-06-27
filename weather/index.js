window.onload = init;

var input = document.querySelector('.city');

function init(){
  //check if data exist in local storage
  if(localStorage.length){
      showFromLocal()    
  }
}

// init variables
let weatherArray=[]
let weatherData={
  weather: "",
  humidity:"",
  pressure:"",
  icon:"",
  cityName:"",
}

function getWeather(){
  ///get data from openweathermap api
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=3e64b998b7246cf7a8eff56388227375&units=metric')
.then(response => response.json())
.then(data => {
  console.log(data);
  // format data to pass into display weather function
  displayWeather(Math.round(data['main']['temp']),data['main']['humidity'],data['main']['pressure'],data['weather']['0']['icon'],data['name']);

}).catch(err=> alert("złe miasto"));
//reset input
input.value = "";
}



function displayWeather(weather,humidity,pressure,icon,cityName){

  //init divs with data
  let c1=document.createElement("div")
  c1.className="c1";
  let c2=document.createElement("div")
  c2.className="c2";
  let dane=document.createElement("div")
  dane.className="dane";
  //display icon from api  
  let img = document.createElement("img")
  img.src='http://openweathermap.org/img/w/'+icon+'.png'

  let weatherbox = document.createElement("div");
  weatherbox.className="weatherbox";
  ///display degrees
  let degrees = document.createElement("div")
  degrees.className="degree";
  degrees.innerHTML=weather +" °C";
  //display humidity
  let humid = document.createElement("div")
  humid.innerHTML="wilgotność: " + humidity +"%";
  ///display pressure
  let press = document.createElement("div")
  press.innerHTML="ciśnienie: " + pressure+"hPa";


  //display city data
  let city = document.createElement("div")
  city.innerHTML=cityName;

  weatherbox.appendChild(c1);
  weatherbox.appendChild(c2);
 
  c1.appendChild(img);
  c1.appendChild(degrees);
  c1.appendChild(dane);
  dane.appendChild(humid);
  dane.appendChild(press);
  c2.appendChild(city);

  document.querySelector("#pogody").appendChild(weatherbox)

  weatherData.weather = weather;
  weatherData.humidity = humidity;
  weatherData.pressure = pressure;
  weatherData.icon = icon;
  weatherData.cityName = cityName;
  weatherArray.push(weatherData);
  weatherData={};
  addToLocal("pogody",weatherArray)
}

function showFromLocal(){
  /// get pogody from local storage
  let local = JSON.parse(localStorage.getItem('pogody'))
  if(local===null){
      //nic
  }
  else{

      let i = 0
      while(i<local.length)
      {
        displayWeather(local[i].weather,local[i].humidity,local[i].pressure,local[i].icon,local[i].cityName)
          i++
      }
  }
}

function addToLocal(key,value){
  ///save weather data in localstorage
  jsonParse = JSON.stringify(value)
  localStorage.setItem(key, jsonParse)
 
}
///reset local storage
function clearLocalStorage(){
  localStorage.clear()
  weatherArray = []
  weatherData = {}
  location.reload()
}
