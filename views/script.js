const email = document.getElementById("Email")
const letter = document.getElementById("Letter")

const whatselected = document.getElementById("submit")

function Colorchange_email() {
    email.style.backgroundColor = "rgb(76, 164, 117)";
    email.style.color="white";

    
    letter.style.backgroundColor = "white"
    letter.style.color="black";

 whatselected.innerHTML="GENERATE EMAIL"


}


function Colorchange_letter() {
    letter.style.backgroundColor = "rgb(76, 164, 117)";
    letter.style.color="white";


    email.style.backgroundColor = "white"
    email.style.color="black";

 whatselected.innerHTML="GENERATE APPLICATION"


}





// Word limit
const wordcount = document.getElementById("limit")
const whatisword_count = wordcount.value
const word = document.getElementById("words")

// for (let i = whatisword_count; ; ) {
    
//     // word.innerHTML=whatisword_count
// }
