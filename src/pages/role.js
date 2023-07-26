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
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import toast, { Toaster } from "react-hot-toast";
import ModalLayout from "src/components/modalLayout/modalLayout";
import Link from "next/link";
import { RoleTable } from "src/sections/role/role-table";
import { getAllRole, postRole, deleteRole } from "src/API/role.api";

const Page = () => {
  const [empty, setEmpty] = useState(false);
  const [addRoleData, setAddRoleData] = useState({ title_uz: "", title_en: "", title_ru: "" });
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [allRoleData, setAllRoleData] = useState([]);
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
    getAllRoleDataFunc();
  }, []);

  // get all role
  const getAllRoleDataFunc = async () => {
    try {
      const data = await getAllRole();
      setAllRoleData(data.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // post role
  const addRoleFunc = async () => {
    try {
      const data = await postRole(addRoleData);
      getAllRoleDataFunc();
      setAddModalOpen(false);
      toast.success("Created Succesfully");
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // delete role
  const handleDeleteRole = async (id) => {
    try {
      await deleteRole(id);
      getAllRoleDataFunc();
      toast.success("Delete Succesfully");
    } catch (err) {
      console.log(err);
    }
  };
  // const mapApi="AIzaSyDu3Xg5pV9KDYS2pmXu4RGPYLbHegWRka0";

  console.log(allRoleData);
  return (
    <>
      <Head>
        <title>Роли</title>
      </Head>
      {/* ==============================================CREATE ORDER=========================== */}
      <ModalLayout modalTitle="Добавить Роли" setOpen={setAddModalOpen} open={addModalOpen}>
        <FormControl sx={{ my: "5px", mt: "20px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              setAddRoleData({ ...addRoleData, title_uz: e.target.value });
              setEmpty(false);
            }}
            label="Title_Uz"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl sx={{ my: "5px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              setAddRoleData({ ...addRoleData, title_en: e.target.value });

              setEmpty(false);
            }}
            label="Title_En"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl sx={{ my: "5px", mb: "15px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              setAddRoleData({ ...addRoleData, title_ru: e.target.value });
              setEmpty(false);
            }}
            label="Title_Ru"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <Button
          // disabled={postLoading}
          onClick={() => {
            addRoleFunc();
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
                <Typography variant="h4">Роли</Typography>
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

            <RoleTable
              setOpen={setAddModalOpen}
              open={addModalOpen}
              deleteFunc={handleDeleteRole}
              items={allRoleData}
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
