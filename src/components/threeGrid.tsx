import { Text } from "@react-three/drei";



export default function ThreeGrid() {

    const generateLabels = (size: number, step: number) => {
        const labels = [];
        for (let i = -size; i <= size; i += step) {
            if (i !== 0) {
                // X-axis labels
                labels.push(
                    <Text key={`x${i}`} position={[i, 0.1, 0]} fontSize={0.3} color="red" rotation={[-Math.PI / 2, 0, 0]}>
                        {i}
                    </Text>
                );
                // Z-axis labels
                labels.push(
                    <Text key={`z${i}`} position={[0, 0.1, i]} fontSize={0.3} color="blue" rotation={[-Math.PI / 2, 0, 0]}>
                        {i}
                    </Text>
                );
            }
        }
        return labels;
    };

    return (
        <>
            <gridHelper args={[100, 100]}/>
            <axesHelper scale={100}/>
            Coordinate Labels
            {generateLabels(100, 1)}

            <Text position={[6, 0, 0]} fontSize={0.5} color="red">
                X
            </Text>
            <Text position={[0, 6, 0]} fontSize={0.5} color="green">
                Y
            </Text>
            <Text position={[0, 0, 6]} fontSize={0.5} color="blue">
                Z
            </Text>
        </>
    )
}