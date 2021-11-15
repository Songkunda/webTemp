import React from "react";
import ReactDOM from "react-dom";
import styles from "./index.less";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./elements/home";
import About from "./elements/about";

class App extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <header>
          <h1>Welcome to React Router v6!</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
