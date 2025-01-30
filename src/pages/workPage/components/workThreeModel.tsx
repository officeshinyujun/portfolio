import {useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import imageSize from "../../../feature/imageSize.tsx";
import {useEffect, useState} from "react";

type Props = {
    image : string
    position : Array<number>
}

export default function WorkThreeModel({image, position}: Props) {
    const map = useLoader(TextureLoader, image);
    const [imageSizeState, setImageSizeState] = useState<[number, number] | null>(null);

    useEffect(() => {
        imageSize(image).then((size) => {
            setImageSizeState(size);
        });
    }, [image]);

    return (
        <mesh position={position}>
            <planeGeometry args={[(imageSizeState?.[1]/10), (imageSizeState?.[0]/10)]}></planeGeometry>
            <meshStandardMaterial map={map}/>
        </mesh>
    )
}