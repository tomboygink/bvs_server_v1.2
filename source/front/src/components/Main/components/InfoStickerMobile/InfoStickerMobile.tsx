import { FC } from "react";
import { Menu } from "@mui/material";
import { InfoSticker } from "../InfoSticker/InfoSticker";

interface Props {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}
export const InfoStickerMobile: FC<Props> = (props) => {
  const { isOpen, anchorEl, onClose } = props;

  return (
    <Menu open={isOpen} id="infoSticker" anchorEl={anchorEl} onClose={onClose}>
      <InfoSticker />
    </Menu>
  );
};
