import React, { Suspense, useMemo, useRef } from "react"
import { DoubleSide, Color } from "three"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader"
import PropTypes from "prop-types"

// Promise of an SVG parsed into paths 
// with which the threejs engine will make shapes
// export const svgResource = (url: string) => new Promise(resolve =>
//     new SVGLoader().load(url, shapes => {
//         resolve(flatten(shapes.paths.map((group, index) => {
//             return group.toShapes(true).map(shape => {
//                 const fillColor = group.userData.style.fill
//                 return ({ shape, color: fillColor, index })
//             })
//         }))
//         )
//     })
// )


/** 
 * A very special thanks to @neftaly for open source contribution.
 * https://gist.github.com/neftaly/7c4d96f1ba37aada7f366b5393e59ddb 
 * 
 * Use a shape of the SVG to associate a Mesh Material with a Geometry 
 */
function SvgShape({
    shape,
    color = new Color(0xb0b0b0),
    index,
}) {
    const mesh = useRef();
    return (
        <mesh ref={mesh} >
            <shapeBufferGeometry attach="geometry" args={[shape]} />
            <meshBasicMaterial
                // aspect={window.innerWidth / window.innerHeight}
                attach="material"
                color={color}
                opacity={1}
                side={DoubleSide}
                // flatShading={true}
                depthWrite={true}
                /*
                HACK: Offset SVG polygons by index
                The paths from SVGLoader Z-fight.
                This fix causes stacking problems with detailed SVGs.
                */
                polygonOffset
                polygonOffsetFactor={index * -0.1}
                wireframe={true}
            />
        </mesh>
    );
}

SvgShape.propTypes = {
    color: PropTypes.any,
    index: PropTypes.any,
    shape: PropTypes.any,
}

export default SvgShape