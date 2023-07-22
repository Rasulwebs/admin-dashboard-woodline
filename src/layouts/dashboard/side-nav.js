import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "src/components/logo";
import { Scrollbar } from "src/components/scrollbar";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
                 <SideNavItem
              active={pathname == "/" ? true : false}
              disabled={""}
              external={""}
              icon={""}
              key={"Филиал"}
              path={"/"}
              title={"Филиал"}
            />
                <SideNavItem
              active={pathname == "/user" ? true : false}
              disabled={""}
              external={""}
              icon={""}
              key={"Ползватель "}
              path={"/user"}
              title={"Ползватель "}
            />
       
           <SideNavItem
              active={pathname == "/client" ? true : false}
              disabled={""}
              external={""}
              icon={""}
              key={"Клиент"}
              path={"/client"}
              title={"Клиент"}
            />
                 <SideNavItem
              active={pathname == "/role" ? true : false}
              disabled={""}
              external={""}
              icon={""}
              key={"Роли"}
              path={"/role"}
              title={"Роли"}
            />
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{ background: "transparent", color: "neutral.400" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}ss
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ flexShrink: 0, fontSize: 18, fontWeight: 400 }}>
                Продукт
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {items.map((item) => {
                  const active = item.path ? pathname === item.path : false;

                  return (
                    <SideNavItem
                      active={active}
                      disabled={item.disabled}
                      external={item.external}
                      icon={item.icon}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                    />
                  );
                })}
              </AccordionDetails>
            </Accordion>
    
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
