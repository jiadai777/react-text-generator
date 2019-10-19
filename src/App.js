import React from 'react';
import './App.css';
import Output from './components/Output';
import Select from './components/controls/Select';
import Text from './components/controls/Text';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paras: 4,
            html: true,
            text: ''
        }
    }

    componentWillMount() {
        this.getSampleText();
    }

    getSampleText() {
        // Need this url to pass CORS policy
        const cors = "https://cors-anywhere.herokuapp.com/";

        axios.get(cors+'http://hipsterjesus.com/api?paras='+this.state.paras+'&html='+this.state.html)
        .then((response) => {
            this.setState({text: response.data.text}, function() {
                console.log(this.state);
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    showHtml(x) {
        this.setState({html: x}, this.getSampleText);
    }

    changeParas(n) {
        this.setState({paras: n}, this.getSampleText);
    }

    render() {
        return (
            <div className="App container">
                <h1 className="text-center">ReactJS Sample Text Generator</h1>
                <hr />
                <form className="form-inline pb-3">
                    <div className="form-group">
                        <label>Include HTML:</label>
                        <Select value={this.state.html} onChange={this.showHtml.bind(this)} />
                    </div>
                    <div className="form-group pl-3">
                        <label>Paragraphs:</label>
                        <Text value={this.state.paras} onChange={this.changeParas.bind(this)} />
                    </div>
                </form>
                <Output value={this.state.text} />
            </div>
        )
    }
}

export default App;
