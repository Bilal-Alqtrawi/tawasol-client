import React , {Fragment} from "react";
import spinner from "../assets/spinner.gif";

// direct return
const Spinner = () => (
    <Fragment>
        <img style={{width: 200, margin: "auto", display: "block"}} src={spinner} alt="Loading..." />
    </Fragment>
);

export default Spinner;

