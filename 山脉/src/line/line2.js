import * as THREE from 'three';

// 创建椭圆曲线
const curve = new THREE.EllipseCurve(
    0, 0,          // 中心点 (x, y)
    100, 50,       // xRadius, yRadius
    0, 2 * Math.PI, // 起始角，终止角
    false,         // 顺时针方向？
    0              // 旋转角度
);

// 获取点集合
const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);

// 创建线材质和线对象
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const ellipse = new THREE.Line(geometry, material);
ellipse.rotateX(-Math.PI / 2); // 旋转到XZ平面

// 创建点材质和点对象
const pointsMaterial = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 2
});
const points2 = new THREE.Points(geometry, pointsMaterial);

// 使用 Group 把线和点打包在一起
const group = new THREE.Group();
group.add(ellipse);
group.add(points2);

export default group;
