import { useState, useEffect } from "react";
import { Predictions } from "@aws-amplify/predictions";

function SpeechToText(props) {
    const [response, setResponse] = useState("Press 'start recording' to begin your transcription. Press STOP recording once you finish speaking.")

    function AudioRecorder(props) {
        const [recording, setRecording] = useState(false);
        const [stopTimeout, setStopTimeout] = useState(null);
        // const [micStream, setMicStream] = useState();
        let mediaRecorder;
        let chunks = [];


        function logRecordedAudio(audioBlob) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                const arrayBuffer = fileReader.result;
                console.log("Recorded Audio as Blob:", audioBlob);
                console.log("Recorded Audio as ArrayBuffer:", arrayBuffer);
            };
            fileReader.readAsArrayBuffer(audioBlob);
        }


        async function startRecording() {
            console.log('start recording');

            const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
            mediaRecorder = new MediaRecorder(stream);
            chunks = []; // Reset the chunks array at the start of recording

            setRecording(true);

            mediaRecorder.ondataavailable = (event) => {
                console.log("is data available...");
                console.log("event data", event.data);
                chunks.push(event.data);
                console.log("chunks length:", chunks.length);

            };

            mediaRecorder.start();

            const timeoutId = setTimeout(stopRecording, 5000);
            setStopTimeout(timeoutId);
        }

        async function stopRecording() {
            console.log('stop recording');
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(chunks, { type: 'audio/webm' }); // Concatenate all the chunks into a single Blob

                    // log recorded audio
                    logRecordedAudio(audioBlob);

                    const finishRecording = props.finishRecording;
                    if (typeof finishRecording === 'function') {
                        finishRecording(audioBlob);
                    }
                };
                mediaRecorder.stop();
            }

            clearTimeout(stopTimeout);
            setRecording(false);
        }
        useEffect(() => {
            return () => {
                // Clean up: clear the timer when the component unmounts
                clearTimeout(stopTimeout);
            };
        }, [stopTimeout]);
        return (
            <div className="audioRecorder">
                <div>
                    {recording && <button onClick={stopRecording}>Stop recording</button>}
                    {!recording && <button onClick={startRecording}>Start recording</button>}
                </div>
            </div>
        );
    }



    function convertFromBuffer(audioBlob) {
        setResponse('Converting text...');

        audioBlob.arrayBuffer().then((resultBuffer) => {
            console.log("resultBuffer", resultBuffer);

            Predictions.convert({
                transcription: {
                    source: {
                        bytes: resultBuffer,
                    },
                    language: "en-GB", // other options are "en-GB", "fr-FR", "fr-CA", "es-US"
                },
            })
                .then(({ transcription: { fullText } }) => {
                    setResponse(fullText);
                    console.log("Transcription result:", fullText);
                })
                .catch(err => {
                    setResponse(JSON.stringify(err, null, 2));
                    console.error("Transcription error:", err);
                });
        });
    }



    return (
        <div className="Text">
            <div>
                <h3>Speech to text</h3>
                <AudioRecorder finishRecording={convertFromBuffer} />
                <p>{response}</p>
            </div>
        </div>
    );
}

export default SpeechToText;
