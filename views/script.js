// Copy button 
let copybutton = document.getElementById("copy");

// Edit button
let editbutton = document.getElementById("edit");


// Result P Tag
let mainresult = document.getElementById("mainresult");

// text content of mainresult
let textTocopy = mainresult.textContent


// Making Content Editable toggle
function contenteditable() {
    mainresult.contentEditable = mainresult.contentEditable === "true" ? "false" : "true";

    editbutton.innerHTML = editbutton.innerHTML === "done" ? "edit" : "done";
}


// Making copy function
function copythetext() {
    navigator.clipboard.writeText(textTocopy)
    
    setTimeout(function(){
        copybutton.innerHTML = "copied" 
    },100)
    setTimeout(function(){
        copybutton.innerHTML="copy"
    },4000)
}