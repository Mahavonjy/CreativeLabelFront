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
                color: 'black',


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

export const defaultMaterialThemePrestation = createMuiTheme({
    palette: {
        primary: red,
    },
    overrides: {
        MuiPickersStaticWrapper: {
            staticWrapperRoot: {
                border: '0px solid red',
                borderRadius: '10px',
                boxShadow: '0 6px 8px rgba(50, 50, 93, 0.11), 0 10px 12px rgba(50, 50, 93, 0.11), 0 10px 12px rgba(50, 50, 93, 0.11), 0 10px 12px rgba(50, 50, 93, 0.11)'
            }
        },
        MuiPickersBasePicker: {
            pickerView: {
                maxWidth: '730px',
            }

        },
        MuiPickersDay: {
            day: {
                width: '38px',
                height: '38px',
                margin: '15px 28px',
                backgroundColor: 'greenyellow'
            }
        },
        MuiPickersCalendar:{
            transitionContainer: {
                marginTop: '12px',
                minHeight: '400px'
            }
        },
        MuiPickerYearsSelection:{
            container:{
                minHeight: '400px'
            }
        },
        MuiPickersCalendarHeader: {
            dayLabel: {
                width: '90px',
                color: 'red'
            }
        },
        MuiSvgIcon: {
            root: {
                color: 'red'
            }
        },
        MuiTypography: {
            root: {
                color: 'red'
            }
        }
    }
});

export const defaultThemeDark = createMuiTheme({
    palette: {
        primary: red,
    },
    overrides: {
        MuiPickersCalendarHeader: {
            dayLabel: {
                color: 'red'
            }
        },
        MuiSvgIcon: {
            root: {
                color: 'red'
            }
        },
        MuiTypography: {
            root: {
                color: 'red'
            }
        },
        MuiFormControl: {
            root: {
                borderBottom: '2px solid red',
                '&.focus': {
                    borderBottom:'2px solid red'
                }
            }
        },
        MuiInput: {
            input: {
                color: 'white'
            }
        }
    }
});

export const defaultThemeLight = createMuiTheme({
    palette: {
        primary: red,
    },
    overrides: {
        MuiPickersCalendarHeader: {
            dayLabel: {
                color: 'red'
            }
        },
        MuiSvgIcon: {
            root: {
                color: 'grey'
            }
        },
        MuiTypography: {
            root: {
                color: 'red'
            }
        },
        MuiFormControl: {
            root: {
                borderBottom: '2px solid grey',
                '&.focus': {
                    borderBottom:'2px solid red'
                }
            }
        },
        MuiInput: {
            input: {
                color: 'grey'
            }
        }
    }
});

export const defaultResultTheme = createMuiTheme({
    overrides: {
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
        },
        MuiInputLabel: {
            root: {
                color: "white"
            }
        }
    },
    palette: {
        primary: red
    }

});

export const defaultEventTheme = createMuiTheme({
    overrides: {
        MuiNativeSelect: {
            select: {
                color: 'white',
                textDecoration: 'black',
            },
            root: {
                borderBottom: '2px solid red',
                '&.focus': {
                    borderButtom: '2px solid white'
                },
                textDecoration:'white'
            },
            input: {
                color: 'white',


            },
            icon: {
                color: 'white',
            }
        },
        MuiInputLabel:{
            root:{
                color:"white"
            }
        }
    },
    palette:{
        primary:red
    }

});

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
