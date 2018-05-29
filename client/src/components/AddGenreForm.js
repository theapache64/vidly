// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addGenre} from '../redux/actions/genresActions';

class AddGenreForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addGenre(this.state.name);
    };

    onChangeInput = (e) => {
        this.setState({
            name: e.target.value
        })
    };


    componentWillReceiveProps(nextProps) {
        if(nextProps.newGenre){
            this.setState({name : ''})
        }
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input placeholder="Genre Name" onChange={this.onChangeInput} value={this.state.name} type="text"/>
                    <input type="submit" value="ADD"/>
                </form>
                {this.props.errorMessage && <p style={{color : 'red'}}>{this.props.errorMessage}</p> }
            </div>
        );
    }
}

const mapDispatchToProps = {
    addGenre
};

const mapStateToProps = (state) => {
    return {
        newGenre : state.genres.newGenre,
        errorMessage : state.genres.errorMessage
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AddGenreForm);