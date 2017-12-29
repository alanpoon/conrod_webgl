#[macro_use]
extern crate conrod;
use conrod::{color, widget, Widget,image};
use conrod::render::Primitives;
use conrod::widget::triangles::Triangle;
use conrod::Ui;
pub mod backend;
use std::os::raw::{c_double, c_int};
use std::slice;
use std::mem;
use std::ffi::{CString, CStr};
use std::os::raw::{c_char, c_void};

pub struct ConrodContainer<'a> {
    ui:Ui,
    image_map:image::Map<&'a mut [u8]>,
    ids:Ids,
    w:f64,
    h:f64
}
widget_ids!(struct Ids { triangles });
impl<'a> ConrodContainer<'a>{
    fn new(image_data:&'a mut [u8],width:f64,height:f64)->Self{
   let mut ui = conrod::UiBuilder::new([width as f64, height as f64]).build();
        // Generate the widget identifiers.
        
        let ids = Ids::new(ui.widget_id_generator());
        let mut image_map = conrod::image::Map::<&'a mut [u8]>::new();
        image_map.insert(image_data);

        ConrodContainer{
            ui:ui,
            image_map:image_map,
            ids:ids,
            w:width,
            h:height
        }
    }

}
#[no_mangle]
pub extern "C" fn test()->c_int {
    20
}

#[allow(no_mangle_generic_items)]
#[no_mangle]
pub unsafe extern "C" fn conrod_create<'a>(image_data: *mut u8,
                                                   size: usize,width:f64,height:f64)
                                                   -> *mut ConrodContainer<'a> {
    let image_data = slice::from_raw_parts_mut(image_data, size);
    Box::into_raw(Box::new(ConrodContainer::new(image_data,width,height)))
}

#[no_mangle]
pub unsafe extern "C" fn conrod_destroy(conrod_container: *mut ConrodContainer) {
    Box::from_raw(conrod_container);
}
#[no_mangle]
pub unsafe extern "C" fn conrod_step(conrod_container: *mut ConrodContainer,steps: u16) {
    //   let kmeans_painter = &mut *kmeans_painter;
    //kmeans_painter.step(steps);
}
#[no_mangle]
pub unsafe extern "C" fn conrod_mouseinput(conrod_container: *mut ConrodContainer,input:String,x:i16,y:i16) {
    let conrod_container = &mut *conrod_container;
    let input =  backend::js::convert_mouseinput(input,x as f64,y as f64,conrod_container.w,conrod_container.h);
    if let Some(_i)=input{
         conrod_container.ui.handle_event(_i);
    }
   
}
#[no_mangle]
pub unsafe extern "C" fn conrod_keyboardinput(conrod_container: *mut ConrodContainer,input:String,keycode:i16,shift:bool) {
    let conrod_container = &mut *conrod_container;
    let input =  backend::js::convert_keyboardinput(input,keycode,shift);
    if let Some(_i)=input{
         conrod_container.ui.handle_event(_i);
    }
   
}

#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;


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
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Vertex{
    data:Vec<usize>
}
#[no_mangle]
pub fn vertex_populate() -> *mut c_char {//input_ptr: *mut c_char
    /*let _input = unsafe {
        CStr::from_ptr(input_ptr)
    }.to_str().unwrap();
    */
    let _vertex =Vertex{
        data:vec![1,2,4,5,6]
    };
    let res = serde_json::to_string(&_vertex).unwrap();
    let c_str = CString::new(res).unwrap();
    c_str.into_raw()
}
