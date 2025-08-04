import MainMap from "../components/MainMap";
import { NavBar } from "../components/NavBar";

export default function Home() {
    return (
        <div className="home">
            <NavBar/>
            <MainMap/>
        </div>
    );
}