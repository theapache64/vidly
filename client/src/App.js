import React, {Component} from 'react';
import './App.css';
import GenresList from './components/GenresList';
import AddGenreForm from './components/AddGenreForm';

class App extends Component {

    render() {
        return (

                <div style={{padding: 10}}>

                    <h2>Add Genre</h2>
                    <AddGenreForm/>

                    <hr/>

                    <h2>All Genres</h2>
                    <GenresList/>
                </div>
        );
    }
}

export default App;
