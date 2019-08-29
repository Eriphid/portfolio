import { WebGLRenderTarget, WebGLRenderer, Vector2, Texture, PerspectiveCamera } from "three";
import { EffectComposer } from "@three/postprocessing/EffectComposer";
import { RenderPass } from "@three/postprocessing/RenderPass";
import { UnrealBloomPass } from "@three/postprocessing/UnrealBloomPass";
import { NexusRender } from "./nexusrender";
import { BackgroundRender } from "./background";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";

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
        this.nexusRender = new NexusRender(this.renderer, new PerspectiveCamera(50, width / height));
        this.nexusRender.camera.translateZ(5);

        this.initializePass();
    }

    private initializePass(): void {

        const bgPass = new RenderPass(this.bgRender.scene, this.bgRender.camera);
        const nexusPass = new RenderPass(this.nexusRender.scene, this.camera);

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
        this.bgRender.updateAspect(aspect);
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }
}