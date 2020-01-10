import React, { Component } from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as CreateFields from "../FunctionTools/CreateFields";
import * as EventAndThematics from "./EventsAndThematics";
import Results from "./Prestations/Results/Results";
import "./style/KantoBiz.css";
import DisplayPrestation from "./Prestations/Results/DisplayPrestation";
import ReactTooltip from 'react-tooltip';

class KantoBiz extends Component {
    state = {
        isMounted: false,
        EventAndThematics: this.props.StateEventAndThematics,
        ResultsPage: this.props.ResultsPage,
        DisplayService: this.props.DisplayService
    };

    next = () => {
        if (this.state.EventAndThematics) {
            this.setState({ResultsPage: true, EventAndThematics: false, DisplayService: false}, () => {
                this.props.active_result_page()
            })
        } else if (this.state.ResultsPage) {
            this.setState({DisplayService: true, ResultsPage: false, EventAndThematics: false}, () => {
                this.props.active_display_service_page()
            })
        }
    };

    prev = () => {
        if (this.state.DisplayService) {
            this.setState({ResultsPage: true, EventAndThematics: false, DisplayService: false}, () => {
                this.props.active_result_page()
            })
        } else if (this.state.ResultsPage) {
            this.setState({EventAndThematics: true, DisplayService: false, ResultsPage: false}, () => {
                this.props.active_event_and_thematics_page()
            })
        }
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
                <ReactTooltip/>
                {/* Headers */}
                {this.props.CreativeHeaders("Creative KantoBiz", "Creation de prestation pour les professionnels de la musique (artistes,producteurs, labels...)")}
                {/* End Headers */}

                {/* This is a main of for show different component */}

                <div className="Base">
                    {/* Navigation Page*/}
                    <div className="NextOrPrevPage">
                        {!this.state.EventAndThematics ?
                            <span className="float-left" data-tip="Revenir a la page d'acceuil KantoBiz" onClick={this.prev}>
                                <i className="icon icon-long-arrow-left ml-5 s-24 align-middle"/>&nbsp;Precedent
                            </span> : null}
                        {!this.state.DisplayService ?
                            <span className="float-right" data-tip="Aller dernier resultat de recherche" onClick={this.next}>Suivant&nbsp;
                                <i className="icon icon-long-arrow-right mr-5 s-24 align-middle"/>
                            </span> : null}
                    </div>
                    {/* End Navigation Page*/}

                    <div className="main-page">
                        {/* Show Different events/thematics or all Prestation result of search or Prestation selected*/}
                        {
                            (this.state.EventAndThematics && this.props.EventAndThematics())
                            || (this.state.ResultsPage && <Results/>)
                            || (this.state.DisplayService && <DisplayPrestation/>)
                        }
                        {/* End */}
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
        active_result_page: () => {
            dispatch({type: "ACTIVE_RESULTS_PAGE"})
        },
        active_event_and_thematics_page: () => {
            dispatch({type: "ACTIVE_EVENT_AND_THEMATICS_PAGE"})
        },
        active_display_service_page: () => {
            dispatch({type: "ACTIVE_DISPLAY_SERVICE_PAGE"})
        },
        CreativeHeaders: bindActionCreators(CreateFields.CreativeHeaders, dispatch),
        EventAndThematics: bindActionCreators(EventAndThematics.EventAndThematics, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KantoBiz);
