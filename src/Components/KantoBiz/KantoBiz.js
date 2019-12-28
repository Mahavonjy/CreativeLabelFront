import React, { Component } from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as CreateFields from "../FunctionTools/CreateFields";

class KantoBiz extends Component {
    state = {
        isMounted: false,
        startDate: new Date()
    };

    formatDate = (date) => {
        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();

        return day + '-' + monthIndex + '-' + year;
    };

    ChangeDate = (date) => {
        let new_date = this.formatDate(date);
        let now = this.formatDate(new Date());
        if (parseInt(new_date) - parseInt(now) >= 0) this.setState({startDate: date});
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
                {/* Headers */}
                {this.props.CreativeHeaders("Creative KantoBiz", "Recherchez les artistes pour votre evenement <br/> Pour les professionnels de la musique (artistes,producteurs, labels...)", this)}
                {/* End Headers */}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        CreativeHeaders: bindActionCreators(CreateFields.CreativeHeaders, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(KantoBiz);
