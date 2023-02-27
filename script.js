const cardNumberDisplay = document.querySelector(".cardNumber");
const nameDisplay = document.querySelector(".name");
const monthDisplay = document.querySelector(".monthDisplay");
const yearDisplay = document.querySelector(".yearDisplay");
const cvcDisplay = document.querySelector(".three-digits");
const fourDigits = document.querySelectorAll(".cardNumber span");
const nameInput = document.querySelector("#name");
const numberInput = document.querySelector("#number");
const expDateMonthInput = document.querySelector("#exp-date-M");
const expDateYearInput = document.querySelector("#exp-date-Y");
const cvcInput = document.querySelector("#cvc");
const confirmButton = document.querySelector(".confirm");
const continueButton = document.querySelector(".continue-btn");
const cardForm = document.querySelector('.card-form');
const thanksMessage = document.querySelector('.success');
let errors = [true,true,true,true];

numberInput.addEventListener('input',numberChanged);
nameInput.addEventListener('input',nameChanged);
expDateMonthInput.addEventListener('input',monthChanged);
expDateYearInput.addEventListener('input',yearChanged);
cvcInput.addEventListener('input',cvcChanged);
confirmButton.addEventListener('click',confirmClicked);
continueButton.addEventListener('click',backToMain);


function getValidatedNumber(){
    let rawContent = numberInput.value;

    //remove spaces
    rawContent = rawContent.replaceAll(' ','');

    if(rawContent.length > 16){
        rawContent = rawContent.substring(0,16);
        // alert(rawContent);
    }
    else if(rawContent.length < 16){
        let difference = 16 - rawContent.length;
        for(let i = 0;i < difference;i++){
            rawContent += "0";
        }
    }
    return rawContent;
}

function validateName(content){
    const messageDisplay = document.querySelector(".error-message-name");

    if(content.length === 0){
        errors[0] = true;
        nameInput.classList.add("error");

        
        messageDisplay.classList.add('visible-inline');
        messageDisplay.innerHTML = "Can't be blank";
    }
    else{
        errors[0] = false;
        nameInput.classList.remove("error");
        messageDisplay.classList.remove('visible-inline');
    }
}

function validateNumber(content){
    const messageDisplay = document.querySelector(".error-message-number");
    const regex = /^\d{4}[ ]?\d{4}[ ]?\d{4}[ ]?\d{4}$/;
    const numbersOnly = /^[\d ]+$/;


    if(content.length === 0){
        errors[1] = true;
        numberInput.classList.add("error");
        
        messageDisplay.classList.add('visible-inline');
        messageDisplay.innerHTML = "Can't be blank";
    }
    else if(!numbersOnly.test(content)){
        errors[1] = true;
        numberInput.classList.add("error");
        
        messageDisplay.classList.add('visible-inline');
        messageDisplay.innerHTML = "Wrong format, numbers only";
    }
    else if(!regex.test(content)){
        errors[1] = true;
        numberInput.classList.add("error");
        
        messageDisplay.classList.add('visible-inline');
        messageDisplay.innerHTML = "Wrong format";
    }
    else{
        errors[1] = false;
        numberInput.classList.remove("error");
        messageDisplay.classList.remove('visible-inline');
    }
}

function validateDate(monthContent,yearContent){
    const messageDisplay = document.querySelector(".error-message-date");
    const regex = /^\d{2}$/;


    if(monthContent.length === 0 || yearContent.length === 0){
        errors[2] = true;
        if(monthContent.length === 0) expDateMonthInput.classList.add("error");
        if(yearContent.length === 0) expDateYearInput.classList.add("error");
        messageDisplay.classList.add('visible-inline');
        messageDisplay.innerHTML = "Can't be blank";
    }
    else if(!regex.test(monthContent) || !regex.test(yearContent)){
        errors[2] = true;
        if(!regex.test(monthContent)) expDateMonthInput.classList.add("error");
        if(!regex.test(yearContent)) expDateYearInput.classList.add("error");
        messageDisplay.classList.add('visible-inline');
        messageDisplay.innerHTML = "Wrong format";
    }
    else{
        errors[2] = false;
        expDateMonthInput.classList.remove("error");
        expDateYearInput.classList.remove("error");
        messageDisplay.classList.remove('visible-inline');
    }
}

function validateCVC(content){
    const messageDisplay = document.querySelector(".error-message-cvc");
    const regex = /^\d{3}$/;

    if(content.length === 0)
    {
        errors[3] = true;
        cvcInput.classList.add("error");
        messageDisplay.classList.add('visible-inline');
        messageDisplay.innerHTML = "Can't be blank";
    }
    else if(!regex.test(content)){
        errors[3] = true;
        cvcInput.classList.add("error");
        messageDisplay.classList.add('visible-inline');
        messageDisplay.innerHTML = "Wrong format";
    }
    else{
        errors[3] = false;
        cvcInput.classList.remove("error");
        messageDisplay.classList.remove('visible-inline');
    }
}

function updateName(content){
    nameDisplay.innerHTML = content;
}

function updateMonth(content){
    monthDisplay.innerHTML = content;
}

function updateYear(content){
    yearDisplay.innerHTML = content;
}

function updateCVC(content){
    cvcDisplay.innerHTML = content;
}

function hasErrors(){
   return errors.some((error) => error);
}

function thankUser(){
    cardForm.classList.add('hidden');
    thanksMessage.classList.remove('hidden');
}

function backToMain(){
    cardForm.classList.remove('hidden');
    thanksMessage.classList.add('hidden');
}

function confirmClicked(){
    if(!hasErrors()){
        thankUser();
    }
}

function numberChanged(){
    let content = numberInput.value;

    validateNumber(content);
    updateNumber();
}

function nameChanged(){
    let content = nameInput.value;

    validateName(content);
    updateName(content);
}

function monthChanged(){
    const monthContent = expDateMonthInput.value;
    const yearContent = expDateYearInput.value;

    validateDate(monthContent,yearContent);
    updateMonth(monthContent);
}

function yearChanged(){
    const monthContent = expDateMonthInput.value;
    const yearContent = expDateYearInput.value;

    validateDate(monthContent,yearContent);
    updateYear(yearContent);
}

function cvcChanged(){
    const content = cvcInput.value;

    validateCVC(content);
    updateCVC(content);
}


function updateNumber(){
   let validatedNumber = getValidatedNumber();
   let s1 = validatedNumber.substring(0,4);
   let s2 = validatedNumber.substring(4,8);
   let s3 = validatedNumber.substring(8,12);
   let s4 = validatedNumber.substring(12,16);

   let groupsOfFour = [s1,s2,s3,s4];
   groupsOfFour.forEach((st,index) => {
        fourDigits[index].innerHTML = st;
   })
}
