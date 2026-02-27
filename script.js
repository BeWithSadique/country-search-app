
const countryCard = document.querySelector('.country-cards')
const filterRegion = document.querySelector('#filter')
const inputFild = document.querySelector('.search-box input')

    const darkMode = document.querySelector('.dark-mode')
    const lightMode = document.querySelector('.light-mode')
    const body = document.querySelector('body')

    const enableDarkMode = () => {
        body.classList.add('dark-mode')
        lightMode.style.display = 'block'
        darkMode.style.display = 'none'
        localStorage.setItem('theme', 'dark') 
    }

    const disableDarkMode = () => {
        body.classList.remove('dark-mode')
        lightMode.style.display = 'none'
        darkMode.style.display = 'block'
        localStorage.setItem('theme', 'light')
    }

    darkMode.addEventListener('click', (e) => {
        e.preventDefault()
        enableDarkMode()
    })

    lightMode.addEventListener('click', (e) => {
        e.preventDefault()
        disableDarkMode()
    })

    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
        enableDarkMode()
    } else {
        disableDarkMode()
    }


let allCountryData = ''

fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then((data) => {
        rendringData(data)
        allCountryData = data
    })

filterRegion.addEventListener('change', () => {
    fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`)
    .then(res => res.json())
    .then((data) => {
        countryCard.innerHTML = ''
        data.forEach(country => {
            const anchorTag = document.createElement('a')
            anchorTag.classList.add('card')
            anchorTag.href = `country.html?name=${country.name.common}`
            const cards = `
                <div class="image">
                    <img src="${country.flags.svg}" alt="flag">
                </div>
                <div class="content">
                    <h2>${country.name.common}</h2>
                    <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                    <p><b>Region: </b> ${country.region}</p>
                    <p><b>Capital: </b> ${country.capital ?.[0]}</p>
                    </div>
            `
            anchorTag.innerHTML = cards
            countryCard.append(anchorTag)
        });
    })
})
    
function rendringData (data) {
    countryCard.innerHTML = ''
        data.forEach(country => {
            const anchorTag = document.createElement('a')
            anchorTag.classList.add('card')
            anchorTag.href = `country.html?name=${country.name.common}`
            const cards = `
                <div class="image">
                    <img src="${country.flags.svg}" alt="flag">
                </div>
                <div class="content">
                    <h2>${country.name.common}</h2>
                    <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                    <p><b>Region: </b> ${country.region}</p>
                    <p><b>Capital: </b> ${country.capital ?.[0]}</p>
                 </div>
            `
            anchorTag.innerHTML = cards
            countryCard.append(anchorTag)
        });
}

inputFild.addEventListener('input', (e) => {
    const filteredCountryName = allCountryData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    rendringData(filteredCountryName)
})
