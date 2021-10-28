// source (caustics): https://shaderfrog.com/app/view/329
#ifdef GL_ES
precision highp float;
precision highp int;
#endif

#define TAU 6.28318530718
#define MAX_ITER 5

uniform float time;
uniform vec2 resolution;
uniform vec2 res;
uniform vec2 mouse;

uniform float speed;
uniform float brightness;
uniform float strength;
uniform sampler2D image;
varying vec2 v_texcoord;

void main(void)
{
    // caustics
    vec2 uv = v_texcoord;
    uv.y = 1.0 - uv.y;
    
    vec2 p = mod(uv * TAU, TAU) - 250.0;
    vec2 i = vec2(p);
    
    float c = 1.0;
    float inten = 0.005;
    
    for ( int n = 0; n < MAX_ITER; n++ )  {
        float t = time * speed * (1.0 - (3.5 / float(n + 1)));
        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
        c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    
    c /= float( MAX_ITER  );
    c = 1.17 - pow( c, brightness );
    
    vec3 rgb = vec3( pow( abs( c ), 8.0 ) );

    
    vec2 surface = strength * vec2(
        mix(-0.2, 0.2, pow( abs( c ), 2.0 )),
        mix(-0.2, 0.2, pow( abs( c ), 2.0 ))
    );
    
    // image
    vec2 xuv = uv + refract(vec2(0.0, 0.0), surface, 1.0 / 1.333);
    vec4 color = texture2D(image, xuv);
    
    gl_FragColor = vec4(color * (vec4(rgb, 0.0) + color) + (vec4(rgb, 0.0)*1.5)); // vec4( rgb, 1.0 );
}