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
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { getAllTissue, postTissue, deleteTissue } from "src/API/tissue.api";
import { TissueTable } from "src/sections/tissue/tissue-table";
import ModalLayout from "src/components/modalLayout/modalLayout";

const now = new Date();

const Page = () => {
  const [empty, setEmpty] = useState(false);

  const [addTissueData, setAddTissueData] = useState({
    name: "",
    cost: null,
    price1: null,
    price2: null,
  });
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [allTissueData, setAllTissueData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    getAllTissueDataFunc();
  }, []);

  // get all orders
  const getAllTissueDataFunc = async () => {
    try {
      const data = await getAllTissue();
      setAllTissueData(data.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // post tissue
  const addTissueFunc = async () => {
    try {
      const data = await postTissue(addTissueData);
      getAllTissueDataFunc();
      setAddModalOpen(false);
      toast.success("Created Succesfully");
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // delete order
  const handleDeleteTissue = async (id) => {
    try {
      await deleteTissue(id);
      getAllTissueDataFunc();
      toast.success("Delete Succesfully");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(addTissueData);
  return (
    <>
      <Head>
        <title>Ткань </title>
      </Head>
      {/* ==============================================CREATE ORDER=========================== */}
      <ModalLayout modalTitle="Добавить Ткань " setOpen={setAddModalOpen} open={addModalOpen}>
        <FormControl sx={{ my: "5px", mt: "20px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              setAddTissueData({ ...addTissueData, name: e.target.value });
              setEmpty(false);
            }}
            label="Name"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl sx={{ my: "5px" }} fullWidth>
          <TextField
            error={empty}
            type="number"
            onChange={(e) => {
              setAddTissueData({ ...addTissueData, cost: e.target.value });

              setEmpty(false);
            }}
            label="Cost"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl sx={{ my: "5px" }} fullWidth>
          <TextField
            error={empty}
            type="number"
            onChange={(e) => {
              setAddTissueData({ ...addTissueData, price1: e.target.value });
              setEmpty(false);
            }}
            label="Price 1"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl sx={{ mb: "20px", mt: "5px" }} fullWidth>
          <TextField
            error={empty}
            type="number"
            onChange={(e) => {
              setAddTissueData({ ...addTissueData, price2: e.target.value });
              setEmpty(false);
            }}
            label="Price 2"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <Button
          // disabled={postLoading}
          onClick={() => {
            addTissueFunc();
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
                <Typography variant="h4">Ткань </Typography>
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

            <TissueTable
              setOpen={setAddModalOpen}
              open={addModalOpen}
              deleteFunc={handleDeleteTissue}
              items={allTissueData}
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
