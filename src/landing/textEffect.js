import { Effect } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /* glsl */`
    void mainImage( const in vec4 inputColor, const in vec2 uv, out vec4 outputColor ) {
        outputColor = inputColor;
    }
`;
const vertexShader = /* glsl */ `
    
`

export default class NoiseEffect extends Effect{
    constructor(){
        super(
            'NoiseEffect',
            fragmentShader,
            {
                uniforms: new Map([
                    [ 'uTime', new Uniform(0) ],
                    [ 'uSize', new Uniform([window.innerWidth, window.innerHeight]) ]
                ])
            }
        )
    }
    update(){
        this.uniforms.get('uTime').value += 0.02;
    }
}