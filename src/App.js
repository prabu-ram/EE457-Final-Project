import './App.css';
import { Amplify } from 'aws-amplify';
import React from "react";
import '@aws-amplify/ui-react/styles.css';

import config from './aws-exports'
import {withAuthenticator} from '@aws-amplify/ui-react'

Amplify.configure(config)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello
        </header>
    </div>
  );
}

export default withAuthenticator(App);
