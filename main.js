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



const redMateral = new THREE.LineBasicMaterial( {color: 0xffffff } );
const greenMateral = new THREE.LineBasicMaterial( {color: 0xffffff } );
const blueMateral = new THREE.LineBasicMaterial( {color: 0xffffff } );
const realBlueMateral = new THREE.LineBasicMaterial( {color: 0x236B8E } );
const edgeMaterial = new THREE.LineBasicMaterial( {color: 0xABDBE3, transparent: true, opacity: 0.8 });

const yellowMaterial = new THREE.LineBasicMaterial( {color: 0xFFFF00 } );

const bluePlaneMaterial = new THREE.MeshBasicMaterial( {color: 0x8888FF, side: THREE.DoubleSide, transparent: true, opacity: 0.3 } );
const CoordinatePlaneMaterial = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: 0 });
const shadowMaterial = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: 0.025});

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
    shadowMeshes[i].renderOrder = 1;
    scene.add(shadowMeshes[i]);
}

const planePoints = [];
planePoints.push(new THREE.Vector2(-5, -5));
planePoints.push(new THREE.Vector2(-5, 5));
planePoints.push(new THREE.Vector2(5, 5));
planePoints.push(new THREE.Vector2(5, -5));
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
const r = 5;
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

scene.add( XZplane );
scene.add( XYplane );
scene.add( YZplane );

scene.add( xAxis );
scene.add( yAxis );
scene.add( zAxis );

const controls = new OrbitControls( camera, textRenderer.domElement );
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;

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

    vectors[name] = vector;
    //console.log(vector.geometry.attributes.position.array);

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

    deleteNode.addEventListener("click", function() {
        vector.remove(vectorLabel);
        scene.remove(vector);
        delete vectors[name];
        const parent = deleteNode.parentNode;
        parent.removeChild(deleteNode);
        parent.parentNode.removeChild(parent);
    })

    return vector;
}

function crossProduct(v1, v2) {
    const result = [v1[1]*v2[2]-v2[1]*v1[2], -v1[0]*v2[2]+v2[0]*v1[2], v1[0]*v2[1]-v2[0]*v1[1]];
    return result;
}

function magnitude(v) {
    return Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
}

function dot(v1, v2) {
    return (v1[0]*v2[0] + v1[1] + v2[1] + v1[2] * v2[2]);
}

// Finds the point of intersection of a line and plane in R3
// Line should be in form [x, y, z, d, e, f] with (x, y, z) + s(d, e, f) as the vector equation
// Plane should be in form [a, b, c] with equation ax + by + cz = 0
function linePlaneIntersection(v, P) {
    directionVector = [v[3], v[4], v[5]];
    if (dot(directionVector, P) == 0) {
        if (P[0]*v[0] + P[1]*v[1] + P[2]*v[2] == 0){
            return true;
        }
        return false;
    }
    // a(x + sd) + b(y + se) + c(z + sf) = 0
    // ax + asd + by + bse + cz + csf = 0
    // asd + bse + csf = -(ax + by + cz)
    // s(ad + be + cf) = -(ax + by + cz)
    // s = -(ax + by + cz)/(ad + be + cf)
    ans = [v[0] - (P[0]*v[0] + P[1]*v[1] + P[2]*v[2])/(P[0]*v[3] + P[1]*v[4] + P[2]*v[5])*v[3], v[1] - (P[0]*v[0] + P[1]*v[1] + P[2]*v[2])/(P[0]*v[3] + P[1]*v[4] + P[2]*v[5])*v[4], v[2] - (P[0]*v[0] + P[1]*v[1] + P[2]*v[2])/(P[0]*v[3] + P[1]*v[4] + P[2]*v[5])*v[5]];
    const gridRadius = 5;
    if (Math.abs(ans[0]) <= gridRadius && Math.abs(ans[1]) <= gridRadius && Math.abs(ans[2] <= gridRadius)) {
        return ans;
    }
    return false;
}

const planes = {};

function Plane3D(plane, edges, orthoBasis, element, name) {
    this.plane = plane;
    this.edges = edges;
    this.orthoBasis = orthoBasis;
    this.element = element;
}

function createPlane(vecName1, vecName2, name) {
    const vec1 = vectors[vecName1];
    const vec2 = vectors[vecName2];
    const u1 = vec1.geometry.attributes.position.array;
    const v1 = vec2.geometry.attributes.position.array;
    const ua = [u1[3], u1[4], u1[5]];
    const va = [v1[3], v1[4], v1[5]];
    const u = new THREE.Vector3(u1[3], u1[4], u1[5]);
    const v = new THREE.Vector3(v1[3], v1[4], v1[5]);
    
    const normal = crossProduct(ua, va);
    const normalVec = new THREE.Vector3(normal[0], normal[1], normal[2]);

    const plane = new THREE.Plane(normalVec.normalize());
    const edges = [];
    const r = 5;
    edges.push(new THREE.Line3(new THREE.Vector3(-r, -r, -r), new THREE.Vector3(-r, -r, r)));
    edges.push(new THREE.Line3(new THREE.Vector3(-r, -r, -r), new THREE.Vector3(-r, r, -r)));
    edges.push(new THREE.Line3(new THREE.Vector3(-r, -r, -r), new THREE.Vector3(r, -r, -r)));
    edges.push(new THREE.Line3(new THREE.Vector3(-r, r, r), new THREE.Vector3(-r, r, -r)));
    edges.push(new THREE.Line3(new THREE.Vector3(-r, r, r), new THREE.Vector3(r, r, r)));
    edges.push(new THREE.Line3(new THREE.Vector3(-r, r, r), new THREE.Vector3(-r, -r, r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, r, -r), new THREE.Vector3(-r, r, -r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, r, -r), new THREE.Vector3(r, -r, -r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, r, -r), new THREE.Vector3(r, r, r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, -r, r), new THREE.Vector3(-r, -r, r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, -r, r), new THREE.Vector3(r, r, r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, -r, r), new THREE.Vector3(r, -r, -r)));

    edges.push(new THREE.Line3(new THREE.Vector3(-r, -r, r), new THREE.Vector3(-r, -r, -r)));
    edges.push(new THREE.Line3(new THREE.Vector3(-r, r, -r), new THREE.Vector3(-r, -r, -r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, -r, -r), new THREE.Vector3(-r, -r, -r)));
    edges.push(new THREE.Line3(new THREE.Vector3(-r, r, -r), new THREE.Vector3(-r, r, r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, r, r), new THREE.Vector3(-r, r, r)));
    edges.push(new THREE.Line3(new THREE.Vector3(-r, -r, r), new THREE.Vector3(-r, r, r)));
    edges.push(new THREE.Line3(new THREE.Vector3(-r, r, -r), new THREE.Vector3(r, r, -r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, -r, -r), new THREE.Vector3(r, r, -r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, r, r), new THREE.Vector3(r, r, -r)));
    edges.push(new THREE.Line3(new THREE.Vector3(-r, -r, r), new THREE.Vector3(r, -r, r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, r, r), new THREE.Vector3(r, -r, r)));
    edges.push(new THREE.Line3(new THREE.Vector3(r, -r, -r), new THREE.Vector3(r, -r, r)));
    
    const intersectionsUnfiltered = [];
    for (let i = 0; i < edges.length; i++) {
        const poi = new THREE.Vector3();
        const intersection = plane.intersectLine(edges[i], poi);
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
    mesh.renderOrder = 0;
    scene.add(mesh);
    scene.add(edgeLines);

    const planeNode = document.createElement("div");
    const nameSpan = document.createElement("span");
    const nameNode = document.createTextNode(name + ": ");
    const vectorsNode = document.createTextNode("Span(" + vecName1 + ", " + vecName2 + ")");
    const deleteNode = document.createElement("button");

    nameSpan.className = "planeName"
    deleteNode.className = "planeDeleteButton"

    nameSpan.appendChild(nameNode);
    nameSpan.appendChild(document.createTextNode(String.fromCodePoint(8407)));
    planeNode.appendChild(nameSpan);
    planeNode.appendChild(vectorsNode);
    planeNode.appendChild(deleteNode);
    planeList.appendChild(planeNode);

    planes[name] = (new Plane3D(mesh, edgeLines, orthogonalBasis, planeNode, name));

    deleteNode.addEventListener("click", function() {
    scene.remove(planes[name].plane)
    scene.remove(planes[name].edges);
    delete planes[name];
    const parent = deleteNode.parentNode;
    parent.removeChild(deleteNode);
    parent.parentNode.removeChild(parent);
    })
}

function checkSharedFace(p1, p2) {
    return (p1.x == p2.x || p1.y == p2.y || p1.z == p2.z);
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
    nameField.value = "";
    xField.value = "";
    yField.value = "";
    zField.value = "";
    if (isNaN(xCoord) || isNaN(yCoord) || isNaN(zCoord)){
        return;
    }
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

scene.add(createVector("v", [1, 2, 1]));
scene.add(createVector("u", [4, 0, -3]));
scene.add(createVector("w", [1, -1, 3]));

//createPlane("v", "u", "P");

const selectType = document.getElementById("typeSelect");

const vectorBuilder = document.getElementById("vectorBuilder");
const planeBuilder = document.getElementById("planeBuilder");

selectType.addEventListener('change', function() {
    console.log("EEEEEEEEEEEE")
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

function animate() {
    controls.update();
    for (let i = 0; i < SHADOW_DISTANCE; i++){
        const extraRotation = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, 0, 0));
        const relativePosition = camera.position.clone().normalize();
        //const eulerAngle = new THREE.Euler();
        //extraRotation.multiply(camera.matrix)
        const cameraMatrix = new THREE.Matrix4().copy(camera.matrix);
        cameraMatrix.multiply(extraRotation);
        //const rotation = new THREE.Matrix4().makeRotationFromEuler(eulerAngle);
        shadowMeshes[i].setRotationFromMatrix(cameraMatrix);
        shadowMeshes[i].position.copy(relativePosition.multiplyScalar((i-50)*0.1*Math.sqrt(3)));
    }
    renderer.render( scene, camera );
    textRenderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );