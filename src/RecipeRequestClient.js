import RosClient from '@ifollow/ros-client';
const { actionServerUrl } = require('./ratatouille-ui-config.json');

const GetRecipeRequestClient = () => {
    const client = new RosClient({
        url: actionServerUrl,
    })
    client.on("connected", () =>
        console.log("Connected to Recipe Request Server."));

    return client;
}

const SendRecipeRequest = (
    ros_client,
    recipe_id,
    recipe_name,
    feedback_callback,
    timeout_callback,
    result_callback
) => {

    console.log(`Requesting recipe [${recipe_id}] [${recipe_name}].`);

    var serverName = "/RecipeRequest"
    var actionName = "ratatouille_planner/RecipeRequestAction"
    var payload = {
        recipe_id: recipe_id
    }

    var timeout = undefined

    ros_client.action.send(serverName, actionName, payload, timeout, feedback_callback, timeout_callback, result_callback);
};

export { GetRecipeRequestClient, SendRecipeRequest };
