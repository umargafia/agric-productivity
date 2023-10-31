import { Provider } from 'react-redux';
import React from 'react';

import Main from './Main';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
