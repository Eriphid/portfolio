import { Size } from "../../size";
import { Mesh, MeshLambertMaterial, Color, PlaneBufferGeometry, Geometry, BufferGeometry } from "three";

export interface Link {
    a: NexusElement;
    b: NexusElement;
    mesh: Mesh;
    update(): void;
}

const defaultColor = new Color(0x05050f);
export class NexusElement {
    readonly mesh: Mesh = new Mesh();
    size: Size = new Size();


    links: Link[] = [];

    get material(): MeshLambertMaterial { return this.mesh.material as MeshLambertMaterial; }
    set material(value: MeshLambertMaterial) { this.mesh.material = value; }

    get geometry(): PlaneBufferGeometry { return this.mesh.geometry as PlaneBufferGeometry; }
    set geometry(value: PlaneBufferGeometry) { this.mesh.geometry = value; }

    get position(): Mesh["position"] { return this.mesh.position; }
    get scale(): Mesh["scale"] { return this.mesh.scale; }

    get x(): number { return this.position.x; }
    get y(): number { return this.position.y; }
    get z(): number { return this.position.z; }

    get width(): number { return this.scale.x; }
    set width(value: number) { this.scale.x = value; }
    get height(): number { return this.scale.y; }
    set height(value: number) { this.scale.y = value; }

    get color(): Color { return this.material.color; }
    set color(value: Color) {
        this.material.color = value;
        this.material.emissive = value;
    }

    constructor() {
        this.geometry = new PlaneBufferGeometry(1, 1);
        this.material = new MeshLambertMaterial();

        this.material.emissiveIntensity = 0.5;
        this.color = defaultColor;
    }


    static connect(a: NexusElement, b: NexusElement): Link {
        const mesh = new Mesh();
        const link: Link = {
            a,
            b,
            mesh,
            update: () => {
                const geometry = new Geometry();
                geometry.vertices = [
                    a.position,
                    b.position
                ];
                mesh.geometry = new BufferGeometry().fromGeometry(geometry);
            }
        };
        link.update();
        a.links.push(link);
        b.links.push(link);
        return link;
    }
}