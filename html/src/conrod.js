import { WasmModule } from "./modules";

let loaded = false;
let create = () => { };
let destroy = () => { };
let step = () => { };
let input =()=>{};

const load_wasm_exports = () => {
    loaded = true;
    create = WasmModule.cwrap("conrod_create", "number", [ "number", "number","number","number"]);
    destroy = WasmModule.cwrap("conrod_destroy", null, ["number"]);
    step = WasmModule.cwrap("conrod_step", null, ["number", "number"]);
    mouseinput = WasmModule.cwrap("conrod_mouseinput",null,["number","String","number","number"]);
    keyboardinput = WasmModule.cwrap("conrod_keyboardinput",null,["number","String","number","bool"]);

};


export class Conrod {
    constructor( image_memory) {
        if (!loaded) { load_wasm_exports(); }
        this.ptr = create(image_memory.get_ptr(), image_memory.get_byte_count(),1000.0,600.0);
    }
    step(steps) {
        step(this.ptr, steps);
    }
    mouseinput(_input,x,y){
        mouseinput(this.ptr,_input,x,y);
    }
    keyboardinput(_input,x,y){
        keyboardinput(this.ptr,_input,x,y);
    }
    free() {
        destroy(this.ptr);
    }
}
