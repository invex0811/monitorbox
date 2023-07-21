import MainLayout from "../../Layout/MainLayout";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";

const TimeCalculator = () => {
  const [heightTimestamp, setHeightTimestamp] = useState("");
  const [lowTimestamp, setLowTimestamp] = useState("");
  const [heightTEH, setHeightTEH] = useState("");
  const [lowTEH, setLowTEH] = useState("");

  const [TEHCheckbox, setTEHCheckbox] = useState(false);
  const [calcProximityTEHCheckbox, setCalcProximityTEHCheckbox] =
    useState(false);
  const [timestampResult, setTimestampResult] = useState("");
  const [TEHResult, setTEHResult] = useState("");
  const [operation, setOperation] = useState("");
  const [info, setInfo] = useState("");
  const [alertType, setAlertType] = useState("warning");
  const [title, setTitle] = useState("Time calculator");
  const [copyResultProxy, setCopyResultProxy] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = title;
  }, [title]);

  const calculateTime = () => {
    let newDate = DateTime.fromFormat(heightTimestamp, "dd-MMM-yyyy HH:mm:ss");
    let newDate2 = DateTime.fromFormat(lowTimestamp, "dd-MMM-yyyy HH:mm:ss");
    let diff = newDate
      .diff(newDate2, ["hours", "minutes", "seconds"])
      .toObject();

    setTimestampResult(
      diff.hours + "h " + diff.minutes + "m " + diff.seconds + "s "
    );

    let operationTWO;

    if (TEHCheckbox) {
      let tehtime = heightTEH - lowTEH;
      let hours = Math.trunc(tehtime);
      let minutes = Math.trunc((tehtime % 1) * 60);

      setTEHResult(hours + "h " + minutes + "m");

      if (diff.hours === hours && diff.minutes === minutes) {
        setOperation("=");
        operationTWO = "=";
      } else if (
        diff.hours > hours ||
        (diff.hours === hours && diff.minutes > minutes)
      ) {
        setOperation(">");
        operationTWO = ">";
      } else {
        setOperation("<");
        operationTWO = "<";
      }
    }
    let proxyValue;
    const tolerance = 0.1;

    if (calcProximityTEHCheckbox) {
      if (operationTWO === ">" || operationTWO === "<") {
        if (heightTimestamp > lowTimestamp) {
          proxyValue = heightTEH - (diff.hours + diff.minutes / 60);
          proxyValue = proxyValue.toFixed(2);

          if (Math.abs(proxyValue - lowTEH) <= tolerance) {
            setAlertType("info");
            setInfo(`Ожидался TEH: ${proxyValue}  "В зоне погрешности"`);
          } else {
            setAlertType("warning");
            setInfo(`Ожидался TEH: ${proxyValue}`);
          }
        } else if (heightTimestamp < lowTimestamp) {
          diff.hours = Math.abs(diff.hours);
          diff.minutes = Math.abs(diff.minutes);
          proxyValue = heightTEH + (diff.hours + diff.minutes / 60);
          proxyValue = proxyValue.toFixed(2);

          if (Math.abs(proxyValue - lowTEH) <= tolerance) {
            setAlertType("info");
            setInfo(`Ожидался TEH: ${proxyValue}  "В зоне погрешности"`);
          } else {
            setAlertType("warning");
            setInfo(`Ожидался TEH: ${proxyValue}`);
          }
        } else {
          proxyValue = heightTEH;
          proxyValue = proxyValue.toFixed(2);
          setInfo(`Ожидался TEH: ${proxyValue}`);
          setAlertType("warning");
        }
        setTitle(`TEH: ${proxyValue}`);
        setCopyResultProxy(proxyValue);
      } else if (operationTWO === "=") {
        setInfo("Все верно 🫡");
        setAlertType("success");
        setTitle("Все верно 🫡");
      }
    }
  };
  const onCalcMode = () => {
    setCalcProximityTEHCheckbox((p) => !calcProximityTEHCheckbox);
    if (TEHCheckbox && calcProximityTEHCheckbox) {
      setTEHCheckbox(false);
    } else if (TEHCheckbox) {
      setTEHCheckbox(true);
    } else {
      setTEHCheckbox((t) => !TEHCheckbox);
    }
  };

  const copyResult = () => {
    navigator.clipboard
      .writeText(copyResultProxy)
      .then(() => {
        dispatch({
          type: "SENT_ALERT",
          severity: "success",
          title: "Success",
          value: "Login successful",
        });
        setTimeout(() => {
          dispatch({
            type: "CLOSE_ALERT",
          });
        }, 3000);
      })
      .catch((e) => {
        dispatch({
          type: "SENT_ALERT",
          severity: "error",
          title: e.code,
          value: e.message,
        });
        setTimeout(() => {
          dispatch({
            type: "CLOSE_ALERT",
          });
        }, 3000);
      });
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
            label={
              calcProximityTEHCheckbox ? "Original timestamp" : "Height time"
            }
            onChange={(event) => setHeightTimestamp(event.target.value)}
            sx={{
              margin: " 0 5px 7px 5px",
            }}
          />
          <TextField
            type="text"
            id="outlined-number"
            label={calcProximityTEHCheckbox ? "After timestamp" : "Low time"}
            onChange={(event) => setLowTimestamp(event.target.value)}
            sx={{
              margin: " 0 5px 0 5px",
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
            label={calcProximityTEHCheckbox ? "Original TEH" : "Height TEH"}
            onChange={(event) => setHeightTEH(Number(event.target.value))}
            sx={{
              margin: "0 0 7px 5px",
            }}
          />
          <TextField
            type="number"
            id="outlined-number"
            label={calcProximityTEHCheckbox ? "After TEH" : "Low TEH"}
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
            background: "#9eadff",
            borderRadius: "5px",
            padding: "5px 20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.7rem",
              color: "#000",
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
              color: "#000",
            }}
          >
            {operation}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.7rem",
              display: TEHCheckbox ? "flex" : "none",
              color: "#000",
            }}
          >
            {TEHResult}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display:
            lowTimestamp && heightTimestamp !== undefined ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Alert severity={alertType}>{info}</Alert>
        <Tooltip title={"Copy result"} placement={"right"} arrow={true}>
          <IconButton color={"info"} onClick={copyResult}>
            <FontAwesomeIcon icon={faCopy} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormControlLabel
          disabled={calcProximityTEHCheckbox}
          control={
            <Checkbox
              name="showTEH"
              checked={TEHCheckbox}
              onChange={(event) => setTEHCheckbox(event.target.checked)}
            />
          }
          label="Show TEH"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="dynamic TEH"
              checked={calcProximityTEHCheckbox}
              onChange={onCalcMode}
            />
          }
          label="Dynamic TEH"
        />
      </Box>
      <Box
        sx={{
          margin: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            mr: "10px",
          }}
          variant={"contained"}
          color="success"
          onClick={calculateTime}
        >
          Submit
        </Button>
      </Box>
    </MainLayout>
  );
};

export default TimeCalculator;
