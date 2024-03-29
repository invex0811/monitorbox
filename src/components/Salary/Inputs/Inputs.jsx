import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import axios from "axios";
import MenuForPushSalary from "../Inputs/MuneForPushSalary/MenuForPushSalary";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

const tax = 45;
const Inputs = () => {
  const [currentDateObj, setCurrentDate] = useState({
    nowYear: DateTime.now().get("year"),
    nowMonth: DateTime.now().get("month"),
  });
  const [days, setDays] = useState(null);
  const [time, setTime] = useState("");
  const [rate, setRate] = useState("");
  const [totalMoney, setTotalMoney] = useState("");
  const [weekend, setWeekend] = useState("");
  const [cashBonus, setCashBonus] = useState("");
  const [dollarRate, setDollarRate] = useState("");
  const [moneyUAH, setMoneyUAH] = useState("");
  const [fivePercentTax, setFivePercentTax] = useState("");
  const [dayForDollarRate, setDayForDollarRate] = useState(DateTime.local);
  // const [twoRateMoney, setTwoRateMoney] = useState("");

  const [taxCheckbox, setTaxCheckbox] = useState(true);
  const [weekendCheckbox, setWeekendCheckbox] = useState(false);
  const [cashBonusCheckbox, setCashBonusCheckbox] = useState(false);
  const [dollarRateCheckbox, setDollarRateCheckbox] = useState(false);
  const [fivePercentTaxCheckbox, setFivePercentTaxCheckbox] = useState(false);

  useEffect(() => {
    takeDollarRate(dayForDollarRate);
  }, [dayForDollarRate]);

  const takeDollarRate = (date) => {
    let dateForExchange = date.toFormat("kkkk" + "LL" + "dd");
    axios
      .get(
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=" +
          dateForExchange +
          "&json"
      )
      .then((response) => {
        setDollarRate(response.data[24].rate);
      });
  };

  //Вставка ставки с профиля
  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user && !user.isAnonymous) {
        const takeData = async () => {
          const db = getFirestore();
          const docRef = doc(db, "users", getAuth().currentUser.uid);
          const docSnap = await getDoc(docRef);
          setRate(docSnap.data().rate);
        };
        takeData().then();
      } else if (!user) {
        setRate("");
      }
    });
  }, []);

  //Подсщет рабочих дней
  useEffect(() => {
    calcWorkingDays(currentDateObj.nowMonth);
  }, []);

  //Подсщет
  useEffect(() => {
    if (fivePercentTaxCheckbox) {
      exchangeMoney();
      setFivePercentTax((moneyUAH / 100) * 5);
    }
  }, [fivePercentTaxCheckbox, moneyUAH]);

  //calc working days
  const calcWorkingDays = (selectMonth) => {
    let nowYear = currentDateObj.year;
    const startDate = DateTime.fromObject({
      year: nowYear,
      month: selectMonth,
      day: 1,
    });
    const endDate = startDate.endOf("month");

    let workingDays = 0;

    let currentDate = startDate;
    while (currentDate <= endDate) {
      if (currentDate.weekday !== 6 && currentDate.weekday !== 7) {
        workingDays++;
      }
      currentDate = currentDate.plus({ days: 1 });
    }

    setDays(workingDays);
  };
  const calculateSalary = () => {
    const daysTime = days * 8;
    let overTime = time - daysTime;
    const overRate = rate * 1.5;

    if (rate <= 2 || daysTime >= time) {
      setTotalMoney(time * rate);
    } else if (daysTime < time) {
      if (time > 220) {
        overTime = 220 - daysTime;
        // setTwoRateMoney((time - 220) * (rate * 2));
        setTotalMoney(
          daysTime * rate + overTime * overRate + (time - 220) * (rate * 2)
        );
      } else {
        setTotalMoney(daysTime * rate + overTime * overRate);
      }
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

  const exchangeMoney = async () => {
    setMoneyUAH(dollarRate * totalMoney);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          width: "260px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <TextField
            type="number"
            id="outlined-number"
            label={"Working days"}
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            sx={{ margin: "7px 0", width: "180px" }}
          />
          <FormControl sx={{ margin: "7px 0 7px 7px", width: "100%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Month
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={currentDateObj.nowMonth}
              onChange={(event) => {
                setCurrentDate({
                  ...currentDateObj,
                  nowMonth: event.target.value,
                });
                calcWorkingDays(event.target.value);
              }}
              autoWidth
              label="Month"
            >
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
          value={rate}
          onChange={(event) => setRate(event.target.value)}
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
        <Box
          sx={{
            display: `${dollarRateCheckbox ? "flex" : "none"}`,
            marginTop: "7px",
          }}
        >
          <TextField
            type={"number"}
            id="outlined-number"
            label={"Dollar rate"}
            value={dollarRate}
            onChange={(event) => {
              setDollarRate(Number(event.target.value));
            }}
          />
          <Box sx={{ width: "200px" }}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <DatePicker
                value={dayForDollarRate}
                onChange={setDayForDollarRate}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "260px",
          display: "flex",
          flexWrap: "wrap",
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
          sx={{ width: "108px" }}
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
        <FormControlLabel
          control={
            <Checkbox
              name="fivePercentTax"
              checked={fivePercentTaxCheckbox}
              onChange={(event) =>
                setFivePercentTaxCheckbox(event.target.checked)
              }
            />
          }
          label="5% tax"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
          width: "260px",
        }}
      >
        <TableContainer>
          <Table sx={{ width: "100%" }}>
            <TableBody>
              <TableRow sx={{ display: totalMoney > 0 ? "" : "none" }}>
                <TableCell>Total money: </TableCell>
                <TableCell>
                  <Box display={"flex"} alignItems={"center"}>
                    {totalMoney + " $"}

                    <MenuForPushSalary money={totalMoney} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableBody>
              {/*<TableRow sx={{ display: time > 220 ? "" : "none" }}>*/}
              {/*  <TableCell>Double rate in USD: </TableCell>*/}
              {/*  <TableCell>{twoRateMoney + " $"}</TableCell>*/}
              {/*</TableRow>*/}
              <TableRow sx={{ display: moneyUAH > 0 ? "" : "none" }}>
                <TableCell>USD rate:</TableCell>
                <TableCell sx={{ color: "#01e01f" }}>{dollarRate}</TableCell>
              </TableRow>
              <TableRow sx={{ display: moneyUAH > 0 ? "" : "none" }}>
                <TableCell>UAH:</TableCell>
                <TableCell>{Number(moneyUAH).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  display: fivePercentTaxCheckbox ? "" : "none",
                }}
              >
                <TableCell>5% Tax:</TableCell>
                <TableCell>
                  {Math.round(fivePercentTax)} |{" "}
                  {Math.round(fivePercentTax / dollarRate)}$
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ButtonGroup variant={"contained"} aria-label="contained button group">
        <Button
          sx={{ width: "50%" }}
          onClick={plusAllMoney}
          color={"success"}
          key={"count"}
        >
          Count
        </Button>

        <Button sx={{ width: "50%" }} onClick={exchangeMoney} key={"exchange"}>
          Exchange
        </Button>
      </ButtonGroup>
    </Box>
  );
};
export default Inputs;
