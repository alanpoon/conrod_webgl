use std::os::raw::{c_double, c_int};


// These functions are provided by the runtime
extern "C" {

}

const initarray:[u8;12] = [
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
  ];
#[no_mangle]
pub unsafe extern "C" fn draw<'a>()->&'a u8 {
  &initarray[0]
}