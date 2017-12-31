/* External JavaScript Imports */
import $ from "jquery";
/* JavaScript Imports */
import { load_wasm_module, native_support } from "./modules";
import { WasmModule,Memory } from "./modules";
import { ImageMemory } from "./image_memory";
import { Conrod } from "./conrod.js";
import {VertexArray} from "./vertex_array.js";
import {draw,pre_draw,initBuffers,draw_scene} from "./draw.js";
/* CSS Imports */

/* Image Imports */
import default_image_filepath from "../assets/rust.png";

let STOP = false;

const image2image_data = (image) => {
    const temp_canvas = document.createElement("canvas");
    const temp_canvas_context = temp_canvas.getContext("2d");
    temp_canvas.width = image.width;
    temp_canvas.height = image.height;
    temp_canvas_context.drawImage(image, 0, 0);
    return temp_canvas_context.getImageData(0, 0, image.width, image.height);
};

const filepath2image_data = (filepath) => (
    new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image2image_data(image));
        image.onabort = (event) => reject(event);
        image.onerror = (event) => reject(event);
        image.src = filepath;
    })
);

const file2image_data = (file) => (
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        const image = new Image();
        reader.onload = (event) => {
            image.onload = () => resolve(image2image_data(image));
            image.src = event.target.result;
        };
        reader.onabort = (event) => reject(event);
        reader.onerror = (event) => reject(event);
        reader.readAsDataURL(file);
    })
);
  function allocStr(mem,str) {
            const buf = Buffer.from(str);
            const ptr = WasmModule.exports.alloc(buf.length + 1);
            mem.set(buf, ptr);
            mem[buf.length] = 0; // write null byte
            return ptr;
        }

    function copyCStr(mem, ptr) {
            let end = ptr;
            while (mem[end] !== 0) {
                end++;
        }
        return Buffer.from(mem.buffer, ptr, end-ptr).toString();
    }

$(document).ready(() => {
    const canvas = document.getElementById("image_canvas");

    /* Load the default image. */
    load_wasm_module().then(() => {
        console.log("hi2");
        return filepath2image_data(default_image_filepath);
    }).then((default_image_data) => {
        let wasm_image_memory = null;
        const new_image = (new_image_data) => {
            if (native_support()) {
                if (wasm_image_memory) { wasm_image_memory.free(); }
                wasm_image_memory = new ImageMemory(new_image_data, WasmModule);
              //  draw_image_data(wasm_image_memory.get_image_data(), canvas);

            var canvas = document.getElementById("c");
            var gl = canvas.getContext("webgl");
            if (!gl) {
                return;
            }
            
              let start = null;
            let prevTimestamp = null;
            let con_container=   new Conrod(wasm_image_memory);
            
            let drawAndUpdate = (timestamp) => {
                 // Initialization
                if (!prevTimestamp) {
                    start = timestamp;
                    prevTimestamp = timestamp;
                    requestAnimationFrame(drawAndUpdate);
                    return;
                }
            }
           
            }
          
        };
         var heap = new Uint8Array(WasmModule.exports.memory.buffer);

      
       
             
            const person = {
            firstName: 'foo',
            lastName: 'bar',
            };
            const personJson = JSON.stringify(person);

        /*    const personPtr = allocStr(heap, personJson);
            console.log("personPtr",personPtr);
            const testPtr = allocStr(heap, "asd");
            console.log("testPtr",testPtr);
            const greetingPtr = WasmModule.exports.hello(personPtr);
            WasmModule.exports.dealloc(personPtr);

            const greetingJson = copyCStr(heap, greetingPtr);
            WasmModule.exports.dealloc(greetingPtr);
            const { message,array } = JSON.parse(greetingJson);
            console.log(message);
            console.log("array",array);
            */
             const dataptr = WasmModule.exports.vertex_populate();
             const dataJson = copyCStr(heap, dataptr);
             WasmModule.exports.dealloc(dataptr);
             const data = JSON.parse(dataJson);
             console.log("data",data);
      //  draw("image_canvas",data);
        var canvas = document.getElementById("image_canvas");
        var gl = canvas.getContext("webgl2");
        if (!gl) {
            return;
        }
      const program =pre_draw(gl);
      const programInfo = {
        program: program,
        attribLocations: {
        vertexPosition: gl.getAttribLocation(program, 'a_Pos'),
        vertexUv:gl.getAttribLocation(program,'a_Uv'),
        vertexColor: gl.getAttribLocation(program, 'a_Color'),
        vertexMode: gl.getAttribLocation(program, 'a_Mode'),
        },
        uniformLocations: {
        color2D: gl.getUniformLocation(program, 't_Color'),
        },
    };
    const buffer = initBuffers(gl,data);
      draw_scene(gl,buffer,programInfo);
        function u(){

        };
        setTimeout(() => u(), 500);
    });
});
