import React, { Suspense } from "react"
import { Canvas } from "react-three-fiber"
import HairShape from "./HairShape";

const HairScene = () => {
    return (
        <div className="hairScene"  style={{width: '100vw', height: '100vh'}}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <HairShape />
                </Suspense>
            </Canvas>
        </div>
    );

}

export default HairScene