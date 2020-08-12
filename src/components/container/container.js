import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {Route, Switch, useHistory} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Conf from "../../config/tsconfig.json";
import About from "../about/about";
import Register from "../authentification/register/register";
import KantoBiz from "../modules/kantoBiz/kantoBiz";
import DisplayPrestation from "../modules/kantoBiz/prestations/results/displayPrestation";
import OtherProfile from "../profile/otherProfile";
import Profile from "../profile/profile";
import CommandError from "../statusPage/commandStatus/error/commandError";
import CommandSuccess from "../statusPage/commandStatus/success/commandSuccess";
import NotFound from "../statusPage/notFound/notFound";

function Container(props) {

    const history = useHistory();
    const lightModeOn = useSelector(state => state.Home.lightModeOn);
    const [iconColor, setIconColor] = useState({"kantoBiz": true, "about": false});

    const isMounted = useRef(false);
    let _bg = lightModeOn
        ? 'https://www.designbolts.com/wp-content/uploads/2013/02/crafted-paper-pattern-Grey-Seamless-Pattern-For-Website-Background.jpg'
        : 'https://images.wallpaperscraft.com/image/stars_patterns_black_133520_3840x2400.jpg'

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, [history]);

    return (
        <div>
            <aside className="main-sidebar fixed offcanvas shadow" data-toggle="offcanvas">
                <div className="sidebar">
                    <ul className="sidebar-menu">
                        <ReactTooltip place="right" className="special-color-dark" id='i_kt' aria-haspopup='true'>
                            Creative KantoBiz
                        </ReactTooltip>
                        <ReactTooltip place="right" className="special-color-dark" id='i_pr' aria-haspopup='true'>
                            {props.headers['Isl-Token'] === Conf.configs.TokenVisitor
                                ? "Connecter pour voir votre profil" : "Voir votre profile"}
                        </ReactTooltip>
                        <ReactTooltip place="right" className="special-color-dark" id='i_ab' aria-haspopup='true'>
                            A propos de Nous
                        </ReactTooltip>
                        <ReactTooltip place="right" className="special-color-dark" id='i_ml' aria-haspopup='true'>
                            Les Mentions légales
                        </ReactTooltip>
                        <ReactTooltip place="right" className="special-color-dark" id='i_log' aria-haspopup='true'>
                            {props.logout_class === "icon icon-users-1 s-24 mr-5 text-red"
                                ? "Se Connecter"
                                : " Se déconnecter"}
                        </ReactTooltip>
                        {/* BEATS */}
                        {/*<li style={{margin: "0 0 20px 10px"}}*/}
                        {/*    data-tip="Creative BeatMaking" onClick={() => {*/}
                        {/*    (history.location.pathname !== "/beats") && history.push("/beats")*/}
                        {/*}}><i className={*/}
                        {/*    history.location.pathname === "/beats"*/}
                        {/*        ? "icon icon-heartbeat cursor-pointer text-red s-24"*/}
                        {/*        : "icon icon-heartbeat cursor-pointer s-24"}/>*/}
                        {/*    <span className="ml-5">BeatMaking</span>*/}
                        {/*</li>*/}

                        {/* kantoBiz */}
                        <li style={{margin: "0 0 20px 10px"}} data-tip data-for="i_kt" onClick={() => {
                            history.location.pathname !== "/kantobiz" && history.push("/kantobiz")
                            setIconColor({"kantoBiz": true, "about": false})
                        }}>
                            <i className={
                                "icon icon-compact-disc-2 cursor-pointer s-24"
                                + (iconColor["kantoBiz"] ? " text-red" : "")
                            }/>
                            <span className="ml-5">KantoBiz</span>
                        </li>

                        {/* PROFILE */}
                        <li style={{margin: "0 0 20px 10px"}} data-tip data-for="i_pr" onClick={() => {
                            props.headers['Isl-Token'] === Conf.configs.TokenVisitor
                            && history.location.pathname !== "/profile"
                                ? document.getElementById("LoginRequire").click()
                                : history.push("/profile");
                        }}>
                            <i className="icon icon-user cursor-pointer s-24"/>
                            <span className="ml-5">Votre profil</span>
                        </li>

                        {/* CART */}
                        {/*<li style={{margin: "0 0 20px 10px"}} data-tip="Votre Panier" onClick={() => {*/}
                        {/*    ((state_cart > 0)*/}
                        {/*        && (history.location.pathname !== "/cart"))*/}
                        {/*        ? history.push("/cart")*/}
                        {/*        : toast.warn("Veuillez remplir votre panier avant")*/}
                        {/*}}>*/}
                        {/*    <div id="CartBadge">*/}
                        {/*            <span className="p1 " data-count={state_cart}>*/}
                        {/*                <i data-count="4b"*/}
                        {/*                   className={*/}
                        {/*                       history.location.pathname === "/cart"*/}
                        {/*                           ? "icon icon-cart-plus cursor-pointer text-red s-24 mr-5"*/}
                        {/*                           : "icon icon-cart-plus cursor-pointer s-24 mr-5"*/}
                        {/*                   }*/}
                        {/*                /> Panier*/}
                        {/*            </span>*/}
                        {/*    </div>*/}
                        {/*</li>*/}

                        {/* about */}
                        <li style={{margin: "0 0 20px 11px"}} data-tip data-for="i_ab" onClick={() => {
                            (history.location.pathname !== "/about") && history.push("/about")
                            setIconColor({"kantoBiz": false, "about": true})
                        }}>
                            <i className={
                                "icon cursor-pointer icon-info-circle s-24"
                                + (iconColor["about"] ? " text-red" : "")
                            }/>
                            <span className="ml-5">À propos de nous</span>
                        </li>

                        {/* Mention */}
                        <li style={{margin: "0 0 20px 11px"}} data-tip data-for="i_ml">
                            <i className="icon icon-shield s-24 cursor-pointer"
                               id="legaleNoticesbtn"
                               data-toggle="modal" data-target="#legaleNotices"/>
                            <span className="ml-5">Les mentions légales</span>
                        </li>

                        {/* LOGOUT OR LOGIN */}
                        <li onClick={() =>
                            props.headers['Isl-Token'] === Conf.configs.TokenVisitor
                                ? document.getElementById("LoginRequire").click()
                                : props.logout()}
                            style={
                                props.logout_class === "icon icon-users-1 s-24 mr-5 text-red"
                                    ? {margin: "50px 0 20px 8px"}
                                    : {margin: "50px 0 20px 12px"}
                            }
                            data-tip
                            data-for="i_log">
                            <i className={props.logout_class + " cursor-pointer"}/> <span>{props.log_name}</span>
                        </li>
                    </ul>
                    {!props.isPlaying &&
                    <a href="/">
                        <img alt="Logo"
                             className="absolute"
                             style={{bottom: 0}}
                             src="https://zupimages.net/up/19/18/3ltf.png"/>
                    </a>}
                </div>
            </aside>
            <main style={{
                // backgroundRepeat: "no-repeat",
                // backgroundSize: "cover",
                backgroundImage: 'url(' + _bg + ')'
            }}>
                {/* Main of SideBars */}
                <Switch>
                    <Route exact
                           path="/about"
                           component={() => <About/>}
                    />
                    <Route exact
                           path="/CommandError"
                           component={() => <CommandError/>}
                    />
                    <Route exact
                           path="/CommandSuccess"
                           component={() => <CommandSuccess/>}
                    />
                    <Route exact
                           path="/(|kantobiz)"
                           component={() => <KantoBiz headers={props.headers}/>}
                    />
                    <Route exact
                           path="/profile/isl_artist_profile/:id(\d+)"
                           component={() =>
                               <OtherProfile
                                   ToPlay={props.addToPlaylist}
                                   ProfileChecked={props.profile_checked}
                                   UserData={props.user_data}
                               />
                           }/>
                    <Route exact
                           path="/profile"
                           component={() => {
                               return props.headers['Isl-Token'] === Conf.configs.TokenVisitor
                                   ? history.goBack()
                                   : (<Profile ToPlay={props.addToPlaylist}/>)
                           }}/>
                    <Route exact
                           path="/show-service/:id"
                           component={() => <DisplayPrestation headers={props.headers}/>
                           }/>
                    <Route exact
                           path="/show-service-read"
                           component={() => <DisplayPrestation headers={props.headers} read/>
                           }/>
                    <Route exact
                           path="/register"
                           component={() => {
                               return props.headers['Isl-Token'] !== Conf.configs.TokenVisitor
                                   ? history.goBack() : (<Register/>)
                           }}/>
                    {/*<Route exact*/}
                    {/*       path="/beats/CheckThisBeat/:id(\d+)"*/}
                    {/*       component={() =>*/}
                    {/*           <OneBeat*/}
                    {/*               ToPlay={props.addToPlaylist}*/}
                    {/*               SingleBeat={single_beat}*/}
                    {/*               SimilarBeats={beats_similar}*/}
                    {/*           />*/}
                    {/*       }/>*/}
                    {/*<Route exact*/}
                    {/*       path="/Cart"*/}
                    {/*       component={() => <Cart ToPlay={props.addToPlaylist}/>}*/}
                    {/*/>*/}
                    {/*<Route exact*/}
                    {/*       path="/beats"*/}
                    {/*       component={() => <Beats ToPlay={props.addToPlaylist}/>}*/}
                    {/*/>*/}
                    {/* NOT FOUND */}
                    <Route component={NotFound}/>
                </Switch>
                {/* End main of SideBars */}
            </main>
        </div>
    );
}

export default Container;
