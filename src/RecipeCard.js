import React, { Component } from 'react';
import './RecipeCard.css';
import { Form, Card, Button, Image } from 'react-bootstrap';

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.title = props.name.split("-").map(word =>
            word.charAt(0).toUpperCase() + word.substring(1)
        ).join(" ");
        this.description = props.description;
        // choices = {("spicy":),}
        this.choices = props.choices;
    }

    handleRecipeSubmit(name) {
        console.log(`Submitted ${this.name}`);
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
                    <div className='col text-center p-4 pt-0'>
                        <h1>{this.title}</h1>
                        <p>{this.description}</p>
                        <Form>
                            {this.choices.map(choice =>
                                <Form.Group key={`inline-radio-${choice.name}`} className="mb-3 form-control" controlId={`inline-radio-${choice.name}`}>
                                    <Form.Label>{choice.name}</Form.Label> <br />
                                    {
                                        // render radio buttons for each choice according to scale
                                        [...Array(choice.scale).keys()].map(value => {
                                            value = value + 1;
                                            return (<Form.Check
                                                inline
                                                label={value}
                                                name={`group${value}`}
                                                type="radio"
                                                id={`inline-radio-${value}`}
                                                key={`${this.name}-choice-${value}`}
                                            />);
                                        })
                                    }
                                </Form.Group>
                            )}
                            <Button variant="success" onClick={() => { this.handleRecipeSubmit(this.name) }}>Select</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeCard;
