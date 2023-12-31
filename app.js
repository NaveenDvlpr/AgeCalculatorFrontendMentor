const inpDay = document.getElementById('inpDay');
const inpMonth = document.getElementById('inpMonth');
const inpYear = document.getElementById('inpYear');
const btn = document.getElementById("btn");
const dayerr= document.getElementById('dayerr');
const monerr = document.getElementById('monerr');
const yearerr = document.getElementById('yearerr');
const opYears = document.getElementById('opYears');
const opMonths = document.getElementById('opMonths');
const opDays = document.getElementById('opDays'); 
const inpCtrls = document.getElementsByClassName('inpCtrls');
const daylabel = document.getElementById('daylabel');
const monthlabel = document.getElementById('monthlabel');
const yearlabel = document.getElementById('yearlabel');

const maxDays = [31,28,31,30,31,30,31,31,30,31,30,31];
let dmy = [];

const isLeap = (y) => {
    let leap = false;
    if(y%400 == 0 || (y%4==0 && y%100 != 0)) leap = true;
    return leap;
}

const highlightErr = () => {
    inpYear.style.border = "1px solid hsl(0, 100%, 67%)";
    inpMonth.style.border = "1px solid hsl(0, 100%, 67%)";
    inpDay.style.border = "1px solid hsl(0, 100%, 67%)";
    daylabel.style.color = "hsl(0, 100%, 67%)";
    yearlabel.style.color = "hsl(0, 100%, 67%)";
    monthlabel.style.color = "hsl(0, 100%, 67%)";
}

const resetCtrls = () => {
    dayerr.innerText="";
    monerr.innerText = "";
    yearerr.innerText = "";
    opYears.innerText="--";
    opYears.nextElementSibling.innerText = "years";
    opMonths.innerText = "--";
    opMonths.nextElementSibling.innerText = "months";
    opDays.innerText = "--";
    opDays.nextElementSibling.innerText = "days";
    inpYear.style.border = "1px solid hsl(0, 1%, 44%)";
    inpMonth.style.border = "1px solid hsl(0, 1%, 44%)";
    inpDay.style.border = "1px solid hsl(0, 1%, 44%)";
    daylabel.style.color = "hsl(0, 1%, 44%)";
    monthlabel.style.color = "hsl(0, 1%, 44%)";
    yearlabel.style.color = "hsl(0, 1%, 44%)";
}

inpYear.addEventListener('focus', () => {
    resetCtrls();
    inpYear.style.border="1px solid hsl(259, 100%, 65%)";
    
});

inpMonth.addEventListener('focus', () => {
    resetCtrls();
    inpMonth.style.border="1px solid hsl(259, 100%, 65%)";
    
});

inpDay.addEventListener('focus', () => {
    resetCtrls();
    inpDay.style.border="1px solid hsl(259, 100%, 65%)";
    
});


const handleInputs = () => {
    const d = Number(inpDay.value);
    const m = Number(inpMonth.value);
    const y = Number(inpYear.value);
    const date = new Date();
    const Y = date.getFullYear();
    const M = date.getMonth()+1;
    const D = date.getDate();
    

    try {
        if(y==0) throw "This field is required";
        else if(y > Y) throw "Must be in the past";
        dmy.push(y);
    } catch(err) {
        yearerr.innerText = err;
    }
    try {
        if(m==0) throw "This field is required";
        if(m>12 || m < 1) throw "Must be a valid month";
        if(y == Y && m > M) throw "Must be in the past";
        dmy.push(m);
    } catch (err) {
        monerr.innerText = err;
    }
    try {
        if(d == 0) throw "This field is required";
        if(isLeap(y)) maxDays[1]++;
        if(m > 12) {
            if(d < 1 || d > 31) throw "Must be a valid date";
        }
        if(d>maxDays[m-1] || d < 1) throw "Must be a valid date";
        if(y<=Y && m <= M && d > D) throw "Must be in the past";
        dmy.push(d);
    } catch(err) {
        dayerr.innerText = err;
    }
    maxDays[1] = 28;
    if(dmy.length < 3) {
        dmy = [];
        highlightErr();
    }
    else showAge(); 
}

const showAge = () => {
    const date = new Date();
    
    
    const Y = date.getFullYear();
    const M = date.getMonth()+1;
    const D = date.getDate();
    
    const y = dmy[0];
    const m = dmy[1];
    const d = dmy[2];
    
    let ry = Y - y;
    let rm = M - m;
    let rd = D - d;

    if(rd < 0) {
        if(rm <= 0) {
            ry--;
            rm+=12;
        }
        rm--;
        rd = maxDays[M+10%12] - d + D;
    } 
    if(rm < 0) {
        ry--;
        rm+=12;
    }
    opYears.innerText = ry;
    if(ry == 1) opYears.nextElementSibling.innerText = "year";
    opMonths.innerText = rm;
    if(rm == 1) opMonths.nextElementSibling.innerText = "month";
    opDays.innerText = rd;
    if(rd == 1) opDays.nextElementSibling.innerText = "day";
    dmy = [];
    maxDays[1] = 28;
}


btn.addEventListener('click', () => {
    resetCtrls();
    handleInputs();
})

