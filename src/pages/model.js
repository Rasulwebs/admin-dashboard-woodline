
import { useCallback, useMemo, useState, useEffect } from "react";import Head from "next/head";
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
import { ModelTable } from "src/sections/modell/model-table";
import { postModel, putModel, deleteModel, getAllModel } from "src/API/model.api";
import { getAllCategory } from "src/API/category.api";



const Page = () => {
  const [empty, setEmpty] = useState(false);

  const [addModelData, setAddModelData] = useState({ 
    name: "",
    price1: 0,
    price2: 0,
    price3: 0,
    sale: 0,
    seller_percent1: 0,
    seller_percent2: 0,
    category_id: ""
  });

  const [addModalOpen, setAddModalOpen] = useState(false);

  const [allModelData, setAllModelData] = useState([]);

  const [catData, setCatData] = useState([]);



  useEffect(() => {
    getAllModelDataFunc();
    getAllCategoryDataFunc()
  }, []);

//  Func fro select Category
  const getAllCategoryDataFunc = async () => {
    try {
      const data = await getAllCategory();
      setCatData(data.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

console.log(allModelData)

  // get all orders
  const getAllModelDataFunc = async () => {
    try {
      const data = await getAllModel();
      setAllModelData(data.data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  // post Model
  const addModelFunc = async () => {
    try {
      const data = await postModel(addModelData);
      getAllModelDataFunc()
      setAddModalOpen(false);
      toast.success("Created Succesfully");
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // delete order
  const handleDeleteModel = async (id) => {
    try {
      await deleteUser(id);
      getAllModelDataFunc();
      toast.success("Delete Succesfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Head>
        <title>Модель </title>
      </Head>
      {/* ============================================== CREATE User =========================== */}
      <ModalLayout modalTitle="Добавить Модель " setOpen={setAddModalOpen} open={addModalOpen}>
        <FormControl sx={{ my: "5px", mt: "20px" }} fullWidth>
          <TextField
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddModelData({...addModelData, name:e.target.value })
              setEmpty(false);
            }}
            label="Name"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>полное имя не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        

        <FormControl sx={{ my: "5px",mt:"10px", }} fullWidth>
          <TextField
          type="number"
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddModelData({...addModelData, price1:e.target.value })
              setEmpty(false);
            }}
            label="Price 1"
          />
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl sx={{ my: "5px",mt:"10px", }} fullWidth>
          <TextField
          type="number"
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddModelData({...addModelData, price2:e.target.value })
              setEmpty(false);
            }}
            label="Price 2"
          />
            {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
          </FormControl>
          <FormControl sx={{ my: "5px",mt:"10px", }} fullWidth>
          <TextField
          type="number"
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddModelData({...addModelData, price3:e.target.value })
              setEmpty(false);
            }}
            label="Price 3"
          />
            {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
          </FormControl>
          <FormControl sx={{ my: "5px",mt:"10px", }} fullWidth>
          <TextField
          type="number"
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddModelData({...addModelData, sale:e.target.value })
              setEmpty(false);
            }}
            label="Sale"
          />
          
            {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
          </FormControl>
          <FormControl sx={{ my: "5px",mt:"10px", }} fullWidth>
          <TextField
          type="number"
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddModelData({...addModelData, seller_percent1:e.target.value })
              setEmpty(false);
            }}
            label="Seller Percent 1"
          />
          
            {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
          </FormControl>
          <FormControl sx={{ my: "5px",mt:"10px", }} fullWidth>
          <TextField
          type="number"
            error={empty}
            autoComplete="off"
            onChange={(e) => {
              setAddModelData({...addModelData, seller_percent2:e.target.value })
              setEmpty(false);
            }}
            label="Seller Percent 2"
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
            setAddModelData({...addModelData, category_id:e.target.value})
          }}
        >
{catData?.map((c,i)=>{
  return (<MenuItem key={i} value={c._id}>{c.name}</MenuItem>)
})}
        </Select>
          {empty ? (
            <FormHelperText sx={{ color: "red" }}>не должно быть пустым</FormHelperText>
          ) : null}
        </FormControl>
        
      
        <Button
          // disabled={postLoading}
          onClick={() => {
            addModelFunc()
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
                <Typography variant="h4">Модель </Typography>
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

            <ModelTable
              setOpen={setAddModalOpen}
              open={addModalOpen}
              deleteFunc={handleDeleteModel}
              items={allModelData}
       
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
