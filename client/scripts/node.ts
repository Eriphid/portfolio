import { Element } from "./element";

export class Project extends Element {
    name: string;

    constructor(name: string){
        super();
        this.name = name;
    }
}
