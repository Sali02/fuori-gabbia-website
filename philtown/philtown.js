"use strict";

var button = document.querySelector('.submit');

button.addEventListener('click', getData);


async function getData() {

    
    //In this function I send a fetch and get the data

    var apiKey = 'd59700f7597b82cb0fef69669f48b8ec';
    var stockTicker = document.querySelector('#stock-ticker').value;
    console.log(stockTicker);
    const responseIncomeStatement = await fetch('https://financialmodelingprep.com/api/v3/income-statement/' + stockTicker + '?apikey=' + apiKey);
    const responseBalanceSheet = await fetch('https://financialmodelingprep.com/api/v3/balance-sheet-statement/' + stockTicker + '?apikey=' + apiKey);
    const responseCashFlow = await fetch('https://financialmodelingprep.com/api/v3/cash-flow-statement/' + stockTicker + '?apikey=' + apiKey);
    
    //after I got a response with the data, I made a json to get the data

    const incomeStatement = await responseIncomeStatement.json();
    const balanceSheet = await responseBalanceSheet.json();
    const cashFlow = await responseCashFlow.json();
    console.log(incomeStatement, balanceSheet, cashFlow);
    
    storeData(incomeStatement, balanceSheet, cashFlow, stockTicker);
}



function storeData(incomeStatement, balanceSheetStatement, cashFlowStatement, stockTicker) {
    
    //Created arrays to store the values that i'm interested in

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
    
    calcolaPercentuale(fatturato, utile, equity, cashFlow, stockTicker);
}


function calcolaPercentuale(fatturato, utile, equity, cashFlow, stockTicker) {

    //This function calculate the percentages of increasing or decreasin year over year
    // !! i = 0 is the year 2022, and then goes down !!

    //New arrays where to store the percentages
    
    var revenuePercentuale = new Array();
    var netIncomePercentuale = new Array();
    var equityPercentuale = new Array();
    var cashFlowPercentuale = new Array();

    //Values that calculate and store the avarage growth in percentage

    let revenueGrowth = 0;
    let netIncomeGrowth = 0;
    let equityGrowth = 0;
    let cashFlowGrowth = 0;

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

    //fa la crescita media negli ultimi 5 anni

    for (let i = 0; i < revenuePercentuale.length; i++) {

        revenueGrowth += revenuePercentuale[i];
        netIncomeGrowth += netIncomePercentuale[i];
        equityGrowth += equityPercentuale[i];
        cashFlowGrowth += cashFlowPercentuale[i];

    }
    
    revenueGrowth = revenueGrowth / revenuePercentuale.length;
    netIncomeGrowth = netIncomeGrowth / netIncomePercentuale.length;
    equityGrowth = equityGrowth / equityPercentuale.length;
    cashFlowGrowth = cashFlowGrowth / cashFlowPercentuale.length;

    console.log("is the avarage growth of the revenue more than 15%? " + revenueGrowth);
    console.log("is the avarage growth of the net income more than 15%? " + netIncomeGrowth);
    console.log("is the avarage growth of the equity more than 15%? " + equityGrowth);
    console.log("is the avarage growth of the cash flow more than 15%? " + cashFlowGrowth);

    displayData(revenueGrowth, netIncomeGrowth, equityGrowth, cashFlowGrowth, stockTicker);
}

function displayData(revenueGrowth, netIncomeGrowth, equityGrowth, cashFlowGrowth, stockTicker) {
    
    revenueGrowth = revenueGrowth.toFixed(2);
    netIncomeGrowth = netIncomeGrowth.toFixed(2);
    equityGrowth = equityGrowth.toFixed(2);
    cashFlowGrowth = cashFlowGrowth.toFixed(2);

    
    //Creating variables that are going to display
    const showData = document.createElement('div');
    const showRevenue = document.createElement('p');
    const showNetIncome = document.createElement('p');
    const showEquity = document.createElement('p');
    const showCashFlow = document.createElement('p');
    const ticker = document.createElement('p');

    ticker.innerHTML = 'The company that you are evaluating is: ' + stockTicker;
    showRevenue.innerHTML = 'Revenues Growth: ' + revenueGrowth + "%";
    showNetIncome.innerHTML = 'Net Income Growth: ' + netIncomeGrowth + "%";
    showEquity.innerHTML = 'Equity Growth: ' + equityGrowth + "%";
    showCashFlow.innerHTML = 'Cash Flow Growth: ' + cashFlowGrowth + "%";


    document.body.appendChild(showData);

    showData.appendChild(ticker);
    showData.appendChild(showRevenue);
    showData.appendChild(showNetIncome);
    showData.appendChild(showEquity);
    showData.appendChild(showCashFlow);

    showData.style.fontFamily = 'sans-serif';
    showData.style.display = 'flex';
    showData.style.flexDirection = 'column';
    showData.style.justifyContent = 'center';
    showData.style.alignItems = 'center';


    showData.style.margin = '1.8rem 2rem';
    ticker.style.margin = '1rem';
    ticker.style.fontWeight = 'bold';
    ticker.style.fontSize = '1.8rem';
    showRevenue.style.margin = '1rem';
    showNetIncome.style.margin = '1rem';
    showEquity.style.margin = '1rem';
    showCashFlow.style.margin = '1rem';


    showRevenue.style.fontSize = '1.2rem';
    showNetIncome.style.fontSize = '1.2rem';
    showEquity.style.fontSize = '1.2rem';
    showCashFlow.style.fontSize = '1.2rem';

    if(revenueGrowth >= 15 && netIncomeGrowth >= 15 && equityGrowth >= 15 && cashFlowGrowth >= 15) {
        const showResult = document.createElement('div');
        document.body.appendChild(showResult);
        showResult.innerHTML = 'Following the Phil Town rule the 4 values should be bigger than 15% and in this case it is so it passed the test, and the company that you are evaluating has a MOAT';
        showResult.style.textAlign = 'center';
        showResult.style.fontSize = '1.2rem';
        showResult.style.marginBottom = '1.4rem';
        showResult.style.fontWeight = 'bold';
        var height = document.body.scrollHeight;
        window.scroll(0, height);
    }
    else {
        const showResult = document.createElement('div');
        document.body.appendChild(showResult);
        showResult.innerHTML = 'Your company does not have a MOAT go search for another one, because the values are under 15%';
        showResult.style.textAlign = 'center';
        showResult.style.fontSize = '1.2rem';
        showResult.style.marginBottom = '1.4rem';
        showResult.style.fontWeight = 'bold';
        var height = document.body.scrollHeight;
        window.scroll(0, height);
    }

}

