import { FC } from "react";
import { Tooltip } from "@mui/material";
import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";

interface Props {
  expireVerifRange: boolean;
  name: string;
}
export const ItemLabel: FC<Props> = ({ expireVerifRange, name }) => {
  const cx = useStyles(styles);
  return (
    <div className={cx("label")}>
      <p>{name}</p>
      {expireVerifRange && (
        <Tooltip title="Истекает срок поверки">
          <p className={cx("marker")}>!</p>
        </Tooltip>
      )}
    </div>
  );
};
