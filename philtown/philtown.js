"use strict";

var button = document.querySelector('.submit');
//is just a test to see if i unterstood something with the git bash
//new line
//newwww line
//i just added a new line
//new line
//a new line just added
button.addEventListener('click', getData);

async function getData() {
    var apiKey = 'd59700f7597b82cb0fef69669f48b8ec';
    var stockTicker = document.querySelector('#stock-ticker').value;
    console.log(stockTicker);
    alert('ciao');
    const responseIncomeStatement = await fetch('https://financialmodelingprep.com/api/v3/income-statement/' + stockTicker + '?apikey=' + apiKey);
    const responseBalanceSheet = await fetch('https://financialmodelingprep.com/api/v3/balance-sheet-statement/' + stockTicker + '?apikey=' + apiKey);
    const responseCashFlow = await fetch('https://financialmodelingprep.com/api/v3/cash-flow-statement/' + stockTicker + '?apikey=' + apiKey);
    const incomeStatement = await responseIncomeStatement.json();
    const balanceSheet = await responseBalanceSheet.json();
    const cashFlow = await responseCashFlow.json();
    console.log(incomeStatement, balanceSheet, cashFlow);
    
    storeData(incomeStatement, balanceSheet, cashFlow);
}

function storeData(incomeStatement, balanceSheetStatement, cashFlowStatement) {
    let fatturato = new Array();
    let utile = new Array();
    let assetTotali = new Array();
    let passivitaTotali = new Array();
    let equity = new Array();
    let cashFlow = new Array();

    for (let i = 0; i < 5; i++) {
        fatturato[i] = incomeStatement[i].revenue;
        utile[i] = incomeStatement[i].netIncome;
        assetTotali[i] = balanceSheetStatement[i].totalAssets;
        passivitaTotali[i] = balanceSheetStatement[i].totalLiabilities;
        cashFlow[i] = cashFlowStatement[i].freeCashFlow
    }

    for (let i = 0; i < 5; i++) {
        console.log('fatturato: ' + fatturato[i]);
        console.log('utile: ' + utile[i]);
        console.log('asset: ' + assetTotali[i]);
        console.log('passivita: ' + passivitaTotali[i]);
        console.log('cashflow: ' + cashFlow[i]);
    }

    for (let i = 0; i < 5; i++) {
        equity[i] = assetTotali[i] - passivitaTotali[i];
    }
    
    calcolaPercentuale(fatturato, utile, equity, cashFlow);
}

/*function calcolaPercentuale(fatturatoPer, utilePer, equityPer, cashflowPer) {
    for(let i = 0; i < 4; i++) {
        fatturatoPer[i] = (((fatturatoPer[i+1]/fatturatoPer[i])/fatturatoPer[i])*100);
        utilePer[i] = ((fatturatoPer[i+1]/fatturatoPer[i])/fatturatoPer[i])*100;
        equityPer[i] = ((fatturatoPer[i+1]/fatturatoPer[i])/fatturatoPer[i])*100;       
        cashflowPer[i] = ((fatturatoPer[i+1]/fatturatoPer[i])/fatturatoPer[i])*100;
    }

    for(let i = 0; i < 4; i++){
        alert('seconda' + typeof fatturatoPer[i]);
        console.log('fatturato: ' + fatturatoPer[i]);
        console.log('utile: ' + utilePer[i]);
        console.log('equity: ' + equityPer[i]);
        console.log('cashflow: ' + cashflowPer[i]);
    }
}*/

function calcolaPercentuale(fatturatoPer, utilePer, equityPer, cashflowPer) {
    for (let i = 4; i > 0; i--) {

        const fatturatoRatio = (fatturatoPer[i]- fatturatoPer[i - 1]) / fatturatoPer[i];
        const utileRatio = (utilePer[i] - utilePer[i - 1]) * utilePer[i];
        const equityRatio = (equityPer[i] - equityPer[i - 1]) * equityPer[i];
        const cashflowRatio = (cashflowPer[i] - cashflowPer[i -1]) * cashflowPer[i];

        fatturatoPer[i] = parseFloat(fatturatoRatio.toFixed(2));
        utilePer[i] = parseFloat(utileRatio.toFixed(2));
        equityPer[i] = parseFloat(equityRatio.toFixed(2));
        cashflowPer[i] = parseFloat(cashflowRatio.toFixed(2));
    }

    for (let i = 4; i >= 0; i--) {
        alert('seconda' + typeof fatturatoPer[i]);
        console.log('fatturato %: ' + fatturatoPer[i]);
        console.log('utile %: ' + utilePer[i]);
        console.log('equity %: ' + equityPer[i]);
        console.log('cashflow %: ' + cashflowPer[i]);
    }
}

