import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../Layout/MainLayout";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  SpeedDial,
  Typography,
  SpeedDialAction,
} from "@mui/material";
import Menu from "./addMenu/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faCheck,
  faHourglass,
  faTrash,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import {
  asideTodo,
  completeTodo,
  refreshTodo,
  removeItemFromList,
} from "../../store/slicer/todosSlicer";
import { useEffect, useState } from "react";

const Todos = () => {
  const [filteredAside, setFilteredAside] = useState([]);
  const [filteredActive, setFilteredActive] = useState([]);
  const [filteredCompleted, setFilteredCompleted] = useState([]);

  const lists = useSelector((state) => state.todos.listItems);
  const dispatch = useDispatch();

  useEffect(() => {
    updateAsideList();
    updateActiveList();
    updateCompletedList();
  }, [lists]);

  //Active List
  const updateActiveList = () => {
    const filteredActiveList = lists.filter(
      (item) => !item.aside && !item.completed
    );
    setFilteredActive(filteredActiveList);
  };

  const activeList = filteredActive
    ? filteredActive.map((item) => (
        <Card
          sx={{
            marginBottom: "10px",
            position: "relative",
            minHeight: "100px",
          }}
          key={item.id}
        >
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={"h5"}>{item.name}</Typography>
            <SpeedDial
              ariaLabel={"Navigation"}
              icon={<FontAwesomeIcon icon={faEllipsis} />}
              direction={"left"}
              sx={{ transform: "scale(0.8)" }}
            >
              <SpeedDialAction
                icon={<FontAwesomeIcon icon={faCheck} />}
                tooltipTitle={"Complete"}
                onClick={() => dispatch(completeTodo(item.id))}
              />
              <SpeedDialAction
                icon={<FontAwesomeIcon icon={faHourglass} />}
                tooltipTitle={"Aside"}
                onClick={() => dispatch(asideTodo(item.id))}
              />
              <SpeedDialAction
                icon={<FontAwesomeIcon icon={faTrash} />}
                tooltipTitle={"Delete"}
                onClick={() => dispatch(removeItemFromList(item.id))}
              />
            </SpeedDial>
          </CardActions>
          <CardContent sx={{ padding: "0 0 10px 20px", width: "90%" }}>
            <Typography variant={"body2"}>{item.value}</Typography>
          </CardContent>
          <Typography
            sx={{ position: "absolute", right: "5px", bottom: "5px" }}
            variant={"subtitle2"}
          >
            {item.time}
          </Typography>
        </Card>
      ))
    : null;

  //Completed List
  const updateCompletedList = () => {
    const filteredCompletedList = lists.filter((item) => item.completed);
    setFilteredCompleted(filteredCompletedList);
  };

  const completedList = filteredCompleted
    ? filteredCompleted.map((item) => (
        <Card
          sx={{
            marginBottom: "10px",
            position: "relative",
            minHeight: "100px",
          }}
          key={item.id}
        >
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={"h5"}>{item.name}</Typography>
            <SpeedDial
              ariaLabel={"Navigation"}
              icon={<FontAwesomeIcon icon={faEllipsis} />}
              direction={"left"}
              sx={{ transform: "scale(0.8)" }}
            >
              <SpeedDialAction
                icon={<FontAwesomeIcon icon={faRefresh} />}
                tooltipTitle={"Refresh"}
                onClick={() => dispatch(refreshTodo(item.id))}
              />
              <SpeedDialAction
                icon={<FontAwesomeIcon icon={faTrash} />}
                tooltipTitle={"Delete"}
                onClick={() => dispatch(removeItemFromList(item.id))}
              />
            </SpeedDial>
          </CardActions>
          <CardContent sx={{ padding: "0 0 10px 20px", width: "90%" }}>
            <Typography variant={"body2"}>{item.value}</Typography>
          </CardContent>
          <Typography
            sx={{ position: "absolute", right: "5px", bottom: "5px" }}
            variant={"subtitle2"}
          >
            {item.time}
          </Typography>
        </Card>
      ))
    : null;

  //Aside List
  const updateAsideList = () => {
    const filteredAsideList = lists.filter((item) => item.aside);
    setFilteredAside(filteredAsideList);
  };

  const asideList = filteredAside
    ? filteredAside.map((item) => (
        <Card
          sx={{
            marginBottom: "10px",
            position: "relative",
            minHeight: "100px",
          }}
          key={item.id}
        >
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={"h5"}>{item.name}</Typography>
            <SpeedDial
              ariaLabel={"Navigation"}
              icon={<FontAwesomeIcon icon={faEllipsis} />}
              direction={"left"}
              sx={{ transform: "scale(0.8)" }}
            >
              <SpeedDialAction
                icon={<FontAwesomeIcon icon={faCheck} />}
                tooltipTitle={"Complete"}
                onClick={() => dispatch(completeTodo(item.id))}
              />
              <SpeedDialAction
                icon={<FontAwesomeIcon icon={faTrash} />}
                tooltipTitle={"Delete"}
                onClick={() => dispatch(removeItemFromList(item.id))}
              />
            </SpeedDial>
          </CardActions>
          <CardContent sx={{ padding: "0 0 10px 20px", width: "90%" }}>
            <Typography variant={"body2"}>{item.value}</Typography>
          </CardContent>
          <Typography
            sx={{ position: "absolute", right: "5px", bottom: "5px" }}
            variant={"subtitle2"}
          >
            {item.time}
          </Typography>
        </Card>
      ))
    : null;
  console.log(filteredActive, filteredAside, filteredCompleted);
  return (
    <MainLayout>
      <Box>
        <Menu />
        <Typography variant={"h4"}>Your notes:</Typography>
        <Box>
          {filteredActive.length > 0 ? (
            activeList
          ) : (
            <Typography variant={"h5"}>Add your note!</Typography>
          )}
        </Box>
        {filteredAside.length > 0 ? (
          <Box mt={3}>
            <Typography variant={"h4"}>Aside notes:</Typography>
            {asideList}
          </Box>
        ) : null}

        {filteredCompleted.length ? (
          <Box mt={3}>
            <Typography variant={"h4"}>Completed notes:</Typography>
            {completedList}
          </Box>
        ) : null}
      </Box>
    </MainLayout>
  );
};

export default Todos;
