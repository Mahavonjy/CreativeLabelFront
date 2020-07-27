import axios from "axios";
import {
    addAllUSerBookingReservation,
    addAllUserOptions,
    addAllUserPrestation,
    addAllUSerReservation,
    addCarts,
    addPaymentHistory,
    addTotalPrice,
    addUserNote,
    changeUserGenreSelected,
    profileInitialisationBanking,
    profileInitialisationCondition,
    profileInitialisationFollower,
    profileInitialisationFollowing,
    profileInitialisationInfo,
    profileInitialisationRole
} from "../functionTools/functionProps";
import {dispatchPayment, FillInCartProps, formatCreatedAt} from "../functionTools/tools";
import HomeRoot from "./homeRoot";

export const insertUserData = (data, dispatch) => {
    if (data)
        data['my_profile']['created_at'] = formatCreatedAt(data['my_profile']['created_at'])

    new Promise(resolve => {
        resolve(dispatch(addUserNote(data ? data['notes'] : '')));
        resolve(dispatch(addPaymentHistory(data ? data['payment_history'] : [])));
        resolve(dispatch(profileInitialisationInfo(data ? data['my_profile'] : '')));
        resolve(dispatch(profileInitialisationRole(data ? data['role'] : '')));
        resolve(dispatch(addAllUSerReservation(data ? data['reservations_list'] : [])));
        resolve(dispatch(addAllUSerBookingReservation(data ? data['reservations_booking_list'] : [])));
        resolve(dispatch(addAllUSerBookingReservation(data ? data['reservations_booking_list'] : [])));
        resolve(dispatch(profileInitialisationFollower(data ? data['my_followers'] : '')));
        resolve(dispatch(profileInitialisationFollowing(data ? data['my_followings'] : '')));
        resolve(dispatch(profileInitialisationCondition(data ? data['conditions'] : {})));
        resolve(dispatch(profileInitialisationBanking(data ? data['banking'] : {})));
    }).then(r => {
        if (!data) {
            dispatch(addAllUserOptions([]));
            dispatch(addAllUserPrestation([]));
        }
    });
}

export const fetchUserData = (headers, user_credentials, dispatch,) => {
    Promise.all([
        axios.get("api/profiles/my_profile", {headers: headers}).then(resp => {
            let payment_history = resp.data['payment_history'];
            dispatchPayment(payment_history, dispatch);
            insertUserData(resp.data, dispatch);
            // if (resp.data['role'] === "beatmaker") {
            //     Promise.all([
            //         axios.get("api/medias/all_user_songs_and_albums", {headers: headers}).then(resp => {
            //             dispatch(profileAddBeats(resp.data['beats']));
            //         }).catch(err => ifConnectionError(err, fetchUserData)),
            //         axios.get("api/beats/contract/user_artist_contract", {headers: headers}).then(resp => {
            //             dispatch(profileInitialisationContract(resp.data));
            //         }).catch(err => ifConnectionError(err, fetchUserData))
            //     ]).then();
            // }
            FillInCartProps(headers, {
                addTotalPrice: addTotalPrice,
                addCarts: addCarts,
                dispatch: dispatch,
                user_credentials: user_credentials
            }).then(() => null);
        }).catch(err => HomeRoot.ifConnectionError(err, fetchUserData)),
        // axios.get("api/beats/pricing", {headers: headers}).then(resp => {
        //     dispatch(beatsInitialisationPricing(resp.data));
        // }).catch(err => ifConnectionError(err)),
        axios.get("api/artist_services/my_services", {headers: headers}).then(resp => {
            dispatch(addAllUserOptions(resp.data['user_options']));
            dispatch(addAllUserPrestation(resp.data['user_services']));
        }).catch(err => HomeRoot.ifConnectionError(err))
    ]).then(() => {
        dispatch(changeUserGenreSelected());
        HomeRoot.notOnline()
    }).catch(() => fetchUserData())
}
