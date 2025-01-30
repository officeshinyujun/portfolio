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
    const [t, setT] = useState(0);
    const targetLookAt = new THREE.Vector3(0, 3, 0);
    const [hasEnded, setHasEnded] = useState(false);

    const quadratic = (x: number): number => {
        return -0.001 * Math.pow(x, 2) + 0.155 * x + 1.964;
    };

    useFrame(() => {
        if (hasEnded) return; // 애니메이션이 끝나면 실행 중지

        setT(prevT => {
            const newT = prevT + 0.05;
            const startZ = 7;
            const targetZ = 23;
            const a = 0.2;

            const newZ = Math.min(startZ + a * newT * newT, targetZ);
            const newY = quadratic(newZ);

            camera.position.set(0, newY, newZ);
            camera.lookAt(targetLookAt);

            if (newZ >= targetZ) {
                onAnimateEnd();
                setHasEnded(true); // 애니메이션 종료 상태 설정
            }

            return newT;
        });
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
