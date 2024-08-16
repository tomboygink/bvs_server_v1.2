import { useState, useEffect, MouseEvent } from "react";

import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { SideBar } from "@components/SideBar";
import { useAuth } from "@hooks/useAuth";
import { useStyles } from "@hooks/useStyles";
import { useModal } from "@hooks/useModal";
import { Modal } from "@components/_shared/Modal";
import styles from "./styles.module.scss";
import { EditProfileMenu } from "./components/EditProfileMenu";
import { setVariant } from "@src/redux/reducers/ModalSlice";
import { eVariantModal } from "@src/types/EvariantModal";
import { useAppDispatch } from "@hooks/redux";

export const Header = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const cx = useStyles(styles);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [open, openModal, closeModal] = useModal();
  const [isAdmin, setIsAdmin] = useState(false);
  const isOpenMenu = Boolean(anchorEl);
  const [user, setUser] = useState(auth?.user);
  const currentUser = localStorage.getItem("user");
  const handleClickMenuButton = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const toggleSideBar = (newOpen: boolean) => {
    setOpenSideBar(newOpen);
  };

  const handleOpenModalEditProfile = (
    variant: eVariantModal,
    title: string
  ) => {
    closeMenu();
    dispatch(
      setVariant({
        title,
        variant,
      })
    );
    openModal();
  };

  useEffect(() => {
    // Если у пользователя есть права редактирования:
    if (auth && "user" in auth && auth?.user?.roles_ids.roles[1] === 2)
      setIsAdmin(true);
  }, [auth?.user]);

  //Достаем данные о текущем пользователе из локального хранилища
  useEffect(() => {
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, [currentUser]);

  return (
    <>
      <AppBar position="static" className={cx("header")}>
        <Toolbar className={cx("toobar")}>
          {isAdmin && (
            <IconButton
              className={cx("burger")}
              onClick={() => toggleSideBar(true)}
            >
              <MenuIcon className={cx("icon_burger")} />
            </IconButton>
          )}

          <Box className={cx("user_info")}>
            <Avatar className={cx("avatar")}></Avatar>

            <Typography className={cx("name")}>
              {/* {`${auth?.user?.family} ${auth?.user?.name} ${auth?.user?.father}`} */}
              {`${user?.family} ${user?.name} ${user?.father}`}
            </Typography>
            <IconButton
              onClick={handleClickMenuButton}
              aria-controls={isOpenMenu ? "editProfileMenu" : undefined}
              aria-haspopup="true"
              aria-expanded={isOpenMenu ? "true" : undefined}
            >
              <ArrowDropDownIcon sx={{ color: "#fff" }} />
            </IconButton>
            <EditProfileMenu
              user={user}
              anchorEl={anchorEl}
              isOpen={isOpenMenu}
              onClose={closeMenu}
              handleOpenModal={handleOpenModalEditProfile}
              handleLogout={() => auth?.logout()}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <SideBar
        open={openSideBar}
        onClose={() => toggleSideBar(false)}
        onOpenModal={openModal}
      />

      <Modal open={open} handleClose={closeModal} />
    </>
  );
};
