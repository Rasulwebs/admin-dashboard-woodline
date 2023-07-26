import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  Card,
  Menu,
  Button,
  Divider,
  FormControl,
  TextField,
  FormHelperText,
  TableContainer,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";
import { alpha, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getOneOrder } from "src/API/apis";
import { Scrollbar } from "src/components/scrollbar";
import moment from "moment/moment";
import ModalLayout from "src/components/modalLayout/modalLayout";
import RectangleRoundedIcon from "@mui/icons-material/RectangleRounded";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));
const Page = () => {
  const [open, setOpen] = useState(false);
  const [empty, setEmpty] = useState(false);

  const [updateOrderOpen, setUpdateOrderOpen] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  // console.log(id);
  const [order, setOrder] = useState(null);

  const oneOrder = async (id) => {
    const orders = await getOneOrder(id);
    setOrder(orders.data);
  };

  useEffect(() => {
    if (id) {
      oneOrder(id);
    }
  }, [id]);

  // console.log(order);

  if (!order) {
    return (
      <>
        <Container maxWidth="xxl">
          <Box sx={{ minWidth: 800 }}>
            <div>Loading Wait...</div>
          </Box>
        </Container>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Details Order</title>
      </Head>
      {/*========================================= UPDATE A CTG MODAL =================================================*/}

      <ModalLayout modalTitle="Update Order" open={updateOrderOpen} setOpen={setUpdateOrderOpen}>
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
          Update
        </Button>
      </ModalLayout>
      {/* ========================================================================================================== */}
      <Container maxWidth="xxl">
        <Stack direction="row" justifyContent="space-between" spacing={4} mb={1}>
          <Stack spacing={1}>
            <Typography variant="h5">{order.branch}</Typography>
          </Stack>
          <Button
            variant="outlined"
            onClick={(e) => {
              setUpdateOrderOpen(true);
            }}
          >
            Update
          </Button>
        </Stack>
        <Stack spacing={1} direction="row" justifyContent="start" alignItems="center" mb={1}>
          <Typography variant="h5" sx={{ color: "#757de8" }}>
            Order Time:
          </Typography>
          <Typography variant="p" mx={0} sx={{ fontSize: 20 }}>
            {moment(order.createdAt).format("DD MMM YYYY, HH:mm")}
          </Typography>
        </Stack>

        <Stack spacing={1} direction="row" justifyContent="start" alignItems="center" mb={5}>
          <Typography variant="h5" sx={{ color: "#757de8" }}>
            Status:
          </Typography>
          <Typography variant="p" mx={0} sx={{ fontSize: 20 }}>
            {order.status}
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Leg</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Tissue Color</TableCell>
                    <TableCell>Collections</TableCell>
                    {/* <TableCell>CreatedAt</TableCell>
                  <TableCell>Settings</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.complects?.map((c) => {
                    console.log(c);
                    return (
                      <>
                        <TableRow hover sx={{ cursor: "pointer" }}>
                          <TableCell>
                            <Stack alignItems="center" direction="row" spacing={2}>
                              <Typography variant="subtitle2">{c.complect.leg.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack alignItems="center" direction="row" spacing={2}>
                              <Typography variant="subtitle2">{c.complect.model.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack alignItems="center" direction="row" spacing={2}>
                              <Typography variant="subtitle2">
                                {c.complect.tissue_color.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Stack alignItems="center" direction="row" spacing={2}>
                              <Typography variant="subtitle2">
                                {c.complect.collections.length}
                              </Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
