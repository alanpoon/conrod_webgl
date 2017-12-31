use std::mem;
use std::ffi::{CString, CStr};
use std::os::raw::{c_char, c_void};

#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;
//pub mod backend;
fn main() {}

#[no_mangle]
pub fn alloc(size: usize) -> *mut c_void {
    let mut buf = Vec::with_capacity(size);
    let ptr = buf.as_mut_ptr();
    mem::forget(buf);
    return ptr as *mut c_void;
}

#[no_mangle]
pub fn dealloc(ptr: *mut c_void, cap: usize) {
    unsafe  {
        let _buf = Vec::from_raw_parts(ptr, 0, cap);
    }
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Person {
    first_name: String,
    last_name: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Greeting {
    message: String,
    array:Vec<usize>
}

#[no_mangle]
pub fn hello(input_ptr: *mut c_char) -> *mut c_char {
    let input = unsafe {
        CStr::from_ptr(input_ptr)
    }.to_str().unwrap();
    let person: Person = serde_json::from_str(input).unwrap();
    let message = format!(
        "Hello, {} {}! Welcome to Rust World!!",
        person.first_name,
        person.last_name
    );
    let array = vec![1,2,4,5,6];
    let greeting = Greeting { message,array };
    let res = serde_json::to_string(&greeting).unwrap();
    let c_str = CString::new(res).unwrap();
    c_str.into_raw()
}
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Vertex{
    pos: [f32; 2],
    uv: [f32; 2],
    color: [f32; 4],
    mode: u32
}
impl Vertex{
    pub fn new(pos:[f32;2])->Self{
        Vertex{
            pos:pos,
            uv:[0.0,0.0],
            color:[1.0,1.0,0.5,0.25],
            mode:2
        }
    }
}
#[no_mangle]
pub fn vertex_populate() -> *mut c_char {//input_ptr: *mut c_char
    let _vertex_array = vec![Vertex::new([-0.33333334, 0.23809524]),Vertex::new([0.33333334, -0.23809524]),
    Vertex::new([-0.33333334, -0.23809524]),Vertex::new([-0.33333334, 0.23809524]),Vertex::new([-0.33333334, 0.23809524]),
    Vertex::new([0.33333334, -0.23809524]),Vertex::new([0.33333334, 0.23809524])];
    let res = serde_json::to_string(&_vertex_array).unwrap();
    let c_str = CString::new(res).unwrap();
    c_str.into_raw()
}
#[macro_use]
extern crate conrod;
use conrod::{color, widget, Widget,image};
use conrod::render::Primitives;
use conrod::widget::triangles::Triangle;
use conrod::Ui;
widget_ids!(struct Ids { triangles });
pub struct ConrodContainer<'a> {
    ui:Ui,
    image_map:image::Map<&'a mut [u8]>,
    ids:Ids,
    w:f64,
    h:f64
}