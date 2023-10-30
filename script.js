const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const wordTitle = document.getElementById("word-title");
const partOfSpeech = document.getElementById("part-of-speech");
const phonetic = document.getElementById("phonetic");
const meaning = document.getElementById("meaning");
const example = document.getElementById("example");
let inpWord = ""; // Declare inpWord in a broader scope

btn.addEventListener("click", () => {
    inpWord = document.getElementById("inp-word").value; // Set inpWord here
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            const wordData = data[0];

            // Update the UI with word details
            wordTitle.textContent = inpWord;
            partOfSpeech.textContent = wordData.meanings[0].partOfSpeech;
            phonetic.textContent = `/${wordData.phonetic}/`;
            meaning.textContent = wordData.meanings[0].definitions[0].definition;
            example.textContent = wordData.meanings[0].definitions[0].example || "";

            // Enable the "Pronounce" button
            playSoundButton.disabled = false;
        })
        .catch(() => {
            // Display an error message
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

const playSoundButton = document.getElementById("play-sound");

playSoundButton.addEventListener("click", () => {
    // Check if the speechSynthesis API is available
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(inpWord);
        speech.lang = 'en-US';
        speech.rate = 1.0;
        speech.volume = 1.0;

        // Speak the word
        speechSynthesis.speak(speech);
    } else {
        alert("Text-to-speech is not supported in your browser.");
    }
});
