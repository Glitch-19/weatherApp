const  weatherform=document.querySelector(".weatherform");
const  cityinput=document.querySelector(".weatherinput");
const card=document.querySelector(".card");
const apikey="79496c34b2b17001e374b2cea6d9363d";
weatherform.addEventListener("submit", async event=>{
    event.preventDefault();
    const city=cityinput.value;
    if(city){
        try{
            const weatherdata= await getweatherdata(city);
            displayweatherdata(weatherdata);
        }catch(error){
            console.error(error);
            displayerror(error);
        }

    }else{
        displayerror("please enter valid city");
    }

});


async function getweatherdata(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response= await fetch(apiurl);
    if(!response.ok){
        throw new Error("Could not fetch whether data");

    }
    return await response.json();
}
function displayweatherdata(data){
  const {name:city,
    main:{temp,humidity},
    weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";


    const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("p");
    const humiditydisplay=document.createElement("p");
    const desdisplay=document.createElement("p");
    const whetheremoji=document.createElement("p");

    citydisplay.textContent=city;
    card.appendChild(citydisplay);
    card.classList.add("citydisplay");
    
    tempdisplay.textContent=`${(temp-273.15).toFixed(1)} ℃ `;
    card.appendChild(tempdisplay);
    
    card.classList.add("temdisplay");
    humiditydisplay.textContent=`Humidity: ${humidity}%`;
    card.appendChild(humiditydisplay);
    card.classList.add("humiditydisplay");
    desdisplay.textContent=description;
    card.appendChild(desdisplay);
    card.classList.add("desdisplay");
    whetheremoji.textContent=displayweatheremoji(id);
    card.appendChild(whetheremoji);
    card.classList.add("whetheremoji");
    whetheremoji.style.fontSize="2 em";


}

function displayweatheremoji(whetherid){
 switch(true){
 case (whetherid>=200 && whetherid<300):
    card.style.background="url(thunderstorm.jpg)";
    card.style.backgroundSize="cover";

    return "⛈️";
 
case (whetherid>=300 && whetherid<400):
    card.style.background="url(drizzle.gif)";
    card.style.backgroundSize="cover";
    card.style.backgroundRepeat="no-repeat";
    return "🌦️";
case (whetherid>=500 && whetherid<600):
    card.style.background="url(heavyrain.gif)";
    card.style.backgroundSize="cover";
    card.style.backgroundRepeat="no-repeat"; 
    return "🌧️";
case (whetherid>=600 && whetherid<700):
    card.style.background="url(snowfall.jpg)";
    card.style.backgroundSize="cover";
    card.style.backgroundRepeat="no-repeat";
     return "❄️";
case (whetherid>=700 && whetherid<800):
    card.style.background="url(fog.jpg)";
    card.style.backgroundSize="cover";
    card.style.backgroundRepeat="no-repeat";
     return "🌫️";
case (whetherid===800):
    card.style.background="url(sunny.gif)";
    card.style.backgroundSize="cover";
    card.style.backgroundRepeat="no-repeat";
     return "🌞";
case (whetherid>=801 && whetherid<810):
    card.style.background="url(sunundercloud.jpg)";
    card.style.backgroundSize="cover";
    card.style.backgroundRepeat="no-repeat";
        return "⛅";
 }
}

function displayerror(message){

    const errordisplay=document.createElement("p");
    errordisplay.textContent=message;
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);

}