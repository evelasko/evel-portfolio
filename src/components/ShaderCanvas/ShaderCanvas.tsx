import { FC, useEffect, useRef } from "react";
import GlslCanvas from "glslCanvas";

/**
 * contains the helper function for sizing the canvas element, as well as a loop that helps set each uniform you want to pass in through the setUniform prop.
 * For example, if you wanted to set a uniform called u_image with the value of an image variable, then you could pass in {u_image: image}. Also pay close attention to the sequence that glslCanvas instantiates the canvas, sizes it, and then loads the frag. 
 * This is important to the shader connecting its resolution to the canvas size. 
 */

interface ShaderCanvasProps {
  frag: string;
  setUniforms?: { [key: string]: string };
}

export const ShaderCanvas: FC<ShaderCanvasProps> = (props): JSX.Element => {

  const canvasRef = useRef<HTMLCanvasElement>();
  const containerRef = useRef<HTMLDivElement>();

  const resizer = (
    canvas: HTMLCanvasElement,
    container: HTMLDivElement
  ): void => {
    canvas.width = container.clientWidth + window.devicePixelRatio;
    canvas.height = container.clientHeight + window.devicePixelRatio;
    canvas.style.width = container.clientWidth + "px";
    canvas.style.height = container.clientHeight + "px";
  };

  useEffect(() => {
    const node = canvasRef.current;
    const container = containerRef.current;
    const sandbox = GlslCanvas(canvasRef.current);
    for (let k in props.setUniforms) {
      sandbox.setUniform(k, props.setUniforms[k]);
    }

    resizer(node, container);
    sandbox.load(props.frag);

    const handler = () => {
      if (
        node.clientWidth !== container.clientWidth ||
        node.clientHeight !== container.clientHeight
      )
        resizer(canvasRef.current, containerRef.current);
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};