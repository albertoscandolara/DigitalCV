// Models 
// Blender 
import allosaurus_gltf from 'url:../../../static/allosaurus.gltf';
import stegosaurus_gltf from 'url:../../../static/stegosaurus.gltf';

const gltf = {
    // Blender
    allosaurus_gltf,
    stegosaurus_gltf
}

let THREEPromise = import("https://unpkg.com/three@0.119.0/build/three.module.js");

let ScenePromise = import("https://unpkg.com/three@0.119.0/src/scenes/Scene.js");
let WebGLRendererPromise = import("https://unpkg.com/three@0.119.0/src/renderers/WebGLRenderer.js");
let PerspectiveCameraPromise = import("https://unpkg.com/three@0.119.0/src/cameras/PerspectiveCamera.js");
let GLTFLoaderPromise = import("https://unpkg.com/three@0.119.0/examples/jsm/loaders/GLTFLoader.js");

let OrbitControlsPromise = import("https://unpkg.com/three@0.116.0/examples/jsm/controls/OrbitControls.js");


class Model3DRendererView {
    _parentElement = document.querySelector('.app-container .certificate-view');
    _mainSectionElement = document.querySelector('.main-section');
    _data;

    render(data) {
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', markup);
        this._setRenderer();
        this._openWindow();

        this._setViewEventHandlers();
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function() {
        const markup = ``;
    }

    _generateMarkup() {
        return `
            <div class="window">
            <div class="header">
                <span class="certificate-title">
                    ${this._data.title}
                </span>
                <button class="close-window-button raised">
                    x
                </button>
            </div>
            <div class="body sunk">
                <div class="canvas">
                </div>
            </div>
            <div class="footer">
                <button class="back raised" title="Back">
                <span>
                    Back
                </span>
                </button>
            </div>
            </div>
        `;
    }

    _openWindow() {
        this._mainSectionElement.classList.add('blurred');
        this._parentElement.classList.remove('hidden');
        this._parentElement.classList.add('semi-transparent-background');
    }

    _closeWindow() {
        this._mainSectionElement.classList.remove('blurred');
        this._parentElement.classList.add('hidden');
        this._parentElement.classList.remove('semi-transparent-background');
    }

    _setViewEventHandlers() {
        // Close certificate view by clicking top-right 'x', bottom-right 'back' or outside modal window
        this._parentElement.querySelector('.close-window-button').addEventListener('click', () => this._closeWindow());
        this._parentElement.querySelector('.back').addEventListener('click', () => this._closeWindow());
        this._parentElement.addEventListener('click', (e) => {
            let window = e.target.closest('.window');
            if(window) return;
            this._closeWindow()}
        );
    }

    _setRenderer() {
        let parentElement = this._parentElement;
        let data = this._data;
        Promise.all([
            THREEPromise, 
            ScenePromise, 
            WebGLRendererPromise,
            PerspectiveCameraPromise, 
            GLTFLoaderPromise, 
            OrbitControlsPromise
        ]).then(
            ([
                THREE, 
                {Scene}, 
                {WebGLRenderer}, 
                {PerspectiveCamera},
                {GLTFLoader}, 
                {OrbitControls}
            ]) => {
                let scene, camera, renderer;
                async function init() {
                    scene = new Scene();
                    scene.background = new THREE.Color(0x181818);

                    camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
                    camera.position.set(30, 1, 15);
                    camera.lookAt(scene.position);
            
                    let hlight = new THREE.AmbientLight(0x404040, 10);
                    scene.add(hlight);
                    
                    let directionalLight = new THREE.DirectionalLight(0x666666, 10);
                    directionalLight.position.set(0, 1, 0);
                    directionalLight.castShadow = true;
                    scene.add(directionalLight);
                    
                    let light1 = new THREE.PointLight(0x666666);
                    light1.position.set(0, 300, 500);
                    scene.add(light1);
                    
                    let light2 = new THREE.PointLight(0x666666);
                    light2.position.set(500, 100, 0);
                    scene.add(light2);
                    
                    let light3 = new THREE.PointLight(0x666666);
                    light3.position.set(0, 100, -500);
                    scene.add(light3);
                    
                    let light4 = new THREE.PointLight(0x666666);
                    light4.position.set(-500, 300, 0);
                    scene.add(light4);
                    
                    let container = parentElement.querySelector('.canvas');
                    renderer = new WebGLRenderer({ antialias: true });
                    renderer.setSize(
                        (window.innerWidth * 96) /100, 
                        (window.innerHeight * 94) / 100
                        );

                    container.appendChild(renderer.domElement);
                    
                    let controls = new OrbitControls(camera, renderer.domElement);
                    controls.update();
                
                    let loader = new GLTFLoader();
                    loader.load(gltf[data.gltf], function (gltf) {
                        scene.add(gltf.scene);
                        animate();
                    }); 
                }
        
                function animate() {
                    resizeCanvasToDisplaySize();
                    renderer.render(scene, camera);
                    requestAnimationFrame(animate);
                }

                function resizeCanvasToDisplaySize() {
                    const canvas = renderer.domElement;
                    // look up the size the canvas is being displayed
                    const width = canvas.clientWidth;
                    const height = canvas.clientHeight;

                    // adjust displayBuffer size to match
                    if (canvas.width !== width || canvas.height !== height) {
                        // you must pass false here or three.js sadly fights the browser
                        renderer.setSize(width, height, false);
                        camera.aspect = width / height;
                        camera.updateProjectionMatrix();

                        // update any render target sizes here
                }
}

                init();
            });
    }
}

export default new Model3DRendererView();