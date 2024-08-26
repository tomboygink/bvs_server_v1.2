import { FC } from "react";
import { Menu } from "@mui/material";
import { LocationTree } from "../LocationTree/LocationTree";

interface Props {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}
export const LocationTreeMobile: FC<Props> = (props) => {
  const { isOpen, anchorEl, onClose } = props;

  return (
    <Menu open={isOpen} id="locationTree" anchorEl={anchorEl} onClose={onClose}>
      <LocationTree />
    </Menu>
  );
};
