import React, {Component} from 'react';
import './divisionStyles.css';
import Credentials from "../Credentials/Credentials";
/*this component renders each division with its credentials and passes some events to the parent*/
class Division extends Component {
    constructor(props) {
        super(props);
        this.handleSelect=this.handleSelect.bind(this);
    }

    handleSelect(e){
        this.props.handleSelect(e);
    }

    render() {
        const {divName, repoList} = this.props;
        return (
            <div className="division-container">
                <h2>{divName.toUpperCase()}</h2>
                {repoList.map((credentials, i) => (
                    <Credentials
                        key={i + 1000}
                        credentials={credentials}
                        divName={divName}
                        handleSelect={this.handleSelect}
                    />
                ))}
            </div>
        );
    }
}

export default Division;