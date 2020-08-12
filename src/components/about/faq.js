import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";

function Faq() {

    const lightModeOn = useSelector(state => state.Home.lightModeOn);
    const isMounted = useRef(false);

    const generateQuest = (id, quest, answer) => {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title font-alt">
                        <a data-toggle="collapse" data-parent="#accordion" href={"#support" + id}>
                            {quest}
                        </a>
                    </h4>
                </div>
                <div className="panel-collapse collapse in" id={"support" + id}>
                    <div className="panel-body ml-3 mr-3 pb-3">{answer}</div>
                </div>
            </div>
        )
    }

    const generateExpertise = (expertiseTitle) => {
        return (
            <div>
                <h6 className={lightModeOn ? "font-alt mb-2 text-black" :
                    "font-alt mb-2 text-white"}>
                    {expertiseTitle}
                </h6>
                <div className={lightModeOn ? "progress progress-dark mb-3" :
                    "progress progress-light mb-3"}>
                    <div className={lightModeOn ? "progress-bar pb-dark" :
                        "progress-bar pb-light"} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                        <span className="font-alt"/>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <section className="module">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h4 className={lightModeOn ? "font-alt mb-30 text-black" :
                            "font-alt mb-30 text-white"}>FAQ (Question fréquement poser)</h4>
                        <div className="panel-group" id="accordion">
                            {generateQuest(
                                0,
                                "Support Question 1",
                                "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus\n" +
                                        "terry richardson ad squid. 3 wolf moon officia aute,\n" +
                                        "non cupidatat skateboard dolor brunch. Food truck\n" +
                                        "quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon\n" +
                                        "tempor, sunt aliqua put a bird on it squid\n" +
                                        "single-origin coffee nulla assumenda shoreditch et."
                            )}
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h4 className={lightModeOn ? "font-alt mb-30 text-black" :
                            "font-alt mb-30 text-white"}>Notre Expertise</h4>
                        {generateExpertise("Marketing")}
                        {generateExpertise("Dedication")}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Faq;
