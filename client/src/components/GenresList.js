// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteGenre, editGenre, loadGenres} from '../redux/actions/genresActions';

class GenresList extends Component {


    getGenres = () => {
        console.log('Genres', this.props);
        return this.props.genres.map(genre => {
            return (
                    <li key={genre.id}>{genre.name}
                        <button onClick={() => this.onEditGenre(genre)}>[/]</button>
                        <button>[X]</button>
                    </li>
            )
        });
    };

    onEditGenre = (genre) => {
        const newGenreName = prompt('Enter new genre name', genre.name);
        this.props.editGenre(genre.id, newGenreName)
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