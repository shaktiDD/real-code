import {Navigate} from "react-router-dom";

const Privateroute = ({element,...rest}) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/"/>

}

export default Privateroute;