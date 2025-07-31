import MainMap from "../components/MainMap";
import { NavBar } from "../components/NavBar";

export default function Home() {
    return (
        <div className="home">
            <NavBar/>
            <h1>BeachWatchPR</h1>
            <MainMap/>
        </div>
    );
}