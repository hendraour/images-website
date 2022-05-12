let WIDTH
let HEIGHT
let aspectRatio = function() {
  return WIDTH / HEIGHT
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera(32, aspectRatio(), 1, 1000)
camera.position.set(0, 10, 50)

function resize() {
  WIDTH = window.innerWidth
  HEIGHT = window.innerHeight
  renderer.setSize(WIDTH, HEIGHT)
  camera.aspect = aspectRatio()
  camera.updateProjectionMatrix()
}
resize()

window.addEventListener("resize", resize)

const scene = new THREE.Scene()

const light = new THREE.DirectionalLight(0xffffff, 1, Infinity)
light.position.set(0, 0, 1)
camera.add(light)

scene.add(camera)

const sun = new THREE.DirectionalLight(0xffffcc)
sun.position.set(0, 1, 0)
scene.add(sun)


// populate the scene

let geo = new THREE.BoxBufferGeometry(10, 10, 10)
let mat = new THREE.MeshLambertMaterial({
    color: "red"
})
let mesh = new THREE.Mesh(geo, mat)
scene.add(mesh)

let tex = new THREE.TextureLoader().load("https://raw.githubusercontent.com/hendraour/images-website/main/download.png")
tex.anisotropy = 32
tex.repeat.set(100, 100)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping
geo = new THREE.PlaneBufferGeometry(10000, 10000)
mat = new THREE.MeshLambertMaterial({
  map: tex
})
mesh = new THREE.Mesh(geo, mat)
mesh.position.set(0, -5, 0)
mesh.rotation.set(Math.PI / -2, 0, 0)
scene.add(mesh)


let axis = new THREE.Vector3(0, 1, 0)
function updateCamera() {
  camera.position.applyAxisAngle(axis, 0.001)
}

// rendering functions

function render() {
  renderer.render(scene, camera)
  camera.lookAt(scene.position)
}

let animationLoopId = null

function animationLoop() {
  animationLoopId = requestAnimationFrame(animationLoop)
  updateCamera()
  render()
}

animationLoop()