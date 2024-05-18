// script.js

const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

// Fetch data using .then
function fetchDataWithThen() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            renderTable(data);
            window.cryptoData = data; // Store data globally for search and sort operations
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fetch data using async/await
async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        renderTable(data);
        window.cryptoData = data; // Store data globally for search and sort operations
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render table
function renderTable(data) {
    const tableBody = document.querySelector('#cryptoTable tbody');
    tableBody.innerHTML = ''; // Clear existing table rows
    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.name}</td>
            <td>${coin.symbol}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume}</td>
            <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
function search() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredData = window.cryptoData.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm) || 
        coin.symbol.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredData);
}

// Sort by Market Cap
function sortByMarketCap() {
    const sortedData = [...window.cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
}

// Sort by Percentage Change (Assuming percentage change data is available, modify if needed)
function sortByPercentageChange() {
    const sortedData = [...window.cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
}

// Initialize fetch data
fetchDataWithAsyncAwait(); // or fetchDataWithThen();
