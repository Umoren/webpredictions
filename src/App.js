import { Amplify } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import TextToSpeech from './components/TextToSpeech';

import awsconfig from './aws-exports';


Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  return (
    <div className="App">
      <TextToSpeech />
    </div>
  );
}

export default App;
