import { Vector3 } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

declare let THREE: any;
declare let XR8: any;

// Define an 8th Wall XR Camera Pipeline Module that adds a cube to a threejs scene on startup.
const cubeThreejsPipelineModule = () => {
  const purple = 0xad50ff;
  let cube: any;
  let glasses: any;
  const currentPosition = new Vector3();

  // Update the corresponding face mesh based on the faceId.
  const show = (event: any) => {
    const { transform, attachmentPoints } = event.detail;

    // Update the overall head position.
    cube.position.lerp(transform.position, 0.5);
    cube.setRotationFromQuaternion(transform.rotation);
    cube.scale.set(transform.scale, transform.scale, transform.scale);

    currentPosition.copy(cube.position);
    cube.visible = false;
    // console.log({ transform });
    let newPos = transform.position;
    newPos.z = newPos.z + 0.2;
    newPos.y = newPos.y - 0.001;

    //mouthAttachment.position.lerp(attachmentPoints.mouth.position, 0.5);

    glasses.position.lerp(newPos, 0.5);
    glasses.setRotationFromQuaternion(transform.rotation);
    glasses.scale.set(transform.scale, transform.scale, transform.scale);

    glasses.visible = true;
  };
  const hide = () => (cube.visible = false);

  // Populates a cube into an XR scene and sets the initial camera position.
  const initXrScene = ({ scene, camera, renderer }: any) => {
    // Enable shadows in the rednerer.
    renderer.shadowMap.enabled = true;

    //loads .glb

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(`/draco/`);
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      '/assets/glasses-5.glb',
      (gltf: GLTF) => {
        glasses = gltf.scene;
        glasses.visible = true;
        scene.add(glasses);
      }
      //resolve(gltf)
    );

    // const loader = new GLTFLoader();
    // loader.load(
    //   '/assets/meta_orion_ar_glasses.glb',
    //   function (gltf) {
    //     glasses = gltf.scene;
    //     glasses.visible = true;
    //     scene.add(glasses);
    //     //renderer.render(scene, camera);
    //     //glasses.castShadow = true;
    //     console.log({ glasses });
    //   },
    //   undefined,
    //   function (error) {
    //     console.error(error);
    //   }
    // );

    // Add some light to the scene.
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add a purple cube that casts a shadow.
    const material = new THREE.MeshPhysicalMaterial();
    material.side = THREE.DoubleSide;
    material.metalness = 0;
    material.color = new THREE.Color(purple);

    cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
    //cube.position.set(0, 0.5, 0);
    cube.castShadow = true;
    scene.add(cube);

    // Add a plane that can receive shadows.
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    planeGeometry.rotateX(-Math.PI / 2);

    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.67;

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    scene.add(plane);

    // Set the initial camera position relative to the scene we just laid out. This must be at a
    // height greater than y=0.
    camera.position.set(0, 2, 2);
  };

  // Return a camera pipeline module that adds scene elements on start.
  return {
    // Camera pipeline modules need a name. It can be whatever you want but must be unique within
    // your app.
    name: 'cubethreejs',

    // onStart is called once when the camera feed begins. In this case, we need to wait for the
    // XR8.Threejs scene to be ready before we can access it to add content. It was created in
    // XR8.Threejs.pipelineModule()'s onStart method.
    onAttach: ({ canvas }: any) => {
      const { scene, camera, renderer } = XR8.Threejs.xrScene(); // Get the 3js scene from XR8.Threejs

      initXrScene({ scene, camera, renderer }); // Add objects set the starting camera position.

      // Sync the xr controller's 6DoF position and camera paremeters with our scene.
      XR8.XrController.updateCameraProjectionMatrix({
        origin: camera.position,
        facing: camera.quaternion,
      });

      // Recenter content when the canvas is tapped.
      canvas.addEventListener(
        'touchstart',
        (e: any) => {
          e.touches.length === 1 && XR8.XrController.recenter();
        },
        true
      );
      window.addEventListener(
        'color-change',
        (e: any) => {
          const c = localStorage.getItem('glasses-color');
          // glasses.material.color = new THREE.Color(c);
          glasses.traverse((o: any) => {
            if (o.isMesh) {
              o.material.color = new THREE.Color(c);
            }
          });
        },
        true
      );
    },
    listeners: [
      { event: 'facecontroller.facefound', process: show },
      { event: 'facecontroller.faceupdated', process: show },
      { event: 'facecontroller.facelost', process: hide },
    ],
  };
};

export { cubeThreejsPipelineModule };
