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
    
}



function storeData(incomeStatement, balanceSheetStatement, cashFlowStatement) {
    
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
    
    calcolaPercentuale(fatturato, utile, equity, cashFlow);
}


function calcolaPercentuale(fatturato, utile, equity, cashFlow) {

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

    
}

