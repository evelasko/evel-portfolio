import React, { useRef, useState, Suspense } from "react"
import { Canvas, useFrame, useLoader } from "react-three-fiber"
import * as THREE from "three"
//@ts-ignore
import imageTextureA from "../../images/iphone-face-down.jpg"
//@ts-ignore
import imageTextureB from "../../images/iphone-camera.jpg"

export const Box = props => {
  // This reference will give us direct access to the mesh so we can animate it
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  //= Animation
  // Rotate mesh every frame, this is outside of React without overhead
  //@ts-ignore
  //useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  //= Texture
  const textureA = useLoader(THREE.TextureLoader, imageTextureA)
  const textureB = useLoader(THREE.TextureLoader, imageTextureB)

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <planeBufferGeometry attach="geometry" args={[4, 4, 16, 16]} />
      <meshPhysicalMaterial
        attach="material"
        map={ (hovered ? textureA : textureB) as THREE.Texture }
        // color={hovered ? "hotpink" : "orange"}
        // wireframe={true}
      />
    </mesh>
  )
}

const HairAnim = () => (
  <div style={{width: "100vw", height: "100vh"}}>
    <Canvas
      style={{background: "transparent"}}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Box position={[0, 0, 0]} rotation={[-0.3, 0.05, 0]}/>
      </Suspense>
      {/* <Box position={[1.2, 0, 0]} /> */}
    </Canvas>
  </div>
)

export default HairAnim
