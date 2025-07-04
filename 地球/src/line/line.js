import * as THREE from "three";

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 100, 0,
    0, 0, 100,
    100, 100, 0
]);

const attribute = new THREE.Float32BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const material = new THREE.LineBasicMaterial({
    color: new THREE.Color('orange')
});

const line = new THREE.LineLoop(geometry, material);
export default line;
