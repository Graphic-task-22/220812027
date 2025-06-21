import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(200, 100, 100, 100);

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("/assets/2.png");


texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping; // uv两个方向纹理重复数量

texture.repeat.set(5, 2); //注意选择合适的阵列数量

//设置纹理贴图
const material = new THREE.MeshPhongMaterial({
    map: texture, // 绑定纹理
    opacity: 0.8,
    transparent: true,
});
const plane = new THREE.Mesh(geometry, material);

export default plane;
