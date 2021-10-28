import React, { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useLoader } from "react-three-fiber"
import { SVGLoader, SVGResult } from "three/examples/jsm/loaders/SVGLoader"
import * as THREE from "three"
//@ts-ignore
import BaseHairShape from "../../graphics/BaseHair.svg"
import flatten from "lodash-es/flatten"

const HairShape = ({
    svg = BaseHairShape,
    position = new THREE.Vector3(-0.5, -0.5, -0.5),
    scale = new THREE.Vector3(0.2, 0.2, 0.2),
    // rotation = new Euler(...Array(3).fill(THREE.MathUtils.degToRad(0))),
 }) => {

    const svgResult = useLoader(SVGLoader, svg) as SVGResult

    return (
        
        <group
            position={position}
            scale={scale}
            // rotation={rotation}
        >
            {
                <mesh>
                    <shapeBufferGeometry 
                        attach="geometry"
                        args={[flatten(svgResult.paths.map(path => path.toShapes(true)[0]))[0]]}
                    />
                    <meshPhysicalMaterial
                        // aspect={window.innerWidth / window.innerHeight}
                        attach="material"
                        color={new THREE.Color('skyblue')}
                        opacity={1}
                        side={THREE.DoubleSide}
                        flatShading={true}
                        polygonOffset
                        polygonOffsetFactor={1 * -0.1}
                        wireframe={true}
                    />
                </mesh>
                


                // flatten(svgResult.paths.map((group, index) => {
                //     return group.toShapes(true).map(shape => {
                //         const fillColor = group.userData.style.fill
                //         return ({ shape, color: fillColor, index })
                //     })
                // })).map(({shape, index}) => {
                //     console.log(index)
                //     console.log(shape)
                //     return (
                //         <mesh key={`${index}-${Math.random()}`}>
                //             <shapeBufferGeometry attach="geometry" args={[shape]} />
                //             <meshPhysicalMaterial
                //             // aspect={window.innerWidth / window.innerHeight}
                //                 attach="material"
                //                 color={new THREE.Color('skyblue')}
                //                 opacity={1}
                //                 side={THREE.DoubleSide}
                //                 flatShading={true}
                //                 // polygonOffset
                //                 // polygonOffsetFactor={index * -0.1}
                //                 wireframe={true}
                //             />
                //         </mesh>
                //     )
                // })
                
            }
         </group>
    )
}

export default HairShape