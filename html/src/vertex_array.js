import { WasmModule } from "./modules";
let loaded = false;
let create = () => { };

const load_wasm_exports = () => {
    loaded = true;
    create = WasmModule.cwrap("vertex_populate", "number", [ "number", "number"]);
};
export class VertexArray {
     constructor() {
         if (!loaded) { load_wasm_exports(); }
         this.data = create();
     }
}