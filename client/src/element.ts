import { Size } from "./size";
import { Mesh, PlaneGeometry, Geometry, BufferGeometry, Material, MeshLambertMaterial, Color, EdgesGeometry } from "three";

const defaultColor = new Color(0x05050f);
export class NexusElement extends Mesh {
    size: Size = new Size();

    material = new MeshLambertMaterial();
    geometry = new PlaneGeometry(1, 1);

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
        this.material.emissiveIntensity = 0.5;
    }

    constructor(
        geometry?: Geometry | BufferGeometry,
        material?: Material | Material[]
    );
    constructor(...args: []) {
        super(...args);

        this.color = defaultColor;
    }
}