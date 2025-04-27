const wordtext = document.querySelector(".word");  // sawbna had var bach twali lkalma dynamique
const hinttext = document.querySelector(".hint span"),
refrechbtn= document.querySelector('.refrech');
checkbtn=document.querySelector('.check');
inputbox= document.querySelector("input")
let  wordcorrect ;
const scoretext = document.querySelector(".score b");
let score = 0;//variable de score
const successSound = new Audio('yeyyy.mp3');          //fichier      
const errorSound = new Audio('buzzer-error.mp3');
const clickSound = new Audio('mouse-click-by-ek6_VR0O6PL.mp3');
const timeSound = new Audio('10-sec-timer.mp3');
timetext = document.querySelector(".time b")
let timer
const Ftimer = (maxtime)=>{ // maxtimer > parametre li kaymtl lwa9t
    clearInterval(timer); //kaytmssaa7 l interval li kan khdam 9blak 
    timer = setInterval(()=> {
        if (maxtime > 0 ){
            maxtime--;
            if (maxtime ==10){       //this pour timer
                playtimeSound();
            }
            return timetext.innerText = maxtime;
        }
        else{
            clearInterval(timer); // === 0
            Swal.fire({
                title: "Temps écoulé !",
                text: `Le mot correct était : ${wordcorrect.toUpperCase()}`, 
                icon: "error",
                confirmButtonText: "Ok"
            });
            intGam(); // kat3awd la3ba
        }
    }, 1000);   //1000 mili tanya => 1 tanya 
}
const intGam = () =>{
    Ftimer(30); //call fct of 30s
    let randomObj = words[Math.floor(Math.random()*words.length)]; // getting a random obj from words 
    // console.log(randomObj); //ghat3tina randomobj mn dok l words
    let wordletter= randomObj.word.split("");// splitting each letter of one randomobj li 3ndha 
    console.log(wordletter)
    for(let i= wordletter.length - 1 ; i > 0 ; i--){   // boucle for swiping between letters
        let j = Math.floor(Math.random() * (i + 1));//getting a random number mn 1 hta l 6  
        let temp = wordletter[i];
        wordletter[i] = wordletter[j];
        wordletter[j] = temp;  
    }  // now wordlettre w9a3 l7orof dyolha  random 
    console.log(wordletter,randomObj.word)
    wordtext.innerText= wordletter/*.join()*/; // 7tina dik l wordletter li darna 3liha kolchi dok loperation f dak variab  || .join() give you the freddom for add anything between the letters
    hinttext.innerText=randomObj.hint; //hna 7tina m3ah 7ta l hint dyalha
    wordcorrect = randomObj.word
    // console.log(wordcorrect)
    inputbox.value = ""  //makking this input impty after refrech fct
    inputbox.focus() // makking the input focus after refrech fct
    inputbox.setAttribute("maxlength",wordcorrect.length) // khli 3adad l7orof li aydakhal l user hwa 3addad wordcorrect

}
intGam();
const checkword = ()=>{
    let worduser= inputbox.value.toLowerCase();
    // console.log(worduser)

    if (wordcorrect===worduser){
        playSuccessSound();
        score += 10;  // add 10 points
        scoretext.innerText = score;//update the text in HTML
        Swal.fire({ title: "Bravo !", text: "Mot correct !", icon: "success" });
        intGam();
    }else if (!worduser){
        playErrorSound();
        return Swal.fire({ title: "Attention", text: "Veuillez entrer un mot !", icon: "warning" });
    }else {
        playErrorSound();
        Swal.fire({ title: "Oups!", text: "Mot incorrect", icon: "error" });
    }
}

// son sur des action specifique
function playSuccessSound() {
    successSound.play();
}
function playErrorSound() {
    errorSound.play();
}
function playClickSound() {
    clickSound.play();
}
function playtimeSound() {
    timeSound.play();
}

checkbtn.addEventListener("click", () => {
    checkword();
    playClickSound(); // Play sound of click  when user click check
});

refrechbtn.addEventListener("click", () => {
    intGam();
    playClickSound(); // Play .. when user clicks refresh
});
