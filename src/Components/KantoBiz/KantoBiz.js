import React, { Component } from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as CreateFields from "../FunctionTools/CreateFields";
import * as EventAndThematics from "./EventsAndThematics";
import Results from "./Prestations/Results/Results";
import "./style/KantoBiz.css";
import DisplayPrestation from "./Prestations/Results/DisplayPrestation";

class KantoBiz extends Component {
    state = {
        isMounted: false,
        EventAndThematics: this.props.StateEventAndThematics,
        ResultsPage: this.props.ResultsPage,
        DisplayService: this.props.DisplayService
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
                {this.props.CreativeHeaders("Creative KantoBiz", "Creation de prestation pour les professionnels de la musique (artistes,producteurs, labels...)")}
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
                        {this.state.EventAndThematics ? this.props.EventAndThematics() : null}
                        {/* End events or Thematics */}
                        {/* Show all Prestation result */}
                        {this.state.ResultsPage ? <Results/> : null}
                        {/* End Result */}
                        {/* Show one Prestation selected */}
                        {this.state.DisplayService ? <DisplayPrestation/> : null}
                        {/* End Display It */}
                    </div>

                </div>
                {/* End */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ResultsPage: state.KantobizSearch.ResultsPage,
        StateEventAndThematics: state.KantobizSearch.EventAndThematics,
        DisplayService: state.KantobizSearch.DisplayService,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        CreativeHeaders: bindActionCreators(CreateFields.CreativeHeaders, dispatch),
        EventAndThematics: bindActionCreators(EventAndThematics.EventAndThematics, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KantoBiz);
