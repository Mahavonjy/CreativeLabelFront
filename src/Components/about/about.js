import React, {useEffect, useRef} from "react";
import {LightModeToggle} from "../functionTools/createFields";


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
                                                <section
                                                    className="has_eae_slider elementor-element elementor-element-ad26f5b elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section"
                                                    data-id="ad26f5b" data-element_type="section"
                                                    data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                                                    <div className="elementor-background-overlay"/>
                                                    <div className="elementor-container elementor-column-gap-default">
                                                        <div className="elementor-row">
                                                            <div
                                                                className="has_eae_slider elementor-element elementor-element-a40332c elementor-column elementor-col-33 elementor-top-column"
                                                                data-id="a40332c" data-element_type="column"
                                                                data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                                                                <div className="elementor-column-wrap">
                                                                    <div className="elementor-background-overlay"/>
                                                                    <div className="elementor-widget-wrap">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="has_eae_slider elementor-element elementor-element-7a9d06e elementor-column elementor-col-66 elementor-top-column"
                                                                data-id="7a9d06e" data-element_type="column">
                                                                <div
                                                                    className="elementor-column-wrap  elementor-element-populated">
                                                                    <div className="elementor-widget-wrap">
                                                                        <div
                                                                            className="elementor-element elementor-element-95937d5 elementor-widget elementor-widget-text-editor"
                                                                            data-id="95937d5" data-element_type="widget"
                                                                            data-widget_type="text-editor.default">
                                                                            <div className="elementor-widget-container">
                                                                                <div
                                                                                    className="elementor-text-editor elementor-clearfix">
                                                                                    <p style={{
                                                                                        textAlign: 'justify',
                                                                                        textJustify: 'inter-ideograph'
                                                                                    }}><span style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%'
                                                                                    }}>
                                                                                        ISL Creative (Independance Sound Label Creative) est une entreprise spécialisée dans les
                                                                                        projets musicaux qui propose une large gamme de services dans le domaine de la musique&nbsp;:</span>
                                                                                    </p><p style={{
                                                                                    marginLeft: '54.0pt',
                                                                                    msoAddSpace: 'auto',
                                                                                    textAlign: 'justify',
                                                                                    textJustify: 'inter-ideograph',
                                                                                    textIndent: '-18.0pt',
                                                                                    msoList: 'l0 level1 lfo1'
                                                                                }}>{/* [if !supportLists]*/}<span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%',
                                                                                        fontFamily: 'Symbol',
                                                                                        msoFareastFontFamily: 'Symbol',
                                                                                        msoBidiFontFamily: 'Symbol'
                                                                                    }}>·<span style={{
                                                                                    fontStyle: 'normal',
                                                                                    fontVariantNumeric: 'normal',
                                                                                    fontVariantEastAsian: 'normal',
                                                                                    fontWeight: 'normal',
                                                                                    fontStretch: 'normal',
                                                                                    fontSize: '7pt',
                                                                                    lineHeight: 'normal',
                                                                                    fontFamily: '"Times New Roman"'
                                                                                }}>&nbsp; &nbsp; &nbsp;</span></span><span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%'
                                                                                    }}>ISL Beatmaking: Mise à disposition d’une palette de création musicale afrotropicale (un large choix d’instrumentales pour les artistes)</span>
                                                                                </p><p style={{
                                                                                    marginLeft: '54.0pt',
                                                                                    msoAddSpace: 'auto',
                                                                                    textAlign: 'justify',
                                                                                    textJustify: 'inter-ideograph',
                                                                                    textIndent: '-18.0pt',
                                                                                    msoList: 'l0 level1 lfo1'
                                                                                }}>{/* [if !supportLists]*/}<span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%',
                                                                                        fontFamily: 'Symbol',
                                                                                        msoFareastFontFamily: 'Symbol',
                                                                                        msoBidiFontFamily: 'Symbol'
                                                                                    }}>·<span style={{
                                                                                    fontStyle: 'normal',
                                                                                    fontVariantNumeric: 'normal',
                                                                                    fontVariantEastAsian: 'normal',
                                                                                    fontWeight: 'normal',
                                                                                    fontStretch: 'normal',
                                                                                    fontSize: '7pt',
                                                                                    lineHeight: 'normal',
                                                                                    fontFamily: '"Times New Roman"'
                                                                                }}>&nbsp; </span></span><span style={{
                                                                                    fontSize: '16px',
                                                                                    fontStyle: 'normal',
                                                                                    fontWeight: 400
                                                                                }}>ISL Kantobiz:&nbsp;KantoBiz est un module de ISL Creative spécialisé dans la mise en relation des artistes (Chanteurs, DJs, Comédiens,…) et du business (les entreprises de l’évènementiel, les évènements familiaux, évènements d’entreprise, évènements associatives, etc…). Notre rôle est d’assurer une relation pérenne entre le monde de l’entreprise et le monde du spectacle en mettant à disposition des artistes divers et variés</span>.
                                                                                </p>
                                                                                    <h3>Isl Creative se spécialise sur
                                                                                        le marché afro-tropical incluant
                                                                                        l’Afrique subsaharienne et
                                                                                        l’Océan Indien</h3>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="elementor-element elementor-element-86caf90 elementor-widget elementor-widget-text-editor"
                                                                            data-id="86caf90" data-element_type="widget"
                                                                            data-widget_type="text-editor.default">
                                                                            <div className="elementor-widget-container">
                                                                                <div
                                                                                    className="elementor-text-editor elementor-clearfix">
                                                                                    <h3 className="text-red m-5">Les
                                                                                        valeurs de l’entreprise</h3>
                                                                                    <p style={{
                                                                                        textIndent: '-18.0pt',
                                                                                        msoList: 'l0 level1 lfo1'
                                                                                    }}>{/* [if !supportLists]*/}<span
                                                                                        style={{
                                                                                            fontSize: '12.0pt',
                                                                                            lineHeight: '115%',
                                                                                            fontFamily: '"Courier New"',
                                                                                            msoFareastFontFamily: '"Courier New"'
                                                                                        }}>o<span style={{
                                                                                        fontStyle: 'normal',
                                                                                        fontVariantNumeric: 'normal',
                                                                                        fontVariantEastAsian: 'normal',
                                                                                        fontWeight: 'normal',
                                                                                        fontStretch: 'normal',
                                                                                        fontSize: '7pt',
                                                                                        lineHeight: 'normal',
                                                                                        fontFamily: '"Times New Roman"'
                                                                                    }}>&nbsp; &nbsp;</span></span><b><i><u><span
                                                                                        style={{
                                                                                            fontSize: '12.0pt',
                                                                                            lineHeight: '115%'
                                                                                        }}
                                                                                        className="text-red">Respect&nbsp;:</span></u></i></b>
                                                                                    </p><p><span style={{
                                                                                    fontSize: '12.0pt',
                                                                                    lineHeight: '115%'
                                                                                }}>Le respect est une notion primordiale de la réflexion morale d’une<br/>personne. C’est une prise en considération des actes, des paroles et des<br/>actions des autres. Avoir du respect, c’est admettre l’idée que les autres sont<br/>différents tout en étant nos égaux et c’est également s’interdire de juger,<br/>s’interdire de manipuler autrui pour quelque raison que ce soit. Le respect de<br/>soi et d’autrui est indispensable pour développer un sens de l’empathie et<br/>il&nbsp; permet de comprendre et de<br/>reconnaitre que ses paroles et actions ont une portée, un impact et des<br/>conséquences sur les autres. Evoluant dans le domaine de la création, la valeur<br/>de respect est pour nous primordiale car elle nous élève, nous rend plus<br/>responsable et attentifs aux autres et à notre environnement. <b><i><u/></i></b></span>
                                                                                </p><p style={{
                                                                                    textIndent: '-18.0pt',
                                                                                    msoList: 'l0 level1 lfo1'
                                                                                }}>{/* [if !supportLists]*/}<span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%',
                                                                                        fontFamily: '"Courier New"',
                                                                                        msoFareastFontFamily: '"Courier New"'
                                                                                    }}>o<span style={{
                                                                                    fontStyle: 'normal',
                                                                                    fontVariantNumeric: 'normal',
                                                                                    fontVariantEastAsian: 'normal',
                                                                                    fontWeight: 'normal',
                                                                                    fontStretch: 'normal',
                                                                                    fontSize: '7pt',
                                                                                    lineHeight: 'normal',
                                                                                    fontFamily: '"Times New Roman"'
                                                                                }}>&nbsp; &nbsp;</span></span><b><i><u><span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%'
                                                                                    }}
                                                                                    className="text-red">Intégrité&nbsp;:</span></u></i></b>
                                                                                </p><p><span style={{
                                                                                    fontSize: '12.0pt',
                                                                                    lineHeight: '115%'
                                                                                }}>C’est le fondement de notre réussite sur le long terme. L’intégrité se<br/>définit comme étant l’État de quelque chose qui a conservé sans altération ses<br/>qualités, son état originels. C’est la qualité de quelqu’un, de son<br/>comportement, d’une institution qui est intègre et honnête.</span>
                                                                                </p><p style={{
                                                                                    textIndent: '-18.0pt',
                                                                                    msoList: 'l0 level1 lfo1'
                                                                                }}>{/* [if !supportLists]*/}<span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%',
                                                                                        fontFamily: '"Courier New"',
                                                                                        msoFareastFontFamily: '"Courier New"'
                                                                                    }}>o</span><b><i><u><span style={{
                                                                                    fontSize: '12.0pt',
                                                                                    lineHeight: '115%'
                                                                                }}
                                                                                                              className="text-red">Indépendance&nbsp;: </span></u></i></b>
                                                                                </p><p><span style={{
                                                                                    fontSize: '12.0pt',
                                                                                    lineHeight: '115%'
                                                                                }}>L’indépendance est le fait de jouir d’une entière autonomie à l’égard de<br/>quelqu’un ou de quelque chose. En d’autre terme, L’indépendance est l’absence<br/>de relation (de sujétion, de cause à effet, de coordination) entre différentes<br/>entités. Nous accordons une grande importance à l’indépendance car elle est à<br/>l’origine de la diversité des créations et de notre originalité.</span>
                                                                                </p><p style={{
                                                                                    textIndent: '-18.0pt',
                                                                                    msoList: 'l0 level1 lfo1'
                                                                                }}>{/* [if !supportLists]*/}<span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%',
                                                                                        fontFamily: '"Courier New"',
                                                                                        msoFareastFontFamily: '"Courier New"'
                                                                                    }}>o<span style={{
                                                                                    fontStyle: 'normal',
                                                                                    fontVariantNumeric: 'normal',
                                                                                    fontVariantEastAsian: 'normal',
                                                                                    fontWeight: 'normal',
                                                                                    fontStretch: 'normal',
                                                                                    fontSize: '7pt',
                                                                                    lineHeight: 'normal',
                                                                                    fontFamily: '"Times New Roman"'
                                                                                }}>&nbsp; &nbsp;</span></span><b><i><u><span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%'
                                                                                    }} className="text-red">La Solidarité&nbsp;: </span></u></i></b>
                                                                                </p><p><span style={{
                                                                                    fontSize: '12.0pt',
                                                                                    lineHeight: '115%'
                                                                                }}>Nous comprenons la solidarité comme étant un devoir moral, résultant de<br/>la prise de conscience de l’interdépendance sociale étroite existant entre les<br/>hommes ou dans des groupes humains, et qui incite les hommes à s’unir, à se<br/>porter entraide et assistance réciproque et à coopérer entre eux, en tant que<br/>membres d’un même corps social. La solidarité est le fondement de la cohésion<br/>du groupe ISL.</span>
                                                                                </p><p style={{
                                                                                    textIndent: '-18.0pt',
                                                                                    msoList: 'l0 level1 lfo1'
                                                                                }}>{/* [if !supportLists]*/}<span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%',
                                                                                        fontFamily: '"Courier New"',
                                                                                        msoFareastFontFamily: '"Courier New"'
                                                                                    }}>o<span style={{
                                                                                    fontStyle: 'normal',
                                                                                    fontVariantNumeric: 'normal',
                                                                                    fontVariantEastAsian: 'normal',
                                                                                    fontWeight: 'normal',
                                                                                    fontStretch: 'normal',
                                                                                    fontSize: '7pt',
                                                                                    lineHeight: 'normal',
                                                                                    fontFamily: '"Times New Roman"'
                                                                                }}>&nbsp; &nbsp;</span></span><b><i><u><span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%'
                                                                                    }}
                                                                                    className="text-red">L’Equité :</span></u></i></b>
                                                                                </p><p
                                                                                    style={{
                                                                                        textIndent: '-18.0pt',
                                                                                        msoList: 'l0 level1 lfo1'
                                                                                    }}><span style={{
                                                                                    fontSize: '12pt',
                                                                                    textIndent: '0.6pt'
                                                                                }}>&nbsp; &nbsp;L’équité est un sentiment de justice&nbsp;</span><span
                                                                                    style={{
                                                                                        fontSize: '12pt',
                                                                                        textIndent: '0.6pt'
                                                                                    }}>naturelle et spontanée, fondée sur la reconnaissance des droits de chacun, sans&nbsp;</span><span
                                                                                    style={{
                                                                                        fontSize: '12pt',
                                                                                        textIndent: '0.6pt'
                                                                                    }}>qu’elle soit nécessairement inspirée par les lois en vigueur. Ce sentiment se&nbsp;</span><span
                                                                                    style={{
                                                                                        fontSize: '12pt',
                                                                                        textIndent: '0.6pt'
                                                                                    }}>manifeste, par exemple, lorsqu’on doit apprécier un cas particulier ou concret&nbsp;</span><span
                                                                                    style={{
                                                                                        fontSize: '12pt',
                                                                                        textIndent: '0.6pt'
                                                                                    }}>sans se laisser guider par les seules règles du droit. Autrement dit, l’équité&nbsp;</span><span
                                                                                    style={{
                                                                                        fontSize: '12pt',
                                                                                        textIndent: '0.6pt'
                                                                                    }}>est la qualité consistant à attribuer à chacun ce qui lui est dû par référence&nbsp;</span><span
                                                                                    style={{
                                                                                        fontSize: '12pt',
                                                                                        textIndent: '0.6pt'
                                                                                    }}>aux principes de la justice naturelle</span>
                                                                                </p><p style={{
                                                                                    textIndent: '-18.0pt',
                                                                                    msoList: 'l0 level1 lfo1'
                                                                                }}>{/* [if !supportLists]*/}<span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%',
                                                                                        fontFamily: '"Courier New"',
                                                                                        msoFareastFontFamily: '"Courier New"'
                                                                                    }}>o<span style={{
                                                                                    fontStyle: 'normal',
                                                                                    fontVariantNumeric: 'normal',
                                                                                    fontVariantEastAsian: 'normal',
                                                                                    fontWeight: 'normal',
                                                                                    fontStretch: 'normal',
                                                                                    fontSize: '7pt',
                                                                                    lineHeight: 'normal',
                                                                                    fontFamily: '"Times New Roman"'
                                                                                }}>&nbsp; &nbsp;</span></span><b><i><u><span
                                                                                    style={{
                                                                                        fontSize: '12.0pt',
                                                                                        lineHeight: '115%'
                                                                                    }}
                                                                                    className="text-red">Excellence :</span></u></i></b>
                                                                                </p>
                                                                                    <p style={{
                                                                                        textIndent: '-18.0pt',
                                                                                        msoList: 'l0 level1 lfo1'
                                                                                    }}><span
                                                                                        style={{fontSize: '12pt'}}>&nbsp; &nbsp; Nous comprenons par le mot «&nbsp;Excellence&nbsp;» le Caractère&nbsp;</span><span
                                                                                        style={{fontSize: '12pt'}}>de la chose ou de la personne qui correspond, presque parfaitement, à la&nbsp;</span><span
                                                                                        style={{fontSize: '12pt'}}>représentation idéale de sa nature, de sa fonction ou qui manifeste une très&nbsp;</span><span
                                                                                        style={{
                                                                                            fontSize: '12pt',
                                                                                            lineHeight: '115%'
                                                                                        }}>nette supériorité dans tel ou tel domaine.&nbsp;</span><span
                                                                                        style={{
                                                                                            fontSize: '14pt',
                                                                                            lineHeight: '115%',
                                                                                            fontFamily: 'Calibri, sans-serif'
                                                                                        }}>C’est le degré éminent de perfection.
                                                                                    Il se dit pour marquer la Perfection d’une certaine qualité dans ce dont on parle, pour en exprimer le plus haut degré.
                                                                                    </span>
                                                                                    </p><p
                                                                                    style={{marginLeft: '35.4pt'}}>&nbsp;</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
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
                            {LightModeToggle()}
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
