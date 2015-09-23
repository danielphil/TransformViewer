var PatientView = function (containerElementId, gui) {
    "use strict";
    
    var Matrix4 = additions.Matrix4;
    
    var container = document.getElementById(containerElementId);

    var scene = buildScene();
    var camera = createCamera(container);
    var renderer = createRenderer(container);
    
    // Add a sphere to show the location of the view point
    var viewpointSphere = (function () {
        var geometry = new THREE.SphereGeometry(5);
        var material = new THREE.MeshNormalMaterial();
        return new THREE.Mesh(geometry, material);
    })();
    scene.viewPlaneCentreGroup.add(viewpointSphere);
    
    // Draw a plane to show the MPR viewing plane
    var imagePlane = (function () {
        var geometry = new THREE.PlaneGeometry(100, 100);
        var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
        return new THREE.Mesh(geometry, material);
    })();
    scene.viewPlaneCentreGroup.add(imagePlane);

    camera.position.z = 5;

    var controls = createControls(camera, renderer);
    parameters.resetMprCamera = function () { controls.reset(); };
    gui.add(parameters, 'resetMprCamera');

    this.render = function () {
        renderer.render(scene.scene, camera);
    };
    
    this.animate = function () {
        var imageStackCenterToPatient = patientToImageStackCenter();

        scene.imageStackCentreGroup.matrix = imageStackCenterToPatient;
        scene.viewPlaneCentreGroup.matrix = imageStackCenterToImage();

        controls.update();
    };
    
    function createControls(camera, renderer) {
        var controls = new THREE.TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
    
        controls.noZoom = false;
        controls.noPan = false;
    
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
    
        controls.keys = [ 65, 83, 68 ];
    
        return controls;
    }
    
    this.resize = function (width, height) {
        "use strict";
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    };
};