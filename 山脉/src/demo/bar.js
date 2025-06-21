import * as THREE from 'three';

const group = new THREE.Group();

// 创建坐标轴线
function createLine(type) {
    const points = [
        new THREE.Vector3(0, 0, 0),
        type === 'y' ? new THREE.Vector3(0, 100, 0) : new THREE.Vector3(100, 0, 0)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    return new THREE.Line(geometry, material);
}

// 创建坐标轴刻度线
function createScaleLine(type) {
    const points = [];
    for (let i = 0; i <= 100; i += 10) {
        if (type === 'y') {
            points.push(new THREE.Vector3(0, i, 0));
            points.push(new THREE.Vector3(-5, i, 0));
        } else {
            points.push(new THREE.Vector3(i, 0, 0));
            points.push(new THREE.Vector3(i, -5, 0));
        }
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x999999 });
    return new THREE.LineSegments(geometry, material);
}

// 创建数值标签
function createTextSprite(message) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const canvasWidth = 512;
    const canvasHeight = 256;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const fontSize = 128;
    context.font = `bold ${fontSize}px Arial`;
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineWidth = 8;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // 先描边，再填充
    context.strokeText(message, canvasWidth / 2, canvasHeight / 2);
    context.fillText(message, canvasWidth / 2, canvasHeight / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter; // 防止缩小时模糊
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(14, 7, 1); // 字体更大
    return sprite;
}


// 创建柱状图
function createBar(dataArr) {
    const barGroup = new THREE.Group();
    dataArr.forEach((data, index) => {
        const geometry = new THREE.PlaneGeometry(10, data);
        geometry.toNonIndexed();

        const material = new THREE.MeshBasicMaterial({
            vertexColors: true,
            side: THREE.DoubleSide
        });

        const position = geometry.getAttribute('position');
        const height = 100;
        const colorArr = [];
        const color1 = new THREE.Color(0xff0000);
        const color2 = new THREE.Color(0x0000ff);

        for (let i = 0; i < position.count; i++) {
            const percent = (position.getY(i) + data / 2) / height;
            const c = color1.clone().lerp(color2, percent);
            colorArr.push(c.r, c.g, c.b);
        }
        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorArr), 3));

        const mesh = new THREE.Mesh(geometry, material);
        const x = index * 20 + 15;
        const y = data / 2;
        mesh.position.set(x, y, 0);
        barGroup.add(mesh);

        // 添加文字
        const textSprite = createTextSprite(data.toString());
        textSprite.position.set(x, data + 5, 0.1); // 高于柱子一点
        barGroup.add(textSprite);
    });
    return barGroup;
}

// 使用
const xline = createLine('x');
const yline = createLine('y');
const yScaleLine = createScaleLine('y');
const xScaleLine = createScaleLine('x');
const bars = createBar([10, 20, 30, 70, 50]);

group.add(xline, yline, yScaleLine, xScaleLine, bars);

export default group;

