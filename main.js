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

let zoomFactor = 1;
const r = 5;
const gridSize = 2*r;
let gridXZ = new THREE.GridHelper( gridSize, 10, 0xFFFFFF, 0x236B8E );
let gridXY = new THREE.GridHelper( gridSize, 10, 0xFFFFFF, 0x236B8E );
let gridYZ = new THREE.GridHelper( gridSize, 10, 0xFFFFFF, 0x236B8E );
const gridPositions = [];


const redMateral = new THREE.LineBasicMaterial( {color: 0xffffff } );
const greenMateral = new THREE.LineBasicMaterial( {color: 0xffffff } );
const blueMateral = new THREE.LineBasicMaterial( {color: 0xffffff } );
const realBlueMateral = new THREE.LineBasicMaterial( {color: 0x236B8E } );
const edgeMaterial = new THREE.LineBasicMaterial( {color: 0xABDBE3, transparent: true, opacity: 0.8 });

const yellowMaterial = new THREE.LineBasicMaterial( {color: 0xFFFF00 } );

const bluePlaneMaterial = new THREE.MeshBasicMaterial( {color: 0x8888FF, side: THREE.DoubleSide, transparent: true, opacity: 0.3 } );
const CoordinatePlaneMaterial = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: 0 });
const shadowMaterial = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: 0.03});
const whiteLineMaterial = new THREE.LineBasicMaterial( {color: 0xFFFFFF });

const SHADOW_DISTANCE = 70;
const shadowShapes = [];
const shadowGeometries = [];
const shadowMeshes = [];
for (let i = 0; i < SHADOW_DISTANCE; i++) {
    const shadowPoints = [];
    shadowPoints.push(new THREE.Vector2(-5*Math.sqrt(3), -5*Math.sqrt(3)));
    shadowPoints.push(new THREE.Vector2(-5*Math.sqrt(3), 5*Math.sqrt(3)));
    shadowPoints.push(new THREE.Vector2(5*Math.sqrt(3), 5*Math.sqrt(3)));
    shadowPoints.push(new THREE.Vector2(5*Math.sqrt(3), -5*Math.sqrt(3)));
    shadowShapes.push(new THREE.Shape(shadowPoints));
    shadowGeometries.push(new THREE.ShapeGeometry(shadowShapes[i]));
    shadowMeshes.push(new THREE.Mesh(shadowGeometries[i], shadowMaterial));
    shadowMeshes[i].renderOrder = 2;
    scene.add(shadowMeshes[i]);
}

const planePoints = [];
planePoints.push(new THREE.Vector2(-r, -r));
planePoints.push(new THREE.Vector2(-r, r));
planePoints.push(new THREE.Vector2(r, r));
planePoints.push(new THREE.Vector2(r, -r));
const XZplaneShape = new THREE.Shape(planePoints);
const XYplaneShape = new THREE.Shape(planePoints);
const YZplaneShape = new THREE.Shape(planePoints);

const XZgeometry = new THREE.ShapeGeometry(XZplaneShape);
const XYgeometry = new THREE.ShapeGeometry(XYplaneShape);
const YZgeometry = new THREE.ShapeGeometry(YZplaneShape);

const XZplane = new THREE.Mesh(XZgeometry, CoordinatePlaneMaterial);
const XYplane = new THREE.Mesh(XYgeometry, CoordinatePlaneMaterial);
const YZplane = new THREE.Mesh(YZgeometry, CoordinatePlaneMaterial);

const cubeEdges = [];
cubeEdges.push(new THREE.Line3(new THREE.Vector3(-r, -r, -r), new THREE.Vector3(-r, -r, r)));
cubeEdges.push(new THREE.Line3(new THREE.Vector3(-r, -r, -r), new THREE.Vector3(-r, r, -r)));
cubeEdges.push(new THREE.Line3(new THREE.Vector3(-r, -r, -r), new THREE.Vector3(r, -r, -r)));
cubeEdges.push(new THREE.Line3(new THREE.Vector3(-r, r, r), new THREE.Vector3(-r, r, -r)));
cubeEdges.push(new THREE.Line3(new THREE.Vector3(-r, r, r), new THREE.Vector3(r, r, r)));
cubeEdges.push(new THREE.Line3(new THREE.Vector3(-r, r, r), new THREE.Vector3(-r, -r, r)));
cubeEdges.push(new THREE.Line3(new THREE.Vector3(r, r, -r), new THREE.Vector3(-r, r, -r)));
cubeEdges.push(new THREE.Line3(new THREE.Vector3(r, r, -r), new THREE.Vector3(r, -r, -r)));
cubeEdges.push(new THREE.Line3(new THREE.Vector3(r, r, -r), new THREE.Vector3(r, r, r)));
cubeEdges.push(new THREE.Line3(new THREE.Vector3(r, -r, r), new THREE.Vector3(-r, -r, r)));
cubeEdges.push(new THREE.Line3(new THREE.Vector3(r, -r, r), new THREE.Vector3(r, r, r)));
cubeEdges.push(new THREE.Line3(new THREE.Vector3(r, -r, r), new THREE.Vector3(r, -r, -r)));
for (let i = 0; i < cubeEdges.length; i++) {
    const edgeGeometry = new THREE.BufferGeometry().setFromPoints( [cubeEdges[i].start, cubeEdges[i].end] );
    const edge = new THREE.Line( edgeGeometry, realBlueMateral );
    scene.add(edge);
}

const planeLines = [];
const XZpoints = [];
const XYpoints = [];
const YZpoints = [];

XZpoints.push(new THREE.Vector3(-r, 0, -r));
XZpoints.push(new THREE.Vector3(-r, 0, r));
XZpoints.push(new THREE.Vector3(r, 0, r));
XZpoints.push(new THREE.Vector3(r, 0, -r));
XZpoints.push(XZpoints[0]);

XYpoints.push(new THREE.Vector3(-r, -r, 0));
XYpoints.push(new THREE.Vector3(-r, r, 0));
XYpoints.push(new THREE.Vector3(r, r, 0));
XYpoints.push(new THREE.Vector3(r, -r, 0));
XYpoints.push(XYpoints[0]);

YZpoints.push(new THREE.Vector3(0, -r, -r));
YZpoints.push(new THREE.Vector3(0, -r, r));
YZpoints.push(new THREE.Vector3(0, r, r));
YZpoints.push(new THREE.Vector3(0, r, -r));
YZpoints.push(YZpoints[0]);

planeLines.push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(XZpoints), whiteLineMaterial));
planeLines.push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(XYpoints), whiteLineMaterial));
planeLines.push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(YZpoints), whiteLineMaterial));

for (let i = 0; i < 3; i++){
    planeLines[i].renderOrder = 1;
    scene.add(planeLines[i]);
}

gridXY.rotation.x = Math.PI/2;
gridYZ.rotation.z = Math.PI/2;

XYplane.rotation.x = Math.PI/2;
YZplane.rotation.y = Math.PI/2;

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

XZplane.renderOrder = 1;
XYplane.renderOrder = 1;
YZplane.renderOrder = 1;

// scene.add( XZplane );
// scene.add( XYplane );
// scene.add( YZplane );

scene.add( xAxis );
scene.add( yAxis );
scene.add( zAxis );

const controls = new OrbitControls( camera, textRenderer.domElement );
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false;

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
xAxisLabel.position.set(r+0.5, 0, 0);
xAxisLabel.center.set( 1, 1 );
xAxis.add( xAxisLabel );

const yAxisLabel = new CSS2DObject( yAxisDiv );
yAxisLabel.position.set(0, r+0.5, 0);
yAxisLabel.center.set( 1, 1 );
yAxis.add( yAxisLabel );

const zAxisLabel = new CSS2DObject( zAxisDiv );
zAxisLabel.position.set(0, 0, r+0.5);
zAxisLabel.center.set( 1, 1 );
zAxis.add( zAxisLabel );

const originDiv = document.createElement( 'div' );
originDiv.className = 'originLabel';
originDiv.textContent = '0';
originDiv.style.color = '#FFFFFF';
originDiv.style.backgroundColor = 'transparent';

const originLabel = new CSS2DObject( originDiv );
originLabel.position.set(0, 0, 0);
originLabel.center.set( 0, 1 );
xAxis.add(originLabel);

const collapsible = document.getElementById("collapsible");
const gui = document.getElementById("gui");

collapsible.addEventListener('click', function () {
    if (gui.style.display != "none"){
        gui.style.display = "none";
    }
    else {
        gui.style.display = "block";
    }
})

const vectors = {};

class Vector3D {
    constructor(vector, element, x, y, z) {
        this.vector = vector; // Actually a THREE.line
        this.element = element; // DOM element
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

const vectorList = document.getElementById("vectorList");

const planeList = document.getElementById("planeList");

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
    vectorDiv.appendChild(document.createTextNode(String.fromCodePoint(8407)));

    const vectorLabel = new CSS2DObject( vectorDiv );
    vectorLabel.position.set(coords[0], coords[1], coords[2]);
    vectorLabel.center.set( 1, 1 );
    vector.add( vectorLabel );

    const vectorNode = document.createElement("div");
    const nameSpan = document.createElement("span");
    const nameNode = document.createTextNode(name + " ");
    const coordsNode = document.createTextNode("[" + coords[0] + "," + coords[1] + "," + coords[2] + "]");
    const deleteNode = document.createElement("button");

    nameSpan.className = "vectorName"
    deleteNode.className = "vectorDeleteButton"

    nameSpan.appendChild(nameNode);
    nameSpan.appendChild(document.createTextNode(String.fromCodePoint(8407)));
    vectorNode.appendChild(nameSpan);
    vectorNode.appendChild(coordsNode);
    vectorNode.appendChild(deleteNode);
    vectorList.appendChild(vectorNode);

    const vectorOption1 = document.createElement("option");
    const vectorOption2 = document.createElement("option");
    vectorOption1.value = name;
    vectorOption2.value = name;
    const vectorOption1Text = document.createTextNode(name);
    const vectoroption2Text = document.createTextNode(name);
    vectorOption1.appendChild(vectorOption1Text);
    vectorOption2.appendChild(vectoroption2Text);
    const vectorSelect1 = document.getElementById("vector1Name");
    const vectorSelect2 = document.getElementById("vector2Name");
    vectorSelect1.appendChild(vectorOption1);
    vectorSelect2.appendChild(vectorOption2);
    

    deleteNode.addEventListener("click", function() {
        vector.remove(vectorLabel);
        scene.remove(vector);
        vector.geometry.dispose();
        vector.material.dispose();
        delete vectors[name];
        const parent = deleteNode.parentNode;
        parent.replaceChildren();
        parent.parentNode.removeChild(parent);
        vectorOption1.removeChild(vectorOption1Text);
        vectorOption2.removeChild(vectoroption2Text);
        vectorSelect1.removeChild(vectorOption1);
        vectorSelect2.removeChild(vectorOption2);
    })

    const vectorObject = new Vector3D(vector, vectorNode, coords[0], coords[1], coords[2]);

    vectors[name] = vectorObject;

    return vector;
}

function crossProduct(v1, v2) {
    const result = [v1[1]*v2[2]-v2[1]*v1[2], -v1[0]*v2[2]+v2[0]*v1[2], v1[0]*v2[1]-v2[0]*v1[1]];
    return result;
}

const planes = {};

class Plane3D {
    constructor(plane, edges, orthoBasis, element, name) {
        this.plane = plane;
        this.edges = edges;
        this.orthoBasis = orthoBasis; // Orthonormal basis
        this.element = element; // DOM element
    }
}

function createPlane(vecName1, vecName2, name) {
    // need to refactor this at some point it's horrible
    const vec1 = vectors[vecName1].vector;
    const vec2 = vectors[vecName2].vector;
    const uPos = vec1.geometry.attributes.position;
    const vPos = vec2.geometry.attributes.position;
    const u = new THREE.Vector3(uPos.getX(1), uPos.getY(1), uPos.getZ(1));
    const v = new THREE.Vector3(vPos.getX(1), vPos.getY(1), vPos.getZ(1));
    
    const normalVec = new THREE.Vector3().crossVectors(u, v);

    const plane = new THREE.Plane(normalVec.normalize());
    
    const intersectionsUnfiltered = [];
    for (let i = 0; i < cubeEdges.length; i++) {
        const poi = new THREE.Vector3();
        const intersection = plane.intersectLine(cubeEdges[i], poi);
        if (intersection != null){
            if (Math.abs(poi.x) <= r && Math.abs(poi.y) <= r && Math.abs(poi.z) <= r) {
                intersectionsUnfiltered.push(poi);
            }
        }
    }
    const intersections = [];
    for (let i = 0; i < intersectionsUnfiltered.length; i++){
        let duplicate = false;
        const i1 = intersectionsUnfiltered[i];
        for (let j = 0; j < intersections.length; j++){
            const i2 = intersections[j];
            if (i1.x == i2.x && i1.y == i2.y && i1.z == i2.z){
                duplicate = true;
                break;
            }
        }
        if (!duplicate){
            intersections.push(i1);
        }
    }
    let temp;
    for (let i = 0; i < intersections.length; i++){
        for (let j = i + 1; j < intersections.length; j++){
            if (checkSharedFace(intersections[i], intersections[j])) {
                temp = intersections[i+1];
                intersections[i+1] = intersections[j];
                intersections[j] = temp;
                break;
            }
        }
    }

    const vOrtho = new THREE.Vector3().crossVectors(u, plane.normal).normalize();
    const transform3D = new THREE.Matrix4().makeBasis(u.normalize(), vOrtho, plane.normal);
    const transform2D = new THREE.Matrix4().copy(transform3D).invert();
    for (let i = 0; i < intersections.length; i++){
        intersections[i].applyMatrix4(transform2D);
    }
    const intersections2D = intersections.map(p => new THREE.Vector2(p.x, p.y));
    const plane2D = new THREE.Shape(intersections2D);
    const geometry2D = new THREE.ShapeGeometry(plane2D);
    const geometryEdge = new THREE.EdgesGeometry(geometry2D);
    const edgeLines = new THREE.Line(geometryEdge, edgeMaterial);
    const mesh = new THREE.Mesh(
        geometry2D,
        bluePlaneMaterial
    );
    const orthogonalBasis = [u, vOrtho, plane.normal];
    mesh.applyMatrix4(transform3D);
    edgeLines.applyMatrix4(transform3D);
    mesh.renderOrder = 1;
    scene.add(mesh);
    scene.add(edgeLines);

    const planeNode = document.createElement("div");
    const nameSpan = document.createElement("span");
    const nameNode = document.createTextNode(name + ": ");
    const vectorsNode = document.createTextNode("Span(" + vecName1 + ", " + vecName2 + ")");
    const deleteNode = document.createElement("button");

    nameSpan.className = "planeName"
    deleteNode.className = "planeDeleteButton"
    planeNode.className = "planeInfo"

    nameSpan.appendChild(nameNode);
    nameSpan.appendChild(document.createTextNode(String.fromCodePoint(8407))); // arrow doesn't display for some reason
    planeNode.appendChild(nameSpan);
    planeNode.appendChild(vectorsNode);
    planeNode.appendChild(deleteNode);
    planeList.appendChild(planeNode);

    planes[name] = (new Plane3D(mesh, edgeLines, orthogonalBasis, planeNode, name));

    deleteNode.addEventListener("click", function() {
        scene.remove(planes[name].plane)
        planes[name].plane.geometry.dispose();
        planes[name].plane.material.dispose();
        scene.remove(planes[name].edges);
        planes[name].edges.geometry.dispose();
        planes[name].edges.material.dispose();
        delete planes[name];
        const parent = deleteNode.parentNode;
        parent.removeChild(deleteNode);
        parent.parentNode.removeChild(parent);
    })
}

// Used to sort the vertices of planes so they are in the correct order to form the shape geometry
// If two vertices are on the same face then they will share an x, y, or z coordinate of r
function checkSharedFace(p1, p2) {
    return ((p1.x == p2.x && Math.abs(p1.x) == r) || (p1.y == p2.y && Math.abs(p1.y) == r) || (p1.z == p2.z && Math.abs(p1.z) == r));
}

const nameField = document.getElementById("vectorName");
const xField = document.getElementById("vectorX");
const yField = document.getElementById("vectorY");
const zField = document.getElementById("vectorZ");
const newVectorButton = document.getElementById("newVectorButton");

newVectorButton.addEventListener("click", function() {
    const vectorName = nameField.value;
    if (vectors.hasOwnProperty(vectorName)) {
        return;
    }
    const xCoord = parseInt(xField.value);
    const yCoord = parseInt(yField.value);
    const zCoord = parseInt(zField.value);
    if (isNaN(xCoord) || isNaN(yCoord) || isNaN(zCoord)){
        return;
    }
    nameField.value = "";
    xField.value = "";
    yField.value = "";
    zField.value = "";
    scene.add(createVector(vectorName, [xCoord, yCoord, zCoord]));
})

const planeVector1Field = document.getElementById("vector1Name");
const planeVector2Field = document.getElementById("vector2Name");
const planeNameField = document.getElementById("planeName");
const newPlaneButton = document.getElementById("newPlaneButton");

newPlaneButton.addEventListener("click", function() {
    const planeName = planeNameField.value;
    if (planes.hasOwnProperty(planeName)) {
        return;
    }
    const vector1Name = planeVector1Field.value;
    const vector2Name = planeVector2Field.value;
    planeVector1Field.value = "";
    planeVector2Field.value = "";
    planeNameField.value = "";
    createPlane(vector1Name, vector2Name, planeName);
})

// Some default vectors for testing
scene.add(createVector("v", [1, 2, 1]));
scene.add(createVector("u", [4, 0, -3]));
scene.add(createVector("w", [1, -1, 3]));

const selectType = document.getElementById("typeSelect");

const vectorBuilder = document.getElementById("vectorBuilder");
const planeBuilder = document.getElementById("planeBuilder");

selectType.addEventListener('change', function() {
    const selected = selectType.value;
    if (selected == "vector"){
        vectorBuilder.style.display = "block";
        planeBuilder.style.display = "none";
    }
    else{
        vectorBuilder.style.display = "none";
        planeBuilder.style.display = "block";
    }
})

document.addEventListener("wheel", function (event) {
    if (event.deltaY < 0){
        zoomFactor *= 1.1;
    }
    else {
        zoomFactor *= (1/1.1);
    }
})

const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");

zoomIn.addEventListener('click', function () {
    camera.position.x /= 1.1;
    camera.position.y /= 1.1;
    camera.position.z /= 1.1;
})

zoomOut.addEventListener('click', function () {
    camera.position.x *= 1.1;
    camera.position.y *= 1.1;
    camera.position.z *= 1.1;
})

function updateShadows () {
    for (let i = 0; i < SHADOW_DISTANCE; i++){
        const extraRotation = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, 0, 0));
        const relativePosition = camera.position.clone().normalize();
        const cameraMatrix = new THREE.Matrix4().copy(camera.matrix);
        cameraMatrix.multiply(extraRotation);
        shadowMeshes[i].setRotationFromMatrix(cameraMatrix);
        shadowMeshes[i].position.copy(relativePosition.multiplyScalar((i-50)*0.1*Math.sqrt(3)));
    }
}

function updateVectors () {
    for (const key in vectors) {
        if (vectors.hasOwnProperty(key)) {
            const vectorObj = vectors[key];
            const positionReference = vectorObj.vector.geometry.attributes.position;
            positionReference.setXYZ(1, vectorObj.x*zoomFactor, vectorObj.y*zoomFactor, vectorObj.z*zoomFactor);
            positionReference.needsUpdate = true;

            const label = vectorObj.vector.children[0];
            label.position.x = vectorObj.x*zoomFactor;
            label.position.y = vectorObj.y*zoomFactor;
            label.position.z = vectorObj.z*zoomFactor;
            label.needsUpdate = true;
        }
    }
}

function drawScale () {
    // Calculate the size of the grid squares for the new scale
    const scale = r/zoomFactor;
    let squareSizeMax = scale/4;
    const largestPower = Math.pow(10, Math.floor(Math.log10(squareSizeMax)));
    let squareSize = largestPower;
    if (largestPower*2 <= squareSizeMax){
        squareSize = largestPower*2;
    }
    if (largestPower*2.5 <= squareSizeMax){
        squareSize = largestPower*2.5;
    }
    if (largestPower*5 <= squareSizeMax){
        squareSize = largestPower*5;
    }

    const squares = Math.floor(scale/squareSize);

    // Remove old grids and generate new grids
    const grids = [gridXZ, gridXY, gridYZ];
    for (let i = 0; i < 3; i++) {
        scene.remove(grids[i]);
        grids[i].material.dispose();
        grids[i].geometry.dispose();
    }
    const newXZ = new THREE.GridHelper(2*r*squares*squareSize/scale, squares*2, 0xFFFFFF, 0x236B8E );
    const newXY = new THREE.GridHelper(2*r*squares*squareSize/scale, squares*2, 0xFFFFFF, 0x236B8E );
    const newYZ = new THREE.GridHelper(2*r*squares*squareSize/scale, squares*2, 0xFFFFFF, 0x236B8E );
    newXY.rotation.x = Math.PI/2;
    newYZ.rotation.z = Math.PI/2;
    gridPositions.length = 0;
    gridPositions.push(newXZ.geometry.attributes.position.array);
    gridPositions.push(newXY.geometry.attributes.position.array);
    gridPositions.push(newYZ.geometry.attributes.position.array);

    // Extend the grid lines to the edges of the plane (looks better visually)
    for (let j = 0; j < 3; j++){
        for (let i = 0; i < gridPositions[0].length; i+= 12) {
            gridPositions[j][i] = -r;
            gridPositions[j][i+3] = r;
            gridPositions[j][i+8] = -r;
            gridPositions[j][i+11] = r;
        }
    }

    // Remove the old scale labels
    const axes = [xAxis, yAxis, zAxis];
    for (let i = 0; i < axes.length; i++){
        for (let j = 0; j < axes[i].children.length; j++){
            if (axes[i].children[j].element.className == 'scaleLabel') {
                scene.remove(axes[i].children[j]);
                axes[i].children[j].removeFromParent();
            }
        }
    }
    
    // Redraw the scale labels and the coordinate planes with the current zoom factor
    for (let i = -Math.floor(squares/2)*2; i <= squares; i += 2) {
        if (i != 0){
            const axes = [xAxis, yAxis, zAxis];
            const labelPos = squareSize*i*zoomFactor;

            for (let j = 0; j < 3; j++) {
                let scaleLabelDiv = document.createElement( 'div' );
                scaleLabelDiv.className = 'scaleLabel';
                if (Math.abs(i*squareSize) < 1){
                    scaleLabelDiv.textContent = (i*squareSize).toPrecision(1);
                }
                else {
                    scaleLabelDiv.textContent = i*squareSize;
                }
                scaleLabelDiv.style.color = '#FFFFFF';
                scaleLabelDiv.style.backgroundColor = 'transparent';

                let scaleLabel = new CSS2DObject( scaleLabelDiv );
                if (j == 0) {
                    scaleLabel.position.set(labelPos, 0, 0);
                } else if (j == 1) {
                    scaleLabel.position.set(0, labelPos, 0);
                } else {
                    scaleLabel.position.set(0, 0, labelPos);
                }
                scaleLabel.center.set( 1, 1 );
                axes[j].add( scaleLabel );
            }
        }
    }

    scene.add(newXZ);
    scene.add(newXY);
    scene.add(newYZ);
    gridXZ = newXZ;
    gridXY = newXY;
    gridYZ = newYZ;
}

function animate() {
    controls.update();

    updateShadows();

    updateVectors();
    
    drawScale();

    renderer.render( scene, camera );
    textRenderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );