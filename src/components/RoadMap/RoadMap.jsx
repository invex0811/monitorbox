import MainLayout from "../../Layout/MainLayout";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { text } from "@fortawesome/fontawesome-svg-core";

const RoadMap = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [systemCheck, setSystemCheck] = useState("");
  const [copyData, setCopyData] = useState("");

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  useEffect(() => {
    const platform = navigator.platform;
    setSystemCheck(platform);
    console.log(platform);
  }, [systemCheck]);

  function openInNewWindow(url) {
    window.open(url, "_blank");
  }

  const takeCoordinates = (clipboardContent) => {
    setCoordinates([]);
    const newCoordinates = [];

    const regex = /(-?\d+\.\d{4,})\s(-?\d+\.\d{4,})/g;
    let match;

    while ((match = regex.exec(clipboardContent)) !== null) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
      newCoordinates.push({ latitude, longitude });
    }
    setCoordinates(newCoordinates);

    const baseUrl = "https://www.google.com/maps/dir/";

    const waypoints = newCoordinates
      .reverse()
      .map((coord) => `${coord.latitude},${coord.longitude}`)
      .join("/");

    const finalUrl = `${baseUrl}${waypoints}`;
    openInNewWindow(finalUrl);
  };

  const buildRoute = () => {
    if (systemCheck === "Win32") {
      takeCoordinates(copyData);
    } else {
      navigator.clipboard.readText().then((text) => {
        takeCoordinates(text);
      });
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: systemCheck === "Win32" ? "flex" : "none",
          justifyContent: "center",
        }}
      >
        <TextField
          type="text"
          id="outlined"
          label={"Paste copy"}
          onChange={(event) => setCopyData(event.target.value)}
          sx={{
            margin: "0 0 7px 5px",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant={"contained"} color={"success"} onClick={buildRoute}>
          Build route
        </Button>
      </Box>
    </MainLayout>
  );
};

export default RoadMap;
