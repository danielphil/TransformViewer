var parameters = {
    mpr: {
        patientToStackCenterX: 60,
        patientToStackCenterY: -20,
        patientToStackCenterZ: 200,
        viewpointX: 0,
        viewpointY: 0,
        viewpointZ: 0,
        spinX: 0,
        spinY: 0,
        spinZ: 0
    }
};

function populateGui(gui) {
    var volumePositionGui = gui.addFolder('Volume Position');
    volumePositionGui.add(parameters.mpr, 'patientToStackCenterX', -200, 200).step(0.01);
    volumePositionGui.add(parameters.mpr, 'patientToStackCenterY', -200, 200).step(0.01);
    volumePositionGui.add(parameters.mpr, 'patientToStackCenterZ', -200, 200).step(0.01);
    
    var viewpointGui = gui.addFolder('View Point');
    viewpointGui.add(parameters.mpr, 'viewpointX', -200, 200).step(0.01);
    viewpointGui.add(parameters.mpr, 'viewpointY', -200, 200).step(0.01);
    viewpointGui.add(parameters.mpr, 'viewpointZ', -200, 200).step(0.01);
    viewpointGui.open();
    
    var spinGui = gui.addFolder('MPR Spin');
    spinGui.add(parameters.mpr, 'spinX', -180, 180).step(0.01);
    spinGui.add(parameters.mpr, 'spinY', -180, 180).step(0.01);
    spinGui.add(parameters.mpr, 'spinZ', -180, 180).step(0.01);
    spinGui.open();
}