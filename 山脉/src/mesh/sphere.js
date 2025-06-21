import * as THREE from 'three';

// 创建球体几何体
var sphereGeometry = new THREE.SphereGeometry(30, 32, 32);

// 加载纹理
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("/assets/2.png");

// 设置纹理贴图的重复、包裹方式
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 1); // 适当调整重复次数，确保纹理看起来合理

// 创建带纹理的材质
var sphereMaterial = new THREE.MeshPhongMaterial({
  map: texture, // 绑定纹理
  opacity: 0.8,
  transparent: true,
});

// 创建球体并设置位置
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);


export default sphere;

