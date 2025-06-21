import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'; // 重新启用GUI
import cube from './mesh/cube';
import sphere from './mesh/sphere'; 
import pointLight from './lights/pointLights';
import parallelLight from './lights/parallelLight';
import plane from './mesh/plane';
import sprite from './sprite/sprite';
import point from './point/point';
import line from "./line/line";
import line2 from "./line/line2";
import line3 from "./line/line3";
import line4 from "./line/line4";
import mountain from './demo/mountain';
import points from './mesh/points';
import bar from './demo/bar';
import pig from './mesh/pig'
import tunnel, { tubepoints } from './demo/tunnel';
import { updatePosition } from './demo/mountain';


let renderer, camera, scene;
let autoRotate = true; // 是否自动旋转
let gui;

// 记录初始状态
const initialState = {
  cube: { position: { ...cube.position }, color: cube.material.color.getHex(), opacity: cube.material.opacity },
  sphere: { position: { ...sphere.position }, color: sphere.material.color.getHex(), opacity: sphere.material.opacity },
  lights: {
    ambient: 1.0,
    point: 1.0,
    parallel: 1.0,
  },
  autoRotate: true,
};

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000); // 纯黑色背景
  // scene.add(cube);
  //  scene.add(sphere);
  // scene.add(plane);
  // scene.add(sprite);
  // scene.add(point);
  // scene.add(line);
  // scene.add(line2);
  // scene.add(line3);
  // scene.add(line4);
  //scene.add(mountain);
  // scene.add(points);
   scene.add(bar);
  //scene.add(pig);
  // scene.add(tunnel);


  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  scene.add(pointLight);
  scene.add(parallelLight);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(400, 400, 400);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


 //时空隧道注释
  initGUI(ambientLight, pointLight, parallelLight);
}
//时空隧道注释
  function initGUI(ambientLight, pointLight, parallelLight) {
  gui = new GUI();

  // 环境光控制
  const ambientFolder = gui.addFolder('环境光');
  ambientFolder.add(ambientLight, 'intensity', 0, 2).name('强度').onChange(val => {
    ambientLight.intensity = val;
  });

  // 点光源控制
  const pointFolder = gui.addFolder('点光源');
  pointFolder.add(pointLight, 'intensity', 0, 2).name('强度').onChange(val => {
    pointLight.intensity = val;
  });

  // 平行光控制
  const parallelFolder = gui.addFolder('平行光');
  parallelFolder.add(parallelLight, 'intensity', 0, 2).name('强度').onChange(val => {
    parallelLight.intensity = val;
  });

  // 立方体控制
  const cubeFolder = gui.addFolder('立方体');
  cubeFolder.add(cube.position, 'x', -200, 200).name('X 位置');
  cubeFolder.add(cube.position, 'y', -200, 200).name('Y 位置');
  cubeFolder.add(cube.position, 'z', -200, 200).name('Z 位置');
  cubeFolder.addColor({ color: cube.material.color.getHex() }, 'color').name('颜色').onChange(val => {
    cube.material.color.setHex(val);
  });
  cubeFolder.add(cube.material, 'opacity', 0, 1).name('透明度').onChange(val => {
    cube.material.transparent = val < 1;
    cube.material.opacity = val;
  });

  // 球体控制
  const sphereFolder = gui.addFolder('球体');
  sphereFolder.add(sphere.position, 'x', -200, 200).name('X 位置');
  sphereFolder.add(sphere.position, 'y', -200, 200).name('Y 位置');
  sphereFolder.add(sphere.position, 'z', -200, 200).name('Z 位置');
  sphereFolder.addColor({ color: sphere.material.color.getHex() }, 'color').name('颜色').onChange(val => {
    sphere.material.color.setHex(val);
  });
  sphereFolder.add(sphere.material, 'opacity', 0, 1).name('透明度').onChange(val => {
    sphere.material.transparent = val < 1;
    sphere.material.opacity = val;
  });

  // 动画控制
  const animationFolder = gui.addFolder('动画');
  animationFolder.add({ autoRotate }, 'autoRotate').name('自动旋转').onChange(val => {
    autoRotate = val;
  });

  // 重置按钮
  gui.add({ reset: resetScene }, 'reset').name('重置');
}
//复位所有值
  function resetScene() {
  Object.assign(cube.position, initialState.cube.position);
  Object.assign(sphere.position, initialState.sphere.position);
  cube.material.color.setHex(initialState.cube.color);
  sphere.material.color.setHex(initialState.sphere.color);
  cube.material.opacity = initialState.cube.opacity;
  sphere.material.opacity = initialState.sphere.opacity;
  cube.material.transparent = initialState.cube.opacity < 1;
  sphere.material.transparent = initialState.sphere.opacity < 1;

  pointLight.intensity = initialState.lights.point;
  parallelLight.intensity = initialState.lights.parallel;
  autoRotate = initialState.autoRotate;

  gui.updateDisplay(); // 更新 GUI 界面
 }

  function animate() {
  requestAnimationFrame(animate);
  updatePosition();
  if (autoRotate) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}


//时空隧道的动画
// let i = 0;

// function animate() {
//     if (i >= tubepoints.length) i = 0;  // 到尾部循环回头

//     // 设置相机位置
//     camera.position.copy(tubepoints[i]);

//     // 计算下一个点索引，确保不会越界
//     const nextIndex = (i + 1) % tubepoints.length;

//     // 让相机面向下一个点，产生跟随效果
//     camera.lookAt(tubepoints[nextIndex]);

//     i++;

//     requestAnimationFrame(animate);

//     // 渲染场景和相机（如果你用的是Three.js渲染器）
//     renderer.render(scene, camera);
// }


window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
};

function initHelper() {
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', () => {
    renderer.render(scene, camera);
  });

  const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
  scene.add(gridHelper);
}

function initStats() {
  const stats = new Stats();
  document.body.appendChild(stats.domElement);
  function render() {
    stats.update();
    requestAnimationFrame(render);
  }
  render();
}

init();

//时空隧道注释
initHelper();
initStats();

animate();








