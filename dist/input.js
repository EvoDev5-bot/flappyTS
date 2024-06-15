export function includes(array, value) {
    return array.indexOf(value) != -1;
}
export class Input {
    constructor() {
        this.keys = [];
        document.addEventListener("keydown", (e) => {
            if (!includes(this.keys, e.key)) {
                this.keys.push(e.key);
            }
        });
        document.addEventListener("keyup", (e) => {
            this.keys.splice(this.keys.indexOf(e.key), 1);
        });
    }
}
