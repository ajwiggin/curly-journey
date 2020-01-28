console.log('ron');
import React, { StrictMode } from "/web_modules/react.js";
import ReactDOM from "/web_modules/react-dom.js"; // import './index.css';

import App from "./App.js";
import { url } from "./url.js";
import { ErrorBoundary } from "./ErrorBoundary.js"; // const dev = process.env.NODE_ENV === 'development';

const dev = false;
if (!window.pglOptions) window.pglOptions = {};
const userPromise = fetch(url + 'login', {
  credentials: 'include'
});
window.c = console.log;
console.log(url, userPromise);

for (let [key, value] of Object.entries({
  dev: false,
  validate: true,
  prefill: dev,
  showState: dev,
  settings: dev
})) {
  const ls = localStorage[key]; //it's a string!!!!!

  if (ls) {
    window.pglOptions[key] = ls === 'true' ? true : false;
  } else {
    window.pglOptions[key] = value;
  }
}

ReactDOM.render(React.createElement(ErrorBoundary, null, React.createElement(StrictMode, null, React.createElement(App, {
  userPromise: userPromise
}))), document.getElementById('root'));

if (dev) {
  const script = document.createElement('script');
  script.src = 'reload/reload.js';
  script.id = 'reload';
  document.body.appendChild(script);
} // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();