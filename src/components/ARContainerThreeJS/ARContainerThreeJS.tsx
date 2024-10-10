import { Fragment, useEffect } from 'react';
import { cubeThreejsPipelineModule } from './cube-threejs';
import * as THREE from 'three';

declare let XR8: any;
declare let window: any;
declare let XRExtras: any;

const onxrloaded = () => {
  window['THREE'] = THREE;
  //XR8.XrController.configure({ imageTargets: [] }); // Disable default image targets.
  XR8.FaceController.configure({
    meshGeometry: [
      XR8.FaceController.MeshGeometry.FACE,
      XR8.FaceController.MeshGeometry.EYES,
      XR8.FaceController.MeshGeometry.MOUTH,
    ],
    coordinates: { mirroredDisplay: true },
    maxDetections: 1,
  });

  XR8.addCameraPipelineModules([
    // Add camera pipeline modules.
    // Existing pipeline modules.
    XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
    XR8.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
    // XR8.XrController.pipelineModule(), // Enables SLAM tracking.
    XR8.FaceController.pipelineModule(), // Loads 8th Wall Face Engine
    XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
    XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
    XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
    // Custom pipeline modules.
    cubeThreejsPipelineModule(),
  ]);

  document.body.insertAdjacentHTML(
    'beforeend',
    '<canvas id="camerafeed"></canvas>'
  );
  XR8.run({ canvas: document.getElementById('camerafeed'), verbose: true });

  // Cleanup
  return () => {
    const canvas = document.getElementById('camerafeed');
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    XR8.stop();
    XR8.clearCameraPipelineModules();
  };
};

const ARContainerThreeJS = () => {
  useEffect(() => {
    window['XR8']
      ? onxrloaded()
      : window.addEventListener('xrloaded', onxrloaded);
  }, []);

  return (
    <Fragment>
      <button>Back button</button>
    </Fragment>
  );
};

export { ARContainerThreeJS };
