import React from 'react';

import recipes from './recipes.json'

import './App.css';
import RecipeCard from './components/RecipeCard';
import Footer from './components/Footer';
import Header from './components/Header';
import ResultsModal from './components/ResultsModal';
import ProgressModal from './components/ProgressModal';
import { GetRecipeRequestClient, SendRecipeRequest } from './RecipeRequestClient';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispensingState: 0,
      recipeId: -1,
      recipeName: "",
      lastResult: null,
      progress: 0
    }
    this.ros_client = GetRecipeRequestClient();

    this.recipe_feedback_callback = function (feedback) {
      console.log("Feedback: ", feedback);
      this.setState({ progress: feedback.percent_complete });
    }.bind(this)

    this.recipe_timeout_callback = function () {
      console.error("RecipeRequest timed out!");
    }

    this.recipe_result_callback = function (result) {
      console.log("Result: ", result);
      this.setState({ dispensingState: 2, lastResult: result.status });
    }.bind(this)
  }

  RequestRecipe = (recipe_id, recipe_name) => {
    this.setState({ recipeId: recipe_id, recipeName: recipe_name, dispensingState: 1 });

    SendRecipeRequest(
      this.ros_client,
      recipe_id,
      recipe_name,
      this.recipe_feedback_callback,
      this.recipe_timeout_callback,
      this.recipe_result_callback);
  }


  dismissModal = () => this.setState({
    progress: 0,
    recipeId: -1,
    recipeName: "",
    dispensingState: 0
  })

  render() {
    return (
      <>
        <Header />
        <h1 className="text-center my-5">
          Autonomous Robotic Kitchen
        </h1>
        <div id="recipes-list" className="container-sm">
          {recipes.recipes.map(recipe =>
            <RecipeCard
              name={recipe.name}
              key={`recipe-card-${recipe.name}`}
              recipe_id={recipe.id}
              choices={recipe.choices}
              description={recipe.description}
              submitRecipe={this.RequestRecipe}
            />
          )}
        </div>
        <Footer />
        <ProgressModal
          show={this.state.dispensingState == 1}
          progress={this.state.progress}
          recipeName={this.state.recipeName}
        />
        <ResultsModal
          show={this.state.dispensingState == 2}
          dismissModal={this.dismissModal}
          lastResult={this.state.lastResult}
          recipeName={this.state.recipeName}
        />
      </>)
  }
}


export default App;
