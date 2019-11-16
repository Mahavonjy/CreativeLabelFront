import React, { Component } from "react";
import "./Sign"

class SignInOrUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href: window.location.href.split("/"), isMounted: false,
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div>
                <p>hello</p>
            </div>
        );
    }
}

export default SignInOrUp;
