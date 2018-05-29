// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadGenres, editGenre, deleteGenre} from '../redux/actions/genresActions';

class GenresList extends Component {


    constructor(props) {
        super(props);

    }

    getGenres = () => {
        console.log('Genres', this.props);
        return this.props.genres.map(genre => {
            return (
                <li key={genre.id}>{genre.name} <a href="#" onClick={()=>this.onEditGenre(genre)}>[/]</a> <a href="#">[X]</a></li>
            )
        });
    };

    onEditGenre= (genre) => {
        const newGenreName = prompt('Enter new genre name', genre.name);

    };


    componentDidMount() {
        this.props.loadGenres();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newGenre) {
            this.props.genres.push(nextProps.newGenre);
        }
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
        newGenre: state.genres.newGenre,
        genres: state.genres.genres
    }
};

const mapDispatchToProps = {
    loadGenres, editGenre, deleteGenre
};

export default connect(mapStateToProps, mapDispatchToProps)(GenresList)