// @flow
import React, {Component} from 'react';

export default class AddGenreForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
    };

    onChangeInput = (e) => {
        console.log(e.target.value);
        this.setState({
            name: e.target.value
        })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input placeholder="Genre Name" onChange={this.onChangeInput} value={this.state.name} type="text"/>
                    <input type="submit" value="ADD"/>
                </form>
            </div>
        );
    }
}