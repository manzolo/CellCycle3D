import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// Translucent cell-membrane material: fresnel rim glow + gentle animated
// surface ripple, evoking a phospholipid bilayer under an electron microscope.
export const MembraneMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#2dd4ff'),
    uRim: new THREE.Color('#7af5ff'),
    uOpacity: 0.18,
    uWall: 0, // 1 = plant cell wall (more angular, opaque)
  },
  // vertex
  /* glsl */ `
    uniform float uTime;
    uniform float uWall;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      vec3 pos = position;
      float ripple = sin(pos.y * 6.0 + uTime * 1.2) * 0.012
                   + cos(pos.x * 5.0 - uTime) * 0.012;
      pos += normal * ripple * (1.0 - uWall);
      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vView = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }
  `,
  // fragment
  /* glsl */ `
    uniform vec3 uColor;
    uniform vec3 uRim;
    uniform float uOpacity;
    uniform float uWall;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.5);
      vec3 col = mix(uColor, uRim, fres);
      float alpha = mix(uOpacity + fres * 0.6, 0.5 + fres * 0.4, uWall);
      gl_FragColor = vec4(col, alpha);
    }
  `
);

extend({ MembraneMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    membraneMaterial: any;
  }
}
