import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

 // REDUX
import { Provider } from 'react-redux';
import store from './redux/store';

// third party styling
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
