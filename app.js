// Importar Three.js y el GLTFLoader desde el CDN
const container = document.getElementById('container');

// 1. Crear la escena
const scene = new THREE.Scene();

// 2. Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1; // Mover la cámara más cerca para que el modelo se vea más grande

// 3. Crear el renderizador
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Agregar alpha para permitir fondo transparente
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// 4. Crear un cargador para el modelo GLB
const loader = new THREE.GLTFLoader();

// Variable global para almacenar el modelo
let model;

// 6. Crear luces
const ambientLight = new THREE.AmbientLight(0x404040); // Luz ambiental suave
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Luz direccional
directionalLight.position.set(0, 1, 1).normalize();
scene.add(directionalLight);

// Cargar el modelo GLB
loader.load('spider_man_mcu.glb', (gltf) => {
    model = gltf.scene;

    // Ajustar la posición y escala del modelo si es necesario
    model.position.set(0, 0, -2); // Colocarlo detrás del video
    model.scale.set(1, 1, 1);

    scene.add(model);
}, undefined, (error) => {
    console.error(error);
});

// 5. Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Verificar si el modelo ha sido cargado
    if (model) {
        // Rotar el modelo si se ha cargado
        model.rotation.x += 0.01;
        model.rotation.y += 0.01;
    }

    // Renderizar la escena con la cámara
    renderer.render(scene, camera);
}

// Iniciar la animación
animate();

// Ajustar el tamaño del renderizador al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Obtener el elemento de video
const video = document.getElementById('videoElement');

// Configurar la cámara para mostrar el video
async function setupCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error("Error accessing the camera: ", error);
    }
}

// Llamar a la función para configurar la cámara
setupCamera();
