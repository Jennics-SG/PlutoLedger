// Load data from JSON
import * as data from './data/storage.json';

// Function wrapper that runs once DOM content is loaded
const onReady = () : void => {
    console.log(typeof(data))

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

    calcButton.addEventListener('click', () : void =>{
        showCalc(calc, conf);
    });
    confButton.addEventListener('click', () : void => {
        showConf(calc, conf);
    });

    // Listener for save button
    const saveButton = <HTMLElement> document.getElementById("saveButton");

    saveButton.addEventListener('click', saveInfo)
}

const showCalc = (calc : HTMLElement, conf : HTMLElement) : void => {
    calc.style.display = "flex";
    conf.style.display = "none";
}

const showConf = (calc : HTMLElement, conf : HTMLElement) : void => {
    calc.style.display = "none";
    conf.style.display = "flex";
}

const saveInfo = () : void => {

}

window.addEventListener('DOMContentLoaded', onReady)