use conrod::event::Input;
use conrod::input::*;
use conrod::input::state::mouse;
use conrod::input::Key;
use conrod::input::Motion;
use backend::key;
pub fn convert_mouseinput(input:String,x:f64,y:f64,w:f64,h:f64)->Option<Input>{
    if input =="onmousemove".to_owned(){
        Some(Input::Motion(Motion::MouseCursor{x:x-w*0.5,y:y-h*0.5}))
    }else if input =="onmousedown".to_owned(){
        Some(Input::Press(Button::Mouse(mouse::Button::Left)))
    }else if input =="onmouseup".to_owned(){
         Some(Input::Release(Button::Mouse(mouse::Button::Left)))
    } else {None}
    
}
pub fn convert_keyboardinput(input:String,keycode:i16,shift:bool)->Option<Input>{
    if input =="keypress".to_owned() {
             let mut result=None;
             let k =key::key_vec();
             let len = k.iter().filter(|&&(code,_sh,_key)|{
                 code==keycode
             }).collect::<Vec<&(i16,bool,Key)>>().len();
             if len ==0{
                result= None;
             } else if len>1{
              let mut h=  k.iter().filter(|&&(code,_sh,_key)|{
                     let mut y=false;
                    if code==keycode{
                        if _sh==shift{
                            y=true;
                        }
                    }
                    y
                 }).map(|&(_,_,_key)|_key.clone()).collect::<Vec<Key>>();
                result= Some(h.remove(0));
             } else if len==1{
                   
                   let mut h=   k.iter().filter(|&&(code,_sh,_key)|{
                     let mut y=false;
                    if code==keycode{
                     y=true;
                    }
                    y
                 }).map(|&(_,_,_key)|_key.clone()).collect::<Vec<Key>>();
                 result=Some(h.remove(0));
             }
             if let Some(_s)= result{
                 Some(Input::Press(Button::Keyboard(_s)))
             } else{
                 None
             }
           
    } else {
         None
    }
}