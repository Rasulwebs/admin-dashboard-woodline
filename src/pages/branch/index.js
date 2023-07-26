import { useCallback, useMemo, useState, useEffect } from "react";
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
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { getAllBranch, deleteOrder, postBranch } from "src/API/branch.api";
import toast, { Toaster } from "react-hot-toast";
import ModalLayout from "src/components/modalLayout/modalLayout";
import Link from "next/link";
import { BranchsTable } from "src/sections/branch/branchs-table";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import { useMap } from "react-leaflet";

const Page = () => {
  const [empty, setEmpty] = useState(false);
  const [branchData, setBranchData] = useState({ name: "", location: [] });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [allBranchData, setAllBranchData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    getAllBranchDataFunc();
  }, []);

  // Post Branch
  const createBranchFunc = async () => {
    try {
      const data = await postBranch(branchData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // get all branch
  const getAllBranchDataFunc = async () => {
    try {
      const data = await getAllBranch();
      setAllBranchData(data.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // delete order
  const handleDeleteBranch = async (id) => {
    try {
      await deleteOrder(id);
      getAllOrdersDataFunc();
      toast.success("Delete Succesfully");
    } catch (err) {
      console.log(err);
    }
  };

  // const apiKey="AIzaSyDu3Xg5pV9KDYS2pmXu4RGPYLbHegWRka0"
  console.log(allBranchData);
  return (
    <>
      <Head>
        <title>Флиал</title>
      </Head>
      {/* ==============================================CREATE ORDER=========================== */}
      <ModalLayout modalTitle="Order" setOpen={setAddModalOpen} open={addModalOpen}>
        <FormControl sx={{ my: "5px", mt: "20px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              setBranchData({...branchData, name:e.target.value})
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
            label="Location"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}> не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        {/* <FormControl sx={{ my: "5px" }} fullWidth>
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
        </FormControl> */}
        {/* <FormControl sx={{ mb: "20px", mt: "5px" }} fullWidth>
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
        </FormControl> */}
        <Button
          // disabled={postLoading}
          onClick={() => {
            createBranchFunc()
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
        <Container maxWidth="xxl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Категория</Typography>
              </Stack>
              <Button
                variant="outlined"
                onClick={(e) => {
                  setAddModalOpen(true);
                }}
              >
                Create
              </Button>
            </Stack>

            <BranchsTable
              setOpen={setAddModalOpen}
              open={addModalOpen}
              deleteFuncOrder={handleDeleteBranch}
              items={allBranchData}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
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
