import React, { Component } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from "moment";
import '../style/Calendar.css'
import ReactTooltip from "react-tooltip";

class Calendar extends Component {
    state = {
        isMounted: false,
        selectedMonth: moment(),
        selectedDay: moment().startOf("day"),
        selectedMonthEvents: [],
        showEvents: false,
        noEdit: this.props.noEdit
    };

    previous = () => {
        const currentMonthView = this.state.selectedMonth;

        this.setState({
            selectedMonth: currentMonthView.subtract(1, "month")
        });
    };

    next = () => {
        const currentMonthView = this.state.selectedMonth;

        this.setState({
            selectedMonth: currentMonthView.add(1, "month")
        });
    };

    select = (day) => {
        this.setState({
            selectedMonth: day.date,
            selectedDay: day.date.clone(),
            showEvents: true
        });
    };

    goToCurrentMonthView = () => {
        this.setState({selectedMonth: moment()});
    };

    showCalendar = () => {
        this.setState({
            selectedMonth: this.state.selectedMonth,
            selectedDay: this.state.selectedDay,
            showEvents: false
        });
    };

    renderMonthLabel = () => {
        const currentMonthView = this.state.selectedMonth;
        return (
            <span className="box month-label">
                {currentMonthView.format("MMMM YYYY")}
            </span>
        );
    };

    renderDayLabel = () => {
        const currentSelectedDay = this.state.selectedDay;
        return (
            <span className="col box month-label">
                {currentSelectedDay.format("DD MMMM YYYY")}
            </span>
        );
    };

    renderTodayLabel = () => {
        return (
            <span className="box today-label" onClick={this.goToCurrentMonthView}>
                Today
            </span>
        );
    };

    renderWeeks = () => {
        const currentMonthView = this.state.selectedMonth;
        const currentSelectedDay = this.state.selectedDay;
        const monthEvents = this.state.selectedMonthEvents;

        let weeks = [];
        let done = false;
        let previousCurrentNextView = currentMonthView
            .clone()
            .startOf("month")
            .subtract(1, "d")
            .day("Monday");
        let count = 0;
        let monthIndex = previousCurrentNextView.month();

        while (!done) {
            weeks.push(this.Week(previousCurrentNextView.clone(), currentMonthView, currentSelectedDay, day => this.select(day), monthEvents));
            previousCurrentNextView.add(1, "w");
            done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
            monthIndex = previousCurrentNextView.month();
        }
        return weeks;
    };

    handleAdd = () => {
        const monthEvents = this.state.selectedMonthEvents;
        const currentSelectedDate = this.state.selectedDay;

        let newEvents = [];

        let eventTitle = prompt("Please enter a name for your event: ");

        switch (eventTitle) {
            case "":
                alert("Event name cannot be empty.");
                break;
            case null:
                alert("Changed your mind? You can add one later!");
                break;
            default:
                let newEvent = {
                    title: eventTitle,
                    date: currentSelectedDate,
                    dynamic: true
                };

                newEvents.push(newEvent);

                for (let i = 0; i < newEvents.length; i++) {
                    monthEvents.push(newEvents[i]);
                }

                this.setState({
                    selectedMonthEvents: monthEvents
                });
                break;
        }
    };

    addEvent = () => {
        const currentSelectedDate = this.state.selectedDay;
        let isAfterDay = moment().startOf("day").subtract(1, "d");

        if (currentSelectedDate.isAfter(isAfterDay)) {
            this.handleAdd();
        } else {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Are you sure you want to add an event in the past?")) {
                this.handleAdd();
            } else {
            } // end confirm past
        } //end is in the past
    };

    removeEvent(i) {
        const monthEvents = this.state.selectedMonthEvents.slice();
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to remove this event?")) {
            let index = i;

            if (index !== -1) {
                monthEvents.splice(index, 1);
            } else {
                alert("No events to remove on this day!");
            }

            this.setState({
                selectedMonthEvents: monthEvents
            });
        }
    }

    Events = (selectedMonth, selectedDay, selectedMonthEvents, removeEvent) => {
        const currentSelectedDay = selectedDay;
        const monthEvents = selectedMonthEvents;

        const monthEventsRendered = monthEvents.map((event, i) => {
            return (
                <div key={event.title} className="event-container" onClick={() => removeEvent(i)}>
                    <ReactCSSTransitionGroup
                        component="div"
                        className="animated-time"
                        transitionName="time"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        <div className="event-time event-attribute">
                            {event.date.format("HH:mm")}
                        </div>
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup
                        component="div"
                        className="animated-title"
                        transitionName="title"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        <div className="event-title event-attribute">{event.title}</div>
                    </ReactCSSTransitionGroup>
                </div>
            );
        });

        const dayEventsRendered = [];

        for (let i = 0; i < monthEventsRendered.length; i++) {
            if (monthEvents[i].date.isSame(currentSelectedDay, "day")) {
                dayEventsRendered.push(monthEventsRendered[i]);
            }
        }

        return (
            <div className="day-events">
                {dayEventsRendered}
            </div>
        );
    };

    DayNames = () => {
        return (
            <div className="row days-header">
                <span className="box day-name">Mon</span>
                <span className="box day-name">Tue</span>
                <span className="box day-name">Wed</span>
                <span className="box day-name">Thu</span>
                <span className="box day-name">Fri</span>
                <span className="box day-name">Sat</span>
                <span className="box day-name">Sun</span>
            </div>
        );
    };

    Week = (previousCurrentNextView, currentMonthView, selected, select, monthEvents) => {
        let days = [];
        let date = previousCurrentNextView;

        for (let i = 0; i < 7; i++) {
            let dayHasEvents = false;

            for (let j = 0; j < monthEvents.length; j++) {
                if (monthEvents[j].date.isSame(date, "day")) {
                    dayHasEvents = true;
                }
            }

            let day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === currentMonthView.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date,
                hasEvents: dayHasEvents
            };

            days.push(this.Day(day, selected, select));
            date = date.clone();
            date.add(1, "d");
        }
        return (
            <div className="row week">
                {days}
            </div>
        );
    };

    Day = (day, selected, select) => {
        return (
            <div className={
                "day" +
                (day.isToday ? " today" : "") +
                (day.isCurrentMonth ? "" : " different-month") +
                (day.date.isSame(selected) ? " selected" : "") +
                (day.hasEvents ? " has-events" : "")
            } onClick={!this.state.noEdit ? () => select(day): null}>
                <div className="day-number">{day.number}</div>
            </div>
        );
    };

    componentDidMount() {
        this.setState({ isMounted: true}, () => {
            const monthEvents = this.state.selectedMonthEvents;

            let allEvents = [];

            let event1 = {
                title: "Press the Add button and enter a name for your event. P.S you can delete me by pressing me!",
                date: moment(),
                dynamic: false
            };

            let event2 = {
                title: "Event 2 - Meeting",
                date: moment().startOf("day").subtract(2, "d").add(2, "h"),
                dynamic: false
            };

            let event3 = {
                title: "Event 3 - Cinema",
                date: moment().startOf("day").subtract(7, "d").add(18, "h"),
                dynamic: false
            };

            let event4 = {
                title: "Event 4 - Theater",
                date: moment().startOf("day").subtract(16, "d").add(20, "h"),
                dynamic: false
            };

            let event5 = {
                title: "Event 5 - Drinks",
                date: moment().startOf("day").subtract(2, "d").add(12, "h"),
                dynamic: false
            };

            let event6 = {
                title: "Event 6 - Diving",
                date: moment().startOf("day").subtract(2, "d").add(13, "h"),
                dynamic: false
            };

            let event7 = {
                title: "Event 7 - Tennis",
                date: moment().startOf("day").subtract(2, "d").add(14, "h"),
                dynamic: false
            };

            let event8 = {
                title: "Event 8 - Swimmming",
                date: moment().startOf("day").subtract(2, "d").add(17, "h"),
                dynamic: false
            };

            let event9 = {
                title: "Event 9 - Chilling",
                date: moment().startOf("day").subtract(2, "d").add(16, "h"),
                dynamic: false
            };

            let event10 = {
                title: "Hello World",
                date: moment().startOf("day").add(5, "h"),
                dynamic: false
            };

            allEvents.push(event1);
            allEvents.push(event2);
            allEvents.push(event3);
            allEvents.push(event4);
            allEvents.push(event5);
            allEvents.push(event6);
            allEvents.push(event7);
            allEvents.push(event8);
            allEvents.push(event9);
            allEvents.push(event10);

            for (let i = 0; i < allEvents.length; i++) {
                monthEvents.push(allEvents[i]);
            }

            this.setState({
                selectedMonthEvents: monthEvents
            });
        })
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        const showEvents = this.state.showEvents;

        return (
            <div className="calendar-rectangle">
                <ReactTooltip/>
                <div id="calendar-content" className="calendar-content">
                    {showEvents?
                        <section className="main-calendar">
                            <header className="calendar-header">
                                <div className="row justify-content-center pt-5">
                                    <i className="col icon icon-exit s-24 text-red" onClick={this.showCalendar}/>
                                    {this.renderDayLabel()}
                                    <i className="col icon icon-plus-circle s-24" onClick={this.addEvent}/>
                                </div>
                            </header>
                            {this.Events(this.state.selectedMonth, this.state.selectedDay, this.state.selectedMonthEvents, i => this.removeEvent(i))}
                        </section>
                        :
                        <section className="main-calendar">
                            <header className="calendar-header">
                                <div className="row justify-content-center pt-5">
                                    <i className="col icon icon-arrow-left s-24" onClick={this.previous}/>
                                    {this.renderTodayLabel()}
                                    {this.renderMonthLabel()}
                                    <i className="col icon icon-arrow-right text-right s-24" onClick={this.next} />
                                </div>
                                {this.DayNames}
                            </header>
                            <div className="days-container pt-2">
                                {this.renderWeeks()}
                                <div className='my-legend pt-3'>
                                    <div className="legend-title text-light">Legend&nbsp;<i className="icon icon-info-circle" data-tip="Ceci pourraît vous aidez pour comprendre le calendrier"/></div>
                                    <div className="legend-scale pt-3">
                                        <ul className="row justify-content-center legend-labels">
                                            <li><span style={{background: '#74A9CF'}}>Reserver&nbsp;<i className="icon icon-info" data-tip="L'artiste est indisponible car il va realiser une prestation"/></span></li>
                                            <li><span style={{background: '#00c853'}}>Disponible&nbsp;<i className="icon icon-info" data-tip="L'artiste est libre de pour un evenement"/></span></li>
                                            <li><span style={{background: '#ef6c00'}}>Indifférent&nbsp;<i className="icon icon-info" data-tip="L'artiste est en vue de faire une prestation mais peut recevoir une reservation"/></span></li>
                                            <li><span style={{background: '#ED1C24'}}>Indisponible&nbsp;<i className="icon icon-info" data-tip="L'artiste est ne travail tout simplement pendant cette journée"/></span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                </div>
            </div>
        );
    }
}

export default Calendar;
