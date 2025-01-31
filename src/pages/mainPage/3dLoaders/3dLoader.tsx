import {Canvas, useFrame, useThree} from '@react-three/fiber';
import styles from "./threeLodaer.module.scss";
import {useRef, useState} from "react";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";
import {
    EffectComposer,
    Bloom,
    DepthOfField, HueSaturation
} from '@react-three/postprocessing';

type props = {
    model : THREE.Group;
    onAnimateEnd: () => void;
}


function CameraController({ onAnimateEnd }: { onAnimateEnd: () => void }) {
    const { camera } = useThree();
    const targetLookAt = new THREE.Vector3(0, 3, 0);
    const [hasEnded, setHasEnded] = useState(false);

    const { z, y } = useSpring({
        z: 23,
        y: 5,
        from: { z: 7, y: 3 },
        config: { mass: 2, tension: 30, friction: 15 },
        onRest: () => {
            if (!hasEnded) {
                setHasEnded(true);
                onAnimateEnd();
            }
        }
    });

    useFrame(() => {
        camera.position.set(0, y.get(), z.get());
        camera.lookAt(targetLookAt);
    });

    return null;
}




function BlackHole({ model }: { model: THREE.Group }) {
    const blackHoleRef = useRef<THREE.Group>(null);
    useFrame((_, delta) => {
        if (blackHoleRef.current) {
            blackHoleRef.current.rotation.y += 0.3 * delta;
        }
    });

    return (
        <primitive
            rotation = {[0 ,0,5*Math.PI/180]}
            object={model.scene}
            scale={6}
            position={[0, 3, 0]}
            ref={blackHoleRef}
        />

    );
}


type Props = {
    model: THREE.Group;
    onAnimateEnd: () => void;
};

export default function Loader({ model, onAnimateEnd }: Props) {
    return (
        <div className={styles.container}>
            <Canvas
                gl={{ alpha: true }}
                onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
                camera={{
                    fov: 75,
                    near: 1,
                    far: 1000,
                    position: [0, 3, 7.5],
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                }}
            >
                <BlackHole model={model} />
                <pointLight position={[0, 3, 0]} distance={100} intensity={20} />
                <CameraController onAnimateEnd={onAnimateEnd} />

                <EffectComposer>
                    <Bloom intensity={3} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
                    <HueSaturation />
                    <DepthOfField focusDistance={0} focalLength={0.07} bokehScale={1.4} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}


//-19, 17, 0
//-19, 17, -10
//top view
//0, 0, -20
//0, 50, 20
//1 island view
//-65, 10, -23
//-30, 10, -40
//2 island view
//38, 8, -25
//38, 8, -40
