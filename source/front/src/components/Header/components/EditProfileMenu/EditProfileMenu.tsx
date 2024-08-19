import { FC } from "react";
import { Menu, MenuItem, ListItemIcon, Avatar, Divider } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Logout from "@mui/icons-material/Logout";
import { eVariantModal } from "@src/types/EvariantModal";
import { IUser } from "@src/types/IUser";

interface Props {
  user: IUser | null | undefined;
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  handleOpenModal: (variant: eVariantModal, title: string) => void;
  handleLogout: () => void;
}
export const EditProfileMenu: FC<Props> = ({
  user,
  isOpen,
  anchorEl,
  onClose,
  handleOpenModal,
  handleLogout,
}) => {
  return (
    <Menu
      open={isOpen}
      id="editProfileMenu"
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <MenuItem>
        <Avatar sx={{ width: 24, height: 24, mr: "8px" }} />
        {user?.family} {user?.name}
      </MenuItem>
      <Divider sx={{ m: "16px" }} />
      <MenuItem
        onClick={() =>
          handleOpenModal(eVariantModal.editProfile, "Настройка профиля")
        }
      >
        <ListItemIcon>
          <PermIdentityIcon fontSize="small" sx={{ color: "#007FFF" }} />
        </ListItemIcon>
        Настройка профиля
      </MenuItem>
      <MenuItem
        onClick={() =>
          handleOpenModal(eVariantModal.editPassword, "Изменить пароль")
        }
      >
        <ListItemIcon>
          <LockOpenIcon fontSize="small" sx={{ color: "#007FFF" }} />
        </ListItemIcon>
        Изменить пароль
      </MenuItem>
      <Divider sx={{ m: "16px" }} />

      <MenuItem onClick={handleLogout} sx={{ color: "#266BF1" }}>
        <ListItemIcon>
          <Logout fontSize="small" sx={{ color: "#266BF1" }} />
        </ListItemIcon>{" "}
        Выйти
      </MenuItem>
    </Menu>
  );
};
