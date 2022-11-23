import React from 'react';
import './RecipeCard.css';
import { Form, Button, Image } from 'react-bootstrap';

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.title = props.name.split("-").map(word =>
            word.charAt(0).toUpperCase() + word.substring(1)
        ).join(" ");
        this.description = props.description;
        this.choices = props.choices;
        this.recipe_id = props.recipe_id;
        this.submitRecipe = props.submitRecipe;
    }

    handleSubmitClick = () => {

        // hack for customization
        if (this.recipe_id == 2) {
            var target_recipe_id = -1;
            let oregano = document.querySelector("#oregano").checked;
            let bellpepper = document.querySelector("#bell-pepper").checked;

            if (oregano && bellpepper) {
                target_recipe_id = 21;
            } else if (oregano && !bellpepper) {
                target_recipe_id = 22;
            } else if (!oregano && bellpepper) {
                target_recipe_id = 23;
            } else {
                target_recipe_id = 24;
            }
            this.submitRecipe(target_recipe_id, this.title);
            return
        }

        this.submitRecipe(this.recipe_id, this.title);
    }

    render() {
        return (
            <div className='recipe-card my-3'>
                <div className='row recipe-card-image'>
                    <div className='col p-4'>
                        <Image src={`images/${this.name}.jpg`} />
                    </div>
                </div>
                <div className='row recipe-card-content'>
                    <div className='col p-4 pt-0 text-center'>
                        <h1>{this.title}</h1>
                        <p>{this.description}</p>
                        <Form className='customizations-form'>
                            <div className="mb-3">
                                {this.choices.map(choice =>
                                    <Form.Check
                                        type="checkbox"
                                        id={choice.name.toLowerCase().replace(" ", "-")}
                                        defaultChecked={true}
                                        key={choice.name}
                                        label={choice.name}
                                    />
                                )}
                            </div>
                            <Button variant="success" size="md" onClick={this.handleSubmitClick}>Select</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeCard;
