// import { useRef } from 'react';
// import Spline from '@splinetool/react-spline';

// export default function Background() {
//   const cube = useRef();

//   function onLoad(spline) {
//     const obj = spline.findObjectByName('Cube');
//     // or
//     // const obj = spline.findObjectById('8E8C2DDD-18B6-4C54-861D-7ED2519DE20E');

//     // save it in a ref for later use
//     cube.current = obj;
//   }

//   function moveObj() {
//     console.log(cube.current); // Spline Object => { name: 'Cube', id: '8E8C2DDD-18B6-4C54-861D-7ED2519DE20E', position: {}, ... }

//     // move the object in 3D space
//     cube.current.position.x += 10;
//   }

//   return (
//     <div>
//       <Spline
//         scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
//         onLoad={onLoad}
//       />
//       <button type="button" onClick={moveObj}>
//         Move Cube
//       </button>
//     </div>
//   );
// }