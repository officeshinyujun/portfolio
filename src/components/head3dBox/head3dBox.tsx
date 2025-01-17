import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
// import ThreeGrid from "../threeGrid";

type props = {
    context: string;
};

export default function Head3dBox({ context }: props) {
    const modelRef = useRef<THREE.Object3D>(null!);
    // const groupRef = useRef<THREE.Group>(null!);

    // useFrame((_, delta) => {
    //     if (modelRef.current) {
    //         modelRef.current.rotation.z += delta;
    //         modelRef.current.rotation.y += delta;
    //     }
    // });
    //TODO : 디자인 완성된거 보고 쓸지 말지 정하지 않을까..?

    const model = useGLTF(context);

    return (
        <>
            <directionalLight position={[10, 8, 10]} intensity={10} distance={2000} angle={1.2} />
            <primitive object={model.scene} scale={0.05} position={[0, 0, 0]} ref={modelRef} rotation={[0,90*(Math.PI/180), 0]}/>
            {/* <ThreeGrid/> */}
        </>
    );
}
