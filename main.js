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
const edgeMaterial = new THREE.LineBasicMaterial( {color: 0xABDBE3, transparent: true, opacity: 0.6 });

const yellowMaterial = new THREE.LineBasicMaterial( {color: 0xFFFF00 } );

const bluePlaneMaterial = new THREE.MeshBasicMaterial( {color: 0x8888FF, side: THREE.DoubleSide, transparent: true, opacity: 0.3 } );

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
    console.log(vector.geometry.attributes.position.array);

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
    console.log(v1);
    console.log(v2);
    const result = [v1[1]*v2[2]-v2[1]*v1[2], -v1[0]*v2[2]+v2[0]*v1[2], v1[0]*v2[1]-v2[0]*v1[1]];
    return result;
}

console.log(crossProduct([1, 1, 1], [-2, 3, 2]))

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

function createPlane(vec1, vec2) {
    // const u1 = vec1.geometry.attributes.position.array;
    // const u2 = vec2.geometry.attributes.position.array;
    // const v1 = [u1[3], u1[4], u1[5]];
    // const v2 = [u2[3], u2[4], u2[5]];
    // console.log(v1);
    // const normal = crossProduct(v1, v2);
    // const XZint = [normal[0], normal[2]];
    // const XYint = [normal[0], normal[1]];
    // const YZint = [normal[1], normal[2]];
    // let XZpoints;
    // let XYpoints;
    // let YZpoints;
    // if (XZint[0] >= XZint[1]) {
    //     XZpoints = [5, -(5*(XZint[0]/XZint[1]))];
    // }
    // else {
    //     XZpoints = [-(5*(XZint[1]/XZint[0])), 5];
    // }

    // if (XYint[0] >= XYint[1]) {
    //     XYpoints = [5, -(5*(XYint[0]/XYint[1]))];
    // }
    // else {
    //     XYpoints = [-(5*(XYint[1]/XYint[0])), 5];
    // }

    // if (YZint[0] <= YZint[1]) {
    //     YZpoints = [5, -(5*(YZint[0]/YZint[1]))];
    // }
    // else {
    //     YZpoints = [-(5*(YZint[1]/YZint[0])), 5];
    // }
    // const XZArr = [];
    // XZArr.push( new THREE.Vector3(XZpoints[0], 0, XZpoints[1]) );
    // XZArr.push( new THREE.Vector3(-XZpoints[0], 0, -XZpoints[1]) );
    // const XZGeometry = new THREE.BufferGeometry().setFromPoints( XZArr );

    // const XYArr = [];
    // XYArr.push( new THREE.Vector3(XYpoints[0], XYpoints[1], 0) );
    // XYArr.push( new THREE.Vector3(-XYpoints[0], -XYpoints[1], 0) );
    // const XYGeometry = new THREE.BufferGeometry().setFromPoints( XYArr );

    // const YZArr = [];
    // YZArr.push( new THREE.Vector3(0, YZpoints[0], YZpoints[1]) );
    // YZArr.push( new THREE.Vector3(0, -YZpoints[0], -YZpoints[1]) );
    // const YZGeometry = new THREE.BufferGeometry().setFromPoints( YZArr );

    // const XZvector = new THREE.Line( XZGeometry, yellowMaterial );
    // const XYvector = new THREE.Line( XYGeometry, yellowMaterial );
    // const YZvector = new THREE.Line( YZGeometry, yellowMaterial );

    // scene.add(XZvector, XYvector, YZvector);

    
    const u1 = vec1.geometry.attributes.position.array;
    const v1 = vec2.geometry.attributes.position.array;
    const ua = [u1[3], u1[4], u1[5]];
    const va = [v1[3], v1[4], v1[5]];
    const u = new THREE.Vector3(u1[3], u1[4], u1[5]);
    const v = new THREE.Vector3(v1[3], v1[4], v1[5]);
    
    const normal = crossProduct(ua, va);
    console.log(normal);
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
    const intersectionsUnfiltered = [];
    for (let i = 0; i < edges.length; i++) {
        const poi = new THREE.Vector3();
        const intersection = plane.intersectLine(edges[i], poi);
        //console.log(plane.intersectLine(edges[i], poi));
        //console.log(poi);
        //console.log(plane.normal);
        if (intersection != null){
            if (Math.abs(poi.x) <= r && Math.abs(poi.y) <= r && Math.abs(poi.z) <= r) {
                intersectionsUnfiltered.push(poi);
                console.log(poi);
            }
        }
    }
    console.log(intersectionsUnfiltered);
    const intersections = [];
    for (let i = 0; i < intersectionsUnfiltered.length; i++){
        let duplicate = false;
        const i1 = intersectionsUnfiltered[i];
        console.log("starting...")
        for (let j = 0; j < intersections.length; j++){
            const i2 = intersections[j];
            console.log("checking...");
            if (i1.x == i2.x && i1.y == i2.y && i1.z == i2.z){
                duplicate = true;
                console.log("DUPE FOUND");
                break;
            }
        }
        if (!duplicate){
            intersections.push(i1);
        }
    }
    console.log(intersections);
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
        //console.log(intersections[i]);
        intersections[i].applyMatrix4(transform2D);
        //console.log(intersections[i]);
    }
    const intersections2D = intersections.map(p => new THREE.Vector2(p.x, p.y));
    //console.log(intersections2D);
    const plane2D = new THREE.Shape(intersections2D);
    const geometry2D = new THREE.ShapeGeometry(plane2D);
    const geometryEdge = new THREE.EdgesGeometry(geometry2D);
    const edgeLines = new THREE.Line(geometryEdge, edgeMaterial);
    const mesh = new THREE.Mesh(
        geometry2D,
        bluePlaneMaterial
    );
    //console.log(mesh.geometry.attributes.position.array);
    //console.log(transformation);
    mesh.applyMatrix4(transform3D);
    edgeLines.applyMatrix4(transform3D);
    //console.log(mesh);
    scene.add(mesh);
    scene.add(edgeLines);
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

scene.add(createVector("v", [1, 2, 1]));
scene.add(createVector("u", [4, 0, -3]));
scene.add(createVector("w", [1, -1, 3]));

createPlane(vectors["v"], vectors["u"]);

function animate() {
    controls.update();
    renderer.render( scene, camera );
    textRenderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );