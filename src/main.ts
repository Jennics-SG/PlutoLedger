import * as fs from 'fs';

// Type for saved data
type Data = {
    hoursWorked: number,
    money: number
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


window.addEventListener('DOMContentLoaded', onReady);