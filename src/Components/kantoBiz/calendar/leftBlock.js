import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";
import {addMaterialsCopy, addOptionCopy, addServicesCopy} from "../../functionTools/functionProps";
import {updateAllOptions, updateAllServices} from "../../functionTools/tools";
import RightBlock from "./rightBlock";

function LeftBlock(props) {

    const dispatch = useDispatch();
    const prestations = useSelector(state => state.profilePrestations.prestations);
    const props_options = useSelector(state => state.profilePrestations.options);
    const prestationCopy = useSelector(state => state.Others.prestationCopy);
    const optionsCopy = useSelector(state => state.Others.optionsCopy);

    const isMounted = useRef(false);
    const [toggle, setToggle] = useState(true);
    const [allPrestation, setAllPrestation] = useState(props.prestations);
    const [clicked, setClicked] = useState([]);
    const [key, setKey] = useState(null);

    LeftBlock.handleClick = async (prestations, key) => {
        props.handleToUpdate(!toggle);
        setToggle(!toggle);
        if (prestations && key || key === 0) {
            setKey(key);
            setAllPrestation(prestations);
        } else {
            await dispatch(addMaterialsCopy({}));
            await dispatch(addOptionCopy([]));
            await dispatch(addServicesCopy([]));
        }
    };

    const changeClicked = async (index_) => {
        if (clicked[index_] === false) {
            let tmp_clicked = [...clicked];
            for (let row in tmp_clicked) if (tmp_clicked[row]) tmp_clicked[row] = false;
            tmp_clicked[index_] = true;
            await setClicked(tmp_clicked);
            await RightBlock.changeIndexPrestation(index_);
        }
    };

    const changePrestationHide = (index) => {
        let origin_prestaions = [...prestationCopy];
        origin_prestaions[index]["special_dates"][key]['hidden'] = !origin_prestaions[index]["special_dates"][key]['hidden'];
        dispatch(addServicesCopy(origin_prestaions));
    };

    const getHidePrestation = (index) => {
        try {
            if (prestationCopy[index]["special_dates"][key]['hidden'])
                return (<i className="icon-eye-slash text-red s-24" onClick={() => changePrestationHide(index)}/>);
            else return (<i className="icon-eye text-red s-24" onClick={() => changePrestationHide(index)}/>)
        } catch (e) {
            //
        }
    };

    const updateService = async () => {
        let _headers = props.headers;
        _headers['Content-Type'] = 'application/json';
        await updateAllOptions(optionsCopy, dispatch, _headers);
        _headers['Content-Type'] = 'multipart/form-data';
        await updateAllServices(prestationCopy, dispatch, _headers);
        toast.success("changement prise en compte");
    };

    useEffect(() => {

        let i = 0;
        let tmp = [];
        while (i < allPrestation.length) {
            tmp.push(i === 0);
            i++;
        }
        setClicked(tmp);

        return () => {
            isMounted.current = true
        };
    }, [optionsCopy, prestationCopy, prestations, props_options, key]);

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
                        <i className="icon-long-arrow-left bg-transparent text-red s-24"
                           data-tip="revenir au calendrier" onClick={LeftBlock.handleClick}/>
                    </span>
                    <button className="btn btn-outline-danger pl-5 pr-5"
                            data-tip="Enregistrer tous vos changements" onClick={updateService}>Enregistrer
                    </button>
                    <div className="text-center mt-4 mb-5" style={{width: "100%", height: "100px"}}>
                        <h4 className="text-red bolder mb-4">Mes prestation pour cette date</h4>
                        <table className="table">
                            <tbody>
                            {allPrestation.map((val, index) =>
                                <tr className={clicked[index] ? "bg-green" : "bg-secondary"} key={index}>
                                    <td>{!props.toggle && getHidePrestation(index)}</td>
                                    <td onClick={() => changeClicked(index)}><img src={val.galleries[0]} width="25" height="25" className="border1" alt="prestation-image"/></td>
                                    <td onClick={() => changeClicked(index)}><small className="bolder">{val.title}</small></td>
                                    {/*<td onClick={() => changeClicked(index)}><small className="bolder">{val.price}$</small></td>*/}
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftBlock;
