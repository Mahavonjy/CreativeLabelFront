import React, { Component } from "react";

class Recaputilatif extends Component {
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
            <div className="Base">
                <p>Ici sera ma recaputilatif</p>
            </div>
        );
    }
}

export default Recaputilatif;
