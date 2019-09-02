import * as THREE from "three";
import { Camera, AmbientLight, PointLight } from "three";
import { Nexus } from ".";


export class NexusRender {
    // background = new BackgroundScene();
    scene = new THREE.Scene();
    lights: {
        ambient: AmbientLight;
        spot: PointLight;
    }
    // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // renderer: THREE.WebGLRenderer;
    // canvas: HTMLCanvasElement;
    // bloomComposer: any;
    // composer: any;

    constructor(public renderer: THREE.Renderer, public camera: Camera) {
        // Debug
        // window.scene = this.scene;

        {
            this.lights = {
                spot: new PointLight(0xffffff, 15),
                ambient: new AmbientLight(0xffffff, 0.5)
            };
            this.lights.spot.translateZ(10);
            for (const key in this.lights) {
                const light = this.lights[key];
                this.scene.add(light);
            }
        }

        const nexus = new Nexus();

        nexus.add();
        nexus.add();
        nexus.add();

        nexus.update();

        nexus.layers.forEach(layer => layer.elements.forEach(x => this.scene.add(x.mesh)));
        // const e = new NexusElement();
        // this.scene.add(e.mesh);
        // e.width = 2.5;
        // e.height = 1.5;


        // this.camera.translateZ(2);


        // this.canvas = this.renderer.domElement;

        //Post Processing
        // const w = parent.clientWidth, h = parent.clientHeight;
        // const bloomRenderTarget = new WebGLRenderTarget(w, h);
        // this.bloomComposer = new EffectComposer(this.renderer, bloomRenderTarget);
        // this.composer = new EffectComposer(this.renderer);

        // {
        //     const copyShader = new ShaderPass(CopyShader);
        //     copyShader.renderToScreen = true;
        //     const bloom = new UnrealBloomPass(new Vector2(w, h), 2, 1, 0.02);
        //     const renderScene = new RenderPass(this.scene, this.camera);
        //     const FXAA = new ShaderPass(FXAAShader);
        //     FXAA.uniforms["resolution"].value.set(1 / w, 1 / h);

        //     renderScene.clearColor = new Color(0, 0, 0);
        //     renderScene.clearAlpha = 0;
        //     // renderScene.material.transparent = true;
        //     this.bloomComposer.addPass(renderScene);
        //     this.bloomComposer.addPass(bloom);
        //     this.bloomComposer.addPass(FXAA);
        //     this.bloomComposer.addPass(FXAA);
        //     this.bloomComposer.addPass(copyShader);
        //     this.bloomComposer.renderToScreen = false;
        // }

        // {
        //     const renderPass = new RenderPass(this.background, this.background.camera);
        //     const bloomPass = new ShaderPass(new ShaderMaterial({
        //         uniforms: {
        //             baseTexture: { value: null },
        //             bloomTexture: { value: bloomRenderTarget.texture }
        //         }
        //     }));
        //     this.composer.addPass(renderPass);
        //     // this.composer.addPass(bloomPass);
        //     this.composer.renderToScreen = true;
        // }
        // resize();
    }

    // startLoop(): void {
    //     const loop = (_timestamp: DOMHighResTimeStamp): void => {
    //         // this.renderer.render(this.background, this.background.camera);
    //         // // this.renderer.render(this.scene, this.camera);
    //         // this.renderer.clearDepth();
    //         this.bloomComposer.render();
    //         this.composer.render();

    //         // requestAnimationFrame(loop);
    //     };

    //     // this.renderer.setAnimationLoop(loop);
    // }

    render(): void {
        this.renderer.render(this.scene, this.camera);
    }
}
