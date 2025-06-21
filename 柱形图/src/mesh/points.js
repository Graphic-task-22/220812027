import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const p1 = new THREE.Vector2(0, 0);
const p2 = new THREE.Vector2(50, 200);
const p3 = new THREE.Vector2(100, 0);

const curve = new THREE.QuadraticBezierCurve(p1, p2, p3);

const points = curve.getPoints(20);

geometry.setFromPoints(points);

const positions = geometry.attributes.position;

const colorArr = [];

for (let i = 0; i < positions.count; i++) {
  //...
  colorArr.push();
}

const colors = new Float32Array(colorArr);
geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 2,
//   vertexColors: true,
});

const line = new THREE.Line(geometry, material);

export default line;