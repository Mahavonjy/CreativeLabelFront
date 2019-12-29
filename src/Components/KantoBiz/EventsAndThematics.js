import React from "react";

export const EventAndThematics = () => {
    return () => {
        return (
            <div className="p-b-100">
                {/* Type of Events */}
                <div className="events">
                    <div className="relative mb-5 p-t-10 p-b-10 ml-5 ">
                        <h1 className="mb-2 text-primary">Nos Evenements</h1>
                        <p>Voici tout les differentes enevements dans KantoBiz</p>
                    </div>
                    <div className="card-container">
                        <div className="card-left">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className="card-top">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/1011334/pexels-photo-1011334.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Quisque cursus, metus vitae pharetra auctor.</p>
                            </div>
                        </div>
                        <div className="card-right">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/35828/soap-bubble-colorful-ball-soapy-water.jpg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Ut eu diam at pede suscipit sodales.</p>
                            </div>
                        </div>
                        <div className="card-right">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/701855/pexels-photo-701855.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Donec lacus nunc, viverra nec, blandit vel, egestas et, augue.</p>
                            </div>
                        </div>
                        <div className="card-top">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/668295/pexels-photo-668295.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className="card-bottom">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/63238/pexels-photo-63238.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Ut eu diam at pede suscipit sodales.</p>
                            </div>
                        </div>
                        <div className="card-left">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/997725/pexels-photo-997725.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className="card-bottom">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/585581/pexels-photo-585581.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Quisque cursus, metus vitae pharetra auctor.</p>
                            </div>
                        </div>
                        <div className="card-right">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/532561/pexels-photo-532561.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className="card-top">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/279376/pexels-photo-279376.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Integer lacinia sollicitudin massa. Cras metus.</p>
                            </div>
                        </div>
                        <div className="card-left">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/701855/pexels-photo-701855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className="card-top">
                            <div className="card-image">
                                <img src="https://images.pexels.com/photos/978342/pexels-photo-978342.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End type of Events */}
                {/* All thematics */}
                <div className="thematics">
                    <div className="relative mb-5 p-t-10 p-b-10 ml-5 ">
                        <h1 className="mb-2 text-primary">Nos Thematiques/Univers</h1>
                        <p>Voici tout les differentes univers dans KantoBiz</p>
                    </div>
                    <div className="container-card">
                        <div className="card">
                            <h3 className="title">Card 1</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="stroke" cx={60} cy={60} r={50} />
                                </svg>
                            </div>
                        </div>
                        <div className="card">
                            <h3 className="title">Card 2</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="stroke" cx={60} cy={60} r={50} />
                                </svg>
                            </div>
                        </div>
                        <div className="card">
                            <h3 className="title">Card 3</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="stroke" cx={60} cy={60} r={50} />
                                </svg>
                            </div>
                        </div>
                        <div className="card">
                            <h3 className="title">Card 4</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="stroke" cx={60} cy={60} r={50} />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End thematics */}
            </div>
        )
    }
};
