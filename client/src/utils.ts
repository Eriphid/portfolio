import { Size } from "./size";

export function getSizeFromWindow(): Size {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

export function getClientSizeFromDOMElement(element: Element): Size {
    return {
        width: element.clientWidth,
        height: element.clientHeight
    };
}