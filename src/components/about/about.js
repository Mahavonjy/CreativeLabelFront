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


function About() {

    const isMounted = useRef(false);

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
                                    <h1 className="text-red">A Propos de nous</h1>
                                </header>
                                {/* .entry-header */}
                                <div className="entry-content clear" itemProp="text">
                                    <div data-elementor-type="wp-page" data-elementor-id={553}
                                         className="elementor elementor-553" data-elementor-settings="[]">
                                        <div className="elementor-inner">
                                            <div className="elementor-section-wrap">
                                                <section className="module-medium" id="demos">
                                                    <div className="container">
                                                        <div className="row multi-columns-row">
                                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                                <a className="content-box"
                                                                   href="index_mp_fullscreen_video_background.html">
                                                                    <div className="content-box-image"><img
                                                                        src={main_demo}
                                                                        alt="Main Demo"/></div>
                                                                    <h3 className="content-box-title font-serif">Main
                                                                        Demo</h3>
                                                                </a>
                                                            </div>
                                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                                <a className="content-box" href="index_agency.html">
                                                                    <div className="content-box-image"><img
                                                                        src={agency}
                                                                        alt="Agency"/></div>
                                                                    <h3 className="content-box-title font-serif">Agency</h3>
                                                                </a>
                                                            </div>
                                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                                <a className="content-box" href="index_portfolio.html">
                                                                    <div className="content-box-image"><img
                                                                        src={portfolio}
                                                                        alt="Portfolio"/></div>
                                                                    <h3 className="content-box-title font-serif">Portfolio</h3>
                                                                </a>
                                                            </div>
                                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                                <a className="content-box" href="index_restaurant.html">
                                                                    <div className="content-box-image"><img
                                                                        src={restaurant}
                                                                        alt="Restaurant"/></div>
                                                                    <h3 className="content-box-title font-serif">Restaurant</h3>
                                                                </a>
                                                            </div>
                                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                                <a className="content-box" href="index_finance.html">
                                                                    <div className="content-box-image"><img
                                                                        src={finance}
                                                                        alt="Finance"/></div>
                                                                    <h3 className="content-box-title font-serif">Finance</h3>
                                                                </a>
                                                            </div>
                                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                                <a className="content-box" href="index_landing.html">
                                                                    <div className="content-box-image"><img
                                                                        src={landing}
                                                                        alt="Landing"/></div>
                                                                    <h3 className="content-box-title font-serif">Landing</h3>
                                                                </a>
                                                            </div>
                                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                                <a className="content-box"
                                                                   href="index_photography.html">
                                                                    <div className="content-box-image"><img
                                                                        src={photography}
                                                                        alt="Photography"/></div>
                                                                    <h3 className="content-box-title font-serif">Photography</h3>
                                                                </a>
                                                            </div>
                                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                                <a className="content-box" href="index_shop.html">
                                                                    <div className="content-box-image"><img
                                                                        src={shop}
                                                                        alt="Shop"/></div>
                                                                    <h3 className="content-box-title font-serif">Shop</h3>
                                                                </a>
                                                            </div>
                                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                                <a className="content-box"
                                                                   href="index_op_fullscreen_gradient_overlay.html">
                                                                    <div className="content-box-image"><img
                                                                        src={one_page}
                                                                        alt="One Page"/></div>
                                                                    <h3 className="content-box-title font-serif">One
                                                                        Page</h3>
                                                                </a>
                                                            </div>
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
