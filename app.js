let countries = '';
let search_term = '';
const result = document.getElementById('result');
const search_input = document.getElementById('search');

const fetchCountries = async() => {
    return await fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag;capital').then(res => res.json());
}

const showCountries = async() => {
    result.innerHTML = '';

    countries = await fetchCountries();
    
    const ul = document.createElement('ul');
    ul.classList.add('countries');

    countries
        .filter(country => country.name.toLowerCase().includes(search_term.toLowerCase()))
        .forEach(country => {
    
            //creating the sructure
            const li = document.createElement('li');
            li.classList.add('country-item');

            const country_flag = document.createElement('img');
            country_flag.classList.add('country-flag');
            country_flag.src = country.flag;

            const country_name = document.createElement('h3');
            country_name.innerText = country.name;
            country_name.classList.add('country-name');

            const country_population_info = document.createElement('div');
            country_population_info.classList.add('country-info');

            const country_capital = document.createElement('h4');
            country_capital.innerHTML = country.capital;
            country_capital.classList.add('country-cpital');

            const country_info = document.createElement('div');
            country_info.classList.add('country-info');
            country_info.appendChild(country_name);
            country_info.appendChild(country_capital);

            const country_population = document.createElement('h2');
            country_population.innerText = numbersWithCommas(country.population);
            country_population.classList.add('country-population');
            
            const country_population_text = document.createElement('h5');
            country_population_text.innerText = 'Population';
            country_population_text.classList.add('country-population-text');
            
            country_population_info.appendChild(country_population);
            country_population_info.appendChild(country_population_text);

            li.appendChild(country_flag);
            li.appendChild(country_info);
            li.appendChild(country_population_info);

            ul.appendChild(li);
    });

    result.appendChild(ul)
}

showCountries();

search_input.addEventListener('input', e => {
    search_term = e.target.value;
    showCountries();
})

function numbersWithCommas(value){
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}




