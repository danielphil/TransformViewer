var PlaneView = function (containerElementId) {
    "use strict";
    
    var Matrix4 = additions.Matrix4;
    
    var container = document.getElementById(containerElementId);

    var scene = buildScene();
    var camera = createCamera(container);
    var renderer = createRenderer(container);
    
    camera.matrixAutoUpdate = false;
    
    this.render = function () {
        renderer.render(scene.scene, camera);
    };
    
    this.animate = function () {
        var viewPlaneCentreGroup = scene.viewPlaneCentreGroup;
        scene.imageStackCentreGroup.matrix = patientToImageStackCenter();
        viewPlaneCentreGroup.matrix = imageStackCenterToImage();
        
        var rotation = Matrix4(viewPlaneCentreGroup.matrix).extractRotation();
        // Thanks to http://gamedev.stackexchange.com/questions/27003/flip-rotation-matrix
        // for the hint here. The rotation is applied around patient space axes, so
        // we need to apply it in that space.
        var flip = Matrix4(threeToPatient());
        // Note that flip is also its own inverse, so this is really:
        // flipInv * rotation * flip 
        rotation = flip.multiply(rotation).multiply(flip);
        
        // Update the matrices manually (as we've told threejs that we want this so we can
        // set them manually)
        scene.scene.updateMatrixWorld(true);
        var translation = Matrix4(viewPlaneCentreGroup.matrixWorld).copyPosition();
        camera.matrix = translation.multiply(rotation);
        camera.updateMatrixWorld(true);
    };
    
    this.resize = function (width, height) {
        "use strict";
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    };
    
};