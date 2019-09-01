import { Texture, MeshBasicMaterial, Mesh, PlaneGeometry, PerspectiveCamera, Scene, TextureLoader, Color } from "three";

const loader = new TextureLoader();

function degFromRad(rad: number): number {
    return rad * 180 / Math.PI;
}

const fov = degFromRad(2 * Math.atan(1));
let textureAspect = 1;
const material = new MeshBasicMaterial();
const texture = new Promise<THREE.Texture>((resolve, _reject): void => {
    material.map = loader.load("/images/background.png", (texture) => {
        texture.needsUpdate = true;
        textureAspect = texture.image.width / texture.image.height;
        resolve(texture);
    });
});

material.depthTest = false;
material.depthWrite = false;

export class BackgroundRender {
    scene: Scene;
    camera: PerspectiveCamera;

    constructor() {
        this.scene = new Scene();
        this.scene.background = new Color(0.015, 0.015, 0.08);

        this.camera = new PerspectiveCamera(fov, window.innerWidth / window.innerHeight);
        this.camera.translateZ(1);

        const onTextureLoaded = (texture: Texture): void => {
            // debugger;
            const aspect: number = texture.image.width / texture.image.height;
            const geometry = aspect >= 1 ? new PlaneGeometry(aspect * 2, 2, 0) : new PlaneGeometry(2, 2 / aspect, 0);
            const mesh = new Mesh(
                geometry,
                material
            );
            this.updateCamera();
            this.scene.add(mesh);
            // mesh.rotateX(10);
        };

        texture.then(onTextureLoaded);
        this.scene.add(this.camera);
    }

    updateCamera(aspect?: number): void {
        if (aspect)
            this.camera.aspect = aspect;
        else
            aspect = this.camera.aspect;
        const d = this.camera.position.z;
        if (aspect > textureAspect) {
            this.camera.fov = degFromRad(2 * Math.atan(1 * textureAspect / (aspect * d)));
        } else {
            this.camera.fov = degFromRad(2 * Math.atan(1 / d));
        }
        this.camera.updateProjectionMatrix();
    }
}