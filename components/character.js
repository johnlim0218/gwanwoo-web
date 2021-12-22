import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Preloader } from '../libs/preloader';
import { JoyStick } from '../libs/joystick';
import { CameraButton } from '../libs/cameraButton';
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
    const req = null;
    let renderer;
    const { current: container } = refContainer;

    if (container && !renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      const game = () => {
        let controls;
        let camera;
        const animations = ["Idle1", "Walking", "WalkingBackwards", "Running", "RunToStop", "RightTurn", "LeftTurn"];
        // let joystick;

        let player = {};
        let cameraFade = 0.05;
        let activeCamera = {
          set current(object) {
            player.cameras.active = object;
            this.value = object;
          },
        }

        let action = {
          set duration(duration) {
            this.duration = duration;
          },
          set current(name) {
            if (player.action == name) return;
            
            if (player.action) {
              const previousAction = player.mixer.clipAction(player[player.action], player.root);
              previousAction.fadeOut(1);
            }
            
            const action = player.mixer.clipAction(player[name], player.root);
            action
              .reset()
              .setEffectiveTimeScale(1)
              .setEffectiveWeight(1)
              .fadeIn(0.1)
              .play();
            // action.time = 0;
            // player.mixer.stopAllAction();
            player.action = name;
            // // action.fadeIn(0.5);
            // action.play();
            player.actionTime = Date.now();
            this.value = action;
          },
          duration: 0.1,
          value: {},
        };

        const assetsPath = '/assets/';
        const options = {
          assets: [],
          oncomplete: () => {
            init();
            animate();
          }
        }

        animations.forEach((animation) => {
          options.assets.push(`${assetsPath}fbx/movements/${animation}.fbx`)
        })

        new Preloader(options);
        
        window.onError = (error) => {
          console.error(JSON.stringify(error));
        }
        
        const init = () => {
          camera = new THREE.PerspectiveCamera(
            45, // fov
            window.innerWidth / window.innerHeight, // aspect
            1, // near
            4000 // far
          );
                                            
          camera.position.set(100, 200, 500);
          // camera.lookAt(target);
          camera.lookAt(new THREE.Vector3(0, 10, 0));
          setCamera(camera);

          const light = new THREE.HemisphereLight(0xffffff, 0x444444);
          light.position.set( 0, 200, 0);
          scene.add(light);
          
          light = new THREE.DirectionalLight(0xffffff);
          light.position.set(0, 200, 100);
          light.castShadow = true;
          light.shadow.camera.top = 180;
          light.shadow.camera.bottom = -100;
          light.shadow.camera.left = - 120;
          light.shadow.camera.right = 120;
          scene.add(light); 

          const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(3000, 3000), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
          mesh.rotation.x = - Math.PI / 2;
          mesh.receiveShadow = true;
          scene.add(mesh);

          const grid = new THREE.GridHelper(3000, 20, 0x000000, 0x000000);
          grid.material.opacity = 0.2;
          grid.material.transparent = true;
          scene.add(grid);

          const loader = new FBXLoader();
          loader.load(`${assetsPath}fbx/FireFighter.fbx`, (object) => {
            object.mixer = new THREE.AnimationMixer(object);
            // object.mixer.addEventListener('finished', () => {
            //   action.current = 'Idle1';
            // });
            
            player.mixer = object.mixer;
            player.root = object.mixer.getRoot();
            
            object.name = "Character";
            object.scale.set(0.5, 0.5, 0.5);
            // object.position.x = -60;

            object.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });

            const tloader = new THREE.TextureLoader();
            tloader.load(`${assetsPath}png/FireFighter.png`, (texture) => {
              object.traverse((child) => {
                if (child.isMesh) {
                  child.material.map = texture;
                }
              })
            });
            
            scene.add(object);
            player.object = object;
            
            new JoyStick({
              onMove: playerControl,
              container,
            })

            new CameraButton({
              onClick: changeCamera,
              container,
            });

            createCameras();

            animations.forEach((animation) => {
              loadNextFBXAnimation(loader, animation);
            })
          },
            undefined,
            (error) => onError(error),
          );
          
          controls = new OrbitControls(camera, renderer.domElement);
          controls.autoRotate = true;
          controls.target = target;
          // controls.target.set( 0, 60, 0 );
          controls.update();
          setControls(controls);
        } 

        const loadNextFBXAnimation = (loader, animation) => {
          loader.load(`${assetsPath}fbx/movements/${animation}.fbx`, (object) => {
            player.object.add(object);
            player[animation] = object.animations[0];
            if (animation == 'Idle1') {
              action.current = 'Idle1';
            }
          },
            undefined,
            (error) => onError(error),
          )
        }

        const loadEnvironment = (loader) => {
          loader.load('', (object) => {
            scene.add(object);

            object.name = "Environment";

            object.traverse((child) => {
              if(child.isMesh) {

              }
            })
          },
            undefined,
            (error) => onError(error)
          )
        } 

        const createCameras = () => {
          const front = new THREE.Object3D();
          front.position.set(180, 500, 1100);
          front.parent = player.object;

          const back = new THREE.Object3D();
          back.position.set(0, 400, -1000);
          back.parent = player.object;

          const wide = new THREE.Object3D();
          wide.position.set(250, 600, 1300);
          wide.parent = player.object;

          const overhead = new THREE.Object3D();
          overhead.position.set(0, 800, 0);
          overhead.parent = player.object;

          const collect = new THREE.Object3D();
          collect.position.set(40, 82, 94);
          collect.parent = player.object;

          player.cameras = { front, back, wide, overhead, collect };
          activeCamera.current = player.cameras.wide;
          cameraFade = 1;

          setTimeout(() => {
            activeCamera.current = player.cameras.back;
            cameraFade = 0.01;
            setTimeout(() => {
              cameraFade = 0.1;
            }, 1500);
          }, 2000);
        }

        const changeCamera = (fade = 0.05) => {
          const cameras = Object.keys(player.cameras);
          cameras.splice(cameras.indexOf('active', 1));

          for (let prop in player.cameras) {
            if (prop !== 'active') {
              if (player.cameras['active'] === player.cameras[prop]){
                const activeCameraIndex = cameras.findIndex((camera) => camera === prop);
                if(activeCameraIndex === cameras.length - 1) {
                  activeCameraIndex = 0;
                } else {
                  activeCameraIndex += 1;
                }
                const nextCamera = player.cameras[cameras[activeCameraIndex]]
                activeCamera.current = nextCamera;
                break;
              }
            }
          }
          cameraFade = fade;

        }

        const playerControl = (forward, turn) => {
          turn = -turn;
          if (forward == 0 && turn == 0) {
            player.move = undefined;
          } else {
            player.move = { forward, turn }
          }

          if (forward > 0) {
            if (forward >= 20) {
              if (player.action != 'Running'){
                action.current = 'Running';
              }
            } else {
              if (player.action != 'Walking') {
                action.current = 'Walking';  
              }
            }
            // if (player.action != 'Walking') {
            //   action.current = 'Walking';
            // };
          } else if (forward < 0) {
            action.current = 'WalkingBackwards';
          } else {
            if (player.action == 'Walking' || player.action == 'Running' || player.action == 'WalkingBackwards') {
              action.current = 'Idle1';
            }
          }
          
        }

        const movePlayer = (dt) => {
          const pos = player.object.position.clone();
          pos.y += 60;
          let dir = new THREE.Vector3();
          player.object.getWorldDirection(dir);
          dir.negate()
          let blocked = false;

          if (!blocked) {
            if(player.move.forward > 0) {
              const speed = (player.action == 'Running') ? 200: 100;
              player.object.translateZ(dt * speed);
            } else {
              player.object.translateZ(-dt * 30);
            }
          }

          // dir.set(-1,0,0);
          // dir.applyMatrix4(player.object.matrix);
          // dir.normalize();
        }

        const renderScene = () => {
          renderer.render(scene, camera);
        }

        const animate = () => {
          req = requestAnimationFrame(animate);
          
          const delta = clock.getDelta();
          
          if (player.mixer != undefined) {
            player.mixer.update(delta);
          }
          
          if (player.move != undefined) {
            if (player.move.forward != 0) movePlayer(delta);
            player.object.rotateY(player.move.turn * delta);
          }
          // console.log(player.object);
          if (player.cameras != undefined && player.cameras.active != undefined) {
            camera.position.lerp(
              player.cameras.active.getWorldPosition(new THREE.Vector3()), 
              cameraFade
            );
            let position;
            
            position = player.object.position.clone();
            position.y += 200;


            camera.lookAt(position)
          }
          // console.log(player.object);
          renderScene();
        }

        const onError = (error) => {
          console.error(JSON.stringify(error));
          console.error(error.message);
        }
      }
      
      game();
      setLoading(false);
  
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
      // mb={[ '-40px', '-140px', '-200px' ]}
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