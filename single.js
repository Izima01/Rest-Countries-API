let countryName = localStorage.getItem('countryName');
// console.log(countryName);
let countryInfo;

const getSingleData = (name) => {
    let singleUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    fetch(singleUrl)
    .then(response => response.json())
    .then(data => {
        countryInfo = data[0];
        renderDetails();
    });
};
// getSingleData(countryName);

document.addEventListener('DOMContentLoaded', getSingleData(countryName));
// getSingleData();

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
    flag.setAttribute("src", countryInfo?.flags?.png);
    fullName.innerHTML = countryInfo?.name?.official;
    nativeName.innerHTML = countryInfo?.name?.nativeName?.eng?.official || countryInfo?.name?.official || " ";
    population.innerHTML = countryInfo.population;
    region.innerHTML = countryInfo.region;
    subRegion.innerHTML = countryInfo.subregion || "";
    capital.innerHTML = countryInfo.capital || "";
    domain.innerHTML = countryInfo.tld[0];
    currencies.innerHTML = countryInfo.currencies ? Object.keys(countryInfo.currencies)[0] : "";
    let languages = countryInfo.languages ? Object.values(countryInfo.languages): "";
    console.log(languages);
    let langList = languages && languages.join(", ");
    console.log(langList);
    lang.innerHTML = langList;
    let borderArray = countryInfo?.borders;
    console.log(borderArray);
    renderBorder(borderArray);
}

const templateBtn = document.getElementById("sampleBtn").content;
const renderBorder = (array) => {
    document.querySelector(".border-countries div").innerHTML = "";
    console.log(array);
    array?.forEach(country => {
        let templateCopy = document.importNode(templateBtn, true);
        console.log(country);
        templateCopy.innerHTML = country;
        templateCopy.value = country;
        console.log(templateCopy);
        // document.querySelector(".border-countries div").appendChild(templateCopy);
    });
}