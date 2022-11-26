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
    (countryData.length > 0) && document.querySelector('aside').classList.add("d-none");
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
    let target;
    if ((event.target.tagName === "H3") || (event.target.tagName === "P") || (event.target.className === "card-body") || (event.target.tagName === "IMG")) {
        target = event.target.parentElement.firstElementChild.innerHTML;
        console.log({ target });
        sessionStorage.setItem('name', target);
        window.location.href = 'details.html';
    };
});

// Details page script