// Import country codes (in HTML, link this before app.js)
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const exchangeRateTxt = document.querySelector(".msg");
const getButton = document.querySelector("form button");

// Populate dropdowns using countryList from codes.js
function populateDropdowns() {
    for (let currencyCode in countryList) {
        let option1 = new Option(currencyCode, currencyCode);
        let option2 = new Option(currencyCode, currencyCode);
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    }

    // Set default selections
    fromCurrency.value = "USD";
    toCurrency.value = "INR";

    updateFlag(fromCurrency);
    updateFlag(toCurrency);
}

// Update flag when currency changes
function updateFlag(element) {
    const countryCode = countryList[element.value];
    const imgTag = element.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}

// Fetch and calculate exchange rate
async function getExchangeRate() {
    const amount = document.querySelector("input").value || 1;
    const fromCode = fromCurrency.value;
    const toCode = toCurrency.value;

    const url = `https://api.exchangerate-api.com/v4/latest/${fromCode}`;
    const response = await fetch(url);
    const data = await response.json();

    const rate = data.rates[toCode];
    const total = (amount * rate).toFixed(2);

    exchangeRateTxt.innerText = `${amount} ${fromCode} = ${total} ${toCode}`;
}

// Event Listeners
fromCurrency.addEventListener("change", () => updateFlag(fromCurrency));
toCurrency.addEventListener("change", () => updateFlag(toCurrency));
getButton.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

// Initialize
populateDropdowns();
getExchangeRate();
