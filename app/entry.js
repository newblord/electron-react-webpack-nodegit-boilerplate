var React = require('react');
var ReactDOM = require('react-dom');
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

var path = require('path');
var nodegit = require('nodegit');

class Test extends React.Component {
    render() {
        return (
            <div>
                <h1>Test</h1>
            </div>
        );
    }
}


ReactDOM.render(
    <Test />,
    document.getElementById('main')
);