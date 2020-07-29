import React, {useEffect, useRef} from "react";
import '../../assets/css/app.css';
import '../../assets/css/style/about.css';
import main_demo from '../../assets/images/screenshots/main_demo.jpg';
import agency from '../../assets/images/screenshots/agency.jpg';
import portfolio from '../../assets/images/screenshots/portfolio.jpg';
import restaurant from '../../assets/images/screenshots/restaurant.jpg';
import finance from '../../assets/images/screenshots/finance.jpg';
import landing from '../../assets/images/screenshots/landing.jpg';
import photography from '../../assets/images/screenshots/photography.jpg';
import shop from '../../assets/images/screenshots/shop.jpg';
import one_page from '../../assets/images/screenshots/one_page.jpg';
import {useSelector} from "react-redux";


function About() {

    const lightModeOn = useSelector(state => state.Home.lightModeOn);
    const isMounted = useRef(false);

    const generateSection = (image, title) => {
        return (
            <div className="col-md-4 col-sm-6 col-xs-12">
                <a className="content-box"
                   href="">
                    <div className={lightModeOn ? "content-box-image theme-light" : "content-box-image theme-dark"}><img
                        src={image}
                        alt="Main Demo"/></div>
                    <h3 className={lightModeOn ? "content-box-title font-serif text-black " :
                        "content-box-title font-serif text-white"}>{title}</h3>
                </a>
            </div>
        )
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="hfeed site" id="page">
            <div id="content" className="site-content">
                <div className="ast-container">
                    <div id="primary" className="content-area primary">
                        <main id="main" className="site-main">
                            <article className="post-553 page type-page status-publish ast-article-single" id="post-553"
                                     itemType="https://schema.org/CreativeWork" itemScope="itemscope">
                                <header className="text-center m-5">
                                    <h1 className="font-serif text-red">A Propos de nous</h1>
                                </header>
                                {/* .entry-header */}
                                <div className="entry-content clear" itemProp="text">
                                    <div data-elementor-type="wp-page" data-elementor-id={553}
                                         className="elementor elementor-553" data-elementor-settings="[]">
                                        <div className="elementor-inner">
                                            <div className="elementor-section-wrap">
                                                {/*section image*/}
                                                <section className="module-medium" id="demos">
                                                    <div className="container">
                                                        <div className="row multi-columns-row">
                                                            {generateSection(main_demo, 'Main demo')}
                                                            {generateSection(agency, 'Agency')}
                                                            {generateSection(portfolio, 'Portfolio')}
                                                            {generateSection(restaurant, 'Restaurant')}
                                                            {generateSection(finance, 'Finance')}
                                                            {generateSection(landing, 'Landing')}
                                                            {generateSection(photography, 'Photography')}
                                                            {generateSection(shop, 'Shop')}
                                                            {generateSection(one_page, 'One page')}
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            {/* #post-## */}
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
