import {checkKeyOfValue, formatDate} from "../functionTools/tools";

export const countryRegex = {
    AL:"Albania",
    AD:"Andorra",
    AT:"Austria",
    AZ:"Azerbaijan",
    BH:"Bahrain",
    BY:"Belarus",
    BE:"Belgium",
    BA:"Bosnia And Herzegovina",
    BR:"Brazil",
    BG:"Bulgaria",
    CR:"Costa Rica",
    HR:"Croatia",
    CY:"Cyprus",
    CZ:"Czech Republic",
    DK:"Denmark",
    DO:"Dominican Republic",
    TL:"Timor-Leste",
    EE:"Estonia",
    FO:"Faroe Islands",
    FI:"Finland",
    FR:"France",
    GE:"Georgia",
    DE:"Germany",
    GI:"Gibraltar",
    GR:"Greece",
    GL:"Greenland",
    GT:"Guatemala",
    HU:"Hungary",
    IS:"Iceland",
    IE:"Ireland",
    IL:"Israel",
    IT:"Italy",
    JO:"Jordan",
    KZ:"Kazakhstan",
    KW:"Kuwait",
    LV:"Latvia",
    LB:"Lebanon",
    LI:"Liechtenstein",
    LT:"Lithuania",
    LU:"Luxembourg",
    MK:"Macedonia",
    MT:"Malta",
    MR:"Mauritania",
    MU:"Mauritius",
    MC:"Monaco",
    MD:"Moldova",
    ME:"Montenegro",
    NL:"Netherlands",
    NO:"Norway",
    PK:"Pakistan",
    PS:"Palestinian Territory, Occupied",
    PL:"Poland",
    PT:"Portugal",
    QA:"Qatar",
    RO:"Romania",
    SM:"San Marino",
    SA:"Saudi Arabia",
    RS:"Serbia",
    SK:"Slovakia",
    SI:"Slovenia",
    ES:"Spain",
    SE:"Sweden",
    CH:"Switzerland",
    TN:"Tunisia",
    TR:"Turkey",
    AE:"United Arab Emirates",
    GB:"United Kingdom",
    VA:"Holy See (Vatican City State)",
    VG:"Virgin Islands, British"
};

/* eslint-disable no-useless-escape */
export const allRegex = {
    'AL': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([a-zA-Z0-9]{4}\s?){4}\s?',
    'AD': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([a-zA-Z0-9]{4}\s?){3}\s?',
    'AT': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}\s?',
    'AZ': '[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){5}\s?',
    'BH': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{2})\s?',
    'BY': '[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){5}\s?',
    'BE': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}\s?',
    'BA': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}\s?',
    'BR': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}([0-9]{3})([a-zA-Z]{1}\s?)([a-zA-Z0-9]{1})\s?',
    'BG': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){1}([0-9]{2})([a-zA-Z0-9]{2}\s?)([a-zA-Z0-9]{4}\s?){1}([a-zA-Z0-9]{2})\s?',
    'CR': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{2})\s?',
    'HR': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{1})\s?',
    'CY': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([a-zA-Z0-9]{4}\s?){4}\s?',
    'CZ': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?',
    'DK': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{2})\s?',
    'DO': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){5}\s?',
    'TL': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{3})\s?',
    'EE': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}\s?',
    'FO': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{2})\s?',
    'FI': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{2})\s?',
    'FR': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([0-9]{2})([a-zA-Z0-9]{2}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{1})([0-9]{2})\s?',
    'GE': '[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{2})([0-9]{2}\s?)([0-9]{4}\s?){3}([0-9]{2})\s?',
    'DE': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{2})\s?',
    'GI': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{3})\s?',
    'GR': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{3})([a-zA-Z0-9]{1}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{3})\s?',
    'GL': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{2})\s?',
    'GT': '[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([a-zA-Z0-9]{4}\s?){5}\s?',
    'HU': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){6}\s?',
    'IS': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}([0-9]{2})\s?',
    'IE': '[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){3}([0-9]{2})\s?',
    'IL': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{3})\s?',
    'IT': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{1})([0-9]{3}\s?)([0-9]{4}\s?){1}([0-9]{3})([a-zA-Z0-9]{1}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{3})\s?',
    'JO': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){5}([0-9]{2})\s?',
    'KZ': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{2})\s?',
    'XK': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{4}\s?){2}([0-9]{2})([0-9]{2}\s?)\s?',
    'KW': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){5}([a-zA-Z0-9]{2})\s?',
    'LV': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{1})\s?',
    'LB': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([a-zA-Z0-9]{4}\s?){5}\s?',
    'LI': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{1})\s?',
    'LT': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}\s?',
    'LU': '[a-zA-Z0-9]{2}\s?([0-9]{3})([a-zA-Z0-9]{1}\s?)([a-zA-Z0-9]{4}\s?){3}\s?',
    'MK': '[a-zA-Z0-9]{2}\s?([0-9]{3})([a-zA-Z0-9]{1}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{1})([0-9]{2})\s?',
    'MT': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{3})\s?',
    'MR': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}([0-9]{3})\s?',
    'MU': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){4}([0-9]{3})([a-zA-Z]{1}\s?)([a-zA-Z]{2})\s?',
    'MC': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([0-9]{2})([a-zA-Z0-9]{2}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{1})([0-9]{2})\s?',
    'MD': '[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{2})([a-zA-Z0-9]{2}\s?)([a-zA-Z0-9]{4}\s?){4}\s?',
    'ME': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{2})\s?',
    'NL': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){2}([0-9]{2})\s?',
    'NO': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([0-9]{3})\s?',
    'PK': '[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){4}\s?',
    'PS': '[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){5}([0-9]{1})\s?',
    'PL': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){6}\s?',
    'PT': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}([0-9]{1})\s?',
    'QA': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){5}([a-zA-Z0-9]{1})\s?',
    'RO': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){4}\s?',
    'SM': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{1})([0-9]{3}\s?)([0-9]{4}\s?){1}([0-9]{3})([a-zA-Z0-9]{1}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{3})\s?',
    'SA': '[a-zA-Z0-9]{2}\s?([0-9]{2})([a-zA-Z0-9]{2}\s?)([a-zA-Z0-9]{4}\s?){4}\s?',
    'RS': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{2})\s?',
    'SK': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?',
    'SI': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{3})\s?',
    'ES': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?',
    'SE': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?',
    'CH': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{1})\s?',
    'TN': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?',
    'TR': '[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{2})\s?',
    'AE': '[a-zA-Z0-9]{2}\s?([0-9]{3})([0-9]{1}\s?)([0-9]{4}\s?){3}([0-9]{3})\s?',
    'GB': '[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){3}([0-9]{2})\s?',
    'VA': '[a-zA-Z0-9]{2}\s?([0-9]{3})([0-9]{1}\s?)([0-9]{4}\s?){3}([0-9]{2})\s?',
    'VG': '[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){4}\s?',
};

export const RegisterValidation = (password, confirm_password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.%^(;'\"\|`~,)?/!@#$&*]).{8,}$");
    if (!re.test(password))
        return {"error": true, message: "Votre Mot de passe devrait contenir au moins un Majuscule, Minuscule, Chiffre, Caractère est au moins 8"};
    if (password !== confirm_password)
        return {"error": true, message: "mot de passe different"};
    return {"error": false}
};

export const checkErrorMessage = (error) => {
    try {
        if (error.response.data.email) {
            return {"error": true, message: error.response.data.email[0]}
        } else {
            let response = JSON.stringify(error.response.data);
            return {"error": true, message: response.replace(/"/g, '')}
        }
    } catch (e) {
        return {"error": true, message: "Internal error"}
    }
};

export const validatorSearch = (thematics, startDate, country) => {
    if (!country)
        return {"error": true, message: "veuillez choisir pays"};
    if (thematics.length === 0)
        return {"error": true, message: "veuillez choisir la thematique"};
    if (formatDate(startDate) === formatDate(new Date()))
        return {"error": true, message: "veuillez choisir une autre date"};
    return {"error": false}
};

export const validatorBanking = (props, rules) => {
    if (!props.rules)
        return {"error": true, message: "Veuillez accepter les termes et conditions"};
    if (!props.lastname || !props.name)
        return {"error": true, message: "veuillez renseigner le prénom et le nom du proprietaire sur la carte"};
    if (!props.email)
        return {"error": true, message: "veuillez renseigner l'email du proprietaire de la carte"};
    if (!props.country)
        return {"error": true, message: "veuillez renseigner le pays du ou reeside la banque"};
    if (!props.iban)
        return {"error": true, message: "veuillez renseigner l'IBAN"};
    else {
        let re = new RegExp(allRegex[checkKeyOfValue(countryRegex, props.country)]);
        if (!re.test(props.iban))
            return {"error": true, message: "le format de votre iban n'est pas valide pour " + props.country};
    }
    if (!props.swift)
        return {"error": true, message: "veuillez renseigner le SWIFT"};
    else {
        let re = new RegExp('([a-zA-Z]{4})([a-zA-Z]{2})(([2-9a-zA-Z]{1})([0-9a-np-zA-NP-Z]{1}))((([0-9a-wy-zA-WY-Z]{1})([0-9a-zA-Z]{2}))|([xX]{3})|)');
        if (!re.test(props.swift))
            return {"error": true, message: "le format de votre BIC n'est pas valide"};
    }
    return {"error": false}
};
