import React, { useState, useEffect, useRef } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Chart } from "../Chart/Chart";
import { AboutDevPanel } from "../AboutDevPanel";
import { CriticatilyTab } from "../CriticalityTab";
import { SelectedSessionTab } from "../SelectedSessionTab";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { SessionTab } from "../SessionsTab";
import { useCurrentWidth } from "@hooks/useCurrentWidth";
import { useAppSelector } from "@hooks/redux";

interface PanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface TabPanelViewProps {
  isSelectedSession: boolean;
  isVisibleDevice: boolean;
  isControlSess: boolean;
}
function Panel(props: PanelProps) {
  const { children, value, index, ...other } = props;
  const cx = useStyles(styles);

  return (
    <div
      className={cx("panel")}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const TabPanelView = (props: TabPanelViewProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const width = useCurrentWidth();
  const { isSelectedSession, isVisibleDevice, isControlSess } = props;
  const cx = useStyles(styles);
  const [value, setValue] = useState(0);
  const [maxWidth, setMaxWidth] = useState("1px");
  const { selectedDev } = useAppSelector((state) => state.devSlice);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    setMaxWidth(`${panelRef.current?.clientWidth}px`);
  }, [width, isVisibleDevice]);

  useEffect(() => {
    console.log(selectedDev)
  }, [])

  return (
    <div className={cx("tab-container")}>
      <Tabs
        className={cx("head")}
        value={value}
        onChange={handleChangeTab}
        sx={{
          maxWidth: maxWidth,
          "& .MuiBox-root": {
            border: "1px green solid",
          },
        }}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile={true}
      >
        <Tab sx={{ fontSize: "10px" }} label="Устройство" />
        <Tab sx={{ fontSize: "10px" }} label="Сессии за период" />

        <Tab
          sx={{ fontSize: "10px" }}
          label="Контроль критичности отклонений"
          disabled={!isControlSess}
        />
        <Tab
          sx={{ fontSize: "10px" }}
          label="Таблица температур"
          disabled={!isSelectedSession}
        />
      </Tabs>
      <div className="content" id="tabContent" ref={panelRef}>
        <Panel value={value} index={0}>
          <AboutDevPanel />
        </Panel>
        <Panel value={value} index={1}>
          <SessionTab />
        </Panel>
        <Panel value={value} index={2}>
          <CriticatilyTab />
        </Panel>
        <Panel value={value} index={3}>
          <SelectedSessionTab />
        </Panel>
        <Chart />
      </div>
    </div>
  );
};
