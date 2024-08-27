import { SelectedLocation } from "./components/SelectedLocation";
import { SelectedDevice } from "./components/SelectedDevice";
import { useAppSelector } from "@hooks/redux";
import { AppBarMobile } from "./components/AppBarMobile";

export const Main = () => {
  const { isVisibleDevice } = useAppSelector((state) => state.devSlice);

  return (
    <>
      <AppBarMobile />
      {isVisibleDevice ? <SelectedDevice /> : <SelectedLocation />}
    </>
  );
};
