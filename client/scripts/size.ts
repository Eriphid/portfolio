export class Size{
    width: number;
    height: number;

    constructor(w?: number, h?: number){
        this.width = w || 0;
        this.height = h || 0;
    }
}