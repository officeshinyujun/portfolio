import { useEffect } from 'react';
import styles from './workBox.module.scss';
import React from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type WorkBoxProps = {
    text?: string;
    title?: string;
    textureImage?: string;
    children?: any;
    styling?: object;
};

export default function WorkBox({ text, title, children, styling }: WorkBoxProps) {
    // scene traverse 함수 정의
    const handleSceneTraverse = (scene: THREE.Object3D) => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (child.material) {
                    child.material.needsUpdate = true;
                    
                    if (child.material.map) {
                        child.material.map.anisotropy = 16;
                        child.material.map.minFilter = THREE.LinearMipMapLinearFilter;
                        child.material.map.magFilter = THREE.LinearFilter;
                        child.material.map.generateMipmaps = true;
                    }
                }
            }
        });
    };

    // children에서 primitive 컴포넌트 찾아서 처리
    useEffect(() => {
        if (children) {
            React.Children.forEach(children, (child) => {
                if (child?.props?.object) {
                    handleSceneTraverse(child.props.object);
                }
            });
        }
    }, [children]);

    return (
        <div className={styles.container} style={styling}>
            <div className={styles.threeContainer} style={{background: styling?.background}}>
                <Canvas
                    gl={{ 
                        antialias: true,
                        outputColorSpace: "srgb",
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 1
                    }}
                    camera={{
                        position: [0, 3, 19],
                        fov: 45
                    }}
                >
                    <ambientLight intensity={0.5} />
                    {children}                                    
                    <OrbitControls/>
                </Canvas>
            </div>
            <div className={styles.explanationBox}>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    );
}