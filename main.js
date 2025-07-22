import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const textRenderer = new CSS2DRenderer();
textRenderer.setSize( window.innerWidth, window.innerHeight );
textRenderer.domElement.style.position = 'absolute';
textRenderer.domElement.style.top = '0px';
document.body.appendChild( textRenderer.domElement );

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

const redMateral = new THREE.LineBasicMaterial( {color: 0xffffff } );
const greenMateral = new THREE.LineBasicMaterial( {color: 0xffffff } );
const blueMateral = new THREE.LineBasicMaterial( {color: 0xffffff } );
const yellowMaterial = new THREE.LineBasicMaterial( {color: 0xFFFF00 } );

const xAxisArr = [];
xAxisArr.push( new THREE.Vector3(0, 0, 0) );
xAxisArr.push( new THREE.Vector3(5, 0, 0) );

const xAxisGeometry = new THREE.BufferGeometry().setFromPoints( xAxisArr );
const xAxis = new THREE.Line( xAxisGeometry, redMateral );

const yAxisArr = [];
yAxisArr.push( new THREE.Vector3(0, 0, 0) );
yAxisArr.push( new THREE.Vector3(0, 5, 0) );

const yAxisGeometry = new THREE.BufferGeometry().setFromPoints( yAxisArr );
const yAxis = new THREE.Line( yAxisGeometry, greenMateral );

const zAxisArr = [];
zAxisArr.push( new THREE.Vector3(0, 0, 0) );
zAxisArr.push( new THREE.Vector3(0, 0, 5) );

const zAxisGeometry = new THREE.BufferGeometry().setFromPoints( zAxisArr );
const zAxis = new THREE.Line( zAxisGeometry, blueMateral );

scene.add( gridXZ );
scene.add( gridYZ );
scene.add( gridXY );

scene.add( xAxis );
scene.add( yAxis );
scene.add( zAxis );

const controls = new OrbitControls( camera, textRenderer.domElement );

const xAxisDiv = document.createElement( 'div' );
xAxisDiv.className = 'label';
xAxisDiv.textContent = 'x';
xAxisDiv.style.color = '#FFFFFF';
xAxisDiv.style.backgroundColor = 'transparent';

const yAxisDiv = document.createElement( 'div' );
yAxisDiv.className = 'label';
yAxisDiv.textContent = 'y';
yAxisDiv.style.color = '#FFFFFF';
yAxisDiv.style.backgroundColor = 'transparent';

const zAxisDiv = document.createElement( 'div' );
zAxisDiv.className = 'label';
zAxisDiv.textContent = 'z';
zAxisDiv.style.color = '#FFFFFF';
zAxisDiv.style.backgroundColor = 'transparent';

const xAxisLabel = new CSS2DObject( xAxisDiv );
xAxisLabel.position.set(5, 0, 0);
xAxisLabel.center.set( 1, 1 );
xAxis.add( xAxisLabel );

const yAxisLabel = new CSS2DObject( yAxisDiv );
yAxisLabel.position.set(0, 5, 0);
yAxisLabel.center.set( 1, 1 );
yAxis.add( yAxisLabel );

const zAxisLabel = new CSS2DObject( zAxisDiv );
zAxisLabel.position.set(0, 0, 5);
zAxisLabel.center.set( 1, 1 );
zAxis.add( zAxisLabel );

function createVector(name, coords) {
    const vectorArr = [];
    vectorArr.push( new THREE.Vector3(0, 0, 0) );
    vectorArr.push( new THREE.Vector3(coords[0], coords[1], coords[2]) );

    const vectorGeometry = new THREE.BufferGeometry().setFromPoints( vectorArr );
    const vector = new THREE.Line( vectorGeometry, yellowMaterial );

    const vectorDiv = document.createElement( 'div' );
    vectorDiv.className = 'label';
    vectorDiv.textContent = name;
    vectorDiv.style.color = '#FFFFFF';
    vectorDiv.style.backgroundColor = 'transparent';

    const vectorLabel = new CSS2DObject( vectorDiv );
    vectorLabel.position.set(coords[0], coords[1], coords[2]);
    vectorLabel.center.set( 1, 1 );
    vector.add( vectorLabel );

    return vector;
}

scene.add(createVector("v", [3, 3, 3]));
scene.add(createVector("u", [1, 2, -4]));
scene.add(createVector("w", [-3, -4, 1]))

function animate() {
    controls.update();
    renderer.render( scene, camera );
    textRenderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );