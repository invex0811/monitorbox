import MainLayout from "../../Layout/MainLayout";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

const GapUnloading = (props) => {
  const [zone, setZone] = useState("Chicago");
  const [currentTime, setCurrentTime] = useState("");
  const [timeUnloading, setTimeUnloading] = useState("");
  const [timeGAP, setTimeGAP] = useState("");

  useEffect(() => {
    const time = setInterval(() => {
      let timeZone = DateTime.local().setZone(`America/${zone}`);

      setCurrentTime(timeZone.toFormat("FF"));
      setTimeUnloading(timeZone.minus({ days: 8, hours: 12 }).toFormat("FF"));
      setTimeGAP(timeZone.minus({ days: 9 }).toFormat("FF"));
    });
    return () => clearInterval(time);
  }, [zone]);

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "500px",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            alignItems: "center",
            height: "100%",
          }}
        >
          <FormControl sx={{ width: "250px", marginBottom: "20px" }}>
            <InputLabel id="demo-simple-select-label">Time zone</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Time zone"
              value={zone}
              onChange={(event) => {
                setZone(event.target.value);
              }}
            >
              <MenuItem value={"Los_Angeles"}>Pacific</MenuItem>
              <MenuItem value={"Chicago"}>Central</MenuItem>
              <MenuItem value={"Denver"}>Mountain</MenuItem>
              <MenuItem value={"Detroit"}>Eastern</MenuItem>
            </Select>
          </FormControl>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography
              variant="h5"
              sx={{
                padding: " 5px 10px",
                borderRadius: "5px",
                background: "#16253B",
                color: "#fff",
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
                background: "#16253B",
                color: "#fff",
              }}
            >
              Time unloading: {timeUnloading}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                padding: " 5px 10px",
                borderRadius: "5px",
                background: "#16253B",
                color: "#fff",
              }}
            >
              Current time: {currentTime}
            </Typography>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default GapUnloading;
