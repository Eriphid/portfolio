export class Point {
    x: number;
    y: number;
    z: number;

    constructor(x?: number, y?: number, z?: number) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    distance(other: Point): number {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const dz = other.z - this.z;
        return Math.sqrt(Math.sqrt(dx ** 2 + dy ** 2) ** 2 + dz ** 2);
    }

    scale(scalar: number): void {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
    }

    translate(point: Point): void {
        this.x += point.x;
        this.y += point.y;
        this.z += point.z;
    }

    clone(): Point {
        return new Point(this.x, this.y, this.z);
    }
}