import React, { Component } from "react";
import TestImage from "../../assets/img/demo/a1.jpg"

class KantoBiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
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
            <div className="Base">
                <main id="pageContent" className="page has-sidebar">
                    <div className="container-fluid relative animatedParent animateOnce">
                        <div className="animated p-md-5 p-3">
                            <div className="relative mb-5">
                                <h1 className="mb-2 text-primary">Slider</h1>
                                <p>Template using lightSlider Plugin</p>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    {/*Services Section Start*/}
                                    <div className="card my-3">
                                        <div className="card-header ">
                                            <h6> Services Style - With Auto False</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="lightSlider service-blocks " data-item={3} data-item-md={2} data-item-sm={1} data-auto="false" data-loop="true" data-pager="false">
                                                <div>
                                                    <div className="service-block center paper-block">
                                                        <div className="service-icon"><i className="icon icon-bug text-red" aria-hidden="true" />
                                                        </div>
                                                        <div className="service-content">
                                                            <h5><a href="#">Paper Service Heading</a></h5>
                                                            <p>Dynamically leverage existing synergistic systems whereas future-proof
                                                                sources Synergistically formulate</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="service-block center paper-block">
                                                        <div className="service-icon"><i className="icon icon-pie-chart text-purple" aria-hidden="true" />
                                                        </div>
                                                        <div className="service-content">
                                                            <h5><a href="#">Paper Service Heading</a></h5>
                                                            <p>Dynamically leverage existing synergistic systems whereas future-proof
                                                                sources Synergistically formulate</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="service-block center paper-block">
                                                        <div className="service-icon"><i className="icon icon-cube text-green" aria-hidden="true" />
                                                        </div>
                                                        <div className="service-content">
                                                            <h5><a href="#">Paper Service Heading</a></h5>
                                                            <p>Dynamically leverage existing synergistic systems whereas future-proof
                                                                sources Synergistically formulate</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="service-block center paper-block">
                                                        <div className="service-icon"><i className="icon icon-rainbow text-blue" aria-hidden="true" />
                                                        </div>
                                                        <div className="service-content">
                                                            <h5><a href="#">Paper Service Heading</a></h5>
                                                            <p>Dynamically leverage existing synergistic systems whereas future-proof
                                                                sources Synergistically formulate</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="service-block center paper-block">
                                                        <div className="service-icon"><i className="icon icon-raindrop text-yellow" aria-hidden="true" />
                                                        </div>
                                                        <div className="service-content">
                                                            <h5><a href="#">Paper Service Heading</a></h5>
                                                            <p>Dynamically leverage existing synergistic systems whereas future-proof
                                                                sources Synergistically formulate</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card my-3">
                                        <div className="card-header ">
                                            <h6> Team Style</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="lightSlider masonry-container" data-item={3} data-item-md={2} data-item-sm={1} data-auto="true" data-loop="true">
                                                <div>
                                                    <div className="text-center">
                                                        <img className="rounded-circle img-100 img-border" src="assets/img/demo/u4.jpg" alt="" />
                                                        <h5>Doe Joe</h5>
                                                        <p>Designer</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-center">
                                                        <img className="rounded-circle img-100 img-border" src={TestImage} alt="" />
                                                        <h5>Doe Joe</h5>
                                                        <p>Designer</p>
                                                        <ul className="social list-inline no-p">
                                                            <li className="list-inline-item"><a className="facebook" href="#"><i className="icon-facebook" /></a></li>
                                                            <li className="list-inline-item"><a className="twitter" href="#"><i className="icon-twitter" /></a></li>
                                                            <li className="list-inline-item"><a className="gplus" href="#"><i className="icon-google-plus" /></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-center">
                                                        <img className="rounded-circle img-100 img-border" src={TestImage} alt="" />
                                                        <h5>Doe Joe</h5>
                                                        <p>Designer</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-center">
                                                        <img className="rounded-circle img-100 img-border" src={TestImage} alt="" />
                                                        <h5>Doe Joe</h5>
                                                        <p>Designer</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-center">
                                                        <img className="rounded-circle img-100 img-border" src={TestImage} alt="" />
                                                        <h5>Doe Joe</h5>
                                                        <p>Designer</p>
                                                        <ul className="social list-inline no-p">
                                                            <li className="list-inline-item"><a className="facebook" href="#"><i className="icon-facebook" /></a></li>
                                                            <li className="list-inline-item"><a className="twitter" href="#"><i className="icon-twitter" /></a></li>
                                                            <li className="list-inline-item"><a className="gplus" href="#"><i className="icon-google-plus" /></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-center">
                                                        <img className="rounded-circle img-100 img-border" src={TestImage} alt="" />
                                                        <h5>Doe Joe</h5>
                                                        <p>Designer</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-center">
                                                        <img className="rounded-circle img-100 img-border" src={TestImage} alt="" />
                                                        <h5>Doe Joe</h5>
                                                        <p>Designer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default KantoBiz;
