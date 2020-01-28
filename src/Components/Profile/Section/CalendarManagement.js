import React, { useEffect, useRef } from "react";

function CalendarManagement() {

    const isMounted = useRef(false);

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="Base">
            La gestion de calendrier sera ici
        </div>
    );
}

export default CalendarManagement;
