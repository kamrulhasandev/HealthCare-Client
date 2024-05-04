import { Box, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={1}
        py={1}
        component={Link}
        href={"/"}
      >
        <Image src={assets.svgs.logo} width={40} height={40} alt="logo" />
        <Typography variant="h6" component="h1">
          PH Health Care
        </Typography>
      </Stack>
      <List>
        {drawerItems("admin" as UserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
