export let WasmModule = false;
const wasm_path = "rust_libs/program.wasm";
//const wasm_path = "rust_libs/rust-wasm.wasm";
export const load_wasm_module = () => (
    new Promise((resolve, reject) => {
        fetch(wasm_path).then((response) => {
            if (response.ok) {
                window.WasmModule = {};
                return response.arrayBuffer();
            } else {
                throw "Unable to load wasm module!";
            }
        }).then((buffer) => {
           window.WasmModule= new WebAssembly.Instance(new WebAssembly.Module(buffer));
           // window.WasmModule.wasmBinary = buffer;
           // WebAssembly.instantiate(bytes, { env: imports() })
           return;
        }).then(() => {
            WasmModule = window.WasmModule;
            console.log("hi");
            resolve();
        }).catch((err) => {
            console.error(err);
            reject();
        });
    })
);

export const native_support = () => ("WebAssembly" in window);