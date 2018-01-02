"use strict";


var vs = `#version 300 es

in vec2 a_position;
in vec4 a_color;
in uint a_mode;

out vec4 v_color;
flat out uint v_Mode;
void main() {
  // Multiply the position by the matrix.
  gl_Position = vec4( vec3(a_position, 1).xy, 0, 1);

  // Copy the color from the attribute to the varying.
  v_color = a_color;
  v_Mode = a_mode;
}
`;

var fs = `#version 300 es

precision mediump float;

in vec4 v_color;
flat in uint v_Mode;
out vec4 outColor;

void main() {
  if (v_Mode == uint(0)) {
    outColor = v_color;
  } else {
   //  outColor = v_color;
  }
}
`;

function main3() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.getElementById("image_canvas");
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  // setup GLSL program
  var program = webglUtils.createProgramFromSources(gl, [vs, fs]);

  // look up where the vertex data needs to go.
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var colorLocation = gl.getAttribLocation(program, "a_color");
  var modeLocation = gl.getAttribLocation(program, "a_mode");
  // Create set of attributes
  var vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  // Create a buffer.
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // Set Geometry.
  setGeometry(gl);
  // tell the position attribute how to pull data out of the current ARRAY_BUFFER
  gl.enableVertexAttribArray(positionLocation);
  var size = 2;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0;
  var offset = 0;
  gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

// Create a buffer for the colors.
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // Set the colors.
  setColors(gl);
  // tell the color attribute how to pull data out of the current ARRAY_BUFFER
  gl.enableVertexAttribArray(colorLocation);
  var size = 4;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0;
  var offset = 0;
  gl.vertexAttribPointer(colorLocation, size, type, normalize, stride, offset);

// Create a buffer for the mode.
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // Set the mode.
  setMode(gl);
  // tell the color attribute how to pull data out of the current ARRAY_BUFFER
  gl.enableVertexAttribArray(modeLocation);
  var size = 1;
  var type = gl.UNSIGNED_INT;
  var stride = 0;
  var offset = 0;
  gl.vertexAttribIPointer(modeLocation, size, type, stride, offset);

  drawScene();

  // Draw the scene.
  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Compute the matrix
 
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);

    // Set the matrix.
 
    // Draw the geometry.
    var offset = 0;
    var count = 6;
    gl.drawArrays(gl.TRIANGLES, offset, count);
  }
}

// Fill the buffer with the values that define a triangle.
function setGeometry(gl) {
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
          -15, -15,
           15, -15,
          -15,  15,
           15, -15,
          -15,  15,
           15,  15,
      ]),
      gl.STATIC_DRAW);
}
function setColors(gl) {
  // Pick 2 random colors.
  var r1 = Math.random();
  var b1 = Math.random();
  var g1 = Math.random();
  var r2 = Math.random();
  var b2 = Math.random();
  var g2 = Math.random();
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
          r1, b1, g1, 1,
          r1, b1, g1, 1,
          r1, b1, g1, 1,
          r2, b2, g2, 1,
          r2, b2, g2, 1,
          r2, b2, g2, 1,
      ]),
      gl.STATIC_DRAW);
}
function setMode(gl) {

  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Uint32Array([
           1,
           1,
           1,
           1,
           1,
           1,
      ]),
      gl.STATIC_DRAW);
}
export {main3};
