import MainLayout from "../../Layout/MainLayout";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DateTime } from "luxon";

const TimeCalculator = () => {
  const [heightTimestamp, setHeightTimestamp] = useState("");
  const [lowTimestamp, setLowTimestamp] = useState("");
  const [heightTEH, setHeightTEH] = useState("");
  const [lowTEH, setLowTEH] = useState("");
  const [TEHCheckbox, setTEHCheckbox] = useState(false);
  const [timestampResult, setTimestampResult] = useState("");
  const [TEHResult, setTEHResult] = useState("");
  const [operation, setOperation] = useState("");
  // const [TEHTime, setTEHTime] = useState({ hours: "", minutes: "" });

  console.log(heightTEH, lowTEH);
  const calculateTime = () => {
    let newDate = DateTime.fromFormat(heightTimestamp, "dd-MMM-yyyy HH:mm:ss");
    let newDate2 = DateTime.fromFormat(lowTimestamp, "dd-MMM-yyyy HH:mm:ss");
    let diff = newDate
      .diff(newDate2, ["hours", "minutes", "seconds"])
      .toObject();

    setTimestampResult(
      diff.hours + "h " + diff.minutes + "m " + diff.seconds + "s "
    );

    if (TEHCheckbox) {
      // setTEHResult(heightTEH - lowTEH);

      let tehtime = heightTEH - lowTEH;
      let hours = Math.trunc(tehtime);
      let minutes = Math.trunc((tehtime % 1) * 60);
      // setTEHTime({
      //     minutes: Math.trunc((TEHResult % 1) * 60),
      //     hours: Math.trunc(TEHResult),
      // });

      setTEHResult(hours + "h " + minutes + "m");

      //Operation section
      if (diff.hours > hours) {
        setOperation(">");
      } else if (diff.hours < hours) {
        setOperation("<");
      } else if (diff.hours === hours) {
        if (diff.minutes > minutes) {
          setOperation(">");
        } else if (diff.minutes < minutes) {
          setOperation("<");
        } else if (diff.minutes === minutes) {
          setOperation("=");
        }
      }
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            type="text"
            id="outlined-number"
            label={"Height time"}
            onChange={(event) => setHeightTimestamp(event.target.value)}
            sx={{
              margin: " 0 5px 7px 0",
            }}
          />
          <TextField
            type="text"
            id="outlined-number"
            label={"Low time"}
            onChange={(event) => setLowTimestamp(event.target.value)}
            sx={{
              marginRight: "5px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: TEHCheckbox ? "flex" : "none",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            type="number"
            id="outlined-number"
            label={"Height TEH"}
            onChange={(event) => setHeightTEH(Number(event.target.value))}
            sx={{
              margin: "0 0 7px 5px",
            }}
          />
          <TextField
            type="number"
            id="outlined-number"
            label={"Low TEH"}
            onChange={(event) => setLowTEH(Number(event.target.value))}
            sx={{
              marginLeft: "5px",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display:
            lowTimestamp && heightTimestamp !== undefined ? "flex" : "none",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px 0",
            background: "#16253B",
            color: "#fff",
            borderRadius: "5px",
            padding: "5px 20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.7rem",
            }}
          >
            {timestampResult}
          </Typography>
          <Typography
            sx={{
              margin: "0 10px",
              fontWeight: "700",
              fontSize: "1.5rem",
              display: TEHCheckbox ? "flex" : "none",
            }}
          >
            {operation}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.7rem",
              display: TEHCheckbox ? "flex" : "none",
            }}
          >
            {TEHResult}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="showTEH"
              checked={TEHCheckbox}
              onChange={(event) => setTEHCheckbox(event.target.checked)}
            />
          }
          label="Show TEH"
        />
      </Box>
      <Box
        sx={{
          margin: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant={"outlined"} onClick={calculateTime}>
          Submit
        </Button>
      </Box>
    </MainLayout>
  );
};

export default TimeCalculator;
