import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import * as dat from 'data.gui';
// import { GUI } from 'dat.gui';
// function easeOutCirc(x) {
//   return Math.sqrt(1 - Math.pow(x - 1, 4))
// }

const Character = () => {
  const refContainer = useRef();
  const [loading, setLoading] = useState(true);
  const [renderer, setRenderer] = useState();
  const [_camera, setCamera] = useState();
  const [target] = useState(new THREE.Vector3(0, 50, 0));
  // const [initialCameraPosition] = useState(
  //   new THREE.Vector3(
  //     // 20 * Math.sin(0.2 * Math.PI),
  //     // 10,
  //     // 20 * Math.cos(0.2 * Math.PI)
  //     100,
  //     250,
  //     500
  //   )
  // )
  const [scene] = useState(new THREE.Scene());
  const [_controls, setControls] = useState();
  const [clock] = useState(new THREE.Clock());
  
  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer;
    if(container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      renderer.setSize(scW, scH);
    }
  }, [renderer]);

  
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let mixer;
    const req = null;
    const animations = ['Walking' /*, 'Hook' */];
    // let idleAction, walkAction, hookAction;

    // const crossFadeControls = [];

    // let settings;
    const actions = [];

    const { current: container } = refContainer;
    if (container && !renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      // 640 -> 240
      // 8 -> 6
      const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 )
      camera.position.set( 100, 200, 500 );
      // camera.lookAt(target);
      setCamera(camera);

      // scene.background = new THREE.Color( 0xa0a0a0 );
      // scene.fog = new THREE.Fog( 0xa0a0a0, 1000, 2000 );

      const light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
      light.position.set( 0, 200, 0);
      scene.add(light);
      
      light = new THREE.DirectionalLight( 0xffffff );
      light.position.set( 0, 200, 100 );
      light.castShadow = true;
      light.shadow.camera.top = 180;
      light.shadow.camera.bottom = -100;
      light.shadow.camera.left = - 120;
      light.shadow.camera.right = 120;
      scene.add(light);
     
      // const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 3000, 3000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
      // mesh.rotation.x = - Math.PI / 2;
      // mesh.receiveShadow = true;
      // scene.add( mesh );

      // const grid = new THREE.GridHelper( 3000, 20, 0x000000, 0x000000 );
      // grid.material.opacity = 0.2;
      // grid.material.transparent = true;
      // scene.add( grid );

      // let mixers = [];
      new Promise((resolve, reject) => {
        const loader = new FBXLoader();
        loader.load('/assets/FireFighter.fbx', (object) => {
          mixer = new THREE.AnimationMixer(object);
          const action = mixer.clipAction(object.animations[0]);
          action.paused = true;
          actions.push(action);
          // idleAction = action;

          object.scale.set(0.5, 0.5, 0.5);
          object.traverse((child) => {
            if(child.isMesh) {
              // child.material.map = null;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          })

          const tloader = new THREE.TextureLoader();
          tloader.load("/assets/FireFighter.png", (texture) => {
            object.traverse(( child ) => {
              if ( child.isMesh ) child.material.map = texture;
            });
          });
          
          scene.add(object);
          
          // createPanel();

          animations.forEach((animation) => {
            loadNextAnim(animation, loader, reject);
          })
          
          resolve(object);
        },
          undefined,
          (error) => {
            reject(error)
          }
        )

      }).then(() => {
        
        animate();
        setLoading(false);
      })

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;
      // controls.target.set( 0, 60, 0 );
      controls.update();
      setControls(controls);

      
      // let frame = 0;
      
      // const createPanel = async () => {
      //   const dat = await import('dat.gui')
      //   // const gui = new dat.GUI()
      //   const panel = new dat.GUI({ width: 310 });
      //   const folderAction = panel.addFolder('Actions');

      //   settings = {
      //     'from idle to walk': () => {
      //       prepareCrossFade(idleAction, walkAction, 0.5)
      //     },
      //     'from idle to hook': () => {
      //       prepareCrossFade(idleAction, hookAction, 0.5)
      //     },
      //     'from walk to hook': () => {
      //       prepareCrossFade(walkAction, hookAction, 1)
      //     }
      //   }

      //   crossFadeControls.push(folderAction.add(settings, 'from idle to walk'));
      //   crossFadeControls.push(folderAction.add(settings, 'from idle to hook'));
      //   crossFadeControls.push(folderAction.add(settings, 'from walk to hook'));

      //   folderAction.open();
      // }

      // const unPauseAllActions = () => {
      //   actions.forEach((action) => {
      //     action.paused = false;  
      //   });
      // }

      // const prepareCrossFade = (startAction, endAction, defaultDuration) => {
      //   const duration = defaultDuration;
      //   unPauseAllActions();

      //   if(startAction === idleAction) {
      //     executeCrossFade(startAction, endAction, duration);
      //   } else {
      //     synchronizeCrossFade(startAction, endAction, duration);
      //   }
      // }

      // const executeCrossFade = (startAction, endAction, duration) => {
      //   endAction.time = 0;
      //   startAction.crossFadeTo(endAction, duration, true)
      // }

      // const synchronizeCrossFade = (startAction, endAction, duration) => {
      //   const onLoopFinished = (e) => {
      //     if(e.action === startAction) {
      //       mixer.removeEventListener('loop', onLoopFinished);
      //       executeCrossFade(startAction, endAction, duration)
      //     }
      //   }
      //   mixer.addEventListener('loop', onLoopFinished);
      // }

      const loadNextAnim = (animation, loader, reject) => {
        loader.load(`/assets/${animation}.fbx`, (object) => {
          const action = mixer.clipAction(object.animations[0]);
          actions.push(action);

          // if(animation === 'Walking') {
          //   walkAction = action;
          // } else if(animation === 'Hook') {
          //   hookAction = action;
          // }
          
          object.traverse((child) => {
            if(child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = false;
            }
          });
          action.play();
          scene.add(object);
        },
          undefined,
          (error) => {
            reject(error)
          }
        )
      }

      const animate = () => {
        req = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        
        if( mixer ) mixer.update(delta);
        // frame = frame <= 100 ? frame + 1 : frame;
        
        // if(frame <= 100) {
        //   const p = initialCameraPosition;
        //   const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

        //   camera.position.y = 100;
        //   camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
        //   camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
        //   camera.lookAt(target);
        // } else {
        //   controls.update()

        //   // for(let i = 0; i < mixers.length; i ++) {
        //   //   mixers[ i ].update( clock.getDelta() )
        //   // }
          
        // }
        // console.log(scene);
        renderScene();
      }

      const renderScene = () => {
        renderer.render(scene, camera);
      }

      const stop = () => {
        cancelAnimationFrame(req);
      }
      
      return () => {
        stop();
        renderer.dispose()
      }
    }
  }, []);


  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => window.removeEventListener('resize', handleWindowResize, false);
  }, [renderer, handleWindowResize]);

  return (
    <Box 
      ref={refContainer}
      className="voxel-dog"
      m="auto"
      mt={[ '-20px', '-60px', '-120px' ]}
      mb={[ '-40px', '-140px', '-200px' ]}
      w={[ 280, 480, 640 ]}
      h={[ 280, 480, 640 ]}
      position="relative"
    >
      {loading && (
        <Spinner 
          size="xl" 
          position="absolute" 
          left="50%"
          top="50%"
          ml="calc(0px - var(--spinner-size) / 2)"
          mt="calc(0px - var(--spinner-size))"
        />
      )}
    </Box>
  )
}

export default Character;