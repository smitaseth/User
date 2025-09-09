import User from "./components/User/User";

function App() {
  return (
    <>
      <h1 className=" p-2 rounded text-center text-2xl">
        React, Vite, Tailwind and Typescript
      </h1>
      <div className="card">
        <User />
      </div>
    </>
  );
}

export default App;
