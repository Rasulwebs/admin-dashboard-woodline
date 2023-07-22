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
import { getAllCategory, deleteCategory, postCategory } from "src/API/apis";
import toast, { Toaster } from "react-hot-toast";
import ModalLayout from "src/components/modalLayout/modalLayout";
import Link from "next/link";
import { CategoryTable } from "src/sections/category/category-table";

const Page = () => {
  const [empty, setEmpty] = useState(false);

  const [addCategoryData, setAddCategoryData] = useState({ name: "" });
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [allCategoryData, setAllCategoryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    getAllCategoryDataFunc();
  }, []);

  const addCategoryFunc = async () => {
    try {
      const data = await postCategory(addCategoryData);
      getAllCategoryDataFunc()
      setAddModalOpen(false);
      toast.success("Created Succesfully");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // get all orders
  const getAllCategoryDataFunc = async () => {
    try {
      const data = await getAllCategory();
      setAllCategoryData(data.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // delete order
  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      getAllCategoryDataFunc();
      toast.success("Delete Succesfully");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(allCategoryData);
  return (
    <>
      <Head>
        <title>Категория</title>
      </Head>

      {/* ==============================================CREATE CATEGORY =========================== */}

      <ModalLayout modalTitle="Категория" setOpen={setAddModalOpen} open={addModalOpen}>
        <FormControl sx={{ my: "10px", mt: "20px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              setAddCategoryData({ ...addCategoryData, name: e.target.value });
              setEmpty(false);
            }}
            label="имя Категория"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>

        <Button
          // disabled={postLoading}
          onClick={() => {
            addCategoryFunc();
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

            <CategoryTable
              setOpen={setAddModalOpen}
              open={addModalOpen}
              deleteFuncCat={handleDeleteCategory}
              items={allCategoryData}
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
