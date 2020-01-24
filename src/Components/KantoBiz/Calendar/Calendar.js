import React, { useEffect, useRef, useState } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from "moment";
import '../style/Calendar.css'
import ReactTooltip from "react-tooltip";

function Calendar(props) {

    const isMounted = useRef(false);
    const [selectedMonth, setSelectedMonth] = useState(moment());
    const [selectedDay, setSelectedDay] = useState(moment().startOf("day"));
    const [selectedMonthEvents, setSelectedMonthEvents] = useState([]);
    const [showEvents, setShowEvents] = useState(false);

    const previous = () => {
        setSelectedMonth(selectedMonth.subtract(1, "months"));
    };

    const next = () => {
        setSelectedMonth(selectedMonth.add(1, "months"));
    };

    const select = (day) => {
        setSelectedMonth(day.date);
        setSelectedDay(day.date.clone());
        setShowEvents(true)
    };

    const goToCurrentMonthView = () => {
        setSelectedMonth(moment())
    };

    const showCalendar = () => {
        setShowEvents(false);
    };

    const renderMonthLabel = () => {
        return (
            <span className="box month-label">
                {selectedMonth.format("MMMM YYYY")}
            </span>
        );
    };

    const renderDayLabel = () => {
        return (
            <span className="col box month-label">
                {selectedDay.format("DD MMMM YYYY")}
            </span>
        );
    };

    const renderTodayLabel = () => {
        return (
            <span className="box today-label" onClick={goToCurrentMonthView}>
                Today
            </span>
        );
    };

    const renderWeeks = () => {
        let weeks = [];
        let done = false;
        let previousCurrentNextView = selectedMonth.clone().startOf("month").subtract(1, "d").day("Monday");
        let count = 0;
        let monthIndex = previousCurrentNextView.month();

        while (!done) {
            weeks.push(Week(previousCurrentNextView.clone(), selectedMonth, selectedDay, day => select(day), selectedMonthEvents));
            previousCurrentNextView.add(1, "w");
            done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
            monthIndex = previousCurrentNextView.month();
        }
        return weeks;
    };

    const handleAdd = () => {
        const monthEvents = [...selectedMonthEvents];

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
                    date: selectedDay,
                    dynamic: true
                };

                newEvents.push(newEvent);

                for (let i = 0; i < newEvents.length; i++) {
                    monthEvents.push(newEvents[i]);
                }

                setSelectedMonthEvents(monthEvents);
                break;
        }
    };

    const addEvent = () => {
        let isAfterDay = moment().startOf("day").subtract(1, "d");

        if (selectedDay.isAfter(isAfterDay)) {
            handleAdd();
        } else {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Are you sure you want to add an event in the past?")) {
                handleAdd();
            } else {
            } // end confirm past
        } //end is in the past
    };

    const removeEvent = (i) => {
        const monthEvents = [...selectedMonthEvents.slice()];
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to remove this event?")) {
            let index = i;

            if (index !== -1) {
                monthEvents.splice(index, 1);
            } else {
                alert("No events to remove on this day!");
            }

            setSelectedMonthEvents(monthEvents);
        }
    };

    const Events = (removeEvent) => {
        const monthEventsRendered = selectedMonthEvents.map((event, i) => {
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
            if (selectedMonthEvents[i].date.isSame(selectedDay, "day")) {
                dayEventsRendered.push(monthEventsRendered[i]);
            }
        }

        return (
            <div className="day-events">
                {dayEventsRendered}
            </div>
        );
    };

    const DayNames = () => {
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

    const Week = (previousCurrentNextView, currentMonthView, selected, select, monthEvents) => {
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

            days.push(Day(day, selected));
            date = date.clone();
            date.add(1, "d");
        }
        return (
            <div className="row week">
                {days}
            </div>
        );
    };

    const Day = (day, selected) => {
        return (
            <div className={
                "day" +
                (day.isToday ? " today" : "") +
                (day.isCurrentMonth ? "" : " different-month") +
                (day.date.isSame(selected) ? " selected" : "") +
                (day.hasEvents ? " has-events" : "")
            } onClick={!props.noEdit ? () => select(day): null}>
                <div className="day-number">{day.number}</div>
            </div>
        );
    };

    useEffect(() => {

        const monthEvents = selectedMonthEvents;

        let allEvents = [];

        allEvents.push({
            title: "Press the Add button and enter a name for your event. P.S you can delete me by pressing me!",
            date: moment(),
            dynamic: false
        });
        allEvents.push({
            title: "Event 2 - Meeting",
            date: moment().startOf("day").subtract(2, "d").add(2, "h"),
            dynamic: false
        });
        allEvents.push({
            title: "Event 3 - Cinema",
            date: moment().startOf("day").subtract(7, "d").add(18, "h"),
            dynamic: false
        });
        allEvents.push({
            title: "Event 4 - Theater",
            date: moment().startOf("day").subtract(16, "d").add(20, "h"),
            dynamic: false
        });
        allEvents.push({
            title: "Event 5 - Drinks",
            date: moment().startOf("day").subtract(2, "d").add(12, "h"),
            dynamic: false
        });
        allEvents.push({
            title: "Event 6 - Diving",
            date: moment().startOf("day").subtract(2, "d").add(13, "h"),
            dynamic: false
        });
        allEvents.push({
            title: "Event 7 - Tennis",
            date: moment().startOf("day").subtract(2, "d").add(14, "h"),
            dynamic: false
        });
        allEvents.push({
            title: "Event 8 - Swimmming",
            date: moment().startOf("day").subtract(2, "d").add(17, "h"),
            dynamic: false
        });
        allEvents.push({
            title: "Event 9 - Chilling",
            date: moment().startOf("day").subtract(2, "d").add(16, "h"),
            dynamic: false
        });
        allEvents.push({
            title: "Hello World",
            date: moment().startOf("day").add(5, "h"),
            dynamic: false
        });

        for (let i = 0; i < allEvents.length; i++) {
            monthEvents.push(allEvents[i]);
        }

        setSelectedMonthEvents(monthEvents);

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="calendar-rectangle">
            <ReactTooltip/>
            <div id="calendar-content" className="calendar-content">
                {showEvents?
                    <section className="main-calendar">
                        <header className="calendar-header">
                            <div className="row justify-content-center pt-5">
                                <i className="col icon icon-exit s-24 text-red" onClick={showCalendar}/>
                                {renderDayLabel()}
                                <i className="col icon icon-plus-circle s-24" onClick={addEvent}/>
                            </div>
                        </header>
                        {Events(i => removeEvent(i))}
                    </section>
                    :
                    <section className="main-calendar">
                        <header className="calendar-header">
                            <div className="row justify-content-center pt-5">
                                <i className="col icon icon-arrow-left text-left ml-2 s-24" onClick={previous}/>
                                {renderTodayLabel()}
                                {renderMonthLabel()}
                                <i className="col icon icon-arrow-right text-right mr-2 s-24" onClick={next} />
                            </div>
                            {DayNames}
                        </header>
                        <div className="days-container pt-2">
                            {renderWeeks()}
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

export default Calendar;
