const inputSlider= document.querySelector(".slider")
const lengthDisplay= document.querySelector("#len")
const passwordDisplay =document.querySelector("[data-passwordDisplay]")
const copyBtn= document.querySelector("#copyBtn")
const copyMsg =document.querySelector("#Password")
const upperCaseCheck=document.querySelector("#uppercase")
const lowerCaseCheck=document.querySelector("#lowercase")
const numbersCheck=document.querySelector("#numbers")
const symbolsCheck=document.querySelector("#symbol")
const indicator= document.querySelector(".circle")
const generateBtn = document.querySelector("#generate-password")
const allCheckBox =document.querySelectorAll("input[type=checkbox]")
const generatePassword=document.querySelector("#generate-password")

const symbols='`~!@#$%^&*()_-+={[}]\|?/><,.:;';

let password="";

let passwordLength=10;

let checkCount=0;

function handleSlider(){
    inputSlider.value= passwordLength;
    lengthDisplay.innerHTML=passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
}
 
function getRandomInteger (min,max){
   return  Math.floor ( Math.random  *  (max-min)) + min;
}

function getRandomNumber(){
    return getRandomInteger(0,9);
}

function getLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function getUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function getsymbols(){
    const randNum = getRandomInteger(0,symbols.length);
    return symbols[randNum];
}

function calcStrength(){
   let hasUpper= false;
   let hasLower= false;
   let hasNum=false;
   let hasSym=false;

   if(upperCaseCheck.checked) hasUpper =true;
   if(lowerCaseCheck.checked) hasLower= true;
   if(numbersCheck.checked) hasNum=true;
   if(symbolsCheck.checked)  hasSym=true;
   
   if( hasUpper && hasLower && (hasNum||hasSym) && passwordLength >=8){
    setIndicator("#0f0")
   }
   else if((hasLower|| hasUpper) && (hasNum || hasNum) && passwordLength >=6){
    setIndicator("#ff0")
   }
   else{
    setIndicator("#f00")
   }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";

    }
    catch(e){
        copyMsg.innerText = "failed";

    }
  
    copyMsg.classList.add("active");

    setInterval(() => {
        copyMsg.classList.remove("active");

    }, 2000);
}
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox) => {
    if(checkbox.checked)
    checkCount++;
    });
    
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }


}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange)
});

inputSlider.addEventListener('input',(details)=>{
passwordLength=details.target.value;
// console.log(e);
handleSlider();
})



copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
})

generatePassword.addEventListener('click', () => {
    if (checkCount <= 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    password = "";

    let funcArray = [];

    if (upperCaseCheck.checked) {
        funcArray.push(getUpperCase);
    }

    if (lowerCaseCheck.checked) {
        funcArray.push(getLowerCase);
    }

    if (numbersCheck.checked) {
        funcArray.push(getRandomNumber);
    }

    if (symbolsCheck.checked) {
        funcArray.push(getsymbols);
    }

    // Ensure that there is at least one character type selected
    if (funcArray.length === 0) {
        alert("Please select at least one character type.");
        return;
    }

    for (let i = 0; i < passwordLength; i++) {
        let randIndex = getRandomInteger(0, funcArray.length - 1);
        
        password += funcArray[randIndex]();
    }

    passwordDisplay.value = password;
});
