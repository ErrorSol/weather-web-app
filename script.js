// import "./suggestion.js"
//import { citiesList, l_f_c, loadData } from "./suggestion";
const apiKey="4f9aa978f035de553b64413fe3fe4a75";
//var url="https://api.openweathermap.org/data/2.5/weather?q=ghaziabad&appid=4f9aa978f035de553b64413fe3fe4a75&units=metric";
let btn=document.querySelector(".button-ele");
const WIcon=document.querySelector(".weather-icon");
let city=document.querySelector(".input-city");
const card=document.querySelector(".weather");
const details=document.querySelector(".details");
const url="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

 async function checkweather(City) {
    
    const response = await fetch(url+City+`&appid=${apiKey}`);
    const data= await response.json();
    card.classList.remove("remove");
    //card.style.animationDuration="2s";
    if(data.message==="city not found"||city.value==""){
        details.classList.add("remove");
        document.querySelector(".city").innerHTML="Please Enter Correct City";
        document.querySelector(".temp").innerHTML=" ";
        document.querySelector(".humidity").innerHTML=" ";
        document.querySelector(".wind").innerHTML=" ";
        WIcon.src=`images/error.png`
        city.value="";
    }
    else{
        details.classList.remove("remove");
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=data.main.temp;
        document.querySelector(".humidity").innerHTML=data.main.humidity;
        document.querySelector(".wind").innerHTML=data.wind.speed;
        W_main=data.weather[0].main;
        WIcon.src=`images/${W_main}.png`
 }
document.querySelector(".container").classList.add("remove");


}

 btn.addEventListener("click",()=>{
    var City=city.value;
    checkweather(City);
})
city.addEventListener("keypress",(event)=>{
    if(event.key==="Enter"){
    var City=city.value;
    checkweather(City);
    // city.addEventListener("keypress",()=>{
    //     city.value="";
    //     return;
    // })
 }
})

//c=loadData(l_f_c,citiesList)



// function fetchCities(){
//      fetch("city.list.json")
//      .then((response)=>response.json())
//      .then((data)=>{
//         data.forEach(City => {
//             cities_list.push(City.name);
//             });
//      });
//      console.log(cities_list)
// }
// fetchCities();
const cities_list=[];
const citiesList=document.querySelector(".auto");
const inputElement=document.querySelector(".input-city");

async function getCities() {
const cities=await fetch("current.city.list.json")
const data=await cities.json();

// const c=data.name;
data.forEach(City => {
    cities_list.push(City.name);
});

return cities_list;
}

// async function main() {
//     const city_list=await getCities();
// }
// main();
async function save() {
    final_cities=await getCities();
    final_cities.sort();
    final_cities.splice(0,2);
    loadData(final_cities,citiesList);
    return final_cities;
}

//save();

function loadData(final_cities,element){
    if(final_cities){
        element.innerHTML="";
        let innerElement="";
        final_cities.forEach((item)=>
        {
            innerElement+=`<li class="LI">${item}</li>`;
        });
        element.innerHTML=innerElement;
    }
   Selected_city=document.querySelector(".LI");
    Selected_city.addEventListener("click",()=>{
        city.value=Selected_city.innerText;
        checkweather(city.value);
    //save();

}
)
return inputElement.value;
}
function filterData(data,searchText){
    return data.filter((x)=>
       x.toLowerCase().includes(searchText.toLowerCase())
    );
}

inputElement.addEventListener("input", function(){
   const filteredData= filterData(final_cities,inputElement.value);
   loadData(filteredData,citiesList);
});

inputElement.addEventListener("click",()=>{
    save();
    document.querySelector(".container").classList.remove("remove")
}
);

// async function selected() {
//     await loadData();
//     Selected_city=document.querySelector(".LI");
//     console.log(Selected_city)
//     Selected_city.addEventListener("click",()=>{
//         console.log(Selected_city.value)
//         inputElement.value=Selected_city.innerText;
//     }
//     )
// }
// selected();