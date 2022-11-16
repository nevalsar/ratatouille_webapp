import React, { Component } from 'react';

import recipes from './recipes.json'
import './App.css';
import RecipeCard from './RecipeCard';
import Footer from './Footer';
import Header from './Header';

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
    <>
      <Header />
      <h1 className="text-center my-5">Autonomous Robotic Kitchen</h1>
      <div id="recipes-list" className="container-sm">
        {recipes.recipes.map(recipe =>
          <RecipeCard name={recipe.name} key={`recipe-card-${recipe.name}`} recipe_id={recipe.id} choices={recipe.choices} description={recipe.description} />)}
      </div>
      <Footer />
    </>
  );
}

export default App;
