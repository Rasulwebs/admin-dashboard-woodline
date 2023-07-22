import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  Table,
  Menu,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  MenuItem,
  Divider,
  FormHelperText,
  FormControl,
  TextField,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { createTheme } from "@mui/material/styles";
import moment from "moment/moment";
import ModalLayout from "src/components/modalLayout/modalLayout"
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";

export const WarehouseTable = (props) => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = anchorEl2;

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleNewClick = (
    event,
    store
  ) => {
    setAnchorEl2(event.currentTarget);
    // setCategoryId(ctg._id);
    // setOldCtgName(ctg.name);
  };
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

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    setUpdateOpen,
updateOpen
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  // console.log(items)

  return (
 <>
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Branch</TableCell>
                <TableCell>Complects</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>CreatedAt</TableCell>
                <TableCell>Settings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((store) => {
                // console.log(store)
                const isSelected = selected.includes(store.id);
                return (
                  <TableRow
                    hover
                    key={store.id}
                    selected={isSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{store.branch}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{store.collections.length}</TableCell>
                    {store.status == "tayyorlanmoqda" ? (
                      <TableCell style={{ color: "#ff9100" }}>{store.status}</TableCell>
                    ) : (
                      <TableCell>{store.status}</TableCell>
                    )}
                    <TableCell>{moment(store.createdAt).format("MMM DD YYYY")}</TableCell>
                    <TableCell>
                    <div>
                        <Button
                          id="demo-customized-button"
                          aria-controls={open2 ? "demo-customized-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open2 ? "true" : undefined}
                          variant="contained"
                          disableElevation
                          onClick={(e) => handleNewClick(e, store)}
                        >
                          Параметры
                        </Button>
                        <StyledMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                          }}
                          anchorEl={anchorEl2}
                          open={open2}
                          onClose={handleClose2}
                        >
                          <MenuItem
                            onClick={() => {
                              setUpdateOpen(true)
                              handleClose2();
                            }}
                            disableRipple
                          >
                            <EditIcon />
                            Edit Ctg
                          </MenuItem>
                          <Divider sx={{ my: 0.5 }} />
                          <MenuItem
                            onClick={() => {
                              // setUpdateOpen(true)

                              handleClose2();
                            }}
                            disableRipple
                          >
                            <RemoveCircleOutlineIcon />
                            Delete
                          </MenuItem>
                        </StyledMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    </>
  );
};

// storesTable.propTypes = {
//   count: PropTypes.number,
//   items: PropTypes.array,
//   onDeselectAll: PropTypes.func,
//   onDeselectOne: PropTypes.func,
//   onPageChange: PropTypes.func,
//   onRowsPerPageChange: PropTypes.func,
//   onSelectAll: PropTypes.func,
//   onSelectOne: PropTypes.func,
//   page: PropTypes.number,
//   rowsPerPage: PropTypes.number,
//   selected: PropTypes.array,
// };
