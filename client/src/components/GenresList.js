// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadGenres} from '../redux/actions/genresActions';

class GenresList extends Component {
    getGenres = () => {
        console.log('Genres',this.props);
        return this.props.genres.map(genre => {
            return <li key={genre.id}>{genre.name}</li>
        });
    };


    componentDidMount() {
        this.props.loadGenres();
    }


    render() {
        return (
            <div>
                <ul>
                    {this.getGenres()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genres.genres
    }
};

const mapDispatchToProps = {
    loadGenres: loadGenres
};

export default connect(mapStateToProps, mapDispatchToProps)(GenresList)