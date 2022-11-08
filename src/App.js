import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import RecipeCard from './RecipeCard';

function App() {
  return (
    // <div classNameName="App">
    //   <header classNameName="App-header">
    //     <img src={logo} classNameName="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       classNameName="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="container-fluid">
      <h1 className="text-center my-5">Ratatouille Robotic Kitchen</h1>
      <div className="row recipes-list">
        <RecipeCard name="pasta" description="Some quick example text to build on the card title and make up the bulk of the card's content." />
        <RecipeCard name="poha" description="Some quick example text to build on the card title and make up the bulk of the card's content." />
        <RecipeCard name="mediterranean-salad" description="Some quick example text to build on the card title and make up the bulk of the card's content." />
      </div>
    </div>
  );
}

export default App;
