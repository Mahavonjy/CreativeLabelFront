import axios from "axios";
import React from "react";
import {FacebookProvider, Feed} from "react-facebook";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";
import Conf from "../../config/tsconfig";
import HomeRoot from "../home/homeRoot";
import OtherProfile from "../profile/otherProfile";
import * as Validators from "../validators/validatiors";
import {
    activeSteps,
    completed,
    addAllUserOptions,
    addAllUserPrestation,
    addCarts,
    addDescriptionOfService,
    addEventSelected,
    addNumberOfArtist,
    addOptionSelected,
    addOthersCityOfService,
    addPaymentAccepted,
    addPaymentRefunded,
    addPicturesOfService,
    addPreparationTime,
    addPriceOfService,
    addReferenceOfCity,
    addServiceCountry,
    addServiceRefundPolicy,
    addServiceTime,
    addStepsIndex,
    addTitleOfService,
    addTotalPrice,
    addTravelExpenses,
    addUnitTimeOfPreparation,
    addUnitTimeOfService,
    addUserId,
    changeStatusOfService
} from "./functionProps";
import $ from "jquery";
import 'jquery-mask-plugin';
import {makeStyles} from "@material-ui/core/styles";


export const funcToSpecifyValueForSpecialInput = (country_allowed, setTo) => {
    let tmp = [];
    Promise.all(country_allowed.map(element => {
        let cityTmp = [];
        for (let index in element["value"]) {
            let tmpName = element["value"][index];
            cityTmp.push({value: tmpName, label: tmpName, index: index})
        }
        tmp.push({value: element["name"], label: element["name"], city: cityTmp});
        return true
    })).then(() => setTo(tmp));
};

export const changeFields = (setState, e, up_props, dispatch, key, props) => {
    let value = e.target.value;
    setState(value);
    if (up_props && dispatch) {
        if (key && props) {
            props[key] = value;
            dispatch(up_props(props))
        } else dispatch(up_props(value))
    }
};

export const inputControl = () => {
    $(".form").find(".cd-numbers").find(".fields").find("input").on('keyup change', function (e) {

        $(".cardCredit").removeClass("flip");

        $(this).mask('0000 0000 0000 0000');

        if ($(this).hasClass("1")) {
            let inputVal = $(this).val();
            if (!inputVal.length == 0) {
                $(".cardCredit").find(".front").find(".cd-number").find("span.num-1").text(inputVal);
            } else {
                $(".cardCredit").find(".front").find(".cd-number").find("span.num-1").text("#### #### #### ####");
            }
        }

    });
    $(".form").find(".cd-holder").find("input").on('keyup change', function (e) {
        let inputValCdHolder = $(this).val();

        $(".cardCredit").removeClass("flip");
        if (!inputValCdHolder.length == 0 && inputValCdHolder.length < 19) {
            $(".cardCredit").find(".front").find(".bottom").find(".cardholder").find("span.holder").text(inputValCdHolder);
        }

        switch(inputValCdHolder.length) {
            case 0:
                $(".cardCredit").find(".front").find(".bottom").find(".cardholder").find("span.holder").text("Nom et prénom");
                break;
            case 18:
                $(".cardCredit").find(".front").find(".bottom").find(".cardholder").find("span.holder").append("...");
        }
    });
    $(".form").find(".cd-validate").find(".cvc").find('input').on('keyup change', function (e) {
        let inputCvcVal = $(this).val();
        if (!inputCvcVal.length == 0) {
            $(".cardCredit").addClass("flip").find(".cvc").find("p").text(inputCvcVal);
        } else if (inputCvcVal.length === 0) {
            $(".cardCredit").removeClass("flip");
        }
    });
    $(".form").find(".cd-validate").find(".expiration").find('select#month').on('keyup change', function () {

        $(".cardCredit").removeClass("flip");
        if (!$(this).val().length == 0) {
            $(".cardCredit").find('.bottom').find('.expires').find("span").find("span.month").text($(this).val())
        }

    });
    $(".form").find(".cd-validate").find(".expiration").find('select#year').on('keyup change', function () {

        $(".cardCredit").removeClass("flip");
        if (!$(this).val().length == 0) {
            $(".cardCredit").find('.bottom').find('.expires').find("span").find("span.year").text($(this).val())
        }

    });
};

export const FillInCartProps = (headers, props) => {
    axios.get("api/carts/MyCart", {headers: headers}).then(resp => {
        let tmp = 0;
        let cart_length = resp.data.length;
        if (cart_length !== 0) {
            HomeRoot.IncrementCart(cart_length);
            for (let row in resp.data) tmp = tmp + resp.data[row]['price'];
            props.dispatch(props.addTotalPrice(Math.round(tmp * 100) / 100));
            props.dispatch(props.addCarts(resp.data));
        }
    }).catch(err => {
        console.log(err)
    });
};

export const AddToCart = async (song_id, price, licenses_name, beat, props, dispatch) => {
    const user_credentials = props.user_credentials;

    let data_global = {"song_id": song_id, "price": price, "licenses_name": licenses_name};
    if (user_credentials.token !== Conf.configs.TokenVisitor) {
        console.log(price);
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': user_credentials.token
        };
        return axios.post("api/carts/addToCart", data_global, {headers: headers}).then(() => {
            let tmp_cart = props.carts;
            tmp_cart.push({
                "media": {
                    "photo": beat["photo"],
                    "artist": beat["artist"],
                    "title": beat["title"]
                },
                "song_id": song_id,
                "price": price,
                "licenses_name": licenses_name
            });
            dispatch(props.addTotalPrice(Math.round((props.totalPrice + price) * 100) / 100));
            dispatch(props.addCarts(tmp_cart));
            HomeRoot.IncrementCart();
            toast.success("Ajout avec succès");
        }).catch(err => {
            try {
                if (err.response.data === "cart existing")
                    toast.error("Vous l'avez déja");
                else toast.error(err.response.data)
            } catch (e) {
                console.log(err.response)
            }
        })
    } else {
        const carts = JSON.parse(localStorage.getItem("MyCarts"));
        if (!carts) {
            let data = [{
                "media": {
                    "photo": beat["photo"],
                    "artist": beat["artist"],
                    "title": beat["title"]
                },
                "song_id": song_id,
                "price": price,
                "licenses_name": licenses_name
            }];
            localStorage.setItem("MyCarts", JSON.stringify(data));
            HomeRoot.IncrementCart();
            dispatch(addCarts(data));
            dispatch(addTotalPrice(price));
            toast.success("Ajout avec succès");
        } else {
            const cart_S = carts.some(item => item.song_id === song_id);
            if (!cart_S) {
                await localStorage.removeItem("MyCarts");
                let data = {
                    "media": {
                        "photo": beat["photo"],
                        "artist": beat["artist"],
                        "title": beat["title"]
                    },
                    "song_id": song_id,
                    "price": price,
                    "licenses_name": licenses_name
                };
                await carts.push(data);
                await localStorage.setItem("MyCarts", JSON.stringify(carts));
                await HomeRoot.IncrementCart();
                await dispatch(addCarts(carts));
                await dispatch(addTotalPrice(Math.round((props.totalPrice + price) * 100) / 100));
                toast.success("Ajout avec succès");
            } else {
                toast.warn("Vous l'avez déja");
            }
        }
    }
};

export const LikeOrFollow = (LikeOrFollow, id, user_credentials) => {
    if (user_credentials.token === Conf.configs.TokenVisitor) {
        document.getElementById("LoginRequire").click();
    } else {
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': user_credentials.token
        };
        if (LikeOrFollow === "like") {
            axios.post("api/medias/admire/" + id, {}, {headers: headers}).then(() => {
                toast.success("liked")
            }).catch(() => {
                toast.warn("already liked")
            });
        } else if (LikeOrFollow === "follow") {
            axios.post("api/admiration/admire_user/" + id, {}, {headers: headers}).then(() => {
                toast.success("followed");
                OtherProfile.UpdateStateFollowed();
            }).catch(() => {
                toast.warn("already followed");
            });
        }
        ;
    }
};

//stepper function
export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export const getSteps = () => {
    return ['Réservez le prestataire', 'Information personnelle', 'Carte de crédit'];
}

export const totalSteps = () => {
    return getSteps().length;
};

export const completedSteps = (completed) => {
    return completed.size;
};

export const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
};

export const isLastStep = (activeStep) => {
    return activeStep === totalSteps() - 1;
};

export const handleNext = (steps, activeStep, completed, dispatch) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const newActiveStep =
        isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed
              // find the first step that has been completed
            steps.findIndex((step, i) => !completed.has(i))
            : activeStep + 1;
    console.log(newActiveStep)
    dispatch(activeSteps(newActiveStep))
};

export const handleStep = (step, dispatch) => () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    dispatch(activeSteps(step))
};

export const isNumber = (number_) => {
    let _tmp = false;
    for (let r in number_) {
        let r_ = parseInt(number_[r]);
        if (isNaN(r_))
            _tmp = true
    }
    if (_tmp)
        return false;
    let tmp_ = number_.split(/[.,_/ -]/);
    if (tmp_.length > 1)
        return false;
    let tmp = parseInt(number_);
    return tmp === parseInt(tmp, 10);
};

export const formatDate = (date) => {
    let day = date.getDate();
    let monthIndex = date.getMonth() + 1;
    let year = date.getFullYear();
    return monthIndex + '/' + day + '/' + year;
};

export const addSpecialDateToData = (tmp_data, selectedMonth, selectedDay, selectedYear, index, date_key) => {
    let key = !date_key ? selectedMonth + "/" + selectedDay + "/" + selectedYear : date_key;

    function addToSpecialIndex(i) {
        let tmp = {...tmp_data[i]};
        if (!tmp_data[i]["special_dates"][key]) {
            delete tmp["special_dates"];
            tmp = deleteInObject(tmp);
            tmp["materials"] = deleteInObject(tmp["materials"]);
            tmp_data[i]["special_dates"][key] = tmp;
        }
    }

    if (index) addToSpecialIndex(index);
    else for (let r in tmp_data) addToSpecialIndex(r);
};

export const checkIfHidden = (value, idPrestation) => {
    let tmp = false;
    for (let index in value)
        if (value[index] === idPrestation)
            tmp = true;
    return tmp;
};

export const changeBoolFields = (setState, e, up_props) => {
    let value = e.target.value;
    if (value === true || value === "true") setState(false);
    else setState(true);
    if (up_props) up_props(!value)
};

export const changeFileFields = (setState, e) => {
    setState(e.target.files[0]);
};

export const checkValueOfUnit = (val) => {
    if (val["day"])
        return "j";
    else if (val['hours'])
        return "h";
    else if (val['min'])
        return "m";
    return "s";
};

export const calculateNumberDaysBetweenDates = (date1, date2) => {
    return (date1 - date2) / (1000 * 3600 * 24)
};

export const checkValueIfExistInArray = (val, array_) => {
    let response = false;
    Promise.all(array_.map(val_of_arr => {
        if (val_of_arr === val) response = true;
        return true
    })).then(r => null);
    return response
};

export const ChangeDate = (date, setStartDate, dispatch, func) => {
    let new_date = new Date(date);
    if (new Date() < new_date) {
        setStartDate(new_date);
        if (dispatch && func)
            dispatch(func(new_date))
    }
};

export const getMediaLink = (setState, state, medias, up_props, dispatch) => {
    let all_call_api = [];
    let headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"};
    for (let index in medias) {
        setState(state => [...state, {index: true}]);
        all_call_api.push(
            axios.get("api/medias/Streaming/" + medias[index]['id'], {headers: headers}).then(response => {
                dispatch(up_props({"index": index, "link": response.data}));
            }).catch(error => {
                console.log(error);
            })
        )
    }
    return Promise.all(all_call_api).then(() => null)
};

export const compareArrays = (first_array, second_array) => {
    return JSON.stringify(first_array) === JSON.stringify(second_array)
};

export const createOrUpdatePrestation = async (_props, dispatch, props, update) => {
    let secure = false;
    for (let row in _props.allPrestation) {
        if (_props.allPrestation[row]["id"] !== props.service_id) {
            if (_props.allPrestation[row]['title'] === props.PropsTitle
                && _props.allPrestation[row]['reference_city'] === props.PropsCityReference
            ) {
                secure = true;
            } else if (
                _props.allPrestation[row]['title'] === props.PropsTitle
                && compareArrays(_props.allPrestation[row]['events'], props.props_events_selected)
            ) {
                secure = true;
            }
        }
    }
    if (secure)
        return {"error": true, message: null};
    let tmp_prestation = {};

    if (update) {
        tmp_prestation['user_id'] = props.user_id;
        tmp_prestation['materials_id'] = props.materials_id;
    }
    tmp_prestation['special_dates'] = {};
    tmp_prestation['title'] = props.PropsTitle;
    tmp_prestation['country'] = props.PropsCountry;
    tmp_prestation['reference_city'] = props.PropsCityReference;
    tmp_prestation['others_city'] = props.PropsOthersCity;
    tmp_prestation['description'] = props.PropsDescription;
    tmp_prestation['refund_policy'] = props.refund_policy;
    tmp_prestation['events'] = props.props_events_selected;
    tmp_prestation['price'] = props.props_price_of_service;
    tmp_prestation['travel_expenses'] = props.travel_expenses || 0.0;
    tmp_prestation['preparation_time'] = props.props_preparation_time;
    tmp_prestation['number_of_artists'] = props.props_number_of_artist;
    tmp_prestation['duration_of_the_service'] = props.props_service_time;
    tmp_prestation['thematics'] = props.props_thematics_options_selected;
    tmp_prestation['unit_of_the_preparation_time'] = checkUnit(props.props_unit_time_of_preparation);
    tmp_prestation['unit_duration_of_the_service'] = checkUnit(props.props_unit_time_of_service);

    let response = {};
    if (!update) {
        await axios.post("api/artist_services/newService",
            objectToFormData(tmp_prestation, props.PropsFiles),
            {headers: _props.headers}).then((resp) => {
            let tmp = _props.allPrestation;
            tmp.push(resp.data);
            _props.setAllPrestation(tmp);
            dispatch(addAllUserPrestation(tmp));
            _props.setAddNewPrestation(false);
            _props.close();
            resetPropsForm(dispatch);
            response = {"error": false, message: null}
        }).catch((error) => {
            response = {"error": true, message: Validators.checkErrorMessage(error).message}
        });
    } else {
        await axios.put("api/artist_services/update/" + props.service_id,
            objectToFormData(tmp_prestation, props.PropsFiles),
            {headers: _props.headers}).then((resp) => {
            let tmp = [..._props.allPrestation];
            tmp[tmp.findIndex(tmp => tmp.id === props.service_id)] = resp.data;
            _props.setAllPrestation(tmp);
            resetPropsForm(dispatch);
            dispatch(addAllUserPrestation(tmp));
            response = {"error": false, message: null}
        }).catch((error) => {
            response = {"error": true, message: Validators.checkErrorMessage(error).message}
        });
    }
    return response;
};

export const checkUnitKey = (val, opt) => {
    if (val === "min")
        if (opt)
            return {"day": false, "hours": false, "min": true, "sec": false};
        else return "m";
    else if (val === "day")
        if (opt)
            return {"day": true, "hours": false, "min": false, "sec": false};
        else return "j";
    else if (val === "sec")
        if (opt)
            return {"day": false, "hours": false, "min": false, "sec": true};
        else return "s";
    if (opt)
        return {"day": false, "hours": true, "min": false, "sec": false};
    return "h";
};

export const checkUnit = (object) => {

    return Object.keys(object).filter(function (key) {
        return object[key]
    })[0]
};

export const checkKeyOfValue = (object, value) => {

    /* eslint-disable-next-line array-callback-return */
    return Object.keys(object).filter(function (key) {
        if (object[key] === value)
            return key;
    })[0]
};

export const generateBodyFormOfGallery = (bodyFormData, PropsFiles) => {
    let galleries = [];
    for (let row in PropsFiles) {
        if (PropsFiles[row]['file'])
            bodyFormData.append('gallery_' + row, PropsFiles[row]['file']);
        if (typeof PropsFiles[row] === "string")
            galleries.push(PropsFiles[row])
    }
    if (galleries.length !== 0)
        bodyFormData.append('galleries', JSON.stringify(galleries));
};

export const objectToFormData = (object, PropsFiles) => {
    let bodyFormData = new FormData();

    for (let property in object) {
        if (object.hasOwnProperty(property)) {
            if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
                if (object[property] && property !== 'materials')
                    bodyFormData.append(property, JSON.stringify(object[property]));
            } else
                bodyFormData.append(property, object[property]);
        }
    }
    if (PropsFiles)
        generateBodyFormOfGallery(bodyFormData, PropsFiles);
    return bodyFormData;
};

export const resetPropsForm = (dispatch) => {
    dispatch(addUserId(null));
    dispatch(addStepsIndex(0));
    dispatch(addOptionSelected([]));
    dispatch(addTitleOfService(''));
    dispatch(addServiceCountry(''));
    dispatch(addReferenceOfCity(''));
    dispatch(addOthersCityOfService([]));
    dispatch(addDescriptionOfService(''));
    dispatch(addPicturesOfService([]));
    dispatch(changeStatusOfService(null));
    dispatch(addTravelExpenses(0.0));
    dispatch(addEventSelected([]));
    dispatch(addServiceTime(0.0));
    dispatch(addPriceOfService(0.0));
    dispatch(addPreparationTime(0.0));
    dispatch(addNumberOfArtist(1));
    dispatch(addNumberOfArtist(1));
    dispatch(addServiceRefundPolicy(""));
    dispatch(addUnitTimeOfPreparation({"day": false, "hours": false, "min": false, "sec": false}));
    dispatch(addUnitTimeOfService({"day": false, "hours": false, "min": false, "sec": false}));
};

export const deleteInObject = (object, special_key) => {

    try {
        delete object['id'];
    } catch (e) {
        //
    }

    try {
        delete object['created_at'];
    } catch (e) {
        //
    }

    try {
        delete object['modified_at'];
    } catch (e) {
        //
    }

    if (special_key) {
        for (let row in special_key) {
            try {
                delete object[special_key[row]];
            } catch (e) {
                //
            }
        }
    }
    return object
};

export const updateAllOptions = (optionToUpdate, dispatch, headers) => {
    let tmp_call = [];
    let tmpAllOptions = [...optionToUpdate];
    for (let row in tmpAllOptions) {
        let tmpOption = {...tmpAllOptions[row]};
        let option_id = tmpOption['id'];
        tmpOption = deleteInObject(tmpOption, ["materials"]);
        tmp_call.push(
            axios.put('api/options/update/' + option_id, tmpOption,
                {headers: headers}).then((resp) => {
                tmpAllOptions[row] = resp.data;
                dispatch(addAllUserOptions(tmpAllOptions));
            })
        )
    }
    Promise.all(tmp_call).then(() => null)
};

export const updateAllServices = (prestations, dispatch, headers) => {
    let api_call_update = [];
    let tmpPrestations = [...prestations];
    for (let index in tmpPrestations) {
        let prestation_id = tmpPrestations[index]["id"];
        let prestation_selected = deleteInObject(tmpPrestations[index]);
        api_call_update.push(
            axios.put('api/artist_services/update/' + prestation_id,
                objectToFormData(prestation_selected),
                {headers: headers}).then((resp) => {
                tmpPrestations[index] = resp.data;
                dispatch(addAllUserPrestation(tmpPrestations));
            })
        )
    }
    Promise.all(api_call_update).then(() => null)
};

export const onChangeListWithValueLabel = (setState, obj, dispatch, func) => {
    let value;
    try {
        value = obj.target.value;
    } catch (e) {
        value = obj.value;
    } finally {
        setState(value);
        (func && dispatch) && dispatch(func(value))
    }
};

export const shuffleArray = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

export const dispatchPayment = (payment_history, dispatch) => {
    let tmpPaid = [];
    let tmpRefund = [];
    Promise.all(payment_history.map(element => {
        if (element["paid"]) tmpPaid.push(element);
        if (element["refund"]) tmpRefund.push(element);
        return true
    })).then(() => {
        dispatch(addPaymentRefunded(tmpRefund));
        dispatch(addPaymentAccepted(tmpPaid));
    });
};

export const checkOnClickAwaySideBar = (e) => {
    if (e.target.className !== "paper-nav-toggle pp-nav-toggle ml-4" && HomeRoot.checkOpenSideBar)
        document.getElementsByClassName("paper-nav-toggle pp-nav-toggle ml-4")[0].click()
};

export const generatePagination = (_array, funcToDisplay) => {
    return _array.map((val, index) => ({
        id: (index + 1), name:
            <div key={index}>
                <ReactTooltip/>
                <div className="o-card_container m-2">
                    <div className="o-card bg-white">
                        <div className="o-card_header">
                            <div className="o-card_headerHeroImg"
                                 style={{
                                     background:
                                         'url(https://zupimages.net/up/19/42/zyu8.bmp) center no-repeat'
                                 }}/>
                            <ul className="o-card-headerList isOpen">
                                <li className="o-card-headerList--item">
                                    <a className="o-card-headerList--link" href="/#">
                                        <FacebookProvider appId={Conf.configs.FacebookId} debug>
                                            <Feed link={"http://" + window.location.host + "/kantoBiz"}>
                                                {({handleClick}) => (
                                                    <i className="icon-facebook"
                                                       onClick={handleClick}
                                                       data-tip="Partager Cette Prestation sur facebook"/>
                                                )}
                                            </Feed>
                                        </FacebookProvider>
                                    </a>
                                </li>
                            </ul>
                            <div className="o-card_logo"
                                 style={{background: 'url(' + val.galleries[0] + ') center no-repeat'}}
                            />
                        </div>
                        <div className="o-card_body">
                            <h2 className="o-card_title text-black">{val.price}<i className="icon icon-euro text-red"/>
                            </h2>
                            <h3 className="o-card_subTitle text-black">
                                {val.title}&nbsp;-&nbsp;5<i className="icon text-red icon-star"/>
                            </h3>
                            <h3 className="o-card_subTitle text-black">
                                <small className="text-black bolder">
                                    {val.reference_city},&nbsp;
                                    {val.others_city.map((val, index) => <small key={index}>{val}, </small>)}
                                </small>
                            </h3>
                            <h3 className="o-card_subTitle text-black">
                                <small className="text-black bolder">
                                    {val.thematics.map((val, index) => <small key={index}>{val}, </small>)}
                                </small>
                            </h3>
                            <p className="o-card_paragraph text-black">{val.description}</p>
                        </div>
                        <div className="p-2">
                            <button className="btn col btn-outline-dark pl-5 pr-5 pb-3"
                                    onClick={() => funcToDisplay(val)}>
                                <i className="icon-man-left mr-2 s-18"/>
                                RESERVER
                                <i className="icon-man-right ml-2 s-18"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    }));
};
