import { useState, MouseEvent } from "react";
import { SelectedDeviceView } from "./SelectedDeviceView";
import { useAppSelector } from "@hooks/redux";
import { getTextPeriod } from "@src/utils/functions";
export const SelectedDevice = () => {
  const { selectedDev, isVisibleDevice } = useAppSelector(
    (state) => state.devSlice
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenAdditon = Boolean(anchorEl);

  const handleClickDetail = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <SelectedDeviceView
      dev={selectedDev}
      timeSession={selectedDev?.last_sess?.time_srv}
      isTimeSession={Boolean(selectedDev?.last_sess?.time_srv)}
      period={getTextPeriod(selectedDev?.period_sess) || ""}
      isVisibleDevice={isVisibleDevice}
      isOpenAddition={isOpenAdditon}
      anchorEl={anchorEl}
      handleClickDetail={handleClickDetail}
      onClose={handleClose}
    />
  );
};
