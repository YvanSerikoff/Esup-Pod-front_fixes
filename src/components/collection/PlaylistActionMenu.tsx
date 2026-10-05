import IconButton from "@mui/joy/IconButton";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Menu from "@mui/joy/Menu";
import MoreVert from "@mui/icons-material/MoreVert";
import Edit from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";
import Link from "next/link";
import { useTranslation } from "@/src/hooks/useTranslation";
import styles from "./styles.module.css";

interface PlaylistCardActionMenuProps {
  slug: string | null;
}

export default function PlaylistCardActionMenu({
  slug,
}: PlaylistCardActionMenuProps) {
  const { t } = useTranslation();
  return (
    <Dropdown>
      <MenuButton
        className={styles.menuButton}
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined" } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem component={Link} href={`/playlist/edit/${slug}`}>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>
          {t("playlists.editPlaylist")}
        </MenuItem>
        <ListDivider />
        <MenuItem
          component={Link}
          href={`/playlist/delete/${slug}`}
          variant="soft"
          color="danger"
        >
          <ListItemDecorator className={styles.deleteDecorator}>
            <DeleteForever />
          </ListItemDecorator>
          {t("playlists.delete")}
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
