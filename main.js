const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const earthRadius = 5;
const sphereGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);
const oceanMaterial = new THREE.MeshBasicMaterial({ color: 0x001e50 });

const earth = new THREE.Mesh(sphereGeometry, oceanMaterial);
scene.add(earth);

function createContinent(
  innerRadius,
  outerRadius,
  height,
  phiStart,
  phiLength,
  thetaStart,
  thetaLength
) {
  const geometry = new THREE.CylinderGeometry(
    innerRadius,
    outerRadius,
    height,
    64,
    1,
    true,
    thetaStart,
    thetaLength
  );
  const material = new THREE.MeshBasicMaterial({
    color: 0x228b22,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);

  // Rotate the mesh to position it correctly on the Earth
  mesh.rotation.x = Math.PI / 2;
  mesh.position.y = Math.cos(phiStart + phiLength / 2) * earthRadius;
  mesh.position.z = Math.sin(phiStart + phiLength / 2) * earthRadius;

  return mesh;
}

const innerRadius = earthRadius;
const outerRadius = earthRadius + 0.2;
const height = 0.2;
const phiStart = Math.PI * 0.2;
const phiLength = Math.PI * 0.6;
const thetaStart = Math.PI * 0.4;
const thetaLength = Math.PI * 0.2;

const continent = createContinent(
  innerRadius,
  outerRadius,
  height,
  phiStart,
  phiLength,
  thetaStart,
  thetaLength
);
earth.add(continent);

camera.position.z = 15;

function animate() {
  requestAnimationFrame(animate);

  // Rotate the Earth around its Y-axis
  earth.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
