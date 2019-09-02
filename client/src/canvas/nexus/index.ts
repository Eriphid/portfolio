import { NexusElement } from "./element";
import { Mesh } from "three";

// function fibonacciNext(suite: number[]) {
//     return suite[length - 1] + suite[length - 2];
// }

// function fibonacci(cumulUnder: number): number[] {
//     const suite = [0, 1];
//     let cumul = 1;
//     while (cumul < cumulUnder) {
//         const next = fibonacciNext(suite);
//         suite.push(next);
//         cumul += next;
//     }
//     return suite;
// }

interface Layer {
    elements: NexusElement[];
    maxLinks: number;
    nbLinks: number;
    capacity: number;
    next?: Layer;
    prev?: Layer;
    [Symbol.iterator]: () => IterableIterator<NexusElement>;
}

function nextCapacity(layers: Layer[]): number {
    switch (layers.length) {
        case 0:
            return 1;
        case 1:
            return 1;
        default:
            return layers[layers.length - 2].capacity + layers[layers.length - 1].capacity;
    }
}

function createNextLayer(layers: Layer[]): Layer {
    const capacity = nextCapacity(layers);
    const prev = layers[layers.length - 1] as Layer | undefined; 
    const newLayer: Layer = {
        capacity,
        elements: [],
        maxLinks: capacity + (prev ? prev.capacity : 0),
        nbLinks: 0,
        [Symbol.iterator]: () => newLayer.elements[Symbol.iterator](),
        prev
    };
    if (prev)
        prev.next = newLayer;
    return newLayer;
}

function createLayers(cumul: number): Layer[] {
    const layers: Layer[] = [];
    while (cumul > layers.length) {
        layers.unshift(createNextLayer(layers));
    }
    return layers;
}

function findLinkableElements(layer: Layer): NexusElement[] {
    const minLinks = Math.min(...layer.elements.map(x => x.links.length));
    const linkables = layer.elements.filter(x => x.links.length === minLinks);
    return linkables;
}

export class Nexus {
    private _nodes: NexusElement[] = [];

    core?: NexusElement;
    layers: Layer[] = [];
    links: Mesh[] = [];

    add(): void {
        const element = new NexusElement();
        this._nodes.push(element);
        // let layer = this.layers[length - 1];
        // if (!layer || layer.elements.length < layer.capacity) {
        //     layer = createNextLayer(this.layers);
        //     this.layers.push(layer);
        // }

        // layer.elements.push(element);
        // const minLinks = Math.min(...layer.elements.map(x => x.links.length));
        // const linkables = layer.elements.filter(x => x.links.length === minLinks);
        // const linkTarget = linkables[Math.random() * length];

        // linkTarget.links.push(element);
    }

    update(): void {
        this.layers = createLayers(this._nodes.length);

        let i = 0;
        for (const layer of this.layers) {
            while (i < layer.capacity && i < this._nodes.length) {
                const node = this._nodes[i];

                const linkables = findLinkableElements(layer);
                const target = linkables[Math.random() * linkables.length];

                if(target) {
                    NexusElement.connect(node, target);
                } else {

                }

                layer.elements.push(node);
                ++i;
            }
        }
    }
}