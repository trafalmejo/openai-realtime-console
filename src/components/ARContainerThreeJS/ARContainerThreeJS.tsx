import { Fragment, useEffect, useState } from 'react';
import { arFilterPipelineModule } from './ARFilter';
import { ReactComponent as CloseSVG } from '../../assets/close.svg';
import * as Styled from './ARContainer.styles';
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
    XR8.CanvasScreenshot.pipelineModule(),
    XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
    XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
    XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
    // Custom pipeline modules.
    arFilterPipelineModule(),
  ]);

  document.body.insertAdjacentHTML(
    'beforeend',
    '<canvas id="camerafeed"></canvas>'
  );
  XR8.run({
    canvas: document.getElementById('camerafeed'),
    verbose: true,
    allowedDevices: XR8.XrConfig.device().ANY,
    cameraConfig: { direction: XR8.XrConfig.camera().FRONT },
  });

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

const ARContainerThreeJS = ({
  shareable,
  isModalOpen,
  setIsModalOpen,
  setShareable,
}: any) => {
  useEffect(() => {
    window['XR8']
      ? onxrloaded()
      : window.addEventListener('xrloaded', onxrloaded);
  }, []);

  useEffect(() => {
    if (shareable == 'capturing') {
      takeScreenshot();
    }
  }, [shareable]);

  const takeScreenshot = () => {
    const picture = XR8.CanvasScreenshot.takeScreenshot();
    picture.then(
      (data: any) => {
        setShareable('data:image/jpeg;base64,' + data);
        setIsModalOpen(true);
      },
      (error: any) => {
        console.log(error);
        setShareable('error');
        // Handle screenshot error.
      }
    );
  };
  return (
    <Fragment>
      {isModalOpen && (
        <Styled.ShareableContainer>
          <Styled.Shareable src={shareable} alt="" />
          <Styled.CloseButton
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <CloseSVG />
          </Styled.CloseButton>
        </Styled.ShareableContainer>
      )}
    </Fragment>
  );
};

export { ARContainerThreeJS };
