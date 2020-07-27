import React, {useEffect, useRef, useState} from "react";
import InputRange from "react-input-range";
import {useDispatch, useSelector} from "react-redux";
import {addTotalAmount} from "../../functionTools/functionProps";

function ReservationPricingDetails() {

    const dispatch = useDispatch();
    const lightModeOn = useSelector(state => state.Home.lightModeOn);
    const tva = useSelector(state => state.KantoBizForm.tva);
    const isl_amount = useSelector(state => state.KantoBizForm.isl_amount);
    const ht_price = useSelector(state => state.KantoBizForm.ht_price);
    const travel_expenses = useSelector(state => state.KantobizSearch.service_to_show.travel_expenses);
    const total_amount = useSelector(state => state.KantoBizForm.total_amount);

    const isMounted = useRef(false);
    const [tmpTE, setTmpTE] = useState(0);
    const [passed, setPassed] = useState(false);

    const changeTravelExpenses = (value) => {
        setTmpTE(value)
        dispatch(addTotalAmount(tva + isl_amount + ht_price + value));
    }

    useEffect(() => {

        if (!passed) {
            setPassed(true)
            if (travel_expenses.from && travel_expenses.to) {
                let tmp = (travel_expenses.from + travel_expenses.to) / 2
                setTmpTE(tmp)
                dispatch(addTotalAmount(tva + isl_amount + ht_price + tmp));
            } else {
                setTmpTE(travel_expenses.from)
                dispatch(addTotalAmount(tva + isl_amount + ht_price + travel_expenses.from));
            }
        }

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [total_amount]);

    return (
        <div className="mb-4 p-1 rounded"
             style={lightModeOn ? {border: "dashed 1px black"} : {border: "dashed 1px white"}}>
            <h2 className="text-red border-bottom">Details de la reservations</h2>

            <h4 className="col">
                <small className={lightModeOn ? "text-dark" : "text-light"}>
                    Prix HT :
                </small>&nbsp;{ht_price}€&nbsp;
                <i className="icon text-red icon-info" data-tip="Ceci est le prix HT"/>
            </h4>

            <h4 className="col">
                <small className={lightModeOn ? "text-dark" : "text-light"}>
                    Tva (20%):
                </small>&nbsp;{tva}€&nbsp;
                <i className="icon text-red icon-info" data-tip="Ceci est le tva du prix HT"/>
            </h4>

            <h4 className="col">
                <small className={lightModeOn ? "text-dark" : "text-light"}>
                    Service (20%):
                </small>&nbsp;{isl_amount}€&nbsp;
                <i className="icon text-red icon-info" data-tip="Ceci est le frais de service"/>
            </h4>

            <h5 className="col mt-2 pt-2 pb-2 border-top">
                <span className={lightModeOn ? "text-dark bolder" : "text-light bolder"}>
                    Frais de transport <br/>
                    {!travel_expenses.from
                        ? <span className="text-red">Gratuit</span>
                        : <div>
                            {travel_expenses.from && travel_expenses.to
                                ? <div className="mt-3">
                                    <InputRange minValue={travel_expenses.from}
                                                formatLabel={value => `${value}€`}
                                                maxValue={travel_expenses.to}
                                                value={tmpTE}
                                                onChange={value => changeTravelExpenses(value)}/>
                                </div>
                                : <span className="text-red">{travel_expenses.from}€</span>
                            }
                        </div>
                    }
                </span>
            </h5>

            <h4 className="col mt-4 border-top">
                <small className={lightModeOn ? "text-dark" : "text-light"}>
                    Prix TTC:
                </small>&nbsp;{total_amount}€&nbsp;
                <i className="icon text-red icon-info" data-tip="Ceci est le prix TTC"/>
            </h4>
        </div>
    );
}

export default ReservationPricingDetails;
