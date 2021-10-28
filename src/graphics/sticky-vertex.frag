#define PI 3.14159265359
uniform float u_offset;
uniform float u_progress;
uniform float u_direction;
uniform float u_time;
uniform float u_waveIntensity;
varying vec2 vUv;
void main(){
    vec3 pos = position.xyz;
    float distance = length(uv.xy - 0.5 );
    float sizeDist = length(vec2(0.5,0.5));
    float normalizedDistance = distance/sizeDist ;
    float stickOutEffect = normalizedDistance ;
    float stickInEffect = -normalizedDistance ;
    
    float stickEffect = mix(stickOutEffect,stickInEffect, u_direction);
    // Backwards V wave.
    float stick = 0.5;
    float waveIn = u_progress*(1. / stick); 
    float waveOut =  -( u_progress - 1.) * (1./(1.-stick) );
    waveOut = pow(smoothstep(0.,1.,waveOut),0.7);
    float stickProgress = min(waveIn, waveOut);
    // We can re-use stick Influcse because this oen starts at the same position
    float offsetInProgress = clamp(waveIn,0.,1.);
    // Invert stickout to get the slope moving upwards to the right
    // and move it left by 1
    float offsetOutProgress = clamp(1.-waveOut,0.,1.);
    float offsetProgress = mix(offsetInProgress,offsetOutProgress,u_direction);
    float stickOffset = u_offset;
    pos.z += stickEffect * stickOffset * stickProgress  - u_offset * offsetProgress;
    
    pos.z += sin(distance * 8. - u_time * 2. )  * u_waveIntensity;
    gl_Position =   
        projectionMatrix * 
        modelViewMatrix * 
         vec4(pos, 1.0);
    vUv = uv;
}