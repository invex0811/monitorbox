import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { AttachMoneyRounded } from "@mui/icons-material";
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";

const arrayMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MenuForPushSalary = (props) => {
  const [open, setOpen] = useState(false);
  const [switcher, setSwitcher] = useState(true);
  const [month, setMonth] = useState("");
  const [showAddBtn, setShowAddBtn] = useState(false)

  const date = DateTime.local().toFormat("MMMM");
  const year = DateTime.local().toFormat("yyyy");

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setShowAddBtn(false);
      } else {
        setShowAddBtn(true);
      }
    });
  });

  useEffect(() => {
    setMonth(date);
  }, []);
  const toggleMenu = () => {
    setOpen((o) => (o = !o));
  };
  const toggleSwitcher = () => {
    setSwitcher((s) => (s = !s));
  };

  const pickMonth = (event) => {
    setMonth(event.target.value);
  };
  const dateYear = `${month}-${year}`;
  const pushData = () => {
    const UID = getAuth().currentUser.uid;
    setDoc(doc(getFirestore(), "users", UID, "statistic", dateYear), {
      date: dateYear,
      month: month,
      year: year,
      salary: props.money,
    }).then(console.log("push"));
  };

  const menuItem = arrayMonth.map((month) => (
    <MenuItem value={month} key={month}>
      {month}
    </MenuItem>
  ));

  return (
    <Box
      sx={{
      display: showAddBtn ? 'none': "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton color={"primary"} size={"small"} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
      <Dialog open={open} onClose={toggleMenu}>
        <DialogTitle textAlign={"center"}>Add salary to statistic?</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography>{month}</Typography>
          <Typography
            variant={"h6"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {props.money} <AttachMoneyRounded />
          </Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
          <Box onClick={toggleSwitcher} sx={{ cursor: "pointer" }}>
            Pick month
            <Switch color="primary" checked={switcher} />
            Current month
          </Box>
          <FormControl
            sx={{ display: switcher ? "none" : "", m: "10px 0 5px 0" }}
            size={"small"}
            variant={"outlined"}
          >
            <InputLabel id="demo-select-small">Month</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={month}
              label="Month"
              onChange={pickMonth}
            >
              {menuItem}
            </Select>
          </FormControl>
          <Button
            
            color={"primary"}
            variant={"outlined"}
            sx={{ my: "5px" }}
            onClick={pushData}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuForPushSalary;
