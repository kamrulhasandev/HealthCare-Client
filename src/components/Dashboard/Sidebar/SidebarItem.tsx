import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DrawerItem } from "@/types";
import { usePathname } from "next/navigation";

type IProps = {
  item: DrawerItem;
};

const SidebarItem = ({ item }: IProps) => {
  const linkPah = `/dashboard/${item.path}`;
  const pathName = usePathname();
  return (
    <Link href={linkPah}>
      <ListItem
        disablePadding
        sx={{
          ...(pathName === linkPah
            ? {
                borderRight: "3px solid #1586fd",
                "& svg": { color: "#1586fd" },
              }
            : {}),
          mb: 1,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
