import { SelectedDeviceView } from "./SelectedDeviceView";
import { useAppSelector } from "@hooks/redux";

export const SelectedDevice = () => {
  const { selectedDev } = useAppSelector((state) => state.devSlice);
  console.log("selectedDev", selectedDev);
  return <SelectedDeviceView dev={selectedDev} />;
};
