import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import LayoutGapUnloading from "../../Layout/LayoutGap&Unloading";

const imagesRef = [
  "./images/timeZoneTLImages/washington.jpg",
  "./images/timeZoneTLImages/central.jpg",
  "./images/timeZoneTLImages/eastern.jpg",
  "./images/timeZoneTLImages/mountain.jpg",
];

const GapUnloading = (props) => {
  const [zone, setZone] = useState("Chicago");
  const [currentTime, setCurrentTime] = useState("");
  const [timeUnloading, setTimeUnloading] = useState("");
  const [timeGAP, setTimeGAP] = useState("");
  const [imagesZone, setImagesZone] = useState(imagesRef[1]);
  const [title, setTitle] = useState("GapUnloading");

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const time = setInterval(() => {
      let timeZone = DateTime.local().setZone(`America/${zone}`);

      switch (zone) {
        case "Chicago":
          setImagesZone(imagesRef[1]);
          break;
        case "Los_Angeles":
          setImagesZone(imagesRef[0]);
          break;
        case "Denver":
          setImagesZone(imagesRef[3]);
          break;
        case "Detroit":
          setImagesZone(imagesRef[2]);
          break;

        default:
          break;
      }

      let timeUnloadingDay = timeZone.minus({ days: 7 });
      let timeUnloadingDay2 = timeZone.minus({ days: 8 });

      setCurrentTime(timeZone.toFormat("FF"));
      setTimeUnloading(
        `${timeUnloadingDay.toFormat(
          "DD"
        )} и переходящий ивент с ${timeUnloadingDay2.toFormat(
          "dd MMM"
        )} на ${timeUnloadingDay.toFormat("dd MMM")}`
      );
      setTimeGAP(timeZone.minus({ days: 9 }).toFormat("FF"));

      //Title change
      setTitle(`Unloading: ${timeUnloadingDay.toFormat("DD")}`);
    });
    return () => clearInterval(time);
  }, [zone]);

  return (
    <LayoutGapUnloading>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <img
          src={imagesZone}
          alt="Zone image"
          loading="lazy"
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            zIndex: "-100",
          }}
        />
        <Box
          sx={{
            width: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            paddingTop: "10px",
          }}
        >
          <FormControl sx={{ width: "250px", marginBottom: "20px" }}>
            <Select
              labelId="demo-simple-select"
              id="demo-simple-select"
              value={zone}
              onChange={(event) => {
                setZone(event.target.value);
              }}
              sx={{
                color: "#000",
                backgroundColor: "#9eadff",
              }}
            >
              <MenuItem value={"Los_Angeles"}>Pacific</MenuItem>
              <MenuItem value={"Denver"}>Mountain</MenuItem>
              <MenuItem value={"Chicago"}>Central</MenuItem>
              <MenuItem value={"Detroit"}>Eastern</MenuItem>
            </Select>
          </FormControl>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
          >
            <Typography
              variant="h5"
              sx={{
                padding: " 5px 10px",
                borderRadius: "5px",
                background: "#9eadff",
                color: "#000",
              }}
            >
              Time GAP: {timeGAP}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                padding: " 5px 10px",
                borderRadius: "5px",
                margin: "10px 0",
                background: "#9eadff",
                color: "#000",
                textAlign: "center",
              }}
            >
              Time unloading: {timeUnloading}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                padding: " 5px 10px",
                borderRadius: "5px",
                background: "#9eadff",
                color: "#000",
              }}
            >
              Current time: {currentTime}
            </Typography>
          </Box>
        </Box>
      </Box>
    </LayoutGapUnloading>
  );
};

export default GapUnloading;
