import {useThree} from "@react-three/fiber";
import {useEffect} from "react";

type Props = {
    lookPos: [number, number, number];
};

export default function CameraLookAt({lookPos}: Props) {
    const {camera} = useThree();

    useEffect(() => {
        camera.lookAt(...lookPos);
    }, [camera, lookPos]);

    return null;
}
