import React, { Component } from 'react';
import './RecipeCard.css';
import { Form, Card, Button } from 'react-bootstrap';

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
            <Card className="recipe-card" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`images/${this.name}.jpg`} />
                <Card.Body>
                    <Card.Title>{this.title}</Card.Title>
                    <Card.Text>
                        {this.description}
                    </Card.Text>

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
                        <Button variant="success">Select</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    render2() {

        return (
            <div className="card">
                <img
                    src={`images/${this.name}.jpg`}
                    className="card-img-top recipe-image"
                    alt="..."
                />
                <div className="card-body">
                    <h5 className="card-title">{this.title}</h5>
                    <p className="card-text">
                        {this.description}
                    </p>
                    <button href="#" className="btn btn-success float-right" onClick={() => { this.handleRecipeSubmit(this.name) }}>Select</button>

                    <Form>
                        {this.choices.map(choice =>
                            <div key={`inline-radio-${choice.name}`} className="mb-3">
                                {/* <p>{choice.name}</p> */}
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
                            </div>
                        )}
                    </Form>
                </div>
            </div>


        );
    }
}

export default RecipeCard;
