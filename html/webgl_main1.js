var data;
function imports() {
    var reader = new FileReader();
    reader.onload = function() {
        data = reader.result;
    };
    reader.readAsArrayBuffer("/assets/rust.png");
    // The real loading and running of our wasm starts here
    let imports = {data  };
    return imports;
  }
  fetch("program.wasm").then(response =>
    response.arrayBuffer()
  ).then(bytes =>
    WebAssembly.instantiate(bytes, { env: imports() })
  ).then(results => {
    let module = {};
    let mod = results.instance;
    module.test = mod.exports.test;
    // Get A WebGL context
    var canvas = document.getElementById("c");
    var gl = canvas.getContext("webgl");
    if (!gl) {
      return;
    }
      console.log("wasm.result",module.result());
    console.log("hi",module.test());
  });
