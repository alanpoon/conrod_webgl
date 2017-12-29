pub mod js;
pub mod key;

/// The `Vertex` type passed to the vertex shader.
#[derive(Copy, Clone, Debug)]
pub struct Vertex {
    pub mode: u32,
    pub position: [f32; 2],
    pub tex_coords: [f32; 2],
    pub color: [f32; 4],
}