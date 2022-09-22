const url = "https://restcountries.com/v3.1/all";
let template = document.getElementById("sample").content;
const searchBar = document.querySelector(".searchBar");
// let selectedCountry;
let countrySection = document.querySelector(".countries");
let countryNames = countrySection.getElementsByClassName("name");
let regions = countrySection.getElementsByClassName("region");
const detailsContainer = document.querySelector("#details-container");
let countryData = [];

const themeButton = document.querySelector("header button");
console.log(themeButton.firstElementChild);
themeButton.addEventListener('click', ()=> {
    console.log("Change theme");
    document.body.classList.toggle("darkmode");
    document.body.classList.toggle("lightmode");
    if (document.body.classList.contains("darkmode")) {
        themeButton.firstElementChild.classList.remove("bi-moon");
        themeButton.firstElementChild.classList.add("bi-brightness-low");
    } else {
        themeButton.firstElementChild.classList.add("bi-moon");
        themeButton.firstElementChild.classList.remove("bi-brightness-low");
    }
});

const getCountries = () => {
    let countries = [];
    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(aData => {
            countries.push(aData);
        });
        countries.sort((a,b) => a.name.official !== b.name.official ? a.name.official < b.name.official ? -1: 1 : 0);
        countryData = countries;
        renderCountries();
    });
};
document.addEventListener('DOMContentLoaded', getCountries());

const renderCountries = () => {
    document.querySelector(".countries").innerHTML = "";
    countryData.forEach(countries => {
        let copy = document.importNode(template, true);
        // copy.id = countries
        copy.querySelector(".flag").src = countries.flags.png;
        copy.querySelector(".name").textContent = countries.name.official;
        copy.querySelector(".population").textContent = countries.population;
        copy.querySelector(".region").textContent = countries.region;
        if (typeof countries.capital === "object") {
            copy.querySelector(".capital").textContent = countries.capital[0];
        } else {
            copy.querySelector(".capital").textContent = countries.capital;
        };
    document.querySelector(".countries").appendChild(copy);
    });
};

const searchCountries = () => {
    const countryNamesArray = Array.from(countryNames);
    let searchValue = searchBar.value.toLowerCase();
    countryNamesArray.forEach(name => {
        let nameString = name.innerHTML.toLowerCase();
        if (!nameString.includes(searchValue)) {
            name.parentElement.parentElement.classList.add("d-none");
        }
        if (nameString.includes(searchValue)) {
            name.parentElement.parentElement.classList.remove("d-none");
        };
    });
};

const searchRegion = () => {
    const e = document.getElementById("region");
    let value = e.value.toLowerCase();
    const regionUrl = `https://restcountries.com/v3.1/region/${value}`;
    if (value === "") {
        getCountries();
    } else {
        let countries = [];
        fetch(regionUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(aData => countries.push(aData));
            countries.sort((a,b) => a.name.official !== b.name.official ? a.name.official < b.name.official ? -1: 1 : 0);
            countryData = countries;
            renderCountries();
        });
    }
}
// countrySection.parentElement
countrySection.addEventListener('click', (event) => {
    console.log(detailsContainer.classList);
    let target;
    if ((event.target.tagName === "H3") || (event.target.tagName === "P") || (event.target.className === "card-body") || (event.target.tagName === "IMG")) {
        target = event.target.parentElement.firstElementChild.innerHTML;
        detailsContainer.classList.remove("d-none");
        countrySection.classList.add("d-none");
    };
    // console.log(target);
    getSingleData(target);
});

document.querySelector(".back").addEventListener('click', () => {
    detailsContainer.classList.add("d-none");
    countrySection.classList.remove("d-none");
});

// Details page script
let countryInfo;
const templateBtn = document.getElementById("sampleBtn").content;

function getSingleData(name) {
    let singleUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    fetch(singleUrl)
    .then(response => response.json())
    .then(data => {
        countryInfo = data[0];
        renderDetails();
    });
};

const getBorderInfo = (array) => {
    detailsContainer.querySelector(".border-countries div").innerHTML = "";
    array?.forEach(country => {
        let singleUrl = `https://restcountries.com/v3.1/alpha/${country}`;
        fetch(singleUrl)
        .then(response => response.json())
        .then(data => {
            let templateCopy = document.importNode(templateBtn, true);
            console.log(data[0].name.common);
            templateCopy.querySelector(".border").textContent = data[0].name.common;
            detailsContainer.querySelector(".border-countries div").appendChild(templateCopy);
        });
    });
};

detailsContainer.querySelector(".border-countries div").addEventListener('click', (event)=> {
    if (event.target.className === "border") {
        console.log("Thats a border");
        // console.log(event.target.innerHTML);
        getSingleData(event.target.innerHTML);
    }
});


let flag = detailsContainer.querySelector("#flagImg");
let fullName = detailsContainer.querySelector(".fullName");
let nativeName = detailsContainer.querySelector(".native-name");
let population = detailsContainer.querySelector(".population");
let region = detailsContainer.querySelector(".region");
let subRegion = detailsContainer.querySelector(".sub-region");
let capital = detailsContainer.querySelector(".capital");
let domain = detailsContainer.querySelector(".domain");
let currencies = detailsContainer.querySelector(".Currencies");
let lang = detailsContainer.querySelector(".lang");

const renderDetails = () => {
    console.log(countryInfo);
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
        detailsContainer.querySelector(".border-countries div").innerHTML = "No borders"
    } else {
        getBorderInfo(borderArray)
    }
    // (!borderArray) ? detailsContainer.querySelector(".border-countries div").innerHTML = "No borders" : getBorderInfo(borderArray);
}

let x = 12908376;
let numString = String(x).replace(/(.)(?=(\d{3})+$)/g, '$1,')
console.log(x);