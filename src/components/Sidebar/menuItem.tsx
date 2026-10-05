import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "../../context/SidebarProvider";
import styles from "./styles.module.css";
import type { MenuItemProps } from "@/src/types";
import Link from "next/link";
import {
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconExpandLess from "@mui/icons-material/ExpandLess";
import IconExpandMore from "@mui/icons-material/ExpandMore";

const MenuItem = (props: MenuItemProps) => {
  const pathname = usePathname();
  const { sidebarOpen, handleFixSidebar } = useSidebar();
  const { name, link, Icon, items = [] } = props;
  const isExpandable = items && items.length > 0;

  const isChildActive =
    isExpandable &&
    items.some(
      (item) =>
        Boolean(item.link) &&
        (pathname === item.link ||
          (Boolean(item.link) &&
            item.link !== "/" &&
            Boolean(pathname?.startsWith(item.link!)))),
    );

  const [open, setOpen] = useState(isChildActive);
  const isNavigable = !isExpandable && Boolean(link);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isOpen = sidebarOpen && (open || isChildActive);

  const isSelfActive =
    isNavigable &&
    Boolean(link) &&
    (pathname === link ||
      (Boolean(link) && link !== "/" && Boolean(pathname?.startsWith(link!))));

  function handleClick() {
    if (isExpandable && sidebarOpen) {
      setOpen(!isOpen);
      return;
    }

    if (isNavigable && isMobile && sidebarOpen) {
      handleFixSidebar();
    }
  }

  const isChildItem = !Icon;

  const MenuItemRoot = (
    <ListItemButton
      key={name}
      onClick={handleClick}
      component={isNavigable ? Link : "div"}
      href={isNavigable ? link : undefined}
      selected={isSelfActive || (isExpandable && isOpen)}
      className={`${styles["menu-item"]} ${
        sidebarOpen ? styles["menu-item-open"] : styles["menu-item-closed"]
      } ${isSelfActive ? styles["menu-item-active"] : ""} ${
        isExpandable && isOpen ? styles["menu-item-expanded"] : ""
      }`}
    >
      {/* Display an icon if any */}
      {!!Icon && (
        <ListItemIcon
          className={`${styles["menu-item-icon"]} ${
            sidebarOpen
              ? styles["menu-item-icon-open"]
              : styles["menu-item-icon-closed"]
          }`}
        >
          <Icon
            className={`${styles["menu-item-icon-svg"]} ${
              isSelfActive ? styles["menu-item-icon-svg-active"] : ""
            }`}
          />
        </ListItemIcon>
      )}
      <ListItemText
        className={`${styles["menu-item-text"]} ${
          sidebarOpen ? "" : styles["menu-item-text-hidden"]
        } ${isChildItem ? styles["menu-item-text-child"] : ""} ${
          isSelfActive ? styles["menu-item-text-active"] : ""
        }`}
        primary={name}
        inset={!Icon}
      />
      {/* Display the expand menu if the item has children */}
      {isExpandable && sidebarOpen && !isOpen && (
        <IconExpandMore
          className={`${styles["menu-expand-icon"]} ${
            isChildActive ? styles["menu-expand-icon-active"] : ""
          }`}
        />
      )}
      {isExpandable && sidebarOpen && isOpen && (
        <IconExpandLess
          className={`${styles["menu-expand-icon"]} ${
            isChildActive ? styles["menu-expand-icon-active"] : ""
          }`}
        />
      )}
    </ListItemButton>
  );

  const MenuItemChildren =
    isExpandable && sidebarOpen ? (
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding>
          {items.map((item, index) => (
            <MenuItem {...item} key={index} />
          ))}
        </List>
      </Collapse>
    ) : null;

  return (
    <>
      <Tooltip
        title={!sidebarOpen ? name : ""}
        placement="right"
        arrow
        disableHoverListener={sidebarOpen}
      >
        <div>{MenuItemRoot}</div>
      </Tooltip>
      {MenuItemChildren}
    </>
  );
};
export default MenuItem;
