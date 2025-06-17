import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const loader = new GLTFLoader();
const mesh = new THREE.Group();
let mixer, actions, activeAction, gui;
let clock = new THREE.Clock();

function createGUI(model, animations) {
  // 定义动画状态和表情
  const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
  const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];

  // 创建GUI实例
  gui = new GUI({ width: 300 });

  // 创建动画混合器
  mixer = new THREE.AnimationMixer(model);

  // 存储所有动作
  actions = {};

  // 为每个动画片段创建动作
  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i];
    const action = mixer.clipAction(clip);
    actions[clip.name] = action;

    // 设置表情和某些状态的动画属性
    if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
    }
  }

  // 设置默认动作
  activeAction = actions['Idle'];
  activeAction.play();

  // 创建状态控制器
  const statesFolder = gui.addFolder('States');
  const stateControllers = {};

  states.forEach(state => {
    stateControllers[state] = function() {
      fadeToAction(state, 0.2);
    };
    statesFolder.add(stateControllers, state);
  });

  // 创建表情控制器
  const emoteFolder = gui.addFolder('Emotes');
  const emoteControllers = {};

  emotes.forEach(emote => {
    emoteControllers[emote] = function() {
      fadeToAction(emote, 0.2);
    };
    emoteFolder.add(emoteControllers, emote);
  });

  // 创建动画控制参数
  const settings = {
    '动画速度': 1.0,
    '过渡时间': 0.2,
    '显示线框': false,
    '重置所有': function() {
      fadeToAction('Idle', settings['过渡时间']);
    }
  };

  // 添加通用控制
  const controlsFolder = gui.addFolder('控制');
  controlsFolder.add(settings, '动画速度', 0.0, 2.0).onChange(function(value) {
    mixer.timeScale = value;
  });
  controlsFolder.add(settings, '过渡时间', 0.0, 1.0);
  controlsFolder.add(settings, '显示线框').onChange(function(value) {
    model.traverse(function(child) {
      if (child.isMesh) {
        child.material.wireframe = value;
      }
    });
  });
  controlsFolder.add(settings, '重置所有');

  // 默认打开状态文件夹
  statesFolder.open();
}

// 淡入淡出动画过渡
function fadeToAction(name, duration) {
  if (activeAction && actions[name]) {
    // 保存当前动作
    const currentAction = activeAction;

    // 淡出新动作
    activeAction = actions[name];
    activeAction.reset();
    activeAction.fadeIn(duration);
    activeAction.play();

    // 淡出旧动作
    currentAction.fadeOut(duration);
  }
}

// 动画循环
function animate() {
  requestAnimationFrame(animate);

  if (mixer) {
    const delta = clock.getDelta();
    mixer.update(delta);
  }
}

// 开始动画循环
animate();

// 加载模型
loader.load(
  './src/gltf/pig.gltf',
  function(gltf) {
    console.log('模型加载成功', gltf);



    mesh.add(gltf.scene);
    createGUI(gltf.scene, gltf.animations);
  },
  function(xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% 已加载');
  },
  function(error) {
    console.error('模型加载失败', error);
  }
);

export default mesh;