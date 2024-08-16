import { FC } from "react";
import moment from "moment";
import { TreeItem } from "@mui/x-tree-view";
import FolderIcon from "@mui/icons-material/Folder";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import { ILocation } from "@src/types/ILocation";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { ItemLabel } from "./ItemLabel";
import { IDev } from "@src/types/IDev";
import { IVerifRange } from "@src/types/IVerifRange";

interface Props {
  location: ILocation;
  isLoading: boolean;
  verifRanges: IVerifRange[];
}

export const LocationItem: FC<Props> = ({
  location,
  isLoading,
  verifRanges,
}) => {
  const getIcon = () => {
    return location?.devs?.length !== 0 ? FolderIcon : FolderZipIcon;
  };
  const getColorDevIcon = (dev: IDev) => {
    const dateSess = moment(dev.time);
    const date = moment(new Date());
    const diff = date.diff(dateSess, "days");
    // Если устройство удалено - серый
    if (dev.deleted) {
      return "#808080";
    }
    // Если время последней сессии отсутствует - красный
    else if (!dev.time) {
      return "#EA4335";
    }
    // Если время с последней сессии меньше периода сессии - зеленый
    else if (diff <= Number(dev.period_sess)) {
      return "#0FA958";
    }
    // Если время с последней сессии меньше двух периодов сессий - желтый
    else if (diff < Number(dev.period_sess) * 2) {
      return "#FBBC05";
    }
    // Если время с последней сессии больше или равно двум периодам сессий, но меньше трех периодов - оранжевый
    else if (
      diff >= Number(dev.period_sess) * 2 &&
      diff < Number(dev.period_sess) * 3
    ) {
      return "#FC8904";
    }
    // Во всех остальных случаях - красный
    else return "#EF4335";
  };

  const getMarker = (dev: IDev) => {
    return verifRanges?.some((item) => item.dev_id === dev.id);
  };

  return (
    <TreeItem
      itemId={location.id || ""}
      label={location.g_name}
      slots={{
        expandIcon: getIcon(),
        collapseIcon: getIcon(),
        endIcon: getIcon(),
      }}
      sx={{
        color: "#222",

        fontSize: "14px",
        "& .MuiTreeItem-content": {
          padding: "0px",
        },
        "& .MuiSvgIcon-root": {
          color: `${
            location.deleted
              ? "#808080"
              : location?.devs?.length !== 0
              ? "#FFE2C0"
              : "#FFAD4E"
          }`,
        },
      }}
    >
      {location.subLocations?.length !== 0 && (
        <>
          {location.subLocations?.map((item) => (
            <LocationItem
              key={item.id}
              location={item}
              isLoading={isLoading}
              verifRanges={verifRanges}
            />
          ))}
        </>
      )}

      <>
        {location?.devs?.map((dev) => {
          return (
            <TreeItem
              key={dev.id}
              itemId={`dev_${dev.id}`}
              //label={dev.number}
              label={
                <ItemLabel
                  name={dev.number}
                  expireVerifRange={getMarker(dev)}
                />
              }
              slots={{
                endIcon: CrisisAlertIcon,
              }}
              sx={{
                color: `${
                  dev.deleted ? "#808080" : dev.time ? "#222" : "#EA4335"
                }`,
                // `${dev.time ? "#222" : "#EA4335"}`,
                fontSize: "14px",
                "& .MuiSvgIcon-root": {
                  color: getColorDevIcon(dev),
                },
              }}
            />
          );
        })}

        {/* Отрисовка устройств, полученных при клике на локацию */}
        {/* {devs?.map((dev) => {
          return (
            <TreeItem
              key={dev.id}
              itemId={`dev_${dev.id}`}
              label={dev.number}
              slots={{
                endIcon: CrisisAlertIcon,
              }}
              sx={{
                color: `${
                  dev.deleted ? "#808080" : dev.time ? "#222" : "#EA4335"
                }`,
                // `${dev.time ? "#222" : "#EA4335"}`,
                fontSize: "14px",
                "& .MuiSvgIcon-root": {
                  color: getColorDevIcon(dev),
                },
              }}
            />
          );
        })} */}
      </>
    </TreeItem>
  );
};
