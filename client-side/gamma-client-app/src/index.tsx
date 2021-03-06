import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import {createBrowserHistory} from 'history';
//import './gamma';

export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

