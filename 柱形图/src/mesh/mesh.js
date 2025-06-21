const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
});
const mesh = new THREE.Mesh(geometry, material);

const group = new THREE.Group();
mesh.position.x = 200;
group.add(mesh);            // 正确添加 mesh
group.position.x = 200;
group.translateZ(200);      // 正确调用移动方法

console.log(mesh);
export default group;
