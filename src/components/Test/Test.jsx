import { animated, useSpring, useTransition } from "@react-spring/web";
import { useState } from "react";

const Test = () => {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const [transition, api] = useSpring(() => ({
    from: { opacity: 0 },

    to: { opacity: 1 },
  }));
  console.log(array);
  return (
    <>
      <animated.div style={{ ...transition }}>{array}</animated.div>
      <button onClick={() => setArray((t) => t.push(...t, 1))}>Push</button>
    </>
  );
};

export default Test;
