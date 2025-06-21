import * as THREE from 'three';

const arr = [
    new THREE.Vector2(-100, 0),
    new THREE.Vector2(-50, 50),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(50, -50),
    new THREE.Vector2(100, 0)
];

// 创建样条曲线
const curve = new THREE.SplineCurve(arr);

// 获取采样点
const pointsArr = curve.getPoints(50);
const curveGeometry = new THREE.BufferGeometry().setFromPoints(pointsArr);

// 曲线 Line（橙色）
const curveMaterial = new THREE.LineBasicMaterial({ color: 'orange' });
const curveLine = new THREE.Line(curveGeometry, curveMaterial);

// 曲线采样点（粉色）
const samplePointsMaterial = new THREE.PointsMaterial({ color: 'pink', size: 5 });
const samplePoints = new THREE.Points(curveGeometry, samplePointsMaterial);

// 控制点（绿色）
const controlGeometry = new THREE.BufferGeometry().setFromPoints(arr);
const controlPointsMaterial = new THREE.PointsMaterial({ color: 'green', size: 10 });
const controlPoints = new THREE.Points(controlGeometry, controlPointsMaterial);

// 控制点连线（默认材质）
const controlLineMaterial = new THREE.LineBasicMaterial({ color: 'white' });
const controlLine = new THREE.Line(controlGeometry, controlLineMaterial);

// 放入一个 Group 统一管理
const group = new THREE.Group();
group.add(curveLine);
group.add(samplePoints);
group.add(controlPoints);
group.add(controlLine);

export default group;
