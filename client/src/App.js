import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {
        response: ''
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.genres }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/genres');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.genres);

        return body;
    };

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default App;
