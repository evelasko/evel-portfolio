uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform sampler2D u_texture2;
uniform vec2 u_textureFactor;
uniform vec2 u_texture2Factor;
uniform float u_textureProgress;
// RGB
uniform vec2 u_rgbPosition;
uniform vec2 u_rgbVelocity;
varying vec2 vUv;
vec2 centeredAspectRatio(vec2 uvs, vec2 factor){
    return uvs * factor - factor /2. + 0.5;
}
void main(){
    // On THREE 102 The image is has Y backwards
    // vec2 flipedUV = vec2(vUv.x,1.-vUv.y);
    vec2 normalizedRgbPos = u_rgbPosition / u_resolution;
    normalizedRgbPos.y = 1. - normalizedRgbPos.y; 
    
    vec2 vel = u_rgbVelocity;
    float dist = distance(normalizedRgbPos + vel / u_resolution, vUv.xy);
    float ratio = clamp(1.0 - dist * 5., 0., 1.);
    vec4 tex1 = vec4(1.);
    vec4 tex2 = vec4(1.);
    vec2 uv = vUv;
    uv.x -= sin(uv.y) * ratio / 100. * (vel.x + vel.y) / 7.;
    uv.y -= sin(uv.x) * ratio / 100. * (vel.x + vel.y) / 7.;
    tex1.r = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).r;
    tex2.r = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).r;
    
    uv.x -= sin(uv.y) * ratio / 150. * (vel.x + vel.y) / 7.;
    uv.y -= sin(uv.x) * ratio / 150. * (vel.x + vel.y) / 7.;
    tex1.g = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).g;
    tex2.g = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).g;
    
    uv.x -= sin(uv.y) * ratio / 300. * (vel.x + vel.y) / 7.;
    uv.y -= sin(uv.x) * ratio / 300. * (vel.x + vel.y) / 7.;
    tex1.b = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).b;
    tex2.b = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).b;
     
    
    vec4 fulltex1 = texture2D(u_texture, centeredAspectRatio(vUv, u_textureFactor) );
    vec4 fulltex2 = texture2D(u_texture2, centeredAspectRatio(vUv, u_texture2Factor));
    
    vec4 mixedTextures =  mix(tex1,tex2,u_textureProgress);
    gl_FragColor = mixedTextures;
}