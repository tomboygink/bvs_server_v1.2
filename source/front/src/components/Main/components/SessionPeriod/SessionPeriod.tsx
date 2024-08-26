import { FC } from "react";
import { Typography } from "@mui/material";
import LeakAddIcon from "@mui/icons-material/LeakAdd";
import { getTextPeriod } from "@src/utils/functions";
import { IDev } from "@src/types/IDev";
import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";

interface Props {
  isVisible: boolean;
  selectedDev: IDev | null;
}
export const SessionPeriod: FC<Props> = ({ isVisible, selectedDev }) => {
  const cx = useStyles(styles);

  return (
    <>
      {isVisible && (
        <div className={cx("container")}>
          <LeakAddIcon sx={{ color: "#808080", mr: "5px" }} />
          <div>
            <Typography
              sx={{ fontSize: "12px", color: "#4a4b42", fontWeight: "700" }}
            >
              Период передачи сессии:
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "#4a4b42", fontWeight: "700" }}
            >
              {getTextPeriod(selectedDev?.period_sess)}
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};
