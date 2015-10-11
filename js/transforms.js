/// <reference path="external/additions.d.ts" />

function patientToImageStackCenter() {
    return additions.Matrix4.makeTranslation(
        parameters.mpr.patientToStackCenterX,
        parameters.mpr.patientToStackCenterY,
        parameters.mpr.patientToStackCenterZ
    );
}

function imageStackCenterToImage() {
	var Matrix4 = additions.Matrix4;
	
    var translation = Matrix4.makeTranslation(
        parameters.mpr.viewpointX,
        parameters.mpr.viewpointY,
        parameters.mpr.viewpointZ
    );

    var params = parameters.mpr;
    var spinXrad = params.spinX * (Math.PI / 180.0);
    var spinYrad = params.spinY * (Math.PI / 180.0);
    var spinZrad = params.spinZ * (Math.PI / 180.0);

    var euler = new THREE.Euler(spinXrad, spinYrad, spinZrad);
    var spin = Matrix4.makeRotationFromEuler(euler);

    return translation.multiply(spin);
}

function patientToImage() {
    return imageStackCenterToImage().multiply(patientToImageStackCenter());
}

function threeToPatient() {
    var threeXToPatient = new THREE.Vector3(1, 0, 0);
    var threeYToPatient = new THREE.Vector3(0, -1, 0);
    var threeZToPatient = new THREE.Vector3(0, 0, -1);

    return additions.Matrix4.makeBasis(threeXToPatient, threeYToPatient, threeZToPatient);
}