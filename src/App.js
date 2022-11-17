import React, { Component } from 'react';

import RosClient from '@ifollow/ros-client';
import recipes from './recipes.json'
import './App.css';
import RecipeCard from './RecipeCard';
import Footer from './Footer';
import Header from './Header';
import { Alert, Modal, Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDispensing: false,
      recipeId: -1
    }
  }

  SendRecipeGoal = (recipe_id) => {

    this.setState({ recipeId: recipe_id, isDispensing: true });

    var client = new RosClient({
      // url: "ws://128.2.178.35:9090"
      url: "ws://localhost:9090"
    });

    var serverName = "/RecipeRequest"
    var actionName = "ratatouille_planner/RecipeRequestAction"
    var payload = {
      recipe_id: recipe_id
    }
    var timeout = undefined

    var feedback_callback = function (feedback) {
      console.log("Feedback: ", feedback);
    }
    var timeout_callback = function () {
      console.log("Timed out!");
      // In that case, you can, as an example, cancel the group
    }
    var result_callback = function (result) {
      this.setState({ ...this.state, isDispensing: false });
      console.log("Result: ", result);
    }.bind(this)

    client.action.send(serverName, actionName, payload, timeout, feedback_callback, timeout_callback, result_callback);

  }

  // sendRecipeToSystem(recipe_id) {
  // console.log('i got ' + recipe_id);
  // this.setState({ ...this.state, recipe_id: recipe_id });
  // this.SendRecipeGoal(recipe_id);
  // }

  getModal = () => (<Modal.Dialog>
    <Modal.Header closeButton>
      <Modal.Title>Modal title</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>Modal body text goes here.</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary">Close</Button>
      <Button variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal.Dialog>)

  render() {
    return (
      <>
        <Header />
        <h1 className="text-center my-5">Autonomous Robotic Kitchen</h1>
        {/* {this.state.isDispensing ?
          <Alert variant="warning">Dispensing recipe [{this.state.recipeId}].</Alert> :
          <Alert variant="primary">Ready to dispense.</Alert>} */}

        <Modal
          className="modal"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.isDispensing}
        >
          <Modal.Body>
            <h4 className='text-center'>Dispensing In Progress</h4>
            <div className='modal-spinner-box'><div id="loading"></div></div>
          </Modal.Body>
        </Modal>

        <div id="recipes-list" className="container-sm">
          {recipes.recipes.map(recipe =>
            <RecipeCard name={recipe.name} key={`recipe-card-${recipe.name}`} recipe_id={recipe.id} choices={recipe.choices} description={recipe.description} submitRecipe={this.SendRecipeGoal} />)}
        </div>
        <Footer />
      </>)
  }
}


export default App;
