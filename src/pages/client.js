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
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/orders/orders-table";
import { applyPagination } from "src/utils/apply-pagination";
import { getAllClient, deleteClient, postClient } from "src/API/apis";
import toast, { Toaster } from "react-hot-toast";
import ModalLayout from "src/components/modalLayout/modalLayout";
import Link from "next/link";
import { ClientTable } from "src/sections/clientt/client-table";

const now = new Date();

const Page = () => {
  const [empty, setEmpty] = useState(false);

  const [addClientData, setAddClientData] = useState({ fullname: "", phone_number:"" });

  const [addModalOpen, setAddModalOpen] = useState(false);

  const [allClentsData, setAllClentsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    getAllClientsDataFunc();
  }, []);


  // get all orders
  const getAllClientsDataFunc = async () => {
    try {
      const data = await getAllClient();
      setAllClentsData(data.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  // post client
  const addClientFunc = async () => {
    try {
      const data = await postClient(addClientData);
      getAllClientsDataFunc()
      setAddModalOpen(false);
      toast.success("Created Succesfully");
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(addClientData)

  // delete order
  const handleDeleteClient = async (id) => {
    try {
      await deleteClient(id);
      getAllClientsDataFunc();
      toast.success("Delete Succesfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Клиент</title>
      </Head>
      {/* ==============================================CREATE ORDER=========================== */}
      <ModalLayout modalTitle="Добавить Клиент" setOpen={setAddModalOpen} open={addModalOpen}>
        <FormControl sx={{ my: "5px", mt: "20px" }} fullWidth>
          <TextField
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddClientData({...addClientData, fullname:e.target.value })
              setEmpty(false);
            }}
            label="Full Name"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl sx={{ my: "5px",mb:"15px", }} fullWidth>
          <TextField
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddClientData({...addClientData, phone_number:e.target.value })
              setEmpty(false);
            }}
            label="Phone number"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <Button
          // disabled={postLoading}
          onClick={() => {
            addClientFunc()
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
                <Typography variant="h4">Клиент</Typography>
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

            <ClientTable
              setOpen={setAddModalOpen}
              open={addModalOpen}
              deleteFunc={handleDeleteClient}
              items={allClentsData}
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
