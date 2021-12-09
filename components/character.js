import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
  // const [animations] = useState(['Walking']);
  
  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer;
    if(container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      renderer.setSize(scW, scH);
    }
  }, [renderer]);

  let mixer;
  let actions;

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
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
      scene.fog = new THREE.Fog( 0xa0a0a0, 1000, 2000 );

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
      // const light = new THREE.AmbientLight( 0xffffff );
      scene.add(light);
     
      // const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 3000, 3000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
      // mesh.rotation.x = - Math.PI / 2;
      // mesh.receiveShadow = true;
      // scene.add( mesh );

      // const grid = new THREE.GridHelper( 3000, 20, 0x000000, 0x000000 );
      // grid.material.opacity = 0.2;
      // grid.material.transparent = true;
      // scene.add( grid );

      let mixers = [];
      new Promise((resolve, reject) => {
        const loader = new FBXLoader();
        loader.load( '/assets/FireFighter.fbx', ( object ) => {
          mixer = new THREE.AnimationMixer( object );
          actions = [];
          
          // object.mixer = new THREE.AnimationMixer( object );
          object.scale.set(0.5, 0.5, 0.5);
          mixers.push( object.mixer );

          // const action = object.mixer.clipAction( object.animations[ 0 ] );
          // action.play();

          object.traverse(( child ) => {
            if( child.isMesh ) {
              // child.material.map = null;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          })

          const tloader = new THREE.TextureLoader();
          tloader.load("/assets/FireFighter.png", ( texture ) => {
              object.traverse(( child ) => {
                if ( child.isMesh ) child.material.map = texture;
              });
          });
  
          scene.add( object );
          resolve( object );
        },
        undefined,
        (error) => {
          reject(error)
        }
        )

        loader.load( '/assets/Walking.fbx', (object) => {
          const action = mixer.clipAction( object.animations[ 0 ] );
          actions.push(action);
          console.log(object.animations [ 0 ]);
          object.traverse(( child ) => {
            if( child.isMesh ) {
              child.castShadow = true;
              child.receiveShadow = false;
            }
          })
          action.play();
          scene.add( object );
        })
      }).then(() => {
        animate();
        setLoading(false);
      })

      const controls = new OrbitControls ( camera, renderer.domElement );
      controls.autoRotate = true;
      controls.target = target;
      // controls.target.set( 0, 60, 0 );
      controls.update();
      setControls(controls);

      const req = null;
      // let frame = 0;

      // const loadNextAnim = ( loader ) => {
      //   const anim = animations.pop();

      // }

      const animate = () => {
        req = requestAnimationFrame(animate);
        const delta = clock.getDelta();

        if( mixer ) mixer.update( delta );
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

        renderer.render(scene, camera);
      }
      return () => {
        cancelAnimationFrame(req)
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