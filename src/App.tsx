import { Suspense } from "react";
import Routes from "Routes";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes />
      </Suspense>
    </>
  );
}

export default App;
