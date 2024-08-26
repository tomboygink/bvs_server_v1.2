import { FC } from "react";
import { Menu } from "@mui/material";
import { AdditionInfo } from "../AdditionInfo/AdditionInfo";
import { IDev } from "@src/types/IDev";

import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
interface Props {
  device: IDev | null;
  isVisible: boolean;
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const AdditionInfoMobile: FC<Props> = (props) => {
  const cx = useStyles(styles);
  const { device, isVisible, isOpen, anchorEl, onClose } = props;
  return (
    <Menu open={isOpen} id="additionInfo" anchorEl={anchorEl} onClose={onClose}>
      <div className={cx("container")}>
        <AdditionInfo device={device} isVisible={isVisible} />
      </div>
    </Menu>
  );
};
