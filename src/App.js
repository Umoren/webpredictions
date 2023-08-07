import { Amplify } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import TextTranslation from './components/TextTranslation';

import awsconfig from './aws-exports';


Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  return (
    <div className="App">
      <TextTranslation />
    </div>
  );
}

export default App;
