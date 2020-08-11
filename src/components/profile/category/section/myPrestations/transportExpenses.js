import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    addTravelExpenses,
    profileInitialisationCondition,
    setValueOfToastGlobal
} from "../../../../functionTools/functionProps";
import {deleteInObject} from "../../../../functionTools/tools";

function TransportExpenses(props) {

    const dispatch = useDispatch();
    const conditions = useSelector(state => state.profile.conditions);
    const travel_expenses = useSelector(state => state.KantoBizForm.travel_expenses);

    const isMounted = useRef(false);
    const [isBetween, setIsBetween] = useState(false);
    const [fixingPrice, setFixingPrice] = useState({'one': false, 'between': false});
    const [global_price, setGlobalPrice] = useState(
        props.serviceEdit ? travel_expenses : conditions['travel_expenses'] || {'from': 0, 'to': 0});
    const [tmpGP, setTmpGP] = useState(
        props.serviceEdit ? travel_expenses : conditions['travel_expenses'] || {'from': 0, 'to': 0});

    const validate = (param) => {

        let _tmp_global_price = {...global_price}
        if (param) {
            setGlobalPrice(tmpGP)
            _tmp_global_price = tmpGP
        }

        if (!props.serviceEdit) {
            let _tmp = {...conditions};
            _tmp['travel_expenses'] = _tmp_global_price;
            let tmp = deleteInObject({..._tmp});
            axios.put('api/artist_conditions/update', tmp, {headers: props.headers}
            ).then((resp) => {
                canceledFixing()
                dispatch(profileInitialisationCondition(tmp));
            }).catch((err) => {
                toast.error(err.response.data)
            })
        } else {
            canceledFixing()
            dispatch(addTravelExpenses(_tmp_global_price))
        }
    }

    const validator = () => {
        if (fixingPrice.one) {
            if (tmpGP.from <= 0)
                toast.error('Veuillez mettre un prix supérieur a 0')
            else {
                validate(true)
                setIsBetween(false)
            }
        } else if (fixingPrice.between) {
            if (tmpGP.from <= 0 || tmpGP.to <= 0)
                toast.error('Veuillez mettre un prix supérieur a 0')
            else if (tmpGP.from >= tmpGP.to)
                toast.error('le prix maximum ne devrait pas être inferieur au prix minimum')
            else {
                validate(true)
                setIsBetween(true)
            }
        }
    }

    const canceledFixing = () => {
        setFixingPrice({'one': false, 'between': false});
        setTmpGP({'from': 0, 'to': 0})
    }

    const changeGlobalPrice = async (e, _from, to) => {
        let value = e.target.value || 0;
        if (isBetween) {
            if (_from && (parseFloat(value) < global_price['to'])) {
                if (value === 0) global_price['to'] = 0
                global_price['from'] = parseFloat(value);
            } else if (to && (parseFloat(value) > global_price['from']))
                global_price['to'] = parseFloat(value);
            else {
                toast.error("veuillez rssayer")
                return
            }
        } else {
            global_price['from'] = parseFloat(value);
        }
        validate()
    };

    const justChangeGlobalPrice = (e, _from, to) => {
        let value = e.target.value;
        let _tmp_tmpGP = {...tmpGP}
        if (_from) _tmp_tmpGP['from'] = parseFloat(value);
        else if (to) _tmp_tmpGP['to'] = parseFloat(value);
        setTmpGP(_tmp_tmpGP);
    }

    useEffect(() => {

        try {
            if (global_price['to'] > 0)
                setIsBetween(true)
        } catch (e) {
            //
        }

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (
        <div>
            {!global_price['from']
                ?
                <div>
                    <h4 className="text-light text-center bolder pt-3 pb-2">
                        Mon frais de transport est gratuit
                    </h4>
                    {(!fixingPrice.one && !fixingPrice.between) ?
                        <div>
                            <button className="btn btn-outline-danger pl-2 pr-2 m-1"
                                    onClick={() => setFixingPrice({'one': true, 'between': false})}>
                                Fixer un prix
                            </button>
                            <button className="btn btn-outline-danger pl-2 pr-2 m-1"
                                    onClick={() => setFixingPrice({'one': false, 'between': true})}>
                                Fourchette de prix
                            </button>
                        </div>
                        :
                        <div>
                            {fixingPrice.one
                            &&
                            <div>
                                <div className="custom-float">
                                    <div className="input-group-prepend d-inline-block center">
                                        <div className="input-group-text text-dark">
                                            <i className="icon-money"/>
                                            &nbsp;Je fixe un prix *
                                        </div>
                                        <input className="form-control"
                                               value={tmpGP.from}
                                               type="number"
                                               id="tmpGP_fixing"
                                               name="tmpGP_fixing"
                                               onChange={(e) => justChangeGlobalPrice(e, true)}/>
                                    </div>
                                </div>
                            </div>
                            }
                            {fixingPrice.between
                            &&
                            <div>
                                <h5 className="text-light text-red text-center bolder pt-3 pb-2">
                                    Je fixe ma fourchette de prix
                                </h5>
                                <div className="row justify-content-center col">
                                    <div className="custom-float col-md-4">
                                        <div className="input-group-prepend d-inline-block center">
                                            <div className="input-group-text text-dark">
                                                <i className="icon-money"/>&nbsp;Min *
                                            </div>
                                            <input className="form-control"
                                                   value={tmpGP.from}
                                                   type="number"
                                                   id="tmpGP_between_fixing"
                                                   name="tmpGP_between_fixing"
                                                   onChange={(e) => justChangeGlobalPrice(e, true)}/>
                                        </div>

                                        {!props.serviceEdit &&
                                        <div className="center-center d-none d-lg-block">
                                            <i className="icon icon-chevron-left text-red s-24"/>
                                        </div>}

                                        <div className="input-group-prepend d-inline-block center">
                                            <div className="input-group-text text-dark">
                                                <i className="icon-money"/>
                                                &nbsp;Max *
                                            </div>
                                            <input className="form-control"
                                                   value={tmpGP.to}
                                                   type="number"
                                                   id="tmpGP_between_fixing"
                                                   name="tmpGP_between_fixing"
                                                   onChange={(e) => justChangeGlobalPrice(e, false, true)}/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            }
                            <div className="row justify-content-center m-1">
                                <button className="btn btn-outline-danger pl-2 pr-2 m-1"
                                        onClick={() => canceledFixing()}>
                                    Annuler
                                </button>
                                <button className="btn btn-outline-danger pl-2 pr-2 m-1"
                                        onClick={() => validator()}>
                                    Valider
                                </button>
                            </div>
                        </div>
                    }
                </div>
                :
                <div>
                    <h4 className="text-light text-center bolder pt-3 pb-2">
                        Mon frais de transport est de:
                    </h4>
                    <div className="col text-center pt-2 pb-3">
                        {isBetween ?
                            <div>
                                <h2 className="text-red">
                                    entre {global_price.from}€ à {global_price.to}€
                                    <i className="icon icon-info text-red" data-tip data-for="global_price"/>
                                </h2>
                            </div>
                            :<h2 className="text-red">
                                {global_price.from} $&nbsp;
                                <i className="icon icon-info text-red" data-tip data-for="global_price"/>
                            </h2>}

                        <div className="custom-float">
                            <div className="input-group-prepend d-inline-block center">
                                {isBetween ?
                                    <div className="row justify-content-center">
                                        <div className="col input-group-prepend d-inline-block center">
                                            <div className="input-group-text text-dark">
                                                <i className="icon-money"/>
                                                &nbsp;Modifier le Min *
                                            </div>
                                            <input className="form-control"
                                                   value={global_price.from}
                                                   type="number"
                                                   id="global_price_between_fixing"
                                                   name="global_price_between_fixing"
                                                   onChange={(e) => changeGlobalPrice(e, true)}/>
                                        </div>
                                        <div className="col input-group-prepend d-inline-block center">
                                            <div className="input-group-text text-dark">
                                                <i className="icon-money"/>
                                                &nbsp;Modifier le Max *
                                            </div>
                                            <input className="form-control"
                                                   value={global_price.to}
                                                   type="number"
                                                   id="global_price_between_fixing"
                                                   name="global_price_between_fixing"
                                                   onChange={(e) => changeGlobalPrice(e, false, true)}/>
                                        </div>
                                    </div>
                                    : <div>
                                        <div className="input-group-text text-dark">
                                            <i className="icon-money"/>
                                            &nbsp;Modifier le prix *
                                        </div>
                                        <input className="form-control"
                                             value={global_price.from}
                                             type="number"
                                             id="global_price"
                                             name="global_price"
                                                  onChange={(e) => changeGlobalPrice(e)}/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default TransportExpenses;
