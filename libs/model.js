import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';




// export function loadObjectModel(
//   scene,
//   objectPath,
//   options = {
//     receiveShadow: true,
//     castShadow: true,
//   }
// ) {
//   const { receiveShadow, castShadow } = options;
//   return new Promise((resolve, reject) => {
//     const loader = new OBJLoader();
//     loader.load(
//       objectPath,
//       object => {
//         console.log(object)
//         const obj = object.scene;
//         obj.name = 'dog';
//         obj.position.y = 0;
//         obj.position.x = 0;
//         obj.receiveShadow = receiveShadow;
//         obj.castShadow = castShadow;
//         scene.add(obj);

//         obj.traverse(function (child) {
//           if(child.isMesh) {
//             child.castShadow = castShadow;
//             child.receiveShadow = receiveShadow;
//           }
//         })

//         resolve(obj)
//       },
//       undefined,
//       function (error) {
//         reject(error);
//       }
//     )
//   })
// }

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
