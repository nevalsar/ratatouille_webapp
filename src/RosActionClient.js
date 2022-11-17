import RosClient from '@ifollow/ros-client';

// var RosClient = require("roslibjs-client"); // This is not necessary in the browser

const SendRecipeGoal = (recipe_id) => {


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
        console.log("Result: ", result);
    }
    client.action.send(serverName, actionName, payload, timeout, feedback_callback, timeout_callback, result_callback);

}

export default SendRecipeGoal;