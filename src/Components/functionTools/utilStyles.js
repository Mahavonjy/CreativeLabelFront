import red from "@material-ui/core/colors/red";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";

export const defaultMaterialTheme = createMuiTheme({
    overrides: {
        MuiNativeSelect: {
            select: {
                color: 'white',
                textDecoration: 'black',
            },
            root: {
                borderBottom:'2px solid red',
                '&.focus': {
                    borderBottom:'2px solid red'
                },
            },
            input: {
                color: 'white',


            },
            icon: {
                color: 'white',
            }
        },
        MuiInputLabel: {
            root: {
                color: "white"
            }
        },
        MuiSelect:{
            select: {
                color: 'white',
                textDecoration: 'black',
            },
            root: {
                borderBottom:'2px solid red',
                '&.focus': {
                    borderBottom:'2px solid red'
                },
            },
            input: {
                color: 'white',


            },
            icon: {
                color: 'white',
            }
        }
    },
    palette: {
        primary: red,
    }
});

export const defaultMaterialTheme1 = createMuiTheme({
    overrides: {
        MuiNativeSelect: {
            select: {
                color: 'black',
                textDecoration: 'black',
            },
            root: {
                borderBottom:'2px solid black',
                '&.focus': {
                    borderBottom:'2px solid black'
                },
            },
            input: {
                color: 'white',


            },
            icon: {
                color: 'black',
            }
        },
        MuiInputLabel: {
            root: {
                color: "black"
            }
        },
        MuiSelect:{
            select: {
                color: 'black',
                textDecoration: 'black',
            },
            root: {
                borderBottom:'2px solid black',
                '&.focus': {
                    borderBottom:'2px solid black'
                },
            },
            input: {
                color: 'white',


            },
            icon: {
                color: 'black',
            }
        }
    },
    palette: {
        primary: red,
    }
});

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing(3)

    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 140,
    },
    select: {
        color: 'white',
        textDecoration: 'black',
    },

    select2: {
        color: 'black',
        textDecoration: 'white',
    },
    root: {
        borderBottom: '2px solid red',
        '&.focus': {
            borderButtomColor: red
        },
    },
    root2: {
        borderBottom: '2px solid black'
    },
    input: {
        color: 'white',

    },
    input2: {
        color: 'black',

    },
    icon: {
        color: 'white',
    },
    icon2: {
        color: 'black',
    }

}));

export const ITEM_HEIGHT = 38;

export const ITEM_PADDING_TOP = 4;

export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
