import MainMap from "../components/MainMap";
import { NavBar } from "../components/NavBar";
import { ReportList } from "../components/ReportList";

export default function Admin() {
    return (
        <div className="admin">
            <NavBar/>
            <MainMap/>
            <br></br>
            <ReportList/>
        </div>
    );
}