import { useState, MouseEvent, useEffect } from "react";
import { Modal } from "@components/_shared/Modal";
import { BigButton } from "@components/_shared/BigButton";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useModal } from "@hooks/useModal";
import { setVariant } from "@src/redux/reducers/ModalSlice";
import { eVariantModal } from "@src/types/EvariantModal";
import { SelectedLocationView } from "./SelectedLocationView";
import { useAuth } from "@hooks/useAuth";
import sharedStyles from "../../../../assets/styles/shared.module.scss";
import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";
export const SelectedLocation = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const cxShared = useStyles(sharedStyles);
  const { selectedLocation, isLoadingScheme } = useAppSelector(
    (state) => state.locationSlice
  );
  const [open, openModal, closeModal] = useModal();
  const [isAdmin, setIsAdmin] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //const [isVisible, setIsVisible] = useState(false);
  const isOpenMenu = Boolean(anchorEl);
  const handleClickMenuButton = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenModalEditLocation = (
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
  const handleOpenModalNewLocation = () => {
    dispatch(
      setVariant({
        title: "Добавить расположение устройства",
        variant: eVariantModal.newLocation,
      })
    );
    openModal();
  };

  useEffect(() => {
    // Если у пользователя есть права редактирования:
    if (auth && "user" in auth && auth?.user?.roles_ids.roles[1] === 2)
      setIsAdmin(true);
  }, [auth?.user]);

  return (
    <>
      <h2 className={cxShared("title")}>Данные по расположению устройства</h2>
      {selectedLocation ? (
        <SelectedLocationView
          location={selectedLocation}
          anchorEl={anchorEl}
          handleOpenModal={handleOpenModalEditLocation}
          handleClickMenuButton={handleClickMenuButton}
          //handleChange={handleChange}
          closeMenu={closeMenu}
          isOpenMenu={isOpenMenu}
          isScheme={Boolean(selectedLocation?.svg)}
          isLoading={isLoadingScheme}
          isAdmin={isAdmin}
        />
      ) : null}
      {isAdmin && (
        <div className={cx("button")}>
          <BigButton handleClick={handleOpenModalNewLocation}>
            Добавить новое расположение
          </BigButton>
          <Modal open={open} handleClose={closeModal} />
        </div>
      )}
    </>
  );
};
