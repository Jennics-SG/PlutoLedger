import * as fs from 'fs';

// Type for saved data
type Data = {
    hoursWorked: number,
    money: number,
    tipPerHour: number
}

// Function wrapper that runs once DOM content is loaded
const onReady = () : void => {
    // Load daa from JSON
    const data: Data = require('../data/storage.json');

    // Show correct tab when first connecting to page
    const url : string = window.location.href;

    const calc = <HTMLElement> document.getElementById("calc");
    const conf = <HTMLElement> document.getElementById("conf");

    if(url.includes("#calc")) 
        showCalc(calc, conf)
    else 
        showConf(calc, conf)

    // Listeners for buttons that change tabs
    const calcButton = <HTMLElement> document.getElementById("calcButton");
    const confButton = <HTMLElement> document.getElementById("confButton");

    calcButton.addEventListener('click', () : void => showCalc(calc, conf));
    confButton.addEventListener('click', () : void => showConf(calc, conf));

    // Listener for save button
    const saveButton = <HTMLElement> document.getElementById("saveButton");

    saveButton.addEventListener('click', () : void => saveInfo(data));

    // Listener for Employee hours input
    const empHoursIpt = <HTMLInputElement> document.getElementById("empHoursInput");
    empHoursIpt.addEventListener('input', () : void => displayMoneyOwed(data, empHoursIpt));
}

const showCalc = (calc : HTMLElement, conf : HTMLElement) : void => {
    calc.style.display = "flex";
    conf.style.display = "none";
}

const showConf = (calc : HTMLElement, conf : HTMLElement) : void => {
    calc.style.display = "none";
    conf.style.display = "flex";
}

const saveInfo = (data : Data) : void => {
    // Get HTML elements
    const allHoursIpt = <HTMLInputElement> document.getElementById("allHoursInput");
    const moneyIpt = <HTMLInputElement> document.getElementById("moneyInput");
    const displaytoUser = <HTMLElement> document.getElementById("displayToUser");

    // Check that both inputs have been used
    const allHours : number = parseFloat(allHoursIpt.value);
    const money : number = parseFloat(moneyIpt.value);

    if(isNaN(allHours) || isNaN(money)){
        displaytoUser.innerHTML = "Please enter a value to both fields";
        return;
    }

    // Update Data object
    data.hoursWorked = allHours;
    data.money = money;

    data.tipPerHour = getTipPerHour(allHours, money);

    // Get tip per hour

    // Update storage.json
    const toWrite : string = JSON.stringify(data);

    fs.writeFile('./data/storage.json', toWrite, (e) => {
        if(e){
            console.error(e);

            displaytoUser.textContent = "";
            displaytoUser.innerHTML = "Error saving settings"

            throw e;
        }
        
        displaytoUser.textContent = "";
        displaytoUser.style.color = "green";
        displaytoUser.innerHTML = "Settings Saved"
    });
}

const getTipPerHour = function(hoursWorked : number, money : number) : number {
    return hoursWorked / money;
}

const displayMoneyOwed = (data : Data, ipt: HTMLInputElement) : void => {
    const displayMoneyToUser = <HTMLElement> document.getElementById("displayMoneyToUser");

    const empHours : number = parseFloat(ipt.value);
    console.log(empHours * data.tipPerHour);
    const moneyOwed : number = isNaN(empHours) ?
        0.00 : empHours * data.tipPerHour

    displayMoneyToUser.textContent = "";
    displayMoneyToUser.innerHTML = `£${moneyOwed.toFixed(2)}`;
}

window.addEventListener('DOMContentLoaded', onReady);