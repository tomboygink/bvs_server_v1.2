import { MouseEvent } from "react";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { IDev } from "@src/types/IDev";
import { FC } from "react";
import { TabPanel } from "./components/TabPanel";
import { AdditionInfoMobile } from "../AdditionInfoMobile";
import { useStyles } from "@hooks/useStyles";
import sharedStyles from "../../../../assets/styles/shared.module.scss";
import styles from "./styles.module.scss";
import { IconButton } from "@mui/material";

interface Props {
  dev: IDev | null;
  timeSession: Date | undefined;
  isTimeSession: boolean;
  isVisibleDevice: boolean;
  isOpenAddition: boolean;
  period: string;
  handleClickDetail: (event: MouseEvent<HTMLButtonElement>) => void;

  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const SelectedDeviceView: FC<Props> = (props) => {
  const {
    dev,
    isTimeSession,
    isVisibleDevice,
    timeSession,
    period,
    isOpenAddition,
    handleClickDetail,
    anchorEl,
    onClose,
  } = props;
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);
  const newDate = moment(new Date());
  const dateOfLastSession = moment(timeSession);
  const diff = newDate.diff(dateOfLastSession, "days");

  return (
    <>
      <h2 className={cxShared("title")}>Данные по устройству {dev?.number}</h2>

      {/* блок info отображается при разрешении экрана менее 610 пикселей и если есть сессии*/}
      {isTimeSession && (
        <div className={cx("info")}>
          <p className={cx("text")}>
            Последняя сессия:{" "}
            <span className={cx("span")}>{diff} дней назад</span>
          </p>
          <p className={cx("text")}>
            Период передачи сессии: <span className={cx("span")}>{period}</span>
          </p>
          <div className={cx("drop")}>
            <p className={cx("text")}>Подробнее о сессиях</p>
            <IconButton
              onClick={handleClickDetail}
              aria-controls={isOpenAddition ? "additionInfo" : undefined}
              aria-haspopup="true"
              aria-expanded={isOpenAddition ? "true" : undefined}
              sx={{ padding: "0px" }}
            >
              <ArrowDropDownIcon sx={{ color: "#1976d2" }} />
            </IconButton>

            <AdditionInfoMobile
              device={dev}
              isVisible={isVisibleDevice}
              isOpen={isOpenAddition}
              anchorEl={anchorEl}
              onClose={onClose}
            />
          </div>
        </div>
      )}

      <TabPanel />
    </>
  );
};
