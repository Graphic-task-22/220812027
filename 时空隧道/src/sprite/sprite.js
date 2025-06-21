import * as THREE from 'three';

const texture = new THREE.TextureLoader().load('/assets/snowflake1.png');

const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,   // 允许透明背景
    alphaTest: 0.5,      // 过滤掉完全透明的像素
    blending: THREE.AdditiveBlending, // 加法混合
});


const sprite = new THREE.Sprite(spriteMaterial); 

sprite.scale.set(10, 10, 1); // z 轴无效，保持为 1


export default sprite;
