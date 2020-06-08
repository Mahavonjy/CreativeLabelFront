import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// core components

const hexToRgb = input => {
    input = input + "";
    input = input.replace("#", "");
    let hexRegex = /[0-9A-Fa-f]/g;
    if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
      throw new Error("input is not a valid hex color.");
    }
    if (input.length === 3) {
      let first = input[0];
      let second = input[1];
      let last = input[2];
      input = first + first + second + second + last + last;
    }
    input = input.toUpperCase(input);
    let first = input[0] + input[1];
    let second = input[2] + input[3];
    let last = input[4] + input[5];
    return (
      parseInt(first, 16) +
      ", " +
      parseInt(second, 16) +
      ", " +
      parseInt(last, 16)
    );
  };

  const whiteColor = "#FFF";

const TabsStyle = {
    cardTitle: {
        float: "left",
        padding: "10px 10px 10px 0px",
        lineHeight: "24px"
    },
    cardTitleRTL: {
        float: "right",
        padding: "10px 0px 10px 10px !important"
    },
    displayNone: {
        display: "none !important"
    },
    tabsRoot: {
        minHeight: "unset !important",
        overflowX: "visible",
        "& $tabRootButton": {
            fontSize: "0.875rem"
        }
    },
    tabRootButton: {
        minHeight: "unset !important",
        minWidth: "unset !important",
        width: "unset !important",
        height: "unset !important",
        maxWidth: "unset !important",
        maxHeight: "unset !important",
        padding: "10px 10px",
        borderRadius: "5px",
        lineHeight: "24px",
        border: "0 !important",
        color: whiteColor + " !important",
        marginLeft: "280px",
        "&:last-child": {
            marginLeft: "40px"
        }
    },
    tabSelected: {
        backgroundColor: "rgba(" + hexToRgb(whiteColor) + ", 0.2)",
        transition: "0.2s background-color 0.1s"
    },
    tabWrapper: {
        display: "inline-block",
        minHeight: "unset !important",
        minWidth: "unset !important",
        width: "unset !important",
        height: "unset !important",
        maxWidth: "unset !important",
        maxHeight: "unset !important",
        fontWeight: "500",
        fontSize: "12px",
        marginTop: "1px",
        "& > svg,& > .material-icons": {
            verticalAlign: "middle",
            margin: "-1px 5px 0 0 !important"
        }
    }
};

const useStyles = makeStyles(TabsStyle);

export default function KantoTabs(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, value) => {
        setValue(value);
    };
    const classes = useStyles();
    const { headerColor, plainTabs, tabs, title, rtlActive } = props;
    const cardTitle = classNames({
        [classes.cardTitle]: true,
        [classes.cardTitleRTL]: rtlActive
    });
    return (
        <div plain={plainTabs}>
            <div color={headerColor} plain={plainTabs}>
                {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    classes={{
                        root: classes.tabsRoot,
                        indicator: classes.displayNone,
                        scrollButtons: classes.displayNone
                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {tabs.map((prop, key) => {
                        var icon = {};
                        if (prop.tabIcon) {
                            icon = {
                                icon: <prop.tabIcon />
                            };
                        }
                        return (
                            <Tab
                                classes={{
                                    root: classes.tabRootButton,
                                    selected: classes.tabSelected,
                                    wrapper: classes.tabWrapper
                                }}
                                key={key}
                                label={prop.tabName}
                                {...icon}
                            />
                        );
                    })}
                </Tabs>
            </div>
            <div>
                {tabs.map((prop, key) => {
                    if (key === value) {
                        return <div key={key}>{prop.tabContent}</div>;
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

KantoTabs.propTypes = {
    headerColor: PropTypes.oneOf([
        "warning",
        "success",
        "danger",
        "info",
        "primary",
        "rose"
    ]),
    title: PropTypes.string,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            tabName: PropTypes.node.isRequired,
            tabIcon: PropTypes.object,
            tabContent: PropTypes.node.isRequired
        })
    ),
    rtlActive: PropTypes.bool,
    plainTabs: PropTypes.bool
};
