import {Canvas, useFrame, useThree} from '@react-three/fiber';
import styles from "./threeLodaer.module.scss";
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {
    EffectComposer,
    Bloom,
    BrightnessContrast,
    ChromaticAberration,
    DepthOfField, Pixelation, Glitch, HueSaturation
} from '@react-three/postprocessing';
import {OrbitControls, useGLTF, useProgress} from "@react-three/drei";
import {Suspense} from "react";
import ThreeGrid from "../../../components/threeGrid.tsx";

type props = {
    model : THREE.Group;
}

function CameraController() {
    const { camera } = useThree();

    const quadratic = (x: number): number => {
        return -0.001 * Math.pow(x, 2) + 0.155 * x + 1.964;
    };

    const [t, setT] = useState(0);
    const targetLookAt = new THREE.Vector3(0, 3, 0);

    // console.log(t);

        useEffect(() => {
            const a = 0.2;
            const startZ = 7;
            const startY = 3;
            const targetZ = 23;
            const targetY = 5;

            // 초기 lookAt 설정
            camera.lookAt(targetLookAt);

            const interval = setInterval(() => {
                setT(prev => {
                    const newT = prev + 0.05;

                    // 각 축의 현재 위치 계산
                    const newZ = Math.min(startZ + a * newT * newT, targetZ);
                    const newY = quadratic(newZ);

                    // 카메라 위치 업데이트
                    camera.position.z = newZ;
                    camera.position.y = newY;

                    // lookAt 다시 적용
                    camera.lookAt(targetLookAt);

                    const isAtTarget = newZ >= targetZ;
                    if (isAtTarget) {
                        clearInterval(interval);
                        camera.position.set(0, targetY, targetZ);
                        camera.lookAt(targetLookAt);
                        return 0;  // t를 리셋
                    }

                    return newT;
                });
            }, 16);

            return () => clearInterval(interval);
        }, [camera]);

        return null;
    }

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    console.log(scrollY);

});


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


export default function Loader({model} : props) {

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
                    display: 'block', // block 요소로 설정
                }}
            >
                    <BlackHole model={model}/>
                <pointLight position={[0, 3, 0]} distance={100} intensity={20}></pointLight>
                    <CameraController/>
                    {/*<CameraSetup/>*/}
                {/*<OrbitControls/>*/}
                {/*<ThreeGrid/>*/}
                    <EffectComposer>
                        <Bloom intensity={3} blurPass={undefined} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
                        {/*<Glitch delay={[3, 5]} />*/}
                        <HueSaturation ></HueSaturation>
                        <DepthOfField
                            focusDistance={0} // where to focus
                            focalLength={0.07} // focal length
                            bokehScale={1.4} // bokeh size
                        />
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
