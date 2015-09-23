function createCamera(container) {
    return new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
}

function createRenderer(container) {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xFFFFFF);
    container.appendChild(renderer.domElement);
    return renderer;
}

$(function () {
    var gui = new dat.GUI();
    populateGui(gui);
    
    var planeView = new PlaneView("planeViewArea");
    var patientView = new PatientView("patientViewArea", gui);

    var render = function () {
        planeView.render();
        patientView.render();
    };

    var animate = function () {
        requestAnimationFrame(animate);
        planeView.animate();
        patientView.animate();
        render();
    };
    
    var resize = function () {
        var width = window.innerWidth / 2 - 10;
        var height = window.innerHeight - 20;
        planeView.resize(width, height);
        patientView.resize(width, height);
    };
    window.addEventListener("resize", function (event) {
        resize();
    });
    
    resize();
    animate();
});