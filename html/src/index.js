/* External JavaScript Imports */
import $ from "jquery";
/* JavaScript Imports */
import { load_wasm_module, native_support } from "./modules";
import { WasmModule } from "./modules";
import { ImageMemory } from "./image_memory";
import { Conrod } from "./conrod.js";
import {VertexArray} from "./vertex_array.js";
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


$(document).ready(() => {
    const canvas = document.getElementById("image_canvas");

    /* Load the default image. */
    load_wasm_module().then(() => {
        return filepath2image_data(default_image_filepath);
    }).then((default_image_data) => {
        let wasm_image_memory = null;
        const new_image = (new_image_data) => {
            if (native_support()) {
                if (wasm_image_memory) { wasm_image_memory.free(); }
                wasm_image_memory = new ImageMemory(new_image_data, WasmModule);
              //  draw_image_data(wasm_image_memory.get_image_data(), canvas);
              var heap = new Uint8Array(WasmModule.memory.buffer);

function allocStr(mem, str) {
  const buf = Buffer.from(str);
  const ptr = WasmModule.cwrap("alloc","number",["number"])(buf.length + 1);
  heap.set(buf, ptr);
  heap[buf.length] = 0; // write null byte
  return ptr;
}

function copyCStr(mem, ptr) {
  let end = ptr;
  while (mem[end] !== 0) {
    end++;
  }

  return Buffer.from(mem.buffer, ptr, end-ptr).toString();
}

              vertex_data = new VertexArray();
              var datajson = JSON.stringify(vertex_data.data);
              var dataptr = allocStr(heap,datajson);
              var datajson2= copyCStr(heap, dataptr);
              WasmModule.cwrap("dealloc","number",["number","number"])(dataptr);
              var data_r= JSON.parse(datajson2);
              console.log(data_r);
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
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
  

        function u(){

        };
        setTimeout(() => u(), 500);
    });
});
