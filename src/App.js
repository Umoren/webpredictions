import './App.css';
import { Amplify } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

import awsconfig from './aws-exports';


Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  return (
    <div className="App">
      <TextTranslation />
      <TextToSpeech />
      <SpeechToText />
      <TextIdentification />
      <EntityIdentification />
      <PredictionsUpload />
      <LabelsIdentification />
      <TextInterpretation />
    </div>
  );
}

export default App;
