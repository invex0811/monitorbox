import MainLayout from "../../Layout/MainLayout";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

const RoadMap = () => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  function openInNewWindow(url) {
    window.open(url, "_blank");
  }

  const buildRoute = () => {
    let clipboardContent = "";
    setCoordinates([]);
    navigator.clipboard
      .readText()
      .then((text) => {
        clipboardContent = text;
        const regex = /(-?\d+\.\d{4,})\s(-?\d+\.\d{4,})/g;
        const newCoordinates = [];
        let match;

        while ((match = regex.exec(clipboardContent)) !== null) {
          const latitude = parseFloat(match[1]);
          const longitude = parseFloat(match[2]);
          newCoordinates.push({ latitude, longitude });
        }

        setCoordinates(newCoordinates);

        const baseUrl = "https://www.google.com/maps/dir/";

        const waypoints = newCoordinates
          .map((coord) => `${coord.latitude},${coord.longitude}`)
          .join("/");

        const finalUrl = `${baseUrl}${waypoints}`;
        openInNewWindow(finalUrl);
      })
      .catch((err) => {
        setCoordinates(["Ошибка при чтении буфера обмена:", err]);
      });
  };

  return (
    <MainLayout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant={"contained"} color={"success"} onClick={buildRoute}>
          Build route
        </Button>
      </Box>
      <Box>
        {/*<iframe*/}
        {/*  src={url}*/}
        {/*  width="800"*/}
        {/*  height="600"*/}
        {/*  style={{ border: "0" }}*/}
        {/*  allowFullScreen=""*/}
        {/*  referrerPolicy="no-referrer-when-downgrade"*/}
        {/*></iframe>*/}
      </Box>
    </MainLayout>
  );
};

export default RoadMap;
