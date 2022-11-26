let countryInfo;
const templateBtn = document.getElementById("sampleBtn").content;

const countyName = sessionStorage.getItem('name');
console.log(countyName);

function getSingleData(name) {
    let singleUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    fetch(singleUrl)
        .then(response => response.json())
        .then(data => {
            countryInfo = data[0];
            console.log(countryInfo);
            renderDetails();
        });
};

document.addEventListener('DOMContentLoaded', getSingleData(countyName));

const getBorderInfo = (array) => {
    document.querySelector(".border-countries div").innerHTML = "";
    array?.forEach(country => {
        let singleUrl = `https://restcountries.com/v3.1/alpha/${country}`;
        fetch(singleUrl)
        .then(response => response.json())
        .then(data => {
            let templateCopy = document.importNode(templateBtn, true);
            console.log(data[0].name.common);
            templateCopy.querySelector(".border").textContent = data[0].name.common;
            document.querySelector(".border-countries div").appendChild(templateCopy);
        });
    });
};

document.querySelector(".border-countries div").addEventListener('click', (event)=> {
    if (event.target.className === "border") {
        console.log("Thats a border");
        // console.log(event.target.innerHTML);
        getSingleData(event.target.innerHTML);
    }
});


let flag = document.querySelector("#flagImg");
let fullName = document.querySelector(".fullName");
let nativeName = document.querySelector(".native-name");
let population = document.querySelector(".population");
let region = document.querySelector(".region");
let subRegion = document.querySelector(".sub-region");
let capital = document.querySelector(".capital");
let domain = document.querySelector(".domain");
let currencies = document.querySelector(".Currencies");
let lang = document.querySelector(".lang");

const renderDetails = () => {
    console.log(countryInfo);
    countryInfo && document.querySelector('aside').classList.add("d-none");
    flag.setAttribute("src", countryInfo?.flags?.png);
    fullName.innerHTML = countryInfo?.name?.official || " ";
    nativeName.innerHTML = countryInfo?.name?.nativeName?.eng?.official || countryInfo?.name?.official || " ";
    population.innerHTML = countryInfo.population;
    region.innerHTML = countryInfo.region || " ";
    subRegion.innerHTML = countryInfo.subregion || " ";
    capital.innerHTML = countryInfo.capital || " ";
    domain.innerHTML = countryInfo.tld[0] || " ";
    currencies.innerHTML = countryInfo.currencies ? Object.keys(countryInfo.currencies)[0] : " ";
    let languages = countryInfo.languages ? Object.values(countryInfo.languages): " ";
    // console.log(languages);
    let langList = languages && languages.join(", ");
    // console.log(langList);
    lang.innerHTML = langList;
    let borderArray = countryInfo?.borders;
    console.log(borderArray);
    if (!borderArray) {
        console.log("no borders");
        document.querySelector(".border-countries div").innerHTML = "No borders"
    } else {
        getBorderInfo(borderArray)
    }
    // (!borderArray) ? document.querySelector(".border-countries div").innerHTML = "No borders" : getBorderInfo(borderArray);
}