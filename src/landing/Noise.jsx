import NoiseEffect from "./noiseEffect.js";
import { forwardRef } from "react";
export default forwardRef(function MainNoise(props, ref){
    const effect = new NoiseEffect(props);
    return (<primitive ref={ ref } object={effect} />);
})