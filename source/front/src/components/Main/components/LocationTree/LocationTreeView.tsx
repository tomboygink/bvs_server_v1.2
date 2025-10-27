import { FC, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view";
import { ILocation } from "@src/types/ILocation";
import { LocationItem } from "./LocationItem";
import { IVerifRange } from "@src/types/IVerifRange";
import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";
import { ISession } from "@src/types/ISession";

interface Props {
  locations: ILocation[];
  handleClick: (id: string) => void;
  isLoading: boolean;
  lastSessions: ISession[];
  verifRanges: IVerifRange[];
  expandedItems?: string[] | null;
  selectedItem?: string | null,
  onExpandedChange?: (ids: string[]) => void
}
export const LocationTreeView: FC<Props> = (props) => {
  const { lastSessions, locations, handleClick, isLoading, expandedItems, selectedItem, onExpandedChange, ...other } = props;
  const cx = useStyles(styles);

  // useEffect(() => {
  //   console.log(locations)
  // }, [locations])

  return (
    <div className={cx(`container`)}>
      {isLoading ? (
        <CircularProgress sx={{ color: "#266bf1" }} />
      ) : (
        <SimpleTreeView
          className={cx("tree")}
          onSelectedItemsChange={(_, id) => handleClick(id ?? "")}
          // {...(expandedItems ? { expandedItems } : {})}
          // {...(selectedItem ? { selectedItems: selectedItem } : {})}
          onExpandedItemsChange={(_, ids) => onExpandedChange?.(ids)}
          expandedItems={expandedItems ?? undefined}
          selectedItems={selectedItem ?? undefined}
        >
          {locations?.map((location) => (
            <LocationItem
              {...other}
              key={location.id}
              location={location}
              isLoading={isLoading}
              lastSession={lastSessions}
            />
          ))}
        </SimpleTreeView>
      )}
    </div>
  );
};
