import { Predictions } from 'aws-amplify';
import { useState } from 'react';
import './styles.css'

function TextTranslation() {
    const [response, setResponse] = useState("Input some text and click enter to test")
    const [textToTranslate, setTextToTranslate] = useState("write to translate");

    function translate() {
        Predictions.convert({
            translateText: {
                source: {
                    text: textToTranslate,
                    language: "en" // defaults configured on aws-exports.js
                    // supported languages https://docs.aws.amazon.com/translate/latest/dg/how-it-works.html#how-it-works-language-codes
                },
                targetLanguage: "de"
            }
        }).then(result => setResponse(JSON.stringify(result, null, 2)))
            .catch(err => setResponse(JSON.stringify(err, null, 2)))
    }

    function setText(event) {
        setTextToTranslate(event.target.value);
    }

    return (
        <div className="Text">
            <div>
                <h3>Text Translation</h3>
                <div className='textarea'>
                    <textarea value={textToTranslate} onChange={setText} />
                    <button onClick={translate}>Translate</button>
                </div>

                <div>
                    <pre>{response}</pre>
                </div>

            </div>
        </div>
    );
}

export default TextTranslation;