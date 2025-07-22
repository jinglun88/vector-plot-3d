import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const textRenderer = new CSS2DRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( textRenderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);
camera.position.z = 10;

const gridSize = 10;
const gridXZ = new THREE.GridHelper( 10, 10, 0xFFFFFF, 0x236B8E );
const gridXY = new THREE.GridHelper( 10, 10, 0xFFFFFF, 0x236B8E );
const gridYZ = new THREE.GridHelper( 10, 10, 0xFFFFFF, 0x236B8E );

gridXY.rotation.x = Math.PI/2;
gridYZ.rotation.z = Math.PI/2;

const redMateral = new THREE.LineBasicMaterial( {color: 0xff0000 } );
const greenMateral = new THREE.LineBasicMaterial( {color: 0x00ff0 } );
const blueMateral = new THREE.LineBasicMaterial( {color: 0x0000ff } );

const xAxisArr = [];
xAxisArr.push( new THREE.Vector3(0, 0, 0) );
xAxisArr.push( new THREE.Vector3(10, 0, 0) );

const xAxisGeometry = new THREE.BufferGeometry().setFromPoints( xAxisArr );
const xAxis = new THREE.Line( xAxisGeometry, redMateral );

const yAxisArr = [];
yAxisArr.push( new THREE.Vector3(0, 0, 0) );
yAxisArr.push( new THREE.Vector3(0, 10, 0) );

const yAxisGeometry = new THREE.BufferGeometry().setFromPoints( yAxisArr );
const yAxis = new THREE.Line( yAxisGeometry, greenMateral );

const zAxisArr = [];
zAxisArr.push( new THREE.Vector3(0, 0, 0) );
zAxisArr.push( new THREE.Vector3(0, 0, 10) );

const zAxisGeometry = new THREE.BufferGeometry().setFromPoints( zAxisArr );
const zAxis = new THREE.Line( zAxisGeometry, blueMateral );

scene.add( gridXZ );
scene.add( gridYZ );
scene.add( gridXY );

scene.add( xAxis );
scene.add( yAxis );
scene.add( zAxis );

const controls = new OrbitControls( camera, renderer.domElement );



function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render( scene, camera );
    textRenderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );