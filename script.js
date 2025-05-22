// Future JavaScript for dynamic data and interactions 

document.addEventListener('DOMContentLoaded', () => {
    const transactions = [
        { date: '2025-03-27', btcAmount: 1.15, avgPrice: 86925.26, cost: 99964.05 },
        { date: '2025-05-06', btcAmount: 10.53, avgPrice: 94588.84, cost: 996000.00 },
        { date: '2025-05-21', btcAmount: 0.94, avgPrice: 106388.69, cost: 99005 }
    ];

    // DOM Elements
    const totalBtcHeldEl = document.getElementById('total-btc-held');
    const currentInvestmentValueEl = document.getElementById('current-investment-value');
    const totalInvestedEl = document.getElementById('total-invested');
    const performanceEl = document.getElementById('performance');
    const btcPriceInfoEl = document.getElementById('btc-price-info');
    const performancePercentEl = document.getElementById('performance-percent');
    const performanceChangeEl = document.getElementById('performance-change');

    // Variables to store calculated static values
    let totalBtc = 0;
    let totalCostUsd = 0;
    let avgPurchasePrice = 0;

    function formatCurrency(value) {
        return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

    function updateStaticMetrics() {
        totalBtc = transactions.reduce((sum, t) => sum + t.btcAmount, 0);
        totalCostUsd = transactions.reduce((sum, t) => sum + t.cost, 0);
        avgPurchasePrice = (totalBtc > 0) ? totalCostUsd / totalBtc : 0;

        totalBtcHeldEl.textContent = `${totalBtc.toFixed(2)} BTC`;
        totalInvestedEl.textContent = `$${formatCurrency(totalCostUsd)}`;
        // Initially set the Avg part of btcPriceInfoEl, Current part will be set by dynamic update
        btcPriceInfoEl.innerHTML = `Avg: $${formatCurrency(avgPurchasePrice)} <br> Current: Loading...`;
    }

    async function fetchCurrentBtcPrice() {
        try {
            const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
            if (!response.ok) {
                console.error(`Coinbase API error: ${response.status}`);
                return null; // Indicate failure
            }
            const data = await response.json();
            return parseFloat(data.data.amount);
        } catch (error) {
            console.error('Error fetching BTC price:', error);
            return null; // Indicate failure
        }
    }

    function updateDynamicMetrics(currentBtcPrice) {
        const currentPriceDisplay = currentBtcPrice ? `$${formatCurrency(currentBtcPrice)}` : 'Error';
        btcPriceInfoEl.innerHTML = `Avg: $${formatCurrency(avgPurchasePrice)} <br> Current: ${currentPriceDisplay}`;

        if (currentBtcPrice !== null) {
            const currentMarketValue = totalBtc * currentBtcPrice;
            currentInvestmentValueEl.textContent = `$${formatCurrency(currentMarketValue)}`;
            
            let performancePercent = 0;
            let performanceDollar = currentMarketValue - totalCostUsd;
            if (totalCostUsd > 0) {
                performancePercent = ((currentMarketValue - totalCostUsd) / totalCostUsd) * 100;
            }
            // Set color based on up/down
            const isUp = performanceDollar >= 0;
            const color = isUp ? '#1ca97c' : '#e14c4c'; // green or red
            // Format $ change with sign
            const sign = isUp ? '+' : '-';
            const absDollar = Math.abs(performanceDollar);
            performancePercentEl.textContent = `${isUp ? '+' : ''}${performancePercent.toFixed(2)}%`;
            performancePercentEl.style.color = color;
            performanceChangeEl.textContent = `(${sign}$${formatCurrency(absDollar)})`;
            performanceChangeEl.style.color = color;
            performanceChangeEl.style.fontSize = '0.6em';
            performanceChangeEl.style.marginTop = '0.2em';
        } else {
            currentInvestmentValueEl.textContent = '$-- (Price Error)';
            performancePercentEl.textContent = '--%';
            performancePercentEl.style.color = '';
            performanceChangeEl.textContent = '';
        }
    }

    async function initDashboard() {
        updateStaticMetrics(); // Calculate and display static metrics first
        
        const initialBtcPrice = await fetchCurrentBtcPrice();
        updateDynamicMetrics(initialBtcPrice); // Update dynamic metrics with initial price

        // Set interval to update dynamic metrics periodically
        setInterval(async () => {
            const currentBtcPrice = await fetchCurrentBtcPrice();
            updateDynamicMetrics(currentBtcPrice);
        }, 15000); // Update every 15 seconds
    }

    initDashboard();

    // Mobile nav menu toggle
    const menuBtn = document.getElementById('nav-mobile-menu-btn');
    const menuIcon = document.getElementById('nav-mobile-menu-icon');
    const menuDropdown = document.getElementById('nav-mobile-dropdown');
    if (menuBtn && menuIcon && menuDropdown) {
        menuBtn.addEventListener('click', () => {
            const isOpen = menuDropdown.classList.toggle('open');
            menuIcon.textContent = isOpen ? '–' : '+';
        });
        // Optional: close menu when a link is clicked
        menuDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuDropdown.classList.remove('open');
                menuIcon.textContent = '+';
            });
        });
    }
}); 