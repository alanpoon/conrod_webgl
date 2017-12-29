##
Conrod webgl
Test webgl with Conrod and Wasm

cargo +nightly build --release --target wasm32-unknown-unknown
python post_build.py

python -m SimpleHTTPServer