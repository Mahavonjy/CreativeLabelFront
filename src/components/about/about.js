import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import $ from 'jquery';
import '../../assets/js/jquery.flexslider';
import '../../assets/css/app.css';
import '../../assets/css/style/about.css';
import '../../assets/lib/et-line-font/style.css';
import '../../assets/lib/components-font-awesome/css/font-awesome.min.css';
import {useHistory} from "react-router-dom";
import cynthion from '../../assets/images/equipes/cynthion.jpg';
import langoCollet from '../../assets/images/equipes/langoCollet.jpg';
import Faq from "./faq";

function About() {

    const history = useHistory();
    const lightModeOn = useSelector(state => state.Home.lightModeOn);
    const isMounted = useRef(false);

    const sectionModule = (icon, title, text) => {
        return (
            <div className="col-md-3 col-sm-6 col-xs-12">
                <div className={lightModeOn ? "features-item text-dark" : "features-item text-white"}>
                    <div className="features-icon">
                        <span className={icon}>
                        </span>
                    </div>
                    <h3 className="features-title font-alt">
                        {title}
                    </h3>
                    {text}
                </div>
            </div>
        )
    };

    const teamItem = (image, title, name, role, link, description) => {
        return (
            <div className="mb-sm-20 col-md-4 col-sm-6 col-xs-12">
                <div className="team-item">
                    <div className="team-image">
                        <img src={image} alt="Member Photo"/>
                        <div className="team-detail">
                            <h5 className="font-alt">{title}</h5>
                            <p className="font-serif">{description}</p>
                            <div className="team-social">
                                <a href={link} target="_blank">
                                    <i className="fa fa-linkedin"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="team-descr font-alt">
                        <div className={lightModeOn ? "team-name text-dark" : "team-name text-white"}>{name}</div>
                        <div className={lightModeOn ? "team-role text-dark" : "team-role text-white"}>{role}</div>
                    </div>
                </div>
            </div>
        )
    };

    const sliderItem = (name, role, description) => {
        return (
            <li>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="module-icon">
                                <span data-icon="&#xe057;"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2">
                            <blockquote className="testimonial-text font-alt">
                                {description}
                            </blockquote>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 offset-sm-4">
                            <div className="testimonial-author">
                                <div className="testimonial-caption font-alt">
                                    <div className="testimonial-title">{name}</div>
                                    <div className="testimonial-descr">{role}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    };

    useEffect(() => {

        if ($('.testimonials-slider').length > 0) {
            $('.testimonials-slider').flexslider({
                animation: "slide",
                smoothHeight: true
            });
        }

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="hfeed Base site" id="page">
            <div id="content" className="site-content">
                <div className="ast-container">
                    <div id="primary" className="content-area primary">
                        <main>
                            <div className="main">
                                {/************* module ***************/}
                                <section className="module">
                                    <div className="container">
                                        <div className="row multi-columns-row">
                                            {sectionModule(
                                                'icon-lightbulb',
                                                'Passion',
                                                'Représente cet état affectif intense et irraisonné que nous' +
                                                ' avons pour l\'événementiel et la créativité et nous pousse sans' +
                                                ' relâche à avoir un engagement total auprès de nos clients'
                                            )}
                                            {sectionModule(
                                                'icon-tools',
                                                'Respect',
                                                'Nous prenons en considération les actes, les paroles et ' +
                                                'les actions de nos partenaires pour mieux les accompagner.'
                                            )}
                                            {sectionModule(
                                                'icon-tools-2',
                                                'Indépendance',
                                                'Nos équipes jouissent d\'une entière autonomie en interne' +
                                                ' et auprès de nos clients. Nous accordons une grande importance' +
                                                ' à l\'indépendance car elle est à l\'origine de la diversité' +
                                                ' et de notre originalité'
                                            )}
                                            {sectionModule(
                                                ' icon-lifesaver',
                                                'Excellence',
                                                'Plusieurs disciplines que nous avons mises en place dans' +
                                                ' nos équipes pour garantir le succès sur le long terme'
                                            )}
                                        </div>
                                    </div>
                                </section>
                                {/************* end of module ***************/}
                                {/************ testimonial-slider ***********/}
                                <section className="module bg-dark-60 pt-0 pb-5 parallax-bg testimonial">
                                    <div className="testimonials-slider pt-140 pb-140">
                                        <ul className="slides">
                                            {sliderItem('Pablo Casals',
                                                'Violoncelliste',
                                                'La musique chasse la haine chez ceux qui sont sans amour.' +
                                                ' Elle donne la paix à ceux qui sont sans repos, elle console ceux' +
                                                ' qui pleurent')}
                                            {sliderItem('Nelson Mandela',
                                                'Ancien Président de la république d\'Afrique du Sud',
                                                'La politique peut être renforcée par la musique, mais' +
                                                ' la musique a une puissance qui défie la politique. ')}
                                            {sliderItem('Bob Marley',
                                                'Auteur-compositeur-interprète',
                                                'La chose superbe à propos de la musique, c\'est ' +
                                                'que lorsqu\'elle vous touche, vous ne ressentez plus la douleur. ')}
                                        </ul>
                                    </div>
                                </section>
                                {/********** end of testimonial slider ***********/}
                                {/************* About ***************/}
                                <section className="module pt-5 pb-5" id="about">
                                    <div className="row position-relative m-0">
                                        <div className="col-xs-12 col-md-6 side-image">
                                        </div>
                                        <div
                                            className={lightModeOn
                                                ? "col-xs-12 col-md-6 offset-md-6 side-image-text bg-white"
                                                : "col-xs-12 col-md-6 offset-md-6 side-image-text bg-dark"}>
                                            <div className="row">
                                                <div
                                                    className={lightModeOn
                                                        ? "col-sm-12 text-dark"
                                                        : "col-sm-12 text-white"}>
                                                    <h2 className="module-title font-alt align-left">
                                                        A propos de Nous
                                                    </h2>
                                                    <div className="module-subtitle font-serif align-left">
                                                        ISL Creative (Independance Sound Label Creative) est
                                                        une entreprise spécialisée dans les
                                                        projets musicaux qui propose une large gamme de services
                                                        dans le domaine de la musique, spécialisé sur
                                                        le marché afro-tropical incluant
                                                        l’Afrique subsaharienne et
                                                        l’Océan Indien
                                                    </div>
                                                    <div className="module-subtitle font-serif align-left">
                                                        KantoBiz est un module de ISL Creative spécialisé dans la mise
                                                        en relation des artistes (Chanteurs, DJs, Comédiens,…)
                                                        et du business (les entreprises de l’évènementiel, les
                                                        évènements familiaux, évènements d’entreprise, évènements
                                                        associatives, etc…). Notre rôle est d’assurer une relation
                                                        pérenne entre le monde de l’entreprise et le monde du
                                                        spectacle en mettant à disposition des artistes divers
                                                        et variés.
                                                </div>
                                                    <p>Nous travaillons principalement avec les organisateurs
                                                        d’événements et les artistes à dimensions régionales et
                                                        internationales dans notre zone d’action en les accompagnants
                                                        sur leurs projets. Dans le cadre de CreativeTicket, c’est au
                                                        niveau de la billetterie et de la gestion des participants
                                                        que nous apportons notre  assistance et expertise.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/************* end of about ***************/}
                                {/************* module small ***************/}
                                <section className="module-small bg-dark">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-8 col-lg-6 offset-lg-2">
                                                <div className="callout-text font-alt">
                                                    <h3 className="callout-title">
                                                        Voir les prestations?
                                                    </h3>
                                                    <p>On vous offres des differentes prestations.</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4 col-lg-2">
                                                <div className="callout-btn-box">
                                                    <button className="btn btn-w btn-round"
                                                            onClick={() => history.push('/register')}>
                                                        Lister
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/************* end of module small ***************/}
                                {/************* team ***************/}
                                <section className="module" id="team">
                                    <div className="container">
                                        <div className="row">
                                            <div className={lightModeOn ? "col-sm-6 offset-sm-3 text-dark" :
                                                "col-sm-6 offset-sm-3 text-white"}>
                                                <h2 className="module-title font-alt">Notre équipe</h2>
                                                <div className="module-subtitle font-serif">
                                                    Une équipe dévouée au quotidien pour rendre vos
                                                    événements encore meilleurs.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            {teamItem(cynthion, 'IT Developer',
                                                'Cynthion Mahavonjy',
                                                'IT Developerr',
                                                "https://www.linkedin.com/in/cynthion-mahavonjy-2a8638175/",
                                                'la créativité nous pousse sans relâche à avoir un ' +
                                                'engagement total auprès de nos clients'
                                            )}
                                            {teamItem(langoCollet, 'Project Manager',
                                                'Mickaël Lango Collet',
                                                'Project Manager',
                                                "https://www.linkedin.com/in/mickael-lango-collet-294bba81/",
                                                'Nous prenons en considération les actes, les paroles et ' +
                                                'les actions de nos partenaires pour mieux les accompagner.'
                                            )}
                                        </div>
                                    </div>
                                </section>
                                {/************* end of team ***************/}
                                {/************* expertise *****************/}
                                <hr className="divider-w"/>
                                <Faq/>
                                {/************* end of expertise *************/}

                            </div>
                        </main>
                        {/* #main */}
                    </div>
                    {/* #primary */}
                </div>
                {/* ast-container */}
            </div>
            {/* #content */}
        </div>
    );
}

export default About;
