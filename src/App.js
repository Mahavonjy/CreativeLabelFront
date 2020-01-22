import React, {useEffect, useRef} from "react";
import Container from "./Components/Container/Container";
import 'react-toastify/dist/ReactToastify.css';

function App() {

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
      <Container/>
  );
}

export default App;
