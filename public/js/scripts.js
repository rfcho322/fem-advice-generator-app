const form = document.querySelector("form");
const randomBtn = document.querySelector(".randomBtn");
const adviceID = document.querySelector("#adviceId");
const adviceMessage = document.querySelector("#adviceMessage");
const loading = document.querySelector(".loading");


//INITIAL DATA TO BE DISPLAYED
document.addEventListener('DOMContentLoaded', () => {
    // DISABLE BUTTON
    randomBtn.disabled = true;
    
    fetch("/advice")
    .then( response => response.json()) // PARSE AS JSON AND RETURNS AS OBJECT
    .then(data => {
        adviceID.innerHTML = data.adviceId;
        adviceMessage.innerHTML = data.adviceMessage;
    })
    .catch(error => console.log(error))
    .finally(() => {
        loading.style.display = "none";
        randomBtn.disabled = false;
    });;
});

// PROCESS FORM SUBMISSION AND RETRIEVE NEW DATA
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    // ON FORM SUBMIT, DISPLAY LOADING GIF AND EMPTY FIELDS AND DISABLE THE BUTTON
    // DISABLE BUTTON TO AVOID SPAMMING REQUEST WHILE DATA IS BEING PROCESS IN THE BACKGROUND
    loading.style.display = "flex";
    adviceID.innerHTML = '';
    adviceMessage.innerHTML = '';
    randomBtn.disabled = true;
    
    fetch("/submit", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // PARSE AS JSON AND RETURNS AS OBJECT
    })
    .then(data => {
        adviceID.innerHTML = data.adviceId;
        adviceMessage.innerHTML = data.adviceMessage;
    })
    .catch(error => {
        console.log("Error", error);
    })
    .finally(() => {
        loading.style.display = "none";
        randomBtn.disabled = false;
    });

});