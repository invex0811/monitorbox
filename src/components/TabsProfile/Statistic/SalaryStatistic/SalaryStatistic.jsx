import {
  Box,
  Button,
  Grow,
  IconButton,
  TableCell,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import Graph from "../Graph/Graph";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons/faTable";
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";
import TableData from "../TableData/TableData";
import MainLayout from "../../../../Layout/MainLayout";

const SalaryStatistic = (props) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const takeData = async () => {
    const UID = getAuth().currentUser.uid;
    const db = getFirestore();
    const q = query(collection(db, "users", UID, "statistic"));

    const querySnapshot = await getDocs(q);

    const arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setData(arr.reverse());
  };
  useEffect(() => {
    takeData().then((e) => console.log(e));
  }, []);

  const handleClick = () => {
    setShow((s) => !s);
  };

  const deleteItem = (date) => {
    setData(data.filter((d) => d.date !== date));
    const UID = getAuth().currentUser.uid;
    deleteDoc(doc(getFirestore(), "users", UID, "statistic", date)).then((e) =>
      console.log(e)
    );
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{
            maxWidth: "670px",
            width: "100%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Tooltip title={show ? "Data graph" : "Data table"} placement={"top"}>
            <IconButton color={"warning"} size={"small"} onClick={handleClick}>
              <FontAwesomeIcon icon={show ? faChartLine : faTable} />
            </IconButton>
          </Tooltip>
        </Box>
        <Grow in={!show} sx={{ display: show ? " none" : "" }}>
          <Box>
            <Graph
              data={data}
              pv={"salary"}
              name={"date"}
              hide={false}
              width={730}
              height={250}
            />
          </Box>
        </Grow>
        <Grow in={show} sx={{ display: show ? "" : "none" }}>
          <Box>
            <TableData data={data} deleteItem={deleteItem} />
          </Box>
        </Grow>
      </Box>
    </MainLayout>
  );
};

export default SalaryStatistic;
