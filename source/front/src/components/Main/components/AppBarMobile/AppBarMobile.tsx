import { useState, MouseEvent } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import { LocationTreeMobile } from "../LocationTreeMobile";
import { InfoStickerMobile } from "../InfoStickerMobile";
import { useAppSelector } from "@hooks/redux";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

export const AppBarMobile = () => {
  const cx = useStyles(styles);
  const { isSelected } = useAppSelector((state) => state.locationSlice);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorIfoSticker, setAnchorInfoSticker] = useState<null | HTMLElement>(
    null
  );
  const isOpenTree = Boolean(anchorEl);
  const isOpenInfoSticker = Boolean(anchorIfoSticker);

  const handleClickDevice = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickAddition = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorInfoSticker(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAddition = () => {
    setAnchorInfoSticker(null);
  };
  return (
    <AppBar className={cx("appbar")} position="static">
      <Toolbar className={cx("toolbar")}>
        <IconButton
          onClick={handleClickDevice}
          aria-controls={isOpenTree ? "locationTree" : undefined}
          aria-haspopup="true"
          aria-expanded={isOpenTree ? "true" : undefined}
          sx={{ color: "#fff", display: "flex", flexDirection: "column" }}
        >
          <InsertChartOutlinedOutlinedIcon />
          <Typography>Устройства</Typography>
        </IconButton>

        <LocationTreeMobile
          isOpen={isOpenTree}
          anchorEl={anchorEl}
          onClose={handleClose}
        />
        <IconButton
          disabled={!isSelected}
          onClick={handleClickAddition}
          aria-controls={isOpenInfoSticker ? "infoSticker" : undefined}
          aria-haspopup="true"
          aria-expanded={isOpenInfoSticker ? "true" : undefined}
          sx={{
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            "&.Mui-disabled": {
              color: "#c7bcbcd6",
            },
          }}
        >
          <AnnouncementOutlinedIcon />
          <Typography>Дополнительно</Typography>
        </IconButton>

        <InfoStickerMobile
          isOpen={isOpenInfoSticker}
          anchorEl={anchorIfoSticker}
          onClose={handleCloseAddition}
        />
      </Toolbar>
    </AppBar>
  );
};
