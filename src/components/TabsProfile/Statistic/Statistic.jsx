import { Box, Card, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Graph from "./Graph/Graph";

const Statistic = () => {
  const randomGraph = [];

  const createRandomObject = () => {
    for (let i = 0; i < 7; i++) {
      const randomNumber = Math.floor(Math.random() * 10);
      randomGraph.push({ salary: randomNumber });
    }
  };
  useEffect(() => {
    randomGraph.length = 0;
    createRandomObject();
  }, [createRandomObject(), randomGraph]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Card variant="outlined">
        <Link
          to={"salaryStatistic"}
          style={{
            position: "relative",
            textDecoration: "none",
            textTransform: "uppercase",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: "999",
            }}
          />
          <Graph
            width={400}
            height={200}
            data={randomGraph}
            pv={"salary"}
            hide={true}
          />
          <Typography variant="h4">Salary statistic</Typography>
        </Link>
      </Card>
    </Box>
  );
};

export default Statistic;
