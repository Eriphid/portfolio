const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera();

function resize(): void {
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function loop(_timestamp: DOMHighResTimeStamp): void {
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

function configure(scene: THREE.Scene): void {
    scene.background = new THREE.Color(0.015, 0.015, 0.08);
}

function initialize(): void {
    const container = document.getElementById("main-canvas") || document.body;

    configure(scene);
    container.appendChild(renderer.domElement);
    window.addEventListener("resize", resize);
    resize();

    loop(performance.now());
}

initialize();
