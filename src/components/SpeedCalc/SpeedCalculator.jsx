import MainLayout from "../../Layout/MainLayout";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const SpeedCalculator = () => {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState(
    DateTime.fromObject({ hour: "00", minute: "00" })
  );
  const [result, setResult] = useState("");

  const handleChange = (value) => {
    setTime(value);
  };

  const calcSpeed = () => {
    setResult(distance / (time.hour + time.minute / 60));
    setResult((r) => r.toFixed(2));
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItem: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            type="number"
            id="outlined-number"
            label={"Distance in miles"}
            onChange={(event) => setDistance(event.target.value)}
            sx={{
              marginRight: "5px",
            }}
          />
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <TimeField
              label="Time"
              value={time}
              onChange={handleChange}
              format="HH:mm"
              sx={{
                marginLeft: "5px",
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            display: result ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px 0",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.7rem",
              background: "#16253B",
              color: "#fff",
              borderRadius: "5px",
              padding: "5px 20px",
              width: "30%",
              textAlign: "center",
            }}
          >
            {"Speed: " + result + " ml"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={calcSpeed}
            sx={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default SpeedCalculator;
