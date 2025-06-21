import * as THREE from 'three';

// 创建一条二次贝塞尔曲线（需要三个点：起点、控制点、终点）
const curve = new THREE.QuadraticBezierCurve(
    new THREE.Vector2(-100, 0),
    new THREE.Vector2(-50, 50),
    new THREE.Vector2(0, 0) // ✅ 缺少终点，必须添加
);

// 获取曲线上的点
const points = curve.getPoints(50); // 生成50个点

// 将二维点转换为三维点（Vector3），因为 BufferGeometry 需要 Vector3 类型
const pointsArr = points.map(p => new THREE.Vector3(p.x, p.y, 0));

// 创建几何体和材质
const curveGeometry = new THREE.BufferGeometry().setFromPoints(pointsArr);
const curveMaterial = new THREE.LineBasicMaterial({ color: 'orange' });

// 创建线对象
const curveObject = new THREE.Line(curveGeometry, curveMaterial);

export default curveObject;
