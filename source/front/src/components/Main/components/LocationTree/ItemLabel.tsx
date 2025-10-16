import { FC } from "react";
import { Tooltip } from "@mui/material";
import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";

interface Props {
  expireVerifRange?: boolean;
  name: string;
  error?: boolean|undefined;
}

export const ItemLabel: FC<Props> = ({ expireVerifRange, name, error }) => {

  const cx = useStyles(styles);
  return (
    <div className={cx("label")}>
      <p>{name}</p>
      <div className={cx("wrapper_tooltip")}>
        {expireVerifRange && (
        <Tooltip title="Истекает межповерочный интервал">
          <p className={cx("marker", "red-marker")}>!</p>
        </Tooltip>
      )}
      
      {error && (
        <Tooltip title="Ошибка в термокосе">
          <p className={cx("marker", "yellow-marker")}>!</p>
        </Tooltip>
      )}
      </div>
    </div>
  );
};
