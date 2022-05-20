const Jojos = ["jonathanjoestar","starplatinum","magiciansred","hermitpurple","hierophantgreen","silverchariot","thefool","theworld","towerofgray","darkbluemoon","strength","ebonydevil","yellowtemperance","hangedman","emperor","empress","wheeloffortune","justice","lovers","deaththirteen","judgement","highpriestess","khnum","tohth","anubis","bastet","sethan","osiris","horus","atum","tenoresax","cream","crazydiamond","thehand","echoes","heavensdoor","killerqueen","sheerheartattack","bitesthedust","aquanecklace","badcompany","redhotchilipepper","thelock","surface","lovedeluxe","pearljam","achtungbaby","ratt","harvest","cinderella","atomheartfather","boy2man","earthwindandfire","highwaystar","straycat","superfly","enigma","cheaptrick","goldexperience","stickyfingers","moodyblues","sexpistols","aerosmith","purplehaze","spicegirl","mrpresident","silverchariotrequiem","goldexperiencerequiem","kingcrimson","blacksabbath","softmachine","kraftwork","littlefeet","maninthemirror","beachboy","thegratefuldead","babyface","whitealbum","clash","talkinghead","notoriousbig","metallica","greenday","oasis","rollingstones", "danny","lisalisa","rudolvonstroheim","muhammadavdol","holykujo","iggy","roses","anne","dio", "messina","loggins","smokeybrown","suziq", "erinapendleton","tattoo", "sherrypolnareff", "poco","tonpetty","dire","adams","doobie","fatherstyx","maryjoestar", "jotarokujo", "josephjoestar", "josukehigashikata", "giornogiovanna", "jolynecujoh", "johnnyjoestar", "diobrando", "kars", "wham","acdc", "diavolo","yoshikagekira", "enricopucci","funnyvalentine","roberteospeedwagon", "caesarzeppeli","willazeppeli","jeanpierrepolnareff","koichihirose","okuyasu","brunobucciarati", "ermescostello", "gyrozeppeli", "yasuhohirose", "georgejoestar","holyjoestarkujo","shizukajoestar","josefumikujo","jesus","bruford","tarkus","wangchan","jacktheripper","dariobrando","santana","straizo","donovan","wiredbeck","vanillaice","ndoul","oingo","boingo","mariah","alessi","danieljdarby","petshop","telencetdarby","enya","kennyg","midler","nena","jgeil","holhorse","rubbersoul","devo","cameo","mannishboy","arabiafats","steelydan","zztop","forever","grayfly","noriakikakyoin","vinegardoppio","mariozucchero","sale","dirtydeedsdonedirtcheap"]

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = Jojos[Math.floor(Math.random() * Jojos.length)]

console.log(Date())
console.log(rightGuessString)

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < 23; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length < 3) {
        toastr.error("Not enough letters!")
        return
    }

    

    
    for (let i = 0; i < 23; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                letterColor = 'green'
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            //flip box
            animateCSS(box, 'flipInX')
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        toastr.success("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!")
            toastr.info(`The right word was: "${rightGuessString}"`)
        }
    }
}

function insertLetter (pressedKey) {
    if (nextLetter === 23) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

initBoard();

//changelog
//removed p1 limit