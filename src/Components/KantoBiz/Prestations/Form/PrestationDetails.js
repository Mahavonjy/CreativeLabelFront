import React, { Component } from "react";

class PrestationDetails extends Component {
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
            <div className="Base" style={{height: "450 !important"}}>
                <p>Ici serons les details</p>
            </div>
        );
    }
}

export default PrestationDetails;
