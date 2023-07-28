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

const Page = () => {
  const [empty, setEmpty] = useState(false);
  const [branchData, setBranchData] = useState({ name: "", location: [] });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [allBranchData, setAllBranchData] = useState([]);
  const handleChangeLatitude = (event) => {
    const newLatitude = event.target.value;
    setBranchData((prevState) => ({
      ...prevState,
      location: [newLatitude, prevState.location[1]], // Latitude o'zgartiriladi
    }));
  };

  const handleChangeLongitude = (event) => {
    const newLongitude = event.target.value;
    setBranchData((prevState) => ({
      ...prevState,
      location: [prevState.location[0], newLongitude], // Longitude o'zgartiriladi
    }));
  };
  useEffect(() => {
    getAllBranchDataFunc();
  }, []);

  // Post Branch
  const createBranchFunc = async () => {
    try {
      const data = await postBranch(branchData);
      getAllBranchDataFunc()
      toast.success("Create Succesfully");

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
      setAddModalOpen(false)
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
  41.30294184713629, 69.18066238847462
  // 41.3761109963247, 69.31187299105976
  // const apiKey="AIzaSyDu3Xg5pV9KDYS2pmXu4RGPYLbHegWRka0"
  console.log(branchData);
  return (
    <>
      <Head>
        <title>Флиал</title>
      </Head>
      {/* ============================================== CREATE ORDER=========================== */}
      <ModalLayout modalTitle="Brach" setOpen={setAddModalOpen} open={addModalOpen}>
        <FormControl sx={{ my: "5px", mt: "20px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              setBranchData({ ...branchData, name: e.target.value });
              // setNewCtgName(e.target.value);
              setEmpty(false);
            }}
            label="Branch"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>

        <Box sx={{ display: "flex", gap:1 }}>
          <FormControl sx={{ my: "5px" }} fullWidth>
            <TextField
            type="number"
              error={empty}
              onChange={(e) => {
                handleChangeLatitude(e)
                setEmpty(false);
              }}
              label="Lat"
            />
            {empty ? (
              <FormHelperText sx={{ color: "red" }}> не должно быть пустым</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl sx={{ my: "5px" }} fullWidth>
            <TextField
            type="number"
              error={empty}
              onChange={(e) => {
                handleChangeLongitude(e)
                setEmpty(false);
              }}
              label="Lng"
            />
            {empty ? (
              <FormHelperText sx={{ color: "red" }}>
                полное имя не должно быть пустым
              </FormHelperText>
            ) : null}
          </FormControl>
        </Box>

        <Button
        sx={{mt:2}}
          // disabled={postLoading}
          onClick={() => {
            createBranchFunc();
          }}
          fullWidth
          variant="contained"
        >
          Create
        </Button>
      </ModalLayout>
      {/* ============================================================================================= */}

  {/* ============================================= UPDATE Branch ====================================== */}
  <ModalLayout modalTitle="Update Brach" setOpen={setAddModalOpen} open={addModalOpen}>
        <FormControl sx={{ my: "5px", mt: "20px" }} fullWidth>
          <TextField
            error={empty}
            onChange={(e) => {
              setBranchData({ ...branchData, name: e.target.value });
              // setNewCtgName(e.target.value);
              setEmpty(false);
            }}
            label="Branch"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>

        <Box sx={{ display: "flex", gap:1 }}>
          <FormControl sx={{ my: "5px" }} fullWidth>
            <TextField
            type="number"
              error={empty}
              onChange={(e) => {
                handleChangeLatitude(e)
                setEmpty(false);
              }}
              label="Lat"
            />
            {empty ? (
              <FormHelperText sx={{ color: "red" }}> не должно быть пустым</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl sx={{ my: "5px" }} fullWidth>
            <TextField
            type="number"
              error={empty}
              onChange={(e) => {
                handleChangeLongitude(e)
                setEmpty(false);
              }}
              label="Lng"
            />
            {empty ? (
              <FormHelperText sx={{ color: "red" }}>
                полное имя не должно быть пустым
              </FormHelperText>
            ) : null}
          </FormControl>
        </Box>

        <Button
        sx={{mt:2}}
          // disabled={postLoading}
          onClick={() => {
            createBranchFunc();
          }}
          fullWidth
          variant="contained"
        >
          Update
        </Button>
      </ModalLayout>
      {/* ====================================================================================================== */}
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
