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
import React, { useState, useMemo, useEffect } from "react";
import { DateTime } from "luxon";
import axios from "axios";
import { AttachMoneyRounded, HorizontalRuleRounded } from "@mui/icons-material";

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
            .then((response) => setDollarRate(response.data[25].rate));
    }, []);
    console.log(dollarRate);
    const calculateSalary = () => {
        const fixedDaysTime = days * 8;
        const overRate = rate * 1.5;
        const overTime = time - fixedDaysTime;
        if (time <= fixedDaysTime) {
            setTotalMoney(time * rate);
        } else if (time > fixedDaysTime) {
            if (rate <= 2) {
                setTotalMoney(time * rate);
            } else {
                setTotalMoney(fixedDaysTime * rate + overTime * overRate);
            }
        }

        switch (taxCheckbox) {
            case true:
                setTotalMoney((t) => t + 43);
                break;
            default:
                break;
        }
        switch (weekendCheckbox) {
            case true:
                setTotalMoney((t) => t + weekend);
                break;

            default:
                break;
        }
        switch (cashBonusCheckbox) {
            case true:
                setTotalMoney((t) => t + cashBonus);
                break;
            default:
                break;
        }
        switch (dollarRateCheckbox) {
            case true:
                setMoneyUAH((t) => t * totalMoney);
                break;
            default:
                break;
        }
    };
    const exchangeMoney = () => {
        setMoneyUAH(dollarRate * totalMoney);
    };

    useMemo(() => {
        switch (taxCheckbox) {
            case true:
                setTotalMoney((t) => t + 43);
                break;
            case false:
                setTotalMoney((t) => t - 43);
                break;
            default:
                break;
        }
    }, [taxCheckbox]);
    useMemo(() => {
        switch (weekendCheckbox) {
            case true:
                setTotalMoney((t) => t + weekend);
                break;
            case false:
                setTotalMoney((t) => t - weekend);
                break;
            default:
                break;
        }
    }, [weekendCheckbox]);
    useMemo(() => {
        switch (cashBonusCheckbox) {
            case true:
                setTotalMoney((t) => t + cashBonus);
                break;
            case false:
                setTotalMoney((t) => t - cashBonus);
                break;
            default:
                break;
        }
    }, [cashBonusCheckbox, cashBonus]);

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
                            onChange={(event) =>
                                setTaxCheckbox(event.target.checked)
                            }
                        />
                    }
                    label="Tax"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="cashBonus"
                            checked={cashBonusCheckbox}
                            onChange={(event) =>
                                setCashBonusCheckbox(event.target.checked)
                            }
                        />
                    }
                    label="Cash bonus"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="weekend"
                            checked={weekendCheckbox}
                            onChange={(event) =>
                                setWeekendCheckbox(event.target.checked)
                            }
                        />
                    }
                    label="Weekend"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="dollarRate"
                            checked={dollarRateCheckbox}
                            onChange={(event) =>
                                setDollarRateCheckbox(event.target.checked)
                            }
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
                <Button sx={{ width: "110px" }} onClick={calculateSalary}>
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
