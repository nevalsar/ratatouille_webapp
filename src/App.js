import React, { Component } from 'react';

const { actionServerUrl } = require('./ratatouille-ui-config.json');
import RosClient from '@ifollow/ros-client';
import recipes from './recipes.json'
import './App.css';
import RecipeCard from './RecipeCard';
import Footer from './Footer';
import Header from './Header';
import { ProgressBar, Modal, Button } from 'react-bootstrap';

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
    this.ros_client = new RosClient({
      url: actionServerUrl
    });
    this.ros_client.on("connected", () =>
      console.log("Connected to Ratatouille Action Server."));
  }

  SendRecipeGoal = (recipe_id, recipe_name) => {

    console.log(`Requesting recipe [${recipe_id}] [${recipe_name}].`);

    this.setState({ recipeId: recipe_id, recipeName: recipe_name, dispensingState: 1 });

    var serverName = "/RecipeRequest"
    var actionName = "ratatouille_planner/RecipeRequestAction"
    var payload = {
      recipe_id: recipe_id
    }
    var timeout = undefined

    var feedback_callback = function (feedback) {
      console.log("Feedback: ", feedback);
      this.setState({ ...this.state, progress: feedback.percent_complete });
    }.bind(this)

    var timeout_callback = function () {
      console.log("Timed out!");
      // In that case, you can, as an example, cancel the group
    }
    var result_callback = function (result) {
      console.log("Result: ", result);
      this.setState({ ...this.state, dispensingState: 2, lastresult: result.status });
    }.bind(this)

    this.ros_client.action.send(serverName, actionName, payload, timeout, feedback_callback, timeout_callback, result_callback);

  }

  // sendRecipeToSystem(recipe_id) {
  // console.log('i got ' + recipe_id);
  // this.setState({ ...this.state, recipe_id: recipe_id });
  // this.SendRecipeGoal(recipe_id);
  // }

  getProgressModal = () => (
    <Modal
      className="modal modal-progress"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={this.state.dispensingState == 1}
    >
      <Modal.Body>
        <h4 className='text-center'>Your {this.state.recipeName} is being prepared!</h4>
        <div className='modal-spinner-box'>
          <img className='progress-gif' src="./rata-cooking.gif" />
        </div>
        <ProgressBar className='mt-3' variant="success" animated now={this.state.progress} />
      </Modal.Body>
    </Modal>
  )

  dismissModal = () => this.setState({ ...this.state, recipeId: -1, recipeName: "", dispensingState: 0 })

  getResultModal = () => (
    <Modal
      className="modal modal-result"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={this.state.dispensingState == 2}
    >
      <Modal.Body>
        {this.state.lastresult == "success" &&
          <>
            <h4 className='text-center'>Your {this.state.recipeName} is ready!</h4>
            <i className="bi-check-circle-fill text-success" />
          </>
        }

        {this.state.lastresult == "error" &&
          <>
            <h4 className='text-center'>Uh oh!</h4>
            <h4 className='text-center'>{this.state.recipeName} could not be prepared!</h4>
            <i className="bi-exclamation-circle-fill text-warning" />
          </>
        }

        {this.state.lastresult == "quantityerror" &&
          <>
            <h4 className='text-center'>Uh oh!</h4>
            <h4 className='text-center'>Insufficient ingredients to make {this.state.recipeName}!</h4>
            <i className="bi-exclamation-circle-fill text-warning" />
          </>
        }


        {/* [success: [{JSON.stringify(this.state.lastresult)}]] */}


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.dismissModal}>Back to Recipes</Button>
      </Modal.Footer>
    </Modal>
  )

  render() {
    return (
      <>
        <Header />
        <h1 className="text-center my-5">Autonomous Robotic Kitchen</h1>

        {this.getProgressModal()}
        {this.getResultModal()}

        <div id="recipes-list" className="container-sm">
          {recipes.recipes.map(recipe =>
            <RecipeCard name={recipe.name} key={`recipe-card-${recipe.name}`} recipe_id={recipe.id} choices={recipe.choices} description={recipe.description} submitRecipe={this.SendRecipeGoal} />)}
        </div>
        <Footer />
      </>)
  }
}


export default App;
