export const IconVertex = /* glsl */`
#define PI 3.14159265359
float radius = 2.5;
uniform vec3 uMin;
uniform vec3 uMax;
float mapRange(float value, float inMin, float inMax, float outMin, float outMax){
  return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
}
void main() {
  float x = mapRange(position.x, uMin.x, uMax.x, -PI, PI);
  vec3 dir = vec3(sin(x), 0., cos(x));

  vec3 pos = radius * dir + vec3(0.,position.y*2., 0.) + 3. * dir * position.z;
  // Set the position of the vertex
  pos.x *= 0.5;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`