import React, { Component } from 'react';
import './RecipeCard.css';

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.title = props.name.split("-").map(word =>
            word.charAt(0).toUpperCase() + word.substring(1)
        ).join(" ");
        this.description = props.description;
    }

    render() {
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
                    <button href="#" className="btn btn-success float-right">Select</button>
                </div>
            </div>
        );
    }
}


// const RecipeCard = props => (
//     <div className="card">
//         <img
//             src={`images/${props.name}.jpg`}
//             className="card-img-top recipe-image"
//             alt="..."
//         />
//         <div className="card-body">
//             <h5 className="card-title">{props.name}</h5>
//             <p className="card-text">
//                 {props.description}
//             </p>
//             <button href="#" className="btn btn-success float-right">Select</button>
//         </div>
//     </div>
// );

export default RecipeCard;
