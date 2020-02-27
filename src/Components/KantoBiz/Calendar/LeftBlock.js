import React, { useEffect, useRef, useState } from "react";
import RightBlock from "./RightBlock";
import ReactTooltip from "react-tooltip";

function LeftBlock (props) {

    const isMounted = useRef(false);
    const [toggle, setToggle] = useState(true); // to change false after development
    const [allPrestation, setAllPrestation] = useState(props.prestations);
    const [clicked, setClicked] = useState({});

    LeftBlock.handleClick = async (index) => {
        onChangeClicked(index);
        props.handleToUpdate(!toggle);
        setToggle(!toggle);
    };

    const onChangeClicked = (index) => {
        let tmp_clicked = {...clicked};
        for (let r in tmp_clicked) {
            if (tmp_clicked[r] === true)
                tmp_clicked[r] = !tmp_clicked[r];
        }
        tmp_clicked[index] = true;
        setClicked(tmp_clicked);
    };

    const changeClicked = (index) => {
        if (!clicked[index]) {
            onChangeClicked(index);
            RightBlock.changeIndexPrestation(index).then(r => null)
        }
    };

    const updataPrestation = () => {
        // console.log(props.prestations);
        console.log("wait to send")
    };

    useEffect(() => {

        let i = 0;
        let tmp = {};
        while (i < allPrestation.length) {
            tmp[i] = i === 0;
            i++;
        }
        setClicked(tmp);

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="flip-container-left">
            <ReactTooltip/>
            <div className={`flipper ${toggle ? "" : "toggle"}`}>
                <div className="front front-left">
                    <h2 className="text-red">{props.arrDays[props.date.getDay()]}</h2>
                    <h1 className="text-red">{props.date.getDate()}</h1>
                    <h2 className="text-red">Aujourd'hui</h2>
                </div>
                <div className="back back-left">
                    <span className="mb-1">
                        <i className="icon-long-arrow-left bg-transparent text-red s-24" data-tip="revenir au calendrier" onClick={LeftBlock.handleClick}/>
                    </span>
                    <div className="text-center mt-4" style={{width: "100%", height: "100px"}}>
                        <h4 className="text-red bolder mb-4">Mes prestation pour cette date</h4>
                        <table className="table">
                            <tbody>
                            {allPrestation.map((val, index) =>
                                <tr className={clicked[index] ? "bg-green" : "bg-secondary"} key={index} onClick={() => changeClicked(index)}>
                                    <td><img src={val.galleries[0]} width="20" height="20" alt="prestation-image"/></td>
                                    <td><small className="bolder">{val.title}</small></td>
                                    <td><small className="bolder">{val.price}$</small></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <button className="btn btn-outline-danger pl-5 pr-5 mt-5" data-tip="Enregistrer tous vos changements" onClick={updataPrestation}>Enregistrer</button>
                </div>
            </div>
        </div>
    );
}

export default LeftBlock;
