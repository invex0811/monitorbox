import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import axios from "axios";
import { AttachMoneyRounded, HorizontalRuleRounded } from "@mui/icons-material";
import { useSpring, animated } from "@react-spring/web";

const tax = 43;
const Inputs = () => {
  const [days, setDays] = useState("");
  const [time, setTime] = useState("");
  const [rate, setRate] = useState("");
  const [totalMoney, setTotalMoney] = useState("");
  const [weekend, setWeekend] = useState("");
  const [cashBonus, setCashBonus] = useState("");
  const [dollarRate, setDollarRate] = useState("");
  const [moneyUAH, setMoneyUAH] = useState("");

  const [taxCheckbox, setTaxCheckbox] = useState(true);
  const [weekendCheckbox, setWeekendCheckbox] = useState(false);
  const [cashBonusCheckbox, setCashBonusCheckbox] = useState(false);
  const [dollarRateCheckbox, setDollarRateCheckbox] = useState(false);

  useEffect(() => {
    let dateForExchange = DateTime.local().toFormat("kkkk" + "LL" + "dd");
    axios
      .get(
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=" +
          dateForExchange +
          "&json"
      )
      .then((response) => setDollarRate(response.data[24].rate));
  }, []);

  const calculateSalary = () => {
    const daysTime = days * 8;
    const overTime = time - daysTime;
    const overRate = rate * 1.5;

    if (rate <= 2 || daysTime >= time) {
      setTotalMoney(time * rate);
    } else if (daysTime < time) {
      setTotalMoney(daysTime * rate + overTime * overRate);
    }
  };
  const plusTax = () => {
    return tax * taxCheckbox;
  };

  const plusWeekend = () => {
    return weekend * rate * weekendCheckbox;
  };

  const plusCashBonus = () => {
    return cashBonus * cashBonusCheckbox;
  };
  const plusAllMoney = () => {
    calculateSalary();
    setTotalMoney((t) =>
      Math.round(t + plusTax() + plusWeekend() + plusCashBonus())
    );
  };
  const exchangeMoney = () => {
    setMoneyUAH(dollarRate * totalMoney);
  };

  // ANIMATION

  return (
    <Box
      sx={{
        width: "240px",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">Days</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Days"
          value={days}
          onChange={(event) => {
            setDays(event.target.value);
          }}
        >
          <MenuItem value={21}>21</MenuItem>
          <MenuItem value={22}>22</MenuItem>
          <MenuItem value={23}>23</MenuItem>
        </Select>
      </FormControl>
      <TextField
        type="number"
        id="outlined-number"
        label={"Time"}
        onChange={(event) => setTime(Number(event.target.value))}
        sx={{ margin: "7px 0" }}
      />
      <TextField
        type="number"
        id="outlined-number"
        label={"Rate"}
        onChange={(event) => setRate(Number(event.target.value))}
      />
      <TextField
        sx={{
          display: `${weekendCheckbox ? "" : "none"}`,
          marginTop: "7px",
        }}
        type={"number"}
        id="outlined-number"
        label={"Weekend"}
        onChange={(event) => {
          setWeekend(Number(event.target.value * 8));
        }}
      />
      <TextField
        sx={{
          display: `${cashBonusCheckbox ? "" : "none"}`,
          marginTop: "7px",
        }}
        type={"number"}
        id="outlined-number"
        label={"Cash bonus"}
        onChange={(event) => {
          setCashBonus(Number(event.target.value));
        }}
      />
      <TextField
        sx={{
          display: `${dollarRateCheckbox ? "" : "none"}`,
          marginTop: "7px",
        }}
        type={"number"}
        id="outlined-number"
        label={"Dollar rate"}
        onChange={(event) => {
          setDollarRate(Number(event.target.value));
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="tax"
              checked={taxCheckbox}
              onChange={(event) => setTaxCheckbox(event.target.checked)}
            />
          }
          label="Tax"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="cashBonus"
              checked={cashBonusCheckbox}
              onChange={(event) => setCashBonusCheckbox(event.target.checked)}
            />
          }
          label="Cash bonus"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="weekend"
              checked={weekendCheckbox}
              onChange={(event) => setWeekendCheckbox(event.target.checked)}
            />
          }
          label="Weekend"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="dollarRate"
              checked={dollarRateCheckbox}
              onChange={(event) => setDollarRateCheckbox(event.target.checked)}
            />
          }
          label="Dollar rate"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "700",
          }}
        >
          {totalMoney}
          <AttachMoneyRounded />
        </Typography>
        <Typography
          sx={{
            display: `${moneyUAH > 0 ? "flex" : "none"}`,
            alignItems: "center",
            fontWeight: "700",
          }}
        >
          <HorizontalRuleRounded sx={{ marginX: "10px" }} />
          {Number(moneyUAH).toFixed(2) + " UAH"}
        </Typography>
      </Box>
      <ButtonGroup
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#fafafa",
        }}
        variant="outlined"
        aria-label="outlined button group"
      >
        <Button sx={{ width: "110px" }} onClick={plusAllMoney}>
          Count
        </Button>

        <Button sx={{ width: "110px" }} onClick={exchangeMoney}>
          Exchange
        </Button>
      </ButtonGroup>
    </Box>
  );
};
export default Inputs;
