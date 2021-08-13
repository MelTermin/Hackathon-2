//appending the numbers & populating the dropdown//

const select=document.getElementById("select")
console.log(select)

const details = async () => {

  let url=`https://api.covid19api.com/summary`

  fetch(url)
 .then((response) => response.json())
 .then((data) =>  {
  const totalNew=document.getElementById("total-new-confirmed");
  const totalConfirmed=document.getElementById("total-confirmed");
  const totalDeaths=document.getElementById("total-deaths");
  
  const titleNew=document.createElement("p")
  titleNew.innerHTML=data["Global"]["NewConfirmed"]
 titleNew.classList.add("number")

  const date=document.createElement("p")
  date.innerHTML="Last updated:" + " " +  new Date(data["Global"]["Date"]).toLocaleDateString("en-US")
  
  const titleConfirmed=document.createElement("p")
  titleConfirmed.innerHTML=data["Global"]["TotalConfirmed"]
  titleConfirmed.classList.add("number")
  
  const date1=document.createElement("p")
  date1.innerHTML="Last updated:" + " " + new Date(data["Global"]["Date"]).toLocaleDateString("en-US")

  const titleDeaths=document.createElement("p")
  titleDeaths.innerHTML=data["Global"]["TotalDeaths"]
  titleDeaths.classList.add("number")
  const date2=document.createElement("p")
  date2.innerHTML="Last updated:" + " " + new Date(data["Global"]["Date"]).toLocaleDateString("en-US")

  
  let countries=data["Countries"]

        for (let i=0; i<countries.length; i++) {
           const option=document.createElement("option");
           option.value=countries[i]["Country"]
           option.innerText=countries[i]["Country"]
           select.append(option)
         }

  totalNew.append(titleNew,date)
  totalConfirmed.append( titleConfirmed,date1)
  totalDeaths.append(titleDeaths, date2)

 })

}
details()

const loader= document.querySelector(".loader")
console.log(loader)
const countryName=document.getElementById("country-name")
const countryDetails=document.getElementById("country-details");
const totalCountry=document.getElementById("total-country");
const totalDeath=document.getElementById("death-country");
const totalRecovered=document.getElementById("recovered-country");

function getCountryDetails() {

}

select.addEventListener("change", function (event){
  //console.log(event.target.value)//in here event.target is equal to select//
loader.classList.remove("hidden");

  let specificCountryName=event.target.value;
  console.log(specificCountryName)
  
// console.log(specificCountryName)
  let countryUrl=`https://covid19.mathdro.id/api/countries/${specificCountryName}`

  console.log(countryUrl)
  getCountryDetails(countryUrl,specificCountryName)
;


})



function getCountryDetails(countryUrl, specificCountryName) {

  
  
  fetch(countryUrl)
  .then((response) => response.json())
  .then((data) =>  {

    countryName.innerHTML=specificCountryName
   
    totalCountry.classList.add("country-box")
    totalCountry.innerHTML="Total"
    
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





