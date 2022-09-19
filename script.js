const url = "https://restcountries.com/v3.1/all";
let template = document.getElementById("sample").content;
const searchBar = document.querySelector(".searchBar");

let countryData = [];
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

getCountries();

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
        }
    document.querySelector(".countries").appendChild(copy);
    });
};

let countrySection = document.querySelector(".countries");
let countryNames = countrySection.getElementsByClassName("name");
let regions = countrySection.getElementsByClassName("region");
// console.log(countryNames);

const searchCountries = () => {
    const countryNamesArray = Array.from(countryNames);
    let searchValue = searchBar.value.toLowerCase();
    // console.log(searchValue);
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
    if (event.target.tagName === "IMG") {
        target = event.target.nextElementSibling.firstElementChild.innerHTML;
    };
    if (event.target.className === "card-body") {
        target = event.target.firstElementChild.innerHTML;
    };
    if ((event.target.tagName === "H3") || (event.target.tagName === "P")) {
        target = event.target.parentElement.firstElementChild.innerHTML;
    };
    console.log(target);
    localStorage.setItem('countryName', target);
    window.location.href = 'details.html';
});


// function openSingle() {
//     console.log(this);
// }
