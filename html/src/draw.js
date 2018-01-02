
function draw(canva,positions){
    // Get A WebGL context
  var canvas = document.getElementById(canva);
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  // Get the strings for our GLSL shaders
  var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
  var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

  // Link the two shaders into a program
  var program = webglUtils.createProgramFromSources(gl, [vertexShaderSource, fragmentShaderSource]);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // code above this line is initialization code.
  // code below this line is rendering code.

 // webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset)

  // draw
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 3;
  gl.drawArrays(primitiveType, offset, count);
}
function pre_draw(gl){
  var vertexShaderSource = document.getElementById("2d-vertex-shader-new").text;
  var fragmentShaderSource = document.getElementById("2d-fragment-shader-new").text;
    // create GLSL shaders, upload the GLSL source, compile the shaders
  var program = webglUtils.createProgramFromSources(gl, [vertexShaderSource, fragmentShaderSource]);  // Link the two shaders into a program
  gl.linkProgram(program);
  return program;
}
 const person = {
            firstName: 'foo',
            lastName: 'bar',
          };
  function initBuffers(gl,data){
     var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([].concat(data.map(function(x){return x.pos;}))), gl.STATIC_DRAW);
  // 
  var uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([].concat(data.map(function(x){return x.uv;}))), gl.STATIC_DRAW);
  //
  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([].concat(data.map(function(x){return x.color;}))) , gl.STATIC_DRAW);
  //
    var modeBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, modeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([].concat(data.map(function(x){return x.mode;}))) , gl.STATIC_DRAW);
  return {
    position:positionBuffer,
    uv:uvBuffer,
    color:colorBuffer,
    mode:modeBuffer
  };
  }       
function draw_scene(gl,buffer,programInfo,vao,program){
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
   
    gl.bindVertexArray(vao);
    

{  
  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition, size, type, normalize, stride, offset);
  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position);
}
{
 var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      programInfo.attribLocations.vertexUv, size, type, normalize, stride, offset);
  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.uv);
}
{
 var size = 4;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor, size, type, normalize, stride, offset);
  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.color);
}
{
 var size = 1;          // 1 components per iteration
  var type = gl.UNSIGNED_INT;   // the data is 32bit ints
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      programInfo.attribLocations.vertexMode, size, type, normalize, stride, offset);
  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.mode);
}
 
    gl.useProgram(program);
  // draw
  var primitiveType = gl.TRIANGLE;
  var offset = 0;
  var count = 7;
  gl.drawArrays(primitiveType, offset, count);
}
export {draw,pre_draw,initBuffers,draw_scene};