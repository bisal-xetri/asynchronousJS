'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*const getCountryData=function(country){
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
request.send();

request.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText);
  console.log(data);

  const html = `
    <article class="country">
      <img class="country__img" src="${data.flags.png}" alt="Flag of ${data.name.common}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${data.languages.nep}</p>
        <p class="country__row"><span>💰</span>${data.currencies.NPR.name}</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
});
}

getCountryData('nepal')
getCountryData('nepal')

*/
const renderCountry=function(data, className=''){

   
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" alt="Flag of ${data.name.common}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} million people</p>
      <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
      <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
    </div>
  </article>`;
  
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}
const getCountryAndNeighbor=function(country){
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
request.send();

request.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText);
  console.log(data);
  renderCountry(data)

  //get neighbour country
 const  [neighbour]=data.borders;
if(!neighbour) return;

const request2 = new XMLHttpRequest();
request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
request2.send();

request2.addEventListener("load", function(){
 
  const [data2]=JSON.parse(this.responseText)
  console.log(data2)
  renderCountry(data2,'neighbour')

})
});
}
// getCountryAndNeighbor('nepal');

getCountryAndNeighbor('nepal');
setTimeout(() => {
  console.log("1 second passed")
  setTimeout(() => {
    console.log("2 second passed")
    setTimeout(() => {
      console.log("3 second passed")
      setTimeout(() => {
        console.log("4 second passed")
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);