import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/orders/orders-table";
import { applyPagination } from "src/utils/apply-pagination";
import { getAllOrders, deleteOrder } from "src/API/apis";
import toast, { Toaster } from "react-hot-toast";
import ModalLayout from "src/components/modalLayout/modalLayout";
import Link from "next/link";
import { GoogleMap, Marker, InfoWindow } from 'google-maps-react';
const now = new Date();

const Page = () => {
  const [empty, setEmpty] = useState(false);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const [allOrdersData, setAllOrdersData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // console.log(allOrdersData);
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    getAllOrdersDataFunc();
  }, []);

  // get all orders
  const getAllOrdersDataFunc = async () => {
    try {
      const data = await getAllOrders();
      setAllOrdersData(data.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // delete order
  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      getAllOrdersDataFunc();
      toast.success("Delete Succesfully");
    } catch (err) {
      console.log(err);
    }
  };
  // const mapApi="AIzaSyDu3Xg5pV9KDYS2pmXu4RGPYLbHegWRka0";


  return (
    <>
      <Head>
        <title>Ползватель</title>
      </Head>
      {/* ==============================================CREATE ORDER=========================== */}
      <ModalLayout modalTitle="Order" setOpen={setAddModalOpen} open={addModalOpen}>
        <FormControl sx={{ my: "5px", mt: "20px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              // setNewCtgName(e.target.value);
              setEmpty(false);
            }}
            label="Branch"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl sx={{ my: "5px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              // setNewCtgName(e.target.value);
              setEmpty(false);
            }}
            label="Comment"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl sx={{ my: "5px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              // setNewCtgName(e.target.value);
              setEmpty(false);
            }}
            label="Status"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl sx={{ mb: "20px", mt: "5px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              // setNewCtgName(e.target.value);
              setEmpty(false);
            }}
            label="Complects"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <Button
          // disabled={postLoading}
          onClick={() => {
            // handleCreateCat();
          }}
          fullWidth
          variant="contained"
        >
          Create
        </Button>
      </ModalLayout>
      {/* ============================================================================================= */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
    <div>

    </div>



        <Toaster
          toastOptions={{
            success: { style: { background: "green", color: "white" } },
            error: { style: { background: "red", color: "white" } },
          }}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
