##
Conrod webgl
Test webgl with Conrod and Wasm
cargo update -p rand --precise 0.3.18

cargo +nightly build --release --target wasm32-unknown-unknown
python post_build.py
cd html/dist
python -m SimpleHTTPServer
conrod={path="../rust-ios-android/conrod",features = ["gfx_rs"]}

[lib]
crate-type = ["cdylib"] //don't use this

[patch.crates-io]
rand = { git = "https://github.com/aochagavia/rand.git", branch = "wasm" }
