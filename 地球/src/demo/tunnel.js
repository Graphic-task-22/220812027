import * as THREE from 'three';

// 曲线创建
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-100, 0, 0),
  new THREE.Vector3(-80, 10, -20),
  new THREE.Vector3(-60, 20, -40),
  new THREE.Vector3(-40, 15, -60),
  new THREE.Vector3(-20, 0, -80),
  new THREE.Vector3(0, -10, -70),
  new THREE.Vector3(20, -5, -50),
  new THREE.Vector3(40, 10, -30),
  new THREE.Vector3(60, 30, -10),
  new THREE.Vector3(80, 20, 20),
  new THREE.Vector3(100, 0, 40),
  new THREE.Vector3(80, -10, 60),
  new THREE.Vector3(50, -20, 70),
  new THREE.Vector3(20, -10, 60),
  new THREE.Vector3(0, 0, 50),
  new THREE.Vector3(-30, 10, 30),
  new THREE.Vector3(-60, 20, 10),
  new THREE.Vector3(-90, 10, -10)
]);

// 管道几何体
const geometry = new THREE.TubeGeometry(curve, 100, 10, 32, true);

const loader = new THREE.TextureLoader();
const texture = loader.load("/assets/4.png");
texture.wrapS = THREE.RepeatWrapping;
texture.colorSpace = THREE.SRGBColorSpace;
texture.repeat.set(20, 1);

const material = new THREE.MeshLambertMaterial({
  color: 0xf8f8ff,
  side: THREE.DoubleSide,
  map: texture,
  aoMap: texture
});

const tube = new THREE.Mesh(geometry, material);

// 导出路径上的点用于调试或轨迹计算
export const tubepoints = curve.getPoints(300);

// =========== 添加动画物体 ===========
const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const movingSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
tube.add(movingSphere); // 也可以用 scene.add(movingSphere)

let t = 0; // 0 ~ 1 表示在路径上的位置

export function updateTunnelAnimation() {
  t += 0.001; // 控制速度，值越大越快
  if (t > 1) t = 0;

  const position = curve.getPointAt(t);
  const tangent = curve.getTangentAt(t);

  movingSphere.position.copy(position);

  // 让球朝向切线方向
  const axis = new THREE.Vector3();
  axis.crossVectors(new THREE.Vector3(0, 1, 0), tangent).normalize();
  const radians = Math.acos(new THREE.Vector3(0, 1, 0).dot(tangent));
  movingSphere.quaternion.setFromAxisAngle(axis, radians);
}

export default tube;
