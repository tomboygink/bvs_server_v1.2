// import { useEffect } from "react";
import { TabPanelView } from "./TabPanelView";
import { useAppSelector } from "@hooks/redux";

export const TabPanel = () => {
  const { selectedDev, isVisibleDevice } = useAppSelector(
    (state) => state.devSlice
  );

  // useEffect(() => {
  //   console.log(selectedDev?.selectedSession)
  //   console.log(selectedDev?.control_sess)
  // }, [selectedDev])

  return (
    <TabPanelView
      isSelectedSession={Boolean(selectedDev?.selectedSession)}
      isVisibleDevice={isVisibleDevice}
      isControlSess={Boolean(selectedDev?.control_sess)}
    />
  );
};
