/* 
    audio file: https://dl.sndup.net/jh3s/what-is-it-like-to-be-a-crocodile-27706.mp3
    API key: 7b4f3b6f15533a022d57f63ac6f706619e74de28
*/

//import Deepgram SDK
import { Deepgram } from '@deepgram/sdk';

//initialise Deepgram
const deepgram = new Deepgram('7b4f3b6f15533a022d57f63ac6f706619e74de28');

/* import html elements */
const audioInput = document.getElementById('audio-input');
const audioPlayback = document.getElementById('audio-playback');
const convertButton = document.getElementById('btn-convert');
const textDisplay = document.getElementById('text-display');

/* audio input onchange event listener */
audioInput.addEventListener('change', function (event) {
  audioPlayback.src = event.target.value;
});

/* convert button click event listener */
convertButton.addEventListener('click', async function () {
  //convert audio file to text
  const response = await deepgram.transcription.preRecorded(
    { url: audioInput.value },
    { filler_words: 'false', summarize: 'v2' }
  );

  //put generated words into textArray
  const textArray = response.results.channels[0].alternatives[0].words;

  //loop through textArray and add each punctuated word to the textString
  let textString = '';
  textArray.forEach(function (word) {
    textString += `${word.punctuated_word} `;
  });

  //display textString in text area
  textDisplay.innerText = textString;
});
