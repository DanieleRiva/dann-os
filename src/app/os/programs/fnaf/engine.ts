export class Engine {
    public mouseX: number = 0;
    public mouseY: number = 0;

    public nodes: Record<string, HTMLElement | null> = {};

    public registerNode(name: string, element: HTMLElement | null) {
        this.nodes[name] = element;
    }

    public updateMousePosition(x: number, y: number) {
        this.mouseX = x;
        this.mouseY = y;
    }

    private panCamera() {

    }

    public destroy() {
        this.nodes = {};
    }
}