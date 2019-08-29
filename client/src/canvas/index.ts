import * as THREE from "three";
import { Scene, ReinhardToneMapping, WebGLRenderer, PerspectiveCamera, Color, Vector2 } from "three";
import { NexusRender } from "./nexusrender";
import { MainComposer } from "./maincomposer";
import { getSizeFromWindow, getClientSizeFromDOMElement } from "../utils";
import { BackgroundRender } from "./background";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { SMAAPass } from "@three/postprocessing/SMAAPass";
declare global {
    interface Window {
        scene: Scene;
    }
}

export function createWebGLRenderer(container: HTMLElement): WebGLRenderer {
    let renderer: WebGLRenderer;

    const rendererParams: THREE.WebGLRendererParameters = { };

    if (container instanceof HTMLCanvasElement) {
        renderer = new THREE.WebGLRenderer({
            ...rendererParams,
            canvas: container
        });
    } else {
        renderer = new THREE.WebGLRenderer(rendererParams);
        container.appendChild(renderer.domElement);
    }
    renderer.toneMapping = ReinhardToneMapping;

    return renderer;
}

type Containers = ArrayLike<HTMLElement> | HTMLElement;

export function initialize(containers: Containers = document.querySelectorAll(".canvas-wrapper canvas, .canvas-wrapper") || document.body): void {

    const initializeEach = async (container: HTMLElement): Promise<void> => {
        const renderer = createWebGLRenderer(container);
        const composer = new MainComposer(renderer, container.clientWidth, container.clientHeight);

        function updateSize(): void {
            const parent = renderer.domElement.parentElement;
            const size = parent ? getClientSizeFromDOMElement(parent) : getSizeFromWindow();
            renderer.setSize(size.width, size.height);
            composer.setSize(size.width, size.height);
        }

        window.addEventListener("resize", updateSize);
        updateSize();

        let lastTimestamp: DOMHighResTimeStamp;
        renderer.setAnimationLoop((now: DOMHighResTimeStamp) => {
            composer.camera.rotateZ(0.01);
            if (lastTimestamp)
                composer.render(lastTimestamp - now);
            else
                composer.render();
            lastTimestamp = now;
        });
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