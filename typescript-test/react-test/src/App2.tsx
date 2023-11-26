import { render } from "@testing-library/react";
import { useState } from "react";

type ChildProps = {
  parentCounter: number;
};

function ChildCounter(props: ChildProps) {
  const [childCounter, setChildCounter] = useState<number>(0);

  function handleClickIncrement() {
    setChildCounter(childCounter + 1);
  }

  console.log("rendering child component");

  return (
    <div>
      <button onClick={handleClickIncrement}>Increment child counter</button>
      <p>Child counter: {childCounter}</p>
      <p>Parent counter: {props.parentCounter}</p>
    </div>
  );
}

function ParentCounter() {
  const [parentCounter, setParentCounter] = useState<number>(0);

  function handleClickIncrement() {
    setParentCounter(parentCounter + 1);
  }

  console.log("rendering parent component");

  return (
    <div>
      <button onClick={handleClickIncrement}>Increment parent counter</button>
      <ChildCounter parentCounter={parentCounter} />
    </div>
  );
}

function App2() {
  return (
    <div>
      App works!
      <br />
      <ParentCounter />
    </div>
  );
}
export default App2;
