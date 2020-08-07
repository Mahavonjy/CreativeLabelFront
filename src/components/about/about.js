import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import $ from 'jquery';
import '../../assets/js/jquery.flexslider';
import '../../assets/css/app.css';
import '../../assets/css/style/about.css';
import '../../assets/lib/et-line-font/style.css';
import '../../assets/lib/components-font-awesome/css/font-awesome.min.css';
import section14 from '../../assets/images/screenshots/section-14.jpg';
import gridPortfolio1 from '../../assets/images/screenshots/grid-portfolio1.jpg';
import gridPortfolio2 from '../../assets/images/screenshots/grid-portfolio2.jpg';
import gridPortfolio3 from '../../assets/images/screenshots/grid-portfolio3.jpg';
import gridPortfolio4 from '../../assets/images/screenshots/grid-portfolio4.jpg';
import gridPortfolio5 from '../../assets/images/screenshots/grid-portfolio5.jpg';
import gridPortfolio6 from '../../assets/images/screenshots/grid-portfolio6.jpg';
import team1 from '../../assets/images/screenshots/team-1.jpg';
import team2 from '../../assets/images/screenshots/team-2.jpg';
import team4 from '../../assets/images/screenshots/team-4.jpg';


function About() {


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

    const workItem = (image, title, description) => {
        return (
            <li className="work-item illustration webdesign">
                <a href="#">
                    <div className="work-image"><img
                        src={image}
                        alt="Portfolio Item"/></div>
                    <div className="work-caption font-alt">
                        <h3 className="work-title">{title}</h3>
                        <div className="work-descr">{description}</div>
                    </div>
                </a>
            </li>
        )

    };

    const teamItem = (image, title, name, role, description) => {
        return (
            <div className="mb-sm-20 col-md-4 col-sm-6 col-xs-12">
                <div className="team-item">
                    <div className="team-image"><img src={image}
                                                     alt="Member Photo"/>
                        <div className="team-detail">
                            <h5 className="font-alt">{title}</h5>
                            <p className="font-serif">{description}</p>
                            <div className="team-social">
                                <a href="#">
                                    <i className="fa fa-facebook">
                                    </i></a>
                                <a href="#">
                                    <i className="fa fa-twitter">
                                    </i></a>
                                <a href="#">
                                    <i className="fa fa-dribbble">
                                    </i></a>
                                <a href="#">
                                    <i className="fa fa-skype">
                                    </i></a>
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
                                <span data-icon="&#xe057;">
                                </span></div>
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
        <div className="hfeed site" id="page">
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
                                                'Ideas and concepts',
                                                'Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.'
                                            )}
                                            {sectionModule(
                                                'icon-tools',
                                                'Coding & development',
                                                'Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.'
                                            )}
                                            {sectionModule(
                                                'icon-tools-2',
                                                'Ideas and concepts',
                                                'Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.'
                                            )}
                                            {sectionModule(
                                                ' icon-lifesaver',
                                                'Dedicated support',
                                                'Careful attention to detail and clean, well structured code ensures a smooth user experience for all your visitors.'
                                            )}
                                        </div>
                                    </div>
                                </section>
                                {/************* end of module ***************/}
                                {/************* About ***************/}
                                <section className="module pt-0 pb-0" id="about">
                                    <div className="row position-relative m-0">
                                        <div className="col-xs-12 col-md-6 side-image" data-background={section14}>
                                        </div>
                                        <div
                                            className={lightModeOn ? "col-xs-12 col-md-6 offset-md-6 side-image-text bg-white" : "col-xs-12 col-md-6 offset-md-6 side-image-text bg-dark"}>
                                            <div className="row">
                                                <div
                                                    className={lightModeOn ? "col-sm-12 text-dark" : "col-sm-12 text-white"}>
                                                    <h2 className="module-title font-alt align-left">About Us</h2>
                                                    <div className="module-subtitle font-serif align-left">A wonderful
                                                        serenity has taken possession of my entire soul, like these
                                                        sweet mornings of spring which I enjoy with my whole heart.
                                                    </div>
                                                    <p>The European languages are members of the same family. Their
                                                        separate existence is a myth. For science, music, sport, etc,
                                                        Europe uses the same vocabulary. The languages only differ in
                                                        their grammar, their pronunciation and their most common
                                                        words.</p>
                                                    <p>The European languages are members of the same family. Their
                                                        separate existence is a myth. For science, music, sport, etc,
                                                        Europe uses the same vocabulary.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/************* end of about ***************/}
                                {/************* Our work ***************/}
                                <section className="module pb-0" id="works">
                                    <div className="container">
                                        <div className="row m-5">
                                            <div
                                                className={lightModeOn ? "col-sm-6 offset-sm-3 text-dark "
                                                    : "col-sm-6 offset-sm-3 text-white"}>
                                                <h2 className="module-title font-alt">Our Works</h2>
                                                <div className="module-subtitle font-serif">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row pb-0">
                                        <div className={lightModeOn ? "col-sm-12 text-dark" : "col-sm-12 text-white"}>
                                            <ul className="filter font-alt">
                                                <li><a href="#">All</a></li>
                                                <li><a href="#">Illustration</a></li>
                                                <li><a href="#">Marketing</a></li>
                                                <li><a href="#">Photography</a></li>
                                                <li><a href="#">WebDesing</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                            <ul className="works-grid works-grid-gut works-grid-3 works-hover-d m-5"
                                                id="works-grid">
                                                {workItem(gridPortfolio1, 'Corporate Identity', 'Illustration')}
                                                {workItem(gridPortfolio2, 'Bag MockUp', 'Marketing')}
                                                {workItem(gridPortfolio3, 'Disk Cover', 'Illustration')}
                                                {workItem(gridPortfolio4, 'Business Card', 'Photography')}
                                                {workItem(gridPortfolio5, 'Web Design', 'Webdesign')}
                                                {workItem(gridPortfolio6, 'Paper clip', 'Marketing')}
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                                {/************* end of Our work ***************/}
                                {/************* module small ***************/}
                                <section className="module-small bg-dark">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-8 col-lg-6 offset-lg-2">
                                                <div className="callout-text font-alt">
                                                    <h3 className="callout-title">Want to see more works?</h3>
                                                    <p>We are always open to interesting projects.</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4 col-lg-2">
                                                <div className="callout-btn-box">
                                                    <a className="btn btn-w btn-round" href="#">
                                                        Lets view portfolio
                                                    </a>
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
                                                <h2 className="module-title font-alt">Meet Our Team</h2>
                                                <div className="module-subtitle font-serif">A wonderful serenity has
                                                    taken possession of my entire soul, like these sweet mornings of
                                                    spring which I enjoy with my whole heart.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {teamItem(team1, 'Hi all',
                                                'Jim Stone',
                                                'Art Director',
                                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus, a&amp;nbsp;iaculis diam.'
                                            )}
                                            {teamItem(team2, 'Good day',
                                                'Jim Stone',
                                                'Andy River',
                                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus, a&amp;nbsp;iaculis diam.'
                                            )}
                                            {teamItem(team4, 'Yes, it\'s me',
                                                'Dylan Woods',
                                                'Developer',
                                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit lacus, a&amp;nbsp;iaculis diam.'
                                            )}
                                        </div>
                                    </div>
                                </section>
                                {/************* end of team ***************/}
                                {/************* expertise *****************/}
                                <hr className="divider-w"/>
                                <section className="module">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h4 className="font-alt mb-30">Frequently Asked Questions</h4>
                                                <div className="panel-group" id="accordion">
                                                    <div className={lightModeOn ? "panel theme-light panel-default"
                                                        : "panel theme-dark panel-default"}>
                                                        <div className="panel-heading">
                                                            <h4 className="panel-title font-alt"><a
                                                                data-toggle="collapse" data-parent="#accordion"
                                                                href="#support1">Support Question 1</a></h4>
                                                        </div>
                                                        <div className="panel-collapse collapse in" id="support1">
                                                            <div className="panel-body">Anim pariatur cliche
                                                                reprehenderit, enim eiusmod high life accusamus
                                                                terry richardson ad squid. 3 wolf moon officia aute,
                                                                non cupidatat skateboard dolor brunch. Food truck
                                                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                                                                tempor, sunt aliqua put a bird on it squid
                                                                single-origin coffee nulla assumenda shoreditch et.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading">
                                                            <h4 className="panel-title font-alt"><a
                                                                className="collapsed" data-toggle="collapse"
                                                                data-parent="#accordion" href="#support2">Support
                                                                Question 2</a></h4>
                                                        </div>
                                                        <div className="panel-collapse collapse" id="support2">
                                                            <div className="panel-body">Anim pariatur cliche
                                                                reprehenderit, enim eiusmod high life accusamus
                                                                terry richardson ad squid. 3 wolf moon officia aute,
                                                                non cupidatat skateboard dolor brunch. Food truck
                                                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                                                                tempor, sunt aliqua put a bird on it squid
                                                                single-origin coffee nulla assumenda shoreditch et.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading">
                                                            <h4 className="panel-title font-alt"><a
                                                                className="collapsed" data-toggle="collapse"
                                                                data-parent="#accordion" href="#support3">Support
                                                                Question 3</a></h4>
                                                        </div>
                                                        <div className="panel-collapse collapse" id="support3">
                                                            <div className="panel-body">Anim pariatur cliche
                                                                reprehenderit, enim eiusmod high life accusamus
                                                                terry richardson ad squid. 3 wolf moon officia aute,
                                                                non cupidatat skateboard dolor brunch. Food truck
                                                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                                                                tempor, sunt aliqua put a bird on it squid
                                                                single-origin coffee nulla assumenda shoreditch et.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="panel panel-default">
                                                        <div className="panel-heading">
                                                            <h4 className="panel-title font-alt"><a
                                                                className="collapsed" data-toggle="collapse"
                                                                data-parent="#accordion" href="#support4">Support
                                                                Question 4</a></h4>
                                                        </div>
                                                        <div className="panel-collapse collapse" id="support4">
                                                            <div className="panel-body">Anim pariatur cliche
                                                                reprehenderit, enim eiusmod high life accusamus
                                                                terry richardson ad squid. 3 wolf moon officia aute,
                                                                non cupidatat skateboard dolor brunch. Food truck
                                                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                                                                tempor, sunt aliqua put a bird on it squid
                                                                single-origin coffee nulla assumenda shoreditch et.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <h4 className="font-alt mb-30">Our Expertises</h4>
                                                <h6 className="font-alt mb-2">
                                                    Development
                                                </h6>
                                                <div className="progress mb-3">
                                                    <div className="progress-bar pb-dark" aria-valuenow="60"
                                                         role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                                            <span className="font-alt">
                                                            </span>
                                                    </div>
                                                </div>
                                                <h6 className="font-alt mb-2">
                                                    Branding
                                                </h6>
                                                <div className="progress mb-3">
                                                    <div className="progress-bar pb-dark" aria-valuenow="80"
                                                         role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                                            <span className="font-alt">
                                                            </span>
                                                    </div>
                                                </div>
                                                <h6 className="font-alt mb-2">
                                                    Marketing
                                                </h6>
                                                <div className="progress mb-3">
                                                    <div className="progress-bar pb-dark" aria-valuenow="50"
                                                         role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                                            <span className="font-alt">
                                                            </span>
                                                    </div>
                                                </div>
                                                <h6 className="font-alt mb-2">
                                                    Photography
                                                </h6>
                                                <div className="progress mb-3">
                                                    <div className="progress-bar pb-dark" aria-valuenow="90"
                                                         role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                                            <span className="font-alt">
                                                            </span>
                                                    </div>
                                                </div>
                                                <h6 className="font-alt mb-2">
                                                    Designing
                                                </h6>
                                                <div className="progress mb-3">
                                                    <div className="progress-bar pb-dark" aria-valuenow="70"
                                                         role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                                            <span className="font-alt">
                                                            </span>
                                                    </div>
                                                </div>
                                                <h6 className="font-alt mb-2">
                                                    Dedication
                                                </h6>
                                                <div className="progress mb-3">
                                                    <div className="progress-bar pb-dark" aria-valuenow="100"
                                                         role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                                            <span className="font-alt">
                                                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/************* end of expertise *************/}
                                {/************ testimonial-slider ***********/}
                                <section className="module bg-dark-60 pt-0 pb-0 parallax-bg testimonial">
                                    <div className="testimonials-slider pt-140 pb-140">
                                        <ul className="slides">
                                            {sliderItem('Jack Woods',
                                                'SomeCompany INC, CEO',
                                                'I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.')}
                                            {sliderItem('Jim Stone',
                                                'SomeCompany INC, CEO',
                                                'I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now.')}
                                            {sliderItem('Adele Snow',
                                                'SomeCompany INC, CEO',
                                                'I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.')}
                                        </ul>
                                    </div>
                                </section>
                                {/********** end of testimonial slider ***********/}
                                {/********** contact ***********/}
                                <section className="module" id="contact">
                                    <div className={lightModeOn ? "container text-dark" : "container text-white"}>
                                        <div className="row">
                                            <div className="col-sm-6 col-sm-offset-3">
                                                <h2 className="module-title font-alt">Contact us</h2>
                                                <div className="module-subtitle font-serif">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <form id="contactForm" role="form" method="post"
                                                      action="">
                                                    <div className="form-group">
                                                        <label className="sr-only" htmlFor="name">Name</label>
                                                        <input className="form-control" type="text" id="name"
                                                               name="name" placeholder="Your Name*" required="required"
                                                               data-validation-required-message="Please enter your name."/>
                                                        <p className="help-block text-danger">
                                                        </p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="sr-only" htmlFor="email">Email</label>
                                                        <input className="form-control" type="email" id="email"
                                                               name="email" placeholder="Your Email*"
                                                               required="required"
                                                               data-validation-required-message="Please enter your email address."/>
                                                        <p className="help-block text-danger">
                                                        </p>
                                                    </div>
                                                    <div className="form-group">
                                                        <textarea className="form-control" rows="7" id="message"
                                                                  name="message" placeholder="Your Message*"
                                                                  required="required"
                                                                  data-validation-required-message="Please enter your message.">
                                                        </textarea>
                                                        <p className="help-block text-danger">
                                                        </p>
                                                    </div>
                                                    <div className="text-center">
                                                        <button className="btn btn-block btn-round btn-d" id="cfsubmit"
                                                                type="submit">Submit
                                                        </button>
                                                    </div>
                                                </form>
                                                <div className="ajax-response font-alt" id="contactFormResponse">
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="alt-features-item mt-0">
                                                    <div className="alt-features-icon">
                                                        <span data-icon="&#xe021;">
                                                        </span></div>
                                                    <h3 className="alt-features-title font-alt">Where to meet</h3>Titan
                                                    Company<br/>23 Greate Street<br/>Los Angeles, 12345 LS
                                                </div>
                                                <div className="alt-features-item mt-xs-60">
                                                    <div className="alt-features-icon">
                                                        <span data-icon="&#xe025;">
                                                        </span></div>
                                                    <h3 className="alt-features-title font-alt">Say Hello</h3>Email:
                                                    somecompany@example.com<br/>Phone: +1 234 567 89 10
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/********** end of contact ***********/}

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
