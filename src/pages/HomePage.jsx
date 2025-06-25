import { Button } from "@mui/material";
import { useState } from "react";

function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>HomePage</p>
      <p>{count}</p>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        SUBMIT
      </Button>
    </>
  );
}

export default HomePage;

// Nhấn Ctrl + Space -> Gợi ý Code TailwindCSS
