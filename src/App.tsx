import Loader from "./pages/mainPage/3dLoaders/3dLoader.tsx";
import styles from "./app.module.scss";
import { useRef, useEffect } from "react";
// import Head3dBox from "./components/head3dBox/head3dBox.tsx";
// import {Canvas} from "@react-three/fiber";
import TechPage from "./pages/techPage/techPage.tsx";
import WorkPage from "./pages/workPage/workPage.tsx";
import MainPage from "./pages/mainPage/mainPage.tsx";
import {useState} from "react";



function App() {
    const [time, setTime] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const waitFunction = () => {
        const randomNum = Math.random() * (3 - 2) + 2;
        setTimeout(() => {setIsLoading(true)},randomNum*1000);
    }

    useEffect(() => {
        waitFunction();
    },[])
    return (
        <div className={styles.container}>
            {}
            <MainPage />
            <TechPage/>
            <WorkPage/>
        </div>
    );
}

export default App;
