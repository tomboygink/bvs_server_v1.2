import { FC, SyntheticEvent } from "react";

import { Select } from "@components/_shared/Inputs/Select";
import { SelectChangeEvent, MenuItem, Alert } from "@mui/material";
import { Typography } from "@components/_shared/Typography";
import { Button } from "@components/_shared/Button";
import { LocationTree } from "./components/LocationTree";
import { IOrg } from "@src/types/IOrg";
import { ILocation } from "@src/types/ILocation";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
interface Props {
  location: ILocation | null;
  orgs: (IOrg | undefined)[];
  message: string;
  handleSelectChange: (event: SelectChangeEvent) => void;
  handleCloseSelect: (
    event: SyntheticEvent<Element, Event>,
    name: string
  ) => void;
  handleSelectLocation: (event: string | null) => void;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
  isRootLocation: boolean;
}
export const MoveLocationView: FC<Props> = (props) => {
  const {
    location,
    orgs,
    message,
    handleSelectChange,
    handleCloseSelect,
    handleSelectLocation,
    isLoading,
    isErrorSave,
    isSuccessSave,
    isRootLocation,
  } = props;
  const cx = useStyles(styles);
  return (
    <>
      <div className={cx("container")}>
        <fieldset className={cx("fields")}>
          <Select
            inputProps={{
              name: "org_id",
            }}
            label="Организация"
            defaultValue={location?.org?.id || ""}
            onChange={handleSelectChange}
            onClose={(e) => handleCloseSelect(e, "org_id")}
          >
            {orgs?.map((org) => (
              <MenuItem key={org?.id} value={org?.id}>
                {org?.full_name}
              </MenuItem>
            ))}
          </Select>
        </fieldset>
        <Typography className={cx("title")} variant="subtitle1">
          Переместить в
        </Typography>
        <fieldset className={cx("tree")}>
          <LocationTree handleSelectLocation={handleSelectLocation} />
        </fieldset>
      </div>
      {message && (
        <Alert className={cx("alert")} severity="error">
          {message}
        </Alert>
      )}
      {isSuccessSave && (
        <Alert className={cx("alert")} severity="success">
          {SAVE_SUCCESS}
        </Alert>
      )}
      {isErrorSave && (
        <Alert className={cx("alert")} severity="error">
          {SAVE_ERROR}
        </Alert>
      )}

      <div className={cx("button")}>
        <Button isLoading={isLoading} disabled={isRootLocation} size="small">
          Переместить в корень
        </Button>
        <Button isLoading={isLoading} size="small">
          Сохранить
        </Button>
      </div>
    </>
  );
};
