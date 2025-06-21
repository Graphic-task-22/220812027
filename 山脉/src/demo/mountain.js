import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();
const geometry = new THREE.PlaneGeometry(500, 500, 100, 100);
const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color("orange"),
    wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(Math.PI / 2);

export default mesh;

export function updatePosition() {
    const positions = geometry.attributes.position;
    const time = Date.now() * 0.002;

    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = noise2D(x / 100, y / 100) * 40;
        const sinNum = Math.sin(time + x * 0.05) * 10;
        positions.setZ(i, z + sinNum);
    }

    positions.needsUpdate = true;
}


