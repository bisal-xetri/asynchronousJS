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
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" alt="Flag of ${
    data.name.common
  }" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} million people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>`;
 
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError=function(msg){

  countriesContainer.insertAdjacentText('beforeend',msg);
  // countriesContainer.style.opacity=1;
}
/*
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
*/

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

const request = fetch('https://restcountries.com/v3.1/name/nepal');


//promises are placeholder for future value/ response coming from AJAX call

// const getCountryData=function(country){
//   fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response){

//     console.log(response);
//     return response.json();
//   }).then(function(data){
//     console.log(data)
//     renderCountry(data[0])
//     const neighbor=data[0].borders[0];
//        if(!neighbor)return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//   }).then(response=>response.json())
//   .then(data=>renderCountry(data,'neighbor'))
  
// }

// }
/*const getCountryData=function(country){
  fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(response=>response.json())
  .then(data=>{
    renderCountry(data[0]);
    const neighbor=data[0].borders[0];
    if(!neighbor) return;
    return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
  })
  .then(response=>response.json())
  .then(data=>renderCountry(data,'neighbour'))
}
getCountryData('nepal'); */
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      // Check if data[0] and flags exist to prevent undefined error
      if (!data[0] || !data[0].flags) throw new Error('Country data is incomplete');
      
      renderCountry(data[0]);

      // Check if borders exist before accessing the first border
      const neighbor = data[0].borders ? data[0].borders[0] : null;
      if (!neighbor) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(response => response ? response.json() : null)
    .then(data => {
      if (data) renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try Again!`);
    })
    .finally(()=>{
      countriesContainer.style.opacity = 1;
    })
};

btn.addEventListener("click", function() {
  getCountryData('nepal');
});

// getCountryData('xyxy');

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor =  data[0].borders[0];
//       if (!neighbor) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response=>response.json())
//     .then(data=>renderCountry(data,'neighbour'))
//     .catch(err=>{console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}.Try Again`);
    
//     })
//     .
// };




