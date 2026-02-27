

const coutryName = new URLSearchParams(location.search).get('name');
const imageSrc = document.querySelector('.image img')
const title = document.querySelector('h2')
const Population = document.querySelector('.Population')
const nativeName = document.querySelector('.nativeName')
const Region = document.querySelector('.region')
const Sub_region = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLeveDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')


fetch(`https://restcountries.com/v3.1/name/${coutryName}?fullText=true`)
    .then(res => res.json())
    .then(([country]) => {
        imageSrc.src = country.flags.svg
        title.innerText = country.name.common
        Population.innerText = country.population.toLocaleString('en-IN')
        Region.innerText = country.region
        topLeveDomain.innerText = country.tld.join(', ')
        if(country.subregion) {
            Sub_region.innerText = country.subregion
        }
        if(country.capital) {
            capital.innerText = country.capital?.[0]
        }
        if(country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        }else{
            nativeName.innerText = country.name.common
        }

        if(country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((country) => country.name).join(', ')
        }
        if(country.languages) {
            languages.innerText = Object.values(country.languages).join(', ')
        }

        if(country.borders) {
            const links = document.querySelector('.links')
            country.borders.forEach((border) => {
                fetch( `https://restcountries.com/v3.1/alpha/${border}`)
                .then((res) => res.json(''))
                .then(([borderCountry]) => {
                    // console.log(borderCountry);
                    const borderCountryTag = document.createElement('a')
                    borderCountryTag.innerHTML = borderCountry.name.common
                    borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                    links.append(borderCountryTag)
                })
            });
        }
    })
