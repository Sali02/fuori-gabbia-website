"use strict";

var button = document.querySelector('.submit');

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

function calcolaPercentuale(fatturato, utile, equity, cashFlow) {

    var revenuePercentuale = new Array();
    var netIncomePercentuale = new Array();
    var equityPercentuale = new Array();
    var cashFlowPercentuale = new Array();

    for (let i = 0; i < 4; i++) {

        const fatturatoRatio = ((fatturato[i]/fatturato[i + 1])*100)-100;
        const utileRatio = ((utile[i]/utile[i + 1])*100)-100;
        const equityRatio = ((equity[i]/equity[i + 1])*100)-100;
        const cashflowRatio = ((cashFlow[i]/cashFlow[i + 1])*100)-100;

        revenuePercentuale[i] = parseFloat(fatturatoRatio.toFixed(2));
        netIncomePercentuale[i] = parseFloat(utileRatio.toFixed(2));
        equityPercentuale[i] = parseFloat(equityRatio.toFixed(2));
        cashFlowPercentuale[i] = parseFloat(cashflowRatio.toFixed(2));

    }

    for (let i = 0; i < 4; i++) {

        console.log('fatturato %: ' + revenuePercentuale[i]);
        console.log('utile %: ' + netIncomePercentuale[i]);
        console.log('equity %: ' + equityPercentuale[i]);
        console.log('cashflow %: ' + cashFlowPercentuale[i]);

    }

}

