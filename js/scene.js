function buildScene() {
    var scene = new THREE.Scene();
    scene.scale.set(0.01, 0.01, 0.01);
    
    // add subtle blue ambient lighting
    var ambientLight = new THREE.AmbientLight(0x000044);
    scene.add(ambientLight);

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );
    
    // Create a group to represent patient space
    var patientGroup = new THREE.Object3D;
    patientGroup.matrixAutoUpdate = false;
    patientGroup.matrix = threeToPatient();
    patientGroup.add(new Axis(100));
    scene.add(patientGroup);
    
    // Create an additional group to represent image stack centre space
    var imageStackCentreGroup = new THREE.Object3D;
    imageStackCentreGroup.matrixAutoUpdate = false;
    patientGroup.add(imageStackCentreGroup);
    
    // Create a cuboid to represent the volume
    var volume = (function () {
        var geometry = new THREE.BoxGeometry(100, 100, 300);
        var material = new THREE.MeshNormalMaterial({ transparent:true, opacity: 0.6, side: THREE.DoubleSide});
        return new THREE.Mesh(geometry, material);
    })();
    imageStackCentreGroup.add(volume);
    
    // Create a group to represent the view plane
    var viewPlaneCentreGroup = new THREE.Object3D;
    viewPlaneCentreGroup.matrixAutoUpdate = false;
    imageStackCentreGroup.add(viewPlaneCentreGroup);
    
    return {
        scene: scene,
        imageStackCentreGroup: imageStackCentreGroup,
        viewPlaneCentreGroup: viewPlaneCentreGroup
    }
}
