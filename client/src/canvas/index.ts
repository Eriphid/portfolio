import * as THREE from "three";
import { Scene, ReinhardToneMapping, WebGLRenderer, PerspectiveCamera } from "three";
import { MainScene } from "./mainscene";

declare global {
    interface Window {
        scene: Scene;
    }
}

export function createWebGLRenderer(container: HTMLElement): WebGLRenderer {
    let renderer: WebGLRenderer;

    const rendererParams: THREE.WebGLRendererParameters = {
        alpha: true,
        antialias: true
    };

    if (container instanceof HTMLCanvasElement) {
        renderer = new THREE.WebGLRenderer({
            ...rendererParams,
            canvas: container
        });
    } else {
        renderer = new THREE.WebGLRenderer(rendererParams);
        container.appendChild(renderer.domElement);
    }

    renderer.autoClear = false;
    renderer.toneMapping = ReinhardToneMapping;

    return renderer;
}

type Containers = ArrayLike<HTMLElement> | HTMLElement;

export function initialize(containers: Containers = document.querySelectorAll(".canvas-wrapper canvas, .canvas-wrapper") || document.body): void {

    const initializeEach = async (container: HTMLElement): Promise<void> => {
        const renderer = createWebGLRenderer(container);
        const camera = new PerspectiveCamera(50, container.clientWidth / container.clientHeight);
        const scene = new MainScene(renderer, camera);

        camera.translateZ(2);

        window.addEventListener("resize", () => {
            scene.setSize(container.clientWidth, container.clientHeight);
        });
        renderer.setAnimationLoop(scene.render.bind(scene));
    };

    if ("length" in containers) {
        for (let i = 0; i < containers.length; ++i) {
            initializeEach(containers[i]);
        }
    } else {
        initializeEach(containers);
    }
}

export default {
    initialize
};