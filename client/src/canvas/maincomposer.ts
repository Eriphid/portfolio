import { WebGLRenderTarget, WebGLRenderer, Vector2, Texture, PerspectiveCamera, LuminanceFormat } from "three";
import { EffectComposer } from "@three/postprocessing/EffectComposer";
import { RenderPass } from "@three/postprocessing/RenderPass";
import { UnrealBloomPass } from "@three/postprocessing/UnrealBloomPass";
import { NexusRender } from "./nexus/render";
import { BackgroundRender } from "./background";
import { SMAAPass } from "@three/postprocessing/SMAAPass";
import { Vector3 } from "three";

export class MainComposer {
    readonly renderTarget?: WebGLRenderTarget;

    composer: EffectComposer;
    bgRender: BackgroundRender;
    nexusRender: NexusRender;

    get camera(): PerspectiveCamera { return this.nexusRender.camera as PerspectiveCamera; }

    set renderer(value: WebGLRenderer) { this.composer.renderer = value; }
    get renderer(): WebGLRenderer { return this.composer.renderer; }

    get texture(): Texture | null {
        if (this.renderTarget)
            return this.renderTarget.texture;
        else {
            return this.composer.renderTarget2.texture;
        }
    }

    constructor(renderer: WebGLRenderer, width: number = window.innerWidth, height: number = window.innerHeight) {
        this.renderTarget = new WebGLRenderTarget(width, height);

        this.composer = new EffectComposer(renderer, this.renderTarget);
        this.composer.setSize(width, height);

        this.bgRender = new BackgroundRender();
        this.nexusRender = new NexusRender(this.renderer, new PerspectiveCamera(20, width / height));
        this.nexusRender.camera.translateZ(5);

        this.initializePass();

        window.addEventListener("mousemove", this.mouseMove.bind(this));
    }

    private initializePass(): void {

        const bgPass = new RenderPass(this.bgRender.scene, this.bgRender.camera);
        const nexusPass = new RenderPass(this.nexusRender.scene, this.nexusRender.camera);

        nexusPass.clear = false;

        this.composer.addPass(bgPass);
        this.composer.addPass(nexusPass);
        this.composer.addPass(new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 0.8, 0.4, 0.2));
        this.composer.addPass(new SMAAPass(window.innerWidth, window.innerHeight));
    }

    render(delta?: number): void {
        this.composer.render(delta);
    }

    setSize(w: number, h: number): void {
        const aspect = w / h;
        this.composer.setSize(w, h);
        this.bgRender.updateCamera(aspect);
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }
    alpha: number;
    arr: [] = [];
    private mouseMove(event: MouseEvent): void {
        const r = 5;

        const maxR = Math.min(window.innerHeight, window.innerWidth) / 2;
        let x = event.screenX - window.innerWidth * 0.5;
        let y = event.screenY - window.innerHeight * 0.5;
        const d = Math.min(Math.sqrt(x ** 2 + y ** 2), maxR)* 0.5 / maxR;

        let angleZ = Math.atan(x / y);
        if(y > 0)
            angleZ += Math.PI;
        this.alpha = angleZ;

        y = Math.cos(angleZ) * d * r;
        x = -Math.sin(angleZ) * d * r;

        const angleXY = Math.acos(d);

        const z = Math.sin(angleXY) * r;

        this.camera.position.set(x, y, z);
        this.camera.lookAt(x * 0.05, y * 0.05, 0);
    }
}