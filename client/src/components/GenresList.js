// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteGenre, editGenre, loadGenres} from '../redux/actions/genresActions';

class GenresList extends Component {


    getGenres = () => {
        console.log('Genres', this.props);
        if(this.props.genres){
            return this.props.genres.map(genre => {
                return (
                    <li key={genre.id}>{genre.name}
                         <a href="#edit" onClick={() => this.onEditGenre(genre)}>[/]</a>
                        <a href="#delete" onClick={()=>this.onDeleteGenre(genre)}>[X]</a>
                    </li>
                )
            });
        }
    };

    onEditGenre = (genre) => {
        const newGenreName = prompt('Enter new genre name', genre.name);
        if(newGenreName){
            this.props.editGenre(genre.id, newGenreName)
        }
    };

    onDeleteGenre = (genre) =>{
        this.props.deleteGenre(genre.id);
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
    loadGenres, editGenre, deleteGenre
};

export default connect(mapStateToProps, mapDispatchToProps)(GenresList)