import { useState, useEffect, useMemo, FC } from "react";

import { LocationTreeView } from "./LocationTreeView";
import { Alert } from "@mui/material";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  setSelectedLocation,
  setIsSelected,
  setIsLoadingScheme,
} from "@src/redux/reducers/locationSlice";
import { setSelectedDev } from "@src/redux/reducers/devSlice";
import { setDevs, setVisibleDevice } from "@src/redux/reducers/devSlice";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { useGetAllLocationQuery } from "@src/redux/services/locacationApi";
import {
  useGetAllDevsQuery,
  useGetControlSessQuery,
  useGetLastSessQuery,
  useGetExpireVerifRangeQuery,
  useGetAllLastSessQuery,
} from "@src/redux/services/devsApi";
import { useAuth } from "@hooks/useAuth";
import { ILocation } from "@src/types/ILocation";
import { IDev } from "@src/types/IDev";
import { api } from "@api/api";
import { createBodyQuery } from "@src/utils/functions";
import { ECOMMAND } from "@src/types/ECommand";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useStyles } from "@hooks/useStyles";
import moment from "moment";
import { ItemLabel } from "./ItemLabel";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

interface LocationTreeProps {
  searchValue?: string,
}

let old_id_dev = "0";
let old_id_location = "0";
// let old_svg = "";

export const LocationTree: FC<LocationTreeProps> = ({ searchValue }) => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    locations: locationArr,
    selectedLocation: currentLocation,
    locationsTree,
  } = useAppSelector((state) => state.locationSlice);
  const { isVisibleDevice, selectedDev } = useAppSelector(
    (state) => state.devSlice
  );
  const { data: orgs } = useGetAllOrgsQuery({});
  const { isLoading, isError } = useGetAllLocationQuery({});
  const { data: devs } = useGetAllDevsQuery({});
  const { data: controlSession } = useGetControlSessQuery(
    { dev_number: selectedDev?.number },
    { skip: !isVisibleDevice }
  );
  const { data: lastSession } = useGetLastSessQuery(
    { dev_number: selectedDev?.number },
    { skip: !isVisibleDevice }
  );
  const { data: verifRanges } = useGetExpireVerifRangeQuery({});

  const { data: lastSessions } = useGetAllLastSessQuery({});

  const cx = useStyles(styles);

  const handleSelectLocation = (id: string) => {

    //Если выбрана локация 
    if (!id?.includes("dev_")) {

      if (currentLocation?.id !== id || old_id_location !== currentLocation?.id) {
        const query = createBodyQuery(ECOMMAND.GETSCHEME, { id_devs_groups: id });
        old_id_location = id;
        dispatch(setVisibleDevice(false));
        const selectedLocation = locationArr?.find(
          (location: ILocation) => location.id === id
        );

        if (selectedLocation) {
          const org = orgs?.data.find(
            (org: ILocation) => selectedLocation.org_id === org.id
          );
          dispatch(setIsLoadingScheme(true));
          api
            .fetch(query)
            .then((res) => {
              const svg = res?.data?.[0]?.svg;
              const newSelectedLocation = { ...selectedLocation, org, svg };
              dispatch(setSelectedLocation(newSelectedLocation));
              dispatch(setIsSelected(true));
            })
            .catch((error) => console.log("error=>", error))
            .finally(() => dispatch(setIsLoadingScheme(false)));
        }
        else {
          dispatch(setIsSelected(false));
        }
      }
      else {
        old_id_location = id;
        dispatch(setVisibleDevice(false));
        const selectedLocation = locationArr?.find(
          (location: ILocation) => location.id === id
        );

        if (selectedLocation) {

          dispatch(setIsSelected(true));
        }

        else {
          dispatch(setIsSelected(false));
        }

      }
    }
    //Иначе если выбранно устройство
    else {
      const devId = id.replace("dev_", "");

      if (currentLocation?.id !== id || old_id_dev !== currentLocation?.id || old_id_dev !== devId) {
        const selectedDev = devs?.data.find((dev: IDev) => dev.id === devId);
        dispatch(setVisibleDevice(true));
        if (old_id_dev !== devId) {
          old_id_dev = devId;
          old_id_location = "0"
          dispatch(setSelectedDev(selectedDev));
        }
      }
      else {
        dispatch(setVisibleDevice(true));
      }
    }
  }

  //Добавляем в выбранное устройство контрольную сессию, когда приходят данные о контрольной сессии
  useEffect(() => {
    if (isVisibleDevice) {
      dispatch(
        setSelectedDev({
          ...(selectedDev as IDev),
          control_sess: controlSession?.data?.[0],
          last_sess: lastSession?.data?.[0],
        })
      );
    }
  }, [controlSession, lastSession]);

  useEffect(() => {
    // Если у пользователя есть права редактирования:
    if (auth && "user" in auth && auth?.user?.roles_ids.roles[1] === 2)
      setIsAdmin(true);
  }, [auth?.user]);

  // Мемоизированное значение массива с локациями в виде дерева, отфильтрованное для пользователей без прав редактирования
  const filteredLocations = useMemo(
    () =>
      locationsTree?.filter(
        (item: ILocation) => item.org_id === auth?.user?.id_org
      ),
    [locationsTree]
  );

  const filteredDevices = useMemo(() => {
    if (!searchValue || searchValue.trim() === "") return [];
    const lowerSearch = searchValue.toLowerCase();
    return devs?.data.filter((dev: any) => dev.number.toLowerCase().includes(lowerSearch)) || [];
  }, [devs, searchValue]);

  useEffect(() => {
    if (devs && "data" in devs) {
      dispatch(setDevs(devs.data));
    }
  }, [devs]);

  // console.log(locationArr)
  // console.log(locationsTree)

  const handleSelectDevice = (id: string) => {
    const selectedDev = devs?.data.find((d: any) => d.id === id);
    if (selectedDev) {
      dispatch(setSelectedDev(selectedDev));
      dispatch(setVisibleDevice(true));
      dispatch(setIsSelected(true));
    }
  };

  const filterTree = (locations: ILocation[], query: string): ILocation[] => {
    if (!query) return locations;

    const lowerQuery = query.toLowerCase();

    // Рекурсивно фильтруем дерево
    const filtered = locations
      .map(location => {
        // Фильтруем девайсы в локации
        const filteredDevs = location.devs?.filter(dev =>
          dev.number.toLowerCase().includes(lowerQuery)
        ) || [];

        // Проверяем совпадение по локации (например, location.name или другое поле)
        const locationMatches = location.g_name?.toLowerCase().includes(lowerQuery);

        // Фильтруем дочерние локации, если есть (если дерево вложенное)
        const filteredChildren = location.subLocations ? filterTree(location.subLocations, query) : [];

        if (locationMatches || filteredDevs.length > 0 || filteredChildren.length > 0) {
          return {
            ...location,
            devs: filteredDevs,
            children: filteredChildren,
          };
        }

        // Если нет совпадений — фильтруем локацию из итогового дерева
        return null;
      })
      .filter(Boolean) as ILocation[];

    return filtered;
  };

  const filteredTree = useMemo(() => {
    if (!locationsTree) return [];

    return filterTree(isAdmin ? locationsTree : filteredLocations, searchValue || '');
  }, [locationsTree, filteredLocations, searchValue, isAdmin]);

  console.log(lastSessions)

  return (
    <>
      {isError ? (
        <Alert severity="error">
          Произошла ошибка при загрузке устройств. Обратитесь к администратору.
        </Alert>
      ) : (searchValue && searchValue.trim() !== "") ? (
        filteredDevices.length > 0 ?
          <SimpleTreeView
            className={cx("tree")} // если хочешь одинаковые стили, можешь использовать общий стиль
            onSelectedItemsChange={(_, ids) => {
              const id = ids?.[0] ?? "";
              handleSelectDevice(id);
            }}
          >
            {filteredDevices.map((dev: any) => {
              const getColorDevIcon = () => {
                const dateSess = moment(dev.time);
                const date = moment(new Date());
                const diff = date.diff(dateSess, "days");

                if (dev.deleted) return "#808080";
                if (!dev.time) return "#EA4335";
                if (diff <= Number(dev.period_sess)) return "#0FA958";
                if (diff < Number(dev.period_sess) * 2) return "#FBBC05";
                if (diff < Number(dev.period_sess) * 3) return "#FC8904";
                return "#EF4335";
              };

              const getMarker = () => verifRanges?.data?.some((item: any) => item.dev_id === dev.id) ?? false;
              const getErrorMarker = () =>
                lastSessions?.data?.some((item: any) => item.dev_id === dev.id && item.err === "y") ?? false;

              return (
                <TreeItem
                  key={dev.id}
                  itemId={String(dev.id)}
                  label={
                    <ItemLabel
                      name={dev.number}
                      expireVerifRange={getMarker()}
                      error={getErrorMarker()}
                    />
                  }
                  slots={{
                    endIcon: CrisisAlertIcon,
                  }}
                  sx={{
                    color: dev.deleted
                      ? "#808080"
                      : dev.time
                        ? "#222"
                        : "#EA4335",
                    fontSize: "14px",
                    "& .MuiSvgIcon-root": {
                      color: getColorDevIcon(),
                    },
                  }}
                />
              );
            })}
          </SimpleTreeView>
          :
          (
            <div>Устройства не найдены</div>
          )
      ) : (
        <>
          <LocationTreeView
            // TODO: проверить под пользователем, у которого нет прав редактирования
            locations={isAdmin ? filteredTree : filteredLocations}
            handleClick={handleSelectLocation}
            isLoading={isLoading}
            verifRanges={verifRanges?.data}
            lastSessions={lastSessions?.data}
          // devs={devsByLocation?.data}
          />
        </>
      )
      }
    </>
  );
};



