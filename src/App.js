import './App.css';
import { Amplify } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import SpeechToText from './components/SpeechToText';
import awsconfig from './aws-exports';


Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  return (
    <div className="App">
      <SpeechToText />
    </div>
  );
}

export default App;
