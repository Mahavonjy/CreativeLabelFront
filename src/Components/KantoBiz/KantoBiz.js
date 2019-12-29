import React, { Component } from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as CreateFields from "../FunctionTools/CreateFields";
import * as EventAndThematics from "./EventsAndThematics";
import "./KantoBiz.css";

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
                {this.props.CreativeHeaders("Creative KantoBiz", "Creation de prestation pour les professionnels de la musique (artistes,producteurs, labels...)", this)}
                {/* End Headers */}

                {/* This is a main of for show different component */}

                <div className="Base">
                    {/* Navigation Page*/}
                    <div className="NextOrPrevPage">
                        <span className="float-left"><i className="icon icon-long-arrow-left ml-5 s-24 align-middle"/>&nbsp;Precedent</span>
                        <span className="float-right">Suivant&nbsp;<i className="icon icon-long-arrow-right mr-5 s-24 align-middle"/></span>
                    </div>
                    {/* End Navigation Page*/}

                    <div className="main-page">
                        {/* Different events or thematics */}
                        {this.props.EventAndThematics()}
                        {/* End events or Thematics */}
                    </div>

                </div>
                {/* End */}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        CreativeHeaders: bindActionCreators(CreateFields.CreativeHeaders, dispatch),
        EventAndThematics: bindActionCreators(EventAndThematics.EventAndThematics, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(KantoBiz);
