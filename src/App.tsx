import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Overall from './Components/Overall/Overall';
import CountryWiseData from './Components/CountryWiseData/CountryWiseData';


function App() {
  return (
    <main className="App ContentWidth">
      <header>
        <h1>COVID-19</h1>
        <p>Please stay at home. Save yourself, let others live</p>
      </header>
      <section className="Overall">
        <Overall></Overall>
      </section>
      <section className="Analytics">
        <CountryWiseData></CountryWiseData>
      </section>
    </main>
  );
}

export default App;
