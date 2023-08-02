import { Predictions } from 'aws-amplify';
import { useState } from 'react';

function TextToSpeech() {
    const [response, setResponse] = useState('...');
    const [textGenerateToSpeech, setTextGenerateToSpeech] = useState('write to speech');

    const generateTextToSpeech = () => {
        setResponse('Generating speech...');
        Predictions.convert({
            textToSpeech: {
                source: {
                    text: textGenerateToSpeech,
                },
                voiceId: "Kimberly"
            }
        }).then(result => {
            let AudioContext = window.AudioContext || window.webkitAudioContext;
            console.log({ AudioContext });
            const audioCtx = new AudioContext(); // browsers limit the number of concurrent audio contexts, so you better re-use'em 
            const source = audioCtx.createBufferSource(); // creates a sound source
            audioCtx.decodeAudioData(result.audioStream, (buffer) => {
                source.buffer = buffer;
                source.connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
                source.start(0); // play the source now
            }, (err) => console.log({ err }));
            setResponse('Speech generated, press play');
        })
            .catch(err => setResponse(JSON.stringify(err, null, 2)))
    }

    const setText = (event) => {
        setTextGenerateToSpeech(event.target.value);
    }

    return (
        <div className='Text'>
            <div>
                <h3> Text to Speech</h3>
                <input type='text' onChange={setText} value={textGenerateToSpeech} />
                <button onClick={generateTextToSpeech}>Generate Speech</button>
                <h3> {response} </h3>
            </div>
        </div>
    )
}

export default TextToSpeech;