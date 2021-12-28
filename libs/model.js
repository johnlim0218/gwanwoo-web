import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export function loadGLTFModel(
  scene,
  glbPath,
  options = {
    receiveShadow: true,
    castShadow: true,
  }
)  {
  const { receiveShadow, castShadow } = options;
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      glbPath,
      gltf => {
        const obj = gltf.scene;
        obj.name = 'dog';
        obj.position.y = 0;
        obj.position.x = 0;
        obj.receiveShadow = receiveShadow;
        obj.castShadow = castShadow;
        scene.add(obj);

        obj.traverse(function (child) {
          if(child.isMesh) {
            child.castShadow = castShadow;
            child.receiveShadow = receiveShadow;
          }
        })

        resolve(obj)
      },
      undefined,
      function (error) {
        reject(error);
      }
    )
  }) 
}

export function loadFBXModel({
  scene,
  animations,
  mixer,
  actions = [],
  fbxPath,
  texturePath,
  options = {
    castShadow: true,
    receiveShadow: true,
  }
}) {
  const { castShadow, receiveShadow } = options;
  return new Promise((resolve, reject) => {
    const loader = new FBXLoader();
    loader.load(fbxPath, (object) => {
      mixer = new THREE.AnimationMixer(object);
      const action = mixer.clipAction(object.animations[0]);
      // action.paused = true;
      actions.push(action);

      object.scale.set(0.5, 0.5, 0.5);
      object.castShadow = castShadow;
      object.receiveShadow = receiveShadow;
      object.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = castShadow;
          child.receiveShadow = receiveShadow;
        }
      })

      if(texturePath) {
        const tloader = new THREE.TextureLoader();
        tloader.load(texturePath, (texture) => {
          object.traverse((child) => {
            if (child.isMesh) {
              child.material.map = texture;
            }
          })
        })
      }

      scene.add(object);
      
      animations.forEach((animation) => {
        loader.load(`/assets/${animation}.fbx`, (_object) => {
          const action = mixer.clipAction(_object.animations[0]);
          actions.push(action);
          _object.traverse((child) => {
            if(child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = false;
            }
          });
          action.play();
          scene.add(_object);
        },
          undefined,
          (error) => {
            reject(error)
          }
        )
      });

      resolve(object);
    },
      undefined,
      (error) => {
        reject(error)
      }
    )
  })
}

export function loadNextFBXAnimation({
  scene,
  animation, 
  mixer,
  actions,
  loader, 
  reject
}) {
  loader.load(`/assets/${animation}.fbx`, (object) => {
    const action = mixer.clipAction(object.animations[0]);
    actions.push(action);
    console.log(actions);
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