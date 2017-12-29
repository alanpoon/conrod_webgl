from shutil import copyfile
from subprocess import call
call(['wasm-gc', 'target/wasm32-unknown-unknown/release/conrod_webgl.wasm', 'target/wasm32-unknown-unknown/release/program.wasm'])
copyfile('target/wasm32-unknown-unknown/release/program.wasm', 'html/dist/rust_libs/program.wasm')