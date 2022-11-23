import React from 'react';

import recipes from './recipes.json'

import './App.css';
import RecipeCard from './components/RecipeCard';
import Footer from './components/Footer';
import Header from './components/Header';
import ResultsModal from './components/ResultsModal';
import ProgressModal from './components/ProgressModal';
import { GetRecipeRequestClient, SendRecipeRequest } from './RecipeRequestClient';
import { Alert } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispensingState: 0,
      recipeId: -1,
      recipeName: "",
      lastResult: null,
      progress: 0,
      serverConnected: false
    }

    this.recipe_request_client = null;

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
      this.recipe_request_client,
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

  componentDidMount() {
    this.recipe_request_client = GetRecipeRequestClient(
      () => {
        console.log("Connected to Recipe Request Server.")
        this.setState({ serverConnected: true })
      },
      () => {
        console.log("Disconnected from Recipe Request Server.")
        this.setState({ serverConnected: false })
      },
    )
  }

  render() {
    return (
      <>
        <Header />
        <Alert variant="danger" className="text-center" hidden={this.state.serverConnected}>
          Server disconnected!
        </Alert>
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
