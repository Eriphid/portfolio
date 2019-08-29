import { Texture, MeshBasicMaterial, Mesh, PlaneGeometry, PerspectiveCamera, Scene, TextureLoader, Color } from "three";

const loader = new TextureLoader();

const material = new MeshBasicMaterial();
const texture = new Promise<THREE.Texture>((resolve, _reject): void => {
    material.map = loader.load("/images/background.png", (texture) => {
        texture.needsUpdate = true;
        resolve(texture);
    });
});

material.depthTest = false;
material.depthWrite = false;

export class BackgroundScene extends Scene {
    camera: PerspectiveCamera;
    constructor() {
        super();

        this.background = new Color(0.015, 0.015, 0.08);

        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight);
        this.camera.translateZ(1);

        const onTextureLoaded = (texture: Texture): void => {
            // debugger;
            const aspect: number = texture.image.width / texture.image.height;
            const geometry = aspect >= 1 ? new PlaneGeometry(aspect * 2, 2, 0) : new PlaneGeometry(2, 2 / aspect, 0);
            const mesh = new Mesh(
                geometry,
                material
            );
            this.add(mesh);
            // mesh.rotateX(10);
        };

        texture.then(onTextureLoaded);
        this.add(this.camera);
    }

    updateAspect(aspect: number): void {
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }
}