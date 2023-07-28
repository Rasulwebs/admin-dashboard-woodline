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
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/orders/orders-table";
import { applyPagination } from "src/utils/apply-pagination";
import toast, { Toaster } from "react-hot-toast";
import ModalLayout from "src/components/modalLayout/modalLayout";
import Link from "next/link";
import { UserTable } from "src/sections/user/user-table";
import { postUser, putUser, deleteUser, getAllUser } from "src/API/user.api";
import { getAllBranch } from "src/API/branch.api";
import { getAllRole} from "src/API/role.api";


const now = new Date();

const Page = () => {
  const [empty, setEmpty] = useState(false);

  const [addUserData, setAddUserData] = useState({ 
    fullname: "",
    branch: "",
    phone_number: "",
    password: "",
    role: "",
    fcm_token: "",
    balance: 0
  });

  const [addModalOpen, setAddModalOpen] = useState(false);

  const [allUserData, setAllUserData] = useState([]);

  const [branchsData, setBranchsData] = useState([]);
  const [rolesData, setRolesData] = useState([]);



  useEffect(() => {
    getAllUsersDataFunc();
    getAllBranchsDataFunc()
    getAllRolesDataFunc()
  }, []);

//  Func fro select Branch and role
  const getAllBranchsDataFunc = async () => {
    try {
      const data = await getAllBranch();
      setBranchsData(data.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllRolesDataFunc = async () => {
    try {
      const data = await getAllRole();
      setRolesData(data.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };



  // get all orders
  const getAllUsersDataFunc = async () => {
    try {
      const data = await getAllUser();
      setAllUserData(data.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  // post User
  const addUserFunc = async () => {
    try {
      const data = await postUser(addUserData);
      getAllUsersDataFunc()
      setAddModalOpen(false);
      toast.success("Created Succesfully");
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(addUserData)

  // delete order
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      getAllUsersDataFunc();
      toast.success("Delete Succesfully");
    } catch (err) {
      console.log(err);
    }
  };
console.log(rolesData)
  return (
    <>
      <Head>
        <title>Ползватель </title>
      </Head>
      {/* ============================================== CREATE User =========================== */}
      <ModalLayout modalTitle="Добавить Ползватель " setOpen={setAddModalOpen} open={addModalOpen}>
        <FormControl sx={{ my: "5px", mt: "10px" }} fullWidth>
          <TextField
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddUserData({...addUserData, fullname:e.target.value })
              setEmpty(false);
            }}
            label="Full Name"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl sx={{ my: "5px", mt: "10px" }} fullWidth>
        <InputLabel id="demo-simple-select-helper-label">Branch</InputLabel>
        <Select
         error={empty}
          label="Branch"
          onChange={(e)=>{
            setAddUserData({...addUserData, branch:e.target.value})
          }}
        >
          {branchsData?.map((b,i)=>{
            return (<MenuItem key={i} value={b._id}>{b.name}</MenuItem>)
          })}
          

        </Select>
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl sx={{ my: "5px",mt:"10px", }} fullWidth>
          <TextField
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddUserData({...addUserData, phone_number:e.target.value })
              setEmpty(false);
            }}
            label="Phone number"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl sx={{ my: "5px",mt:"10px", }} fullWidth>
          <TextField
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddUserData({...addUserData, password:e.target.value})
              setEmpty(false);
            }}
            label="Password"
          />
            {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
          </FormControl>
               <FormControl sx={{ my: "15px", }} fullWidth>
     <InputLabel id="demo-simple-select-helper-label2">Role</InputLabel>
        <Select
         error={empty}
          label="Role"
          onChange={(e)=>{
            setAddUserData({...addUserData, role:e.target.value})
          }}
        >
{rolesData?.map((r,i)=>{
  return (<MenuItem key={i} value={r._id}>{r.title_ru}</MenuItem>)
})}
        </Select>
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        
      
        <Button
          // disabled={postLoading}
          onClick={() => {
            addUserFunc()
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
                <Typography variant="h4">Ползватель </Typography>
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

            <UserTable
              setOpen={setAddModalOpen}
              open={addModalOpen}
              deleteFunc={handleDeleteUser}
              items={allUserData}
       
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
