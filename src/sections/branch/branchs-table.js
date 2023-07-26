import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  MenuItem,
  Menu,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Divider,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  Link
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { alpha, styled } from "@mui/material/styles";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { createTheme } from "@mui/material/styles";
import moment from "moment/moment";
import "moment/locale/ru";
import { useState } from "react";


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

export const BranchsTable = (props) => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = anchorEl2;
  const [empty, setEmpty] = useState(false);

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleNewClick = (event, orders) => {
    setAnchorEl2(event.currentTarget);

  };

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
    setOpen,
    open,
    setupdateOpen,
    openUpdateOpen,
    deleteFuncOrder,
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
                <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>CreatedAt</TableCell>
                  {/* <TableCell>Settings</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((branch,i) => {
                  const isSelected = selected.includes(branch.id);
                  return (
                    <TableRow
                      hover
                      key={branch._id}
                      selected={isSelected}
                      sx={{ cursor: "pointer" }}
                    >
                         <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Typography variant="subtitle2" sx={{fontSize:15, fontWeight:700}}>{i+1}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Typography variant="subtitle2">{branch.name}</Typography>
                        </Stack>
                      </TableCell>
         
                      <TableCell>{moment(branch.createdAt).format("MMM DD YYYY, HH:mm")}</TableCell>
                      {/* <TableCell>
                        <div>
                          <Button
                            id="demo-customized-button"
                            aria-controls={open2 ? "demo-customized-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open2 ? "true" : undefined}
                            variant="contained"
                            disableElevation
                            onClick={(e) => handleNewClick(e, branch)}
                          >
                            More
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
                            <Typography component={Link} href={`/detail/${customer._id}`} underline="none">
                              <MenuItem
                              style={{color:"#3f51b5"
                              }}
                                onClick={() => {
                                  // setupdateOpen(true);
                                  handleClose2();
                                }}
                                disableRipple
                              >
                                <EditIcon />
                                Edit
                              </MenuItem>
                            </Typography>

                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem
                              onClick={() => {
                                deleteFuncOrder(customer._id);

                                handleClose2();
                              }}
                              disableRipple
                            >
                              <RemoveCircleOutlineIcon />
                              Delete
                            </MenuItem>
                          </StyledMenu>
                        </div>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>

      </Card>
    </>
  );
};


