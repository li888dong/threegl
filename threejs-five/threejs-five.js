<!DOCTYPE html>
<html>
<head>
    <title>04.04 - HTML video as texture</title>
    <script src="../libs/three.js"></script>
    <script src="../libs/dat.gui.min.js"></script>
    <script src="../libs/OrbitControls.js"></script>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
</head>
<body>

<video id="video" autoplay loop style="display:none">
    <source src="http://10.1.26.29:84/assets/video/sintel_trailer-480p.ogv" type="video/ogg">
    <source src="http://10.1.26.29:84/assets/video/sintel_trailer-480p.mp4" type="video/mp4">
    <source src="http://10.1.26.29:84/assets/video/sintel_trailer-480p.webm" type="video/webm">
</video>


<script>


    // use clock from http://saturnboy.com/2013/10/html5-canvas-clock/
    // draw a clock on all sides of a cube

    // global variables
    var renderer;
    var scene;
    var camera;
    var orbit;


    var control;
    var videoTexture;

    function init() {

        var video = document.getElementById('video');

        videoTexture = new THREE.Texture(video);

        //minFilter属性：指定纹理如何缩小。默认值：THREE.LinearMipMapLinearFilter
        videoTexture.minFilter = THREE.LinearFilter;
        //magFilter属性：指定纹理如何放大。默认值：THREE.LinearFilter
        videoTexture.magFilter = THREE.LinearFilter;

        videoTexture.format = THREE.RGBFormat;
        videoTexture.generateMipmaps = false;

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        orbit = new THREE.OrbitControls(camera);

        // create a render, sets the background color and the size
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xcccccc, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // create a cube and add to scene
        var cubeGeometry = new THREE.BoxGeometry(1, 10, 20);
        var cubeMaterial = new THREE.MeshBasicMaterial({map: videoTexture});

        var materials = [];
        materials.push(cubeMaterial);
        materials.push(cubeMaterial);
        for (var i = 1; i < 5; i++) {
            materials.push(new THREE.MeshLambertMaterial({color: 0xff0000}));
        }
        //MeshFaceMaterial这是一种容器，可以在该容器中为物体的各个表面上设置不同的颜色
        var cube = new THREE.Mesh(cubeGeometry, new THREE.MeshFaceMaterial(materials));
        cube.position.set(-10.05,0,0);
        cube.rotation.x = -0.3;
        cube.rotation.y = 23.5;
        cube.name = 'cube';
        scene.add(cube);

        var cubetwoGeometry = new THREE.BoxGeometry(1, 10, 20);
        var cubetwoMaterial = new THREE.MeshBasicMaterial({map: videoTexture});

        var materialstwo = [];

        for (var i = 1; i < 7; i++) {
            materialstwo.push(cubetwoMaterial);
        }
        //MeshFaceMaterial这是一种容器，可以在该容器中为物体的各个表面上设置不同的颜色
        var cubetwo = new THREE.Mesh(cubetwoGeometry, new THREE.MeshFaceMaterial(materialstwo));
        cubetwo.position.set(10.05,0,0);
        cubetwo.rotation.x = -0.3;
        cubetwo.rotation.y = 23.5;
        scene.add(cubetwo);



        var dirLightLeft = new THREE.DirectionalLight();
        dirLightLeft.position.set(15, 20, 20);
        scene.add(dirLightLeft);

        var dirLightRight = new THREE.DirectionalLight();
        dirLightRight.position.set(-15, 20, 20);
        scene.add(dirLightRight);

        // position and point the camera to the center of the scene
        camera.position.x = 0;
        camera.position.y = 12;
        camera.position.z = 30;
        camera.lookAt(scene.position);

        // add the output of the renderer to the html element
        document.body.appendChild(renderer.domElement);

        control = new function () {
            //this.rotationSpeed = 0.005;
            this.scale = 1;
        };
        addControls(control);

        render();
    }

    function addControls(controlObject) {
        var gui = new dat.GUI();
        //gui.add(controlObject, 'rotationSpeed', -0.1, 0.1);
        gui.add(controlObject, 'scale', 0.01, 5);
    }

    function render() {
        renderer.render(scene, camera);
        //scene.getObjectByName('cube').rotation.y += control.rotationSpeed;
        scene.getObjectByName('cube').scale.set(control.scale, control.scale, control.scale);

        videoTexture.needsUpdate = true;

        requestAnimationFrame(render);
    }

    // calls the init function when the window is done loading.
    window.onload = init;


</script>


</body>
</html>
