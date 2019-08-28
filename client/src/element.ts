import { Point } from "./point";
import { Size } from "./size";

export class Element{
    position: Point = new Point();
    size: Size = new Size();

    get x(): number { return this.position.x; }
    set x(value: number) { this.position.x = value; }
    get y(): number { return this.position.y; }
    set y(value: number) { this.position.y = value; }
    get z(): number { return this.position.z; }
    set z(value: number) { this.position.z = value; }

    get width(): number { return this.size.width; }
    set width(value: number) { this.size.width = value; }
    get height(): number { return this.size.height; }
    set height(value: number) { this.size.height = value; }
}