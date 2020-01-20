import * as Tools from "../FunctionTools/Tools";

export const RegisterValidation = (password, confirm_password) => {
    return () => {
        if (password.length < 8)
            return {"error": true, message: "mot de passe trop court"};
        if (password !== confirm_password)
            return {"error": true, message: "mot de passe different"};
        return {"error": false}
    };
};

export const checkErrorMessage = (error) => {
    return () => {
        try {
            if (error.response.data.email) {
                return {"error": true, message: error.response.data.email[0]}
            } else {
                let response = JSON.stringify(error.response.data);
                return {"error": true, message: response.replace(/"/g, '')}
            }
        } catch (e) {
            return {"error": true, message: "Internal Error"}
        }
    };
};

export const validatorSearch = (state) => {
    return () => {
        if (!state.city)
            return {"error": true, message: "veuillez choisir une ville"};
        if (!state.thematics)
            return {"error": true, message: "veuillez choisir la thematique"};
        if (!state.events)
            return {"error": true, message: "le nom de votre evenements"};
        if (parseInt(Tools.formatDate(state.startDate)) === parseInt(Tools.formatDate(new Date())))
            return {"error": true, message: "veuillez choisir une date"};
        return {"error": false}
    };
};
