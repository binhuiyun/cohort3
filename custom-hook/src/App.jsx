import React, { useEffect, useState } from 'react'
import './App.css'


function App() {
  return (
    <div >
      <ToggleMessage />
      <ToggleMessage />
      <ToggleMessage />
    </div>
  )
}

// the component isnt re-rendering 
// because we havent used a state variable

const ToggleMessage = () => {
  let [notificationCount, setNotificationCount] = useState(0);

  console.log("re-render");
  function increment() {
    setNotificationCount(notificationCount + 1);
  }

  return (
      <div>
          <button onClick={increment}>
              Increase count
          </button>
          {notificationCount}
      </div>
  );
};
// function App() {
//   const [render, setRender] = useState(true);

//   useEffect(() => {
//     setInterval(() => {
//       setRender(r => !r);
//     }, 2000)
//   }, []);

//   return (
//     <>
//       {render ? <MyComponent /> : <div></div>}
//     </>
//   )
// }


// function MyComponent() {
//   useEffect(() => {
//     console.log("component mounted");

//     return () => {
//       console.log("component unmounted");
//     };
//   }, []);

//   return <div>
//     From inside my component
//   </div>
// }

export default App