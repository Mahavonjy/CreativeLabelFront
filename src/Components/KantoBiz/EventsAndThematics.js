import React from "react";

export const EventAndThematics = () => {
    return () => {
        return (
            <div className="p-b-100">
                {/* Type of Events */}
                <div className="events pt-5">
                    <div className="relative mb-5 p-t-10 p-b-10 ml-5 ">
                        <h1 className="mb-2 text-primary">Nos Evenements</h1>
                        <p>Voici tout les differentes enevements dans KantoBiz</p>
                    </div>
                    <div className="card-container">
                        <div className="card-left">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                            </div>
                        </div>
                        <div className="card-top">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/1011334/pexels-photo-1011334.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Quisque cursus, metus vitae pharetra auctor.</span>
                            </div>
                        </div>
                        <div className="card-right">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/35828/soap-bubble-colorful-ball-soapy-water.jpg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Ut eu diam at pede suscipit sodales.</span>
                            </div>
                        </div>
                        <div className="card-right">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/701855/pexels-photo-701855.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Donec lacus nunc, viverra nec, blandit vel, egestas et, augue.</span>
                            </div>
                        </div>
                        <div className="card-top">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/668295/pexels-photo-668295.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                            </div>
                        </div>
                        <div className="card-bottom">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/63238/pexels-photo-63238.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Ut eu diam at pede suscipit sodales.</span>
                            </div>
                        </div>
                        <div className="card-left">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/997725/pexels-photo-997725.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                            </div>
                        </div>
                        <div className="card-bottom">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/585581/pexels-photo-585581.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Quisque cursus, metus vitae pharetra auctor.</span>
                            </div>
                        </div>
                        <div className="card-right">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/532561/pexels-photo-532561.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                            </div>
                        </div>
                        <div className="card-top">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/279376/pexels-photo-279376.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Integer lacinia sollicitudin massa. Cras metus.</span>
                            </div>
                        </div>
                        <div className="card-left">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/701855/pexels-photo-701855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                            </div>
                        </div>
                        <div className="card-top">
                            <div className="card-image">
                                <img alt="" src="https://images.pexels.com/photos/978342/pexels-photo-978342.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                            </div>
                            <div className="card-text">
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End type of Events */}
                {/* All thematics */}
                <div className="thematics pt-5">
                    <div className="relative mb-5 p-t-10 p-b-10 ml-5 ">
                        <h1 className="mb-2 text-primary">Nos Thematiques/Univers</h1>
                        <p>Voici tout les differentes univers dans KantoBiz</p>
                    </div>
                    <div className="row ml-5 mr-5 justify-content-center">
                        <div className="thematics-card col-md-4">
                            <h3 className="pt-3 text-white">Cirque/Arts de la rue</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle center p-t-80">
                                <img alt="Cirque/Arts de la rue" src="https://zupimages.net/up/19/18/3ltf.png" style={{width: "100%"}}/>
                            </div>
                            <button className="btn btn-outline-info relative align-middle">Voir les prestation</button>
                        </div>
                        <div className="thematics-card col-md-4">
                            <h3 className="pt-3 text-white">Comédiens</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle center p-t-80">
                                <img alt="Comédiens" src="https://zupimages.net/up/19/18/3ltf.png" style={{width: "100%"}}/>
                            </div>
                            <button className="btn btn-outline-info absolute align-middle">Voir les prestation</button>
                        </div>
                        <div className="thematics-card col-md-4">
                            <h3 className="pt-3 text-white">DJ</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle center p-t-80">
                                <img alt="DJ" src="https://zupimages.net/up/19/18/3ltf.png" style={{width: "100%"}}/>
                            </div>
                            <button className="btn btn-outline-info absolute align-middle">Voir les prestation</button>
                        </div>
                        <div className="thematics-card col-md-4">
                            <h3 className="pt-3 text-white">Danseurs</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle center p-t-80">
                                <img alt="Danseurs" src="https://zupimages.net/up/19/18/3ltf.png" style={{width: "100%"}}/>
                            </div>
                            <button className="btn btn-outline-info absolute align-middle">Voir les prestation</button>
                        </div>
                        <div className="thematics-card col-md-4">
                            <h3 className="pt-3 text-white">Magiciens</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle center p-t-80">
                                <img alt="Magiciens" src="https://zupimages.net/up/19/18/3ltf.png" style={{width: "100%"}}/>
                            </div>
                            <button className="btn btn-outline-info absolute align-middle">Voir les prestation</button>
                        </div>
                        <div className="thematics-card col-md-4">
                            <h3 className="pt-3 text-white">Chanteur/Musicien</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle center p-t-80">
                                <img alt="Chanteur/Musicien" src="https://zupimages.net/up/19/18/3ltf.png" style={{width: "100%"}}/>
                            </div>
                            <button className="btn btn-outline-info absolute align-middle">Voir les prestation</button>
                        </div>
                        <div className="thematics-card col-md-4">
                            <h3 className="pt-3 text-white">Beatmaking</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle center p-t-80">
                                <img alt="Beatmaking" src="https://zupimages.net/up/19/18/3ltf.png" style={{width: "100%"}}/>
                            </div>
                            <button className="btn btn-outline-info absolute align-middle ">Les prestations</button>
                        </div>
                        <div className="thematics-card col-md-4">
                            <h3 className="pt-3 text-white">Spécialiste de l’audiovisuel</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle center p-t-80">
                                <img alt="Spécialiste de l’audiovisuel" src="https://zupimages.net/up/19/18/3ltf.png" style={{width: "100%"}}/>
                            </div>
                            <button className="btn btn-outline-info absolute align-middle ">Voir les prestation</button>
                        </div>
                        <div className="thematics-card col-md-4">
                            <h3 className="pt-3 text-white">Spectacles enfants</h3>
                            <div className="bar">
                                <div className="emptybar" />
                                <div className="filledbar" />
                            </div>
                            <div className="circle center p-t-80">
                                <img alt="Spectacles enfants" src="https://zupimages.net/up/19/18/3ltf.png" style={{width: "100%"}}/>
                            </div>
                            <button className="btn btn-outline-info absolute align-middle">Voir les prestation</button>
                        </div>
                    </div>
                </div>
                {/* End thematics */}
            </div>
        )
    }
};
