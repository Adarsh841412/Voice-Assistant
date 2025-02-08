let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN"; // Adjusted language code

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        text_speak.voice = voices.find(voice => voice.lang === "hi-IN") || voices[0]; // Adjusted language code
    }

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    console.log(hours);
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener('load', () => {
    window.speechSynthesis.onvoiceschanged = wishMe;
    if (window.speechSynthesis.getVoices().length !== 0) {
        wishMe();
    }
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript.toLowerCase(); // Convert to lowercase here
    content.innerText = transcript;
    takeCommand(transcript);
    console.log(event);
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    // Ignore the word "Friday" in the message
    message = message.replace(/friday/g, "").trim();

    if (message.includes("hello") || message.includes("hey")) {
        speak("नमस्ते! हम ठीक बानी। उम्मीद बा कि रउरा बढ़िया बानी। अगर रउरा के कवनो मदद चाहीं, त बता दीं। हम खुश होइब रउरा के सहायता करे में!");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant created by Aadarsh");
    } else if (message.includes("open youtube")) {
        speak("opening youtube");
        window.open("https://www.youtube.com/");
    } else if (message.includes("open google")) {
        speak("opening google");
        window.open("https://www.google.co.in/");
    } else if (message.includes("open instagram")) {
        speak("opening instagram");
        window.open("https://www.instagram.com/accounts/login/?hl=en");
    } 
    
    else if (message.includes("open calculator")) {
        speak("opening calculator");
        window.open("calculator://");
    }
    else if (message.includes("open whatsapp")) {
        speak("opening whatsapp");
        window.open("whatsapp://");
    }
    else if (message.includes("time")) {
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
        speak(time);
    }

    else if (message.includes("date")) {
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
        speak(date);
    }
    // else if(message.includes("Tell ") || message.includes("tell me something about yourself")){
    //     speak("Hello, Adarsh! I am Friday, your personal voice assistant. Designed to assist, learn, and adapt, I am here to make your life easier. Whether you need information, a task completed, or just someone to talk to, I have got you covered. What can I do for you today?")
    // }


    else {
        
        let encodedMessage = encodeURIComponent(message); // URL-encode the search query
        speak(`This is what I found on the internet regarding ${message}`);
        window.open(`https://www.google.com/search?q=${encodedMessage}`);
    }
}
