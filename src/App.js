import React, {useEffect, useRef} from "react";
import {BrowserRouter} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import HomeRoot from "./components/home/homeRoot";

function App () {

  const isMounted = useRef(false);

  useEffect(() => {

    // document.addEventListener('contextmenu', function(e) {
    //     e.preventDefault();
    // });
    return () => {
      isMounted.current = true
    };
  }, []);

  return (
      <BrowserRouter>
        <HomeRoot/>
      </BrowserRouter>
  );
}

export default App;
