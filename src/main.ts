import {
    Vector3,
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    PointLight
} from 'three';

import { Snake } from './models/snake.model';

import './styles/main.css';

// Set the scene size.
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;
const BACKGROUND_COLOR = 0xF0F0F0;
const SNAKE_COLOR = 0x00FF00;
const LIGHT_COLOR = 0xFFFFFF;

// Create a WebGL renderer, camera
// and a scene
const renderer = new WebGLRenderer();
const camera =
    new PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );

const scene = new Scene();

// Add the camera to the scene.
scene.add(camera);

// Start the renderer.
renderer.setSize(WIDTH, HEIGHT);

// Attach the renderer-supplied
// DOM element.
document.body.appendChild(renderer.domElement);

const Orientation = {
    UP: new Vector3(0, 1, 0),
    DOWN: new Vector3(0, -1, 0),
    LEFT: new Vector3(-1, 0, 0),
    RIGHT: new Vector3(1, 0, 0)
};


let playerOrientation = Orientation.RIGHT;

const snake = new Snake(new Vector3(0, 0, 0), SNAKE_COLOR, playerOrientation, scene);

// For illustrating purposes, until the food spawn mechanic is ready
snake.eat();
snake.eat();
snake.eat();
snake.eat();
snake.eat();

camera.position.z = 15;
camera.lookAt(snake.getPosition());

// create a point light
const pointLight = new PointLight(LIGHT_COLOR);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

renderer.setClearColor(BACKGROUND_COLOR);

// Event listener for the controls
document.addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
        case 'w':
            playerOrientation = Orientation.UP;
            break;
        case 's':
            playerOrientation = Orientation.DOWN;
            break;
        case 'a':
            playerOrientation = Orientation.LEFT;
            break;
        case 'd':
            playerOrientation = Orientation.RIGHT;
            break;
    }
});

// convert vertical fov to radians
const vFOV = camera.fov * Math.PI / 180;
// visible height
const frustrumHeight = Math.tan(vFOV / 2) * camera.position.z;


// visible width
const frustrumWidth = frustrumHeight * ASPECT;


let now = performance.now();
let lastFrame = now;
let deltaTime = 0;
const snakeSpeed = 100;

/**
 * Main animation loop
 */
function animate() {
    requestAnimationFrame(animate);

    now = performance.now();
    deltaTime = now - lastFrame;

    if (deltaTime >= snakeSpeed) {
        lastFrame = now;

        snake.move(playerOrientation);

        if (snake.getPosition().x > frustrumWidth) {
            snake.setPosition(new Vector3(-frustrumWidth, snake.getPosition().y));
        } else if (snake.getPosition().x < -frustrumWidth) {
            snake.setPosition(new Vector3(frustrumWidth, snake.getPosition().y));
        }

        if (snake.getPosition().y > frustrumHeight) {
            snake.setPosition(new Vector3(snake.getPosition().x, -frustrumHeight));
        } else if (snake.getPosition().y < -frustrumHeight) {
            snake.setPosition(new Vector3(snake.getPosition().x, frustrumHeight));
        }

        renderer.render(scene, camera);
    }
}

animate();


// Mockup for the collision
for (var vertexIndex = 0; vertexIndex < Player.geometry.vertices.length; vertexIndex++) {
    var localVertex = Player.geometry.vertices[vertexIndex].clone();
    var globalVertex = Player.matrix.multiplyVector3(localVertex);
    var directionVector = globalVertex.subSelf(Player.position);

    var ray = new THREE.Ray(Player.position, directionVector.clone().normalize());
    var collisionResults = ray.intersectObjects(collidableMeshList);
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
        // a collision occurred... do something...
    }
}
