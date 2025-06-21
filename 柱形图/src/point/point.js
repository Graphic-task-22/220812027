import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(10, 10, 10);

const pointsMaterial = new THREE.PointsMaterial({
    color: 0xffff,
    size: 1, // 设置点的大小
});

const points = new THREE.Points(geometry, pointsMaterial);

export default points;
