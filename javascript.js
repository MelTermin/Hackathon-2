//appending the numbers & populating the dropdown//

const select=document.getElementById("select")
console.log(select)

const details = async () => {

  let url=`https://covid19.mathdro.id/api`

  fetch(url)
 .then((response) => response.json())
 .then((data) =>  {
  const total=document.getElementById("total");
  const recovered=document.getElementById("recovered");
  const death=document.getElementById("death");
  
  const title=document.createElement("p")
  title.innerHTML=data["confirmed"]["value"]
  
  const titleRecovered=document.createElement("p")
  titleRecovered.innerHTML=data["recovered"]["value"]
  
  const titleDeath=document.createElement("p")
  titleDeath.innerHTML=data["deaths"]["value"]

  fetch(`${data.countries}`)

  .then(resp => resp.json())
       .then(country => {
         console.log(country)

         let names= country.countries
        //  console.log(names[0])



         for (let i=0; i<names.length; i++) {
           const option=document.createElement("option");
           option.value=names[i]["name"]
           option.innerText=names[i]["name"]
           select.append(option)
        
          //  console.log(names[i]["name"])
         }
     
        
       })
  
  total.append(title)
  recovered.append(titleRecovered)
  death.append(titleDeath)

 })

}
details()


function getCountryDetails() {

}

select.addEventListener("change", function (event){
  //console.log(event.target.value)//in here event.target is equal to select//
  loader.classList.remove("hidden");

  let specificCountryName=event.target.value;
// console.log(specificCountryName)
  let countryUrl=`https://covid19.mathdro.id/api/countries/${specificCountryName}`

  console.log(countryUrl)
  getCountryDetails(countryUrl,specificCountryName)
;


})

const loader= document.querySelector(".loader")
console.log(loader)
const countryName=document.getElementById("country-name")
const countryDetails=document.getElementById("country-details");
const totalCountry=document.getElementById("total-country");
const totalDeath=document.getElementById("death-country");
const totalRecovered=document.getElementById("recovered-country");

function getCountryDetails(countryUrl, specificCountryName) {

  
  
  fetch(countryUrl)
  .then((response) => response.json())
  .then((data) =>  {

    countryName.innerHTML=specificCountryName
   
    totalCountry.classList.add("country-box")
    totalCountry.innerHTML="Total"
    
    
    totalRecovered.classList.add("country-box")
    totalRecovered.innerHTML="Recovered"

        
    totalDeath.classList.add("country-box")
    totalDeath.innerHTML="Deaths"
    
    
    const title=document.createElement("p")
    title.innerHTML=data["confirmed"]["value"]

    const titleRecovered=document.createElement("p")
    titleRecovered.innerHTML=data["recovered"]["value"]
    
    const titleDeath=document.createElement("p")
    titleDeath.innerHTML=data["deaths"]["value"]

    

    //appending
    totalCountry.append(title)
    totalRecovered.append(titleRecovered)
    totalDeath.appendChild(titleDeath)

    loader.classList.add("hidden");
    displayChart(countryUrl,specificCountryName)
  
  })
}

getCountryDetails()

const chart = document.getElementById('myChart').getContext('2d');

function displayChart(countryUrl,specificCountryName) {

  fetch(countryUrl)
.then((response) => response.json())
.then((data) =>  {
  console.log(data)
  console.log(data["confirmed"]["value"])

 const myChart= new Chart(chart, 
  
  {
    type: 'bar',
    data: {
      labels: ['Infected', 'Deaths'],
      datasets: [
        {
          label: "People",
          backgroundColor: ['rgba(0, 0, 255, 0.5)','rgba(255, 0, 0, 0.5)'],
          data: [data["confirmed"]["value"], data["deaths"]["value"]]
        }
      ]
    },
    options: {
      plugins:{
         title: {
            display: true,
            text: `Current state in ${specificCountryName}`
            }
        }
    } 
  
});

 myChart.reset(); 

})

}




// 
