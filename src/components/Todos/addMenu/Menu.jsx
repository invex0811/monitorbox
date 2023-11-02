import { Box, Fab, Collapse, TextField } from "@mui/material";
import style from "./Menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { v4 as uuid4 } from "uuid";
import { useDispatch } from "react-redux";
import { addItemToList } from "../../../store/slicer/todosSlicer";
import { DateTime } from "luxon";
import { closeAlert, showAlert } from "../../../store/slicer/alertSlicer";
const Menu = () => {
  const [checked, setChecked] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [textArea, setTextArea] = useState("");

  const dispatch = useDispatch();

  const currentTime = () => {
    return DateTime.now().toFormat("dd/LL/y TT");
  };

  const handleClick = () => {
    if (checked) {
      try {
        setChecked(false);
        dispatch(
          addItemToList({
            id: uuid4(),
            name: inputTitle,
            value: textArea,
            time: currentTime(),
            completed: false,
            aside: false,
          })
        );
        dispatch(
          showAlert({
            severity: "success",
            title: "Success",
            value: "Note saved",
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(closeAlert());
        }, 3000);
      } catch (e) {
        dispatch(
          showAlert({
            severity: "error",
            title: e.code,
            value: e.message,
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(closeAlert());
        }, 3000);
      }

      setTextArea((t) => (t = ""));
      setInputTitle("");
    } else {
      setChecked(true);
    }
  };
  return (
    <>
      <Box my={2}>
        <Fab
          size={"medium"}
          variant={"outlined"}
          color={"secondary"}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={checked ? faSave : faPlus} />
        </Fab>
        <Collapse in={checked}>
          <Box
            sx={{
              width: "600px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              onChange={(event) => {
                setInputTitle(event.target.value);
              }}
              value={inputTitle}
            />

            <textarea
              rows={5}
              placeholder={"....."}
              className={style.menu}
              onChange={(event) => {
                setTextArea(event.target.value);
              }}
              value={textArea}
            />
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default Menu;
