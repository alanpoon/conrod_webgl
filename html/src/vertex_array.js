import { WasmModule } from "./modules";
let loaded = false;
let create = () => { };

const load_wasm_exports = () => {
    loaded = true;
    create = WasmModule.exports.vertex_populate;
};
export class VertexArray {
     constructor() {
         if (!loaded) { load_wasm_exports(); }
         this.data = create();
     }
}