import React, { Component } from "react";

class FirstForm extends Component {
    state = {
        isMounted: false,
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div>
                <p>Ma formilaire sera ici</p>
            </div>
        );
    }
}

export default FirstForm;
