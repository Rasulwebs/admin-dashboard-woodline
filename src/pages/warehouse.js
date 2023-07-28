import Head from "next/head";
import { subDays, subHours } from "date-fns";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { Stack } from "@mui/system";
import { useEffect, useMemo, useState, useCallback } from "react";
import { WarehouseTable } from "src/sections/stores/warehouse-table";
import { getAllStore } from "src/API/apis";
import { applyPagination } from "src/utils/apply-pagination";
import { useSelection } from "src/hooks/use-selection";
import ModalLayout from "src/components/modalLayout/modalLayout";



const Page = () => {
  useEffect(() => {
    getAllStoreDataFunc();
  }, []);

  const getAllStoreDataFunc = async () => {
    const data = await getAllStore();
    setAllStoreData(data.data);
    // console.log(data);
  };

  const [empty, setEmpty] = useState(false);
  const [addStoreModalOpen, setAddStoreModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [allStoreData, setAllStoreData] = useState([]);

  return (
    <>
      <Head>
        <title>Store</title>
      </Head>

      {/* =============================CREATE STORE ============================================== */}
      <ModalLayout modalTitle="Store" setOpen={setAddStoreModalOpen} open={addStoreModalOpen}>
        <FormControl sx={{ my: "20px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              // setNewCtgName(e.target.value);
              setEmpty(false);
            }}
            label="Store Name"
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
      {/* ========================================================================================== */}

      {/* =============================UPDATE STORE ====================================== */}
      <ModalLayout modalTitle="Update Store" setOpen={setUpdateModalOpen} open={updateModalOpen}>
        <FormControl sx={{ my: "20px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              // setNewCtgName(e.target.value);
              setEmpty(false);
            }}
            label="Store Name"
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
          Update
        </Button>
      </ModalLayout>
      {/* =============================================================================== */}
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
                <Typography variant="h4">Store</Typography>
              </Stack>
              <Button
                variant="outlined"
                onClick={(e) => {
                  setAddStoreModalOpen(true);
                }}
              >
                Create
              </Button>
            </Stack>

            <WarehouseTable
              setUpdateOpen={setUpdateModalOpen}
              updateOpen={updateModalOpen}
              count={data.length}
              items={allStoreData}
          
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
