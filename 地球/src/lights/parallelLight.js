import * as THREE from 'three';

// 创建平行光
const parallelLight = new THREE.DirectionalLight(0xffffff, 1.0);
parallelLight.position.set(50, 100, -50); // 位置
parallelLight.castShadow = true; // 允许投影

export default parallelLight;
