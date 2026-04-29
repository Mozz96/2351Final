const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const name = document.getElementById("name");
const goal = document.getElementById("goal");
const showAmPm = true;

const quote = document.querySelector("#quote");

function getTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let seconds = today.getSeconds();

    const amPM = hour >= 12 ? "PM" : "AM" ;

    hour = hour % 12 || 12;

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(seconds)} ${showAmPm ? amPM : ""}`;

    setTimeout(getTime, 1000);
}

function addZero(n){
    return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

function timedBgGreeting() {
    let today = new Date();
    let hour = today.getHours();

    if(hour < 12) {
        document.body.style.backgroundImage = "url('assets/pics/xenoblademorning.png')";
        greeting.textContent = "Good Morning";
    }else if(hour < 18) {
        document.body.style.backgroundImage = "url('assets/pics/xenobladeday.png')";
        greeting.textContent = "Good Afternoon";
    }else {
        document.body.style.backgroundImage = "url('assets/pics/xenobladenight.png')";
        greeting.textContent = "Good Evening";
    }
}

function getName(){
    if(localStorage.getItem("name") === null){
        name.textContent = "[Enter Name]";
    }else {
        name.textContent = localStorage.getItem("name");
    }

}

function setName(h){
    if(h.type === "keypress"){
        if(h.which == 13 || h.keyCode == 13){
            localStorage.setItem("name", h.target.innerText);
            name.blur();
        }
    } else{
        localStorage.setItem("name", h.target.innerText)
    }
}


function getGoal(){
    if(localStorage.getItem("goal") === null){
        goal.textContent = "[What Will You Achieve Today?]";
    }else {
        goal.textContent = localStorage.getItem("goal");
    }

}

function setGoal(h){
    if(h.type === "keypress"){
        if(h.which == 13 || h.keyCode == 13){
            localStorage.setItem("goal", h.target.innerText);
            goal.blur();
        }
    } else{
        localStorage.setItem("goal", h.target.innerText)
    }
}


function generateNewQuote(){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            const data = JSON.parse(xhr.responseText);
            
            const html = `
                <p>${data[0].content}</p>
                <em>${data[0].author}</em>
            `;

            quote.innerHTML = html;
        }
    };
    xhr.open("GET", "http://api.quotable.io/quotes/random");
    xhr.send();
}


name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
goal.addEventListener("keypress", setGoal);
goal.addEventListener("blur", setGoal);

getTime();
timedBgGreeting();
getName();
getGoal();
generateNewQuote();