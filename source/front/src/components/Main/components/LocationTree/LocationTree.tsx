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
import { useStyles } from "@hooks/useStyles";
import { ItemLabel } from "./ItemLabel";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { SvgIcon } from "@mui/material";
import moment from "moment";

interface LocationTreeProps {
  searchValue?: string,
  onClearSearch?: () => void,
}

let old_id_dev = "0";
let old_id_location = "0";
// let old_svg = "";

export const LocationTree: FC<LocationTreeProps> = ({ searchValue, onClearSearch }) => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [expandedIds, setExpandedIds] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
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

    setSelectedId(id)

    if (onClearSearch) onClearSearch()

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

  const devMapByNumber = useMemo(() => {
    const map = new Map<string, IDev>();
    devs?.data.forEach((dev: IDev) => {
      map.set(dev.number.toLowerCase(), dev);
    });
    return map;
  }, [devs]);

  // const filteredDevices = useMemo(() => {
  //   if (!searchValue || searchValue.trim() === "") return [];
  //   const lowerSearch = searchValue.toLowerCase();

  //   return Array.from(devMapByNumber.entries())
  //     .filter(([num]) => num.startsWith(lowerSearch))
  //     .map(([, dev]) => dev);
  // }, [searchValue, devMapByNumber]);

  function collectDevicesFromLocations(locations: ILocation[]): IDev[] {
    const result: IDev[] = []

    for(const loc of locations) {
      if(loc.devs) {
        result.push(...loc.devs)
      }
      if(loc.subLocations && loc.subLocations.length > 0) {
        result.push(...collectDevicesFromLocations(loc.subLocations))
      }
    }
    return result
  }

  const filteredDevices = useMemo(() => {
    if(!searchValue || searchValue.trim() === '') {
      return []
    }

    const lowerSearch = searchValue.toLowerCase()

    const availableDevs = isAdmin
    ? collectDevicesFromLocations(locationsTree ?? []) : collectDevicesFromLocations(filteredLocations ?? [])

    return availableDevs.filter((dev: IDev) => dev.number.toLowerCase().startsWith(lowerSearch))

  }, [searchValue, locationsTree, filteredLocations, isAdmin])

  useEffect(() => {
    if (devs && "data" in devs) {
      dispatch(setDevs(devs.data));
    }
  }, [devs]);

  //-------------------------------------------------------------
  const handleSelectDevice = (id: string) => {
    const selectedDev = devs?.data.find((d: any) => d.id === id);
    if (selectedDev) {
      dispatch(setSelectedDev(selectedDev));
      dispatch(setVisibleDevice(true));
      dispatch(setIsSelected(true));
    }
  };

  const filterTreeWithDevices = (locations: ILocation[], query: string): ILocation[] => {
    if (!query) return locations;

    const lowerQuery = query.toLowerCase();

    const filtered = locations
      .map(location => {
        // Фильтруем девайсы локации по startsWith
        const filteredDevs = location.devs?.filter(dev =>
          dev.number.toLowerCase().startsWith(lowerQuery)
        ) || [];

        // Проверяем совпадение по локации (например, location.g_name)
        const locationMatches = location.g_name?.toLowerCase().includes(lowerQuery);

        // Рекурсивно фильтруем дочерние локации
        const filteredChildren = location.subLocations ? filterTreeWithDevices(location.subLocations, query) : [];

        if (locationMatches || filteredDevs.length > 0 || filteredChildren.length > 0) {
          return {
            ...location,
            devs: filteredDevs,
            subLocations: filteredChildren, // важно правильно указать название свойства для дочерних локаций
          };
        }

        return null;
      })
      .filter(Boolean) as ILocation[];

    return filtered;
  };

  const filteredTree = useMemo(() => {
    if (!locationsTree) return [];

    return filterTreeWithDevices(isAdmin ? locationsTree : filteredLocations, searchValue || '');
  }, [locationsTree, filteredLocations, searchValue, isAdmin]);

  function findDevicePath(tree: ILocation[], devId: string, path: string[] = []): string[] | null {
    for (const location of tree) {
      const currentPath = [...path, location.id];
      const devFound = location.devs?.some(dev => dev.id === devId);
      if (devFound) return (currentPath as string[]);
      if (location.subLocations) {
        const subPath = findDevicePath(location.subLocations, devId, (currentPath as string[]));
        if (subPath) return subPath;
      }
    }
    return null;
  }

  const onClickDeviceFromSearch = (dev: IDev) => {
    const path = findDevicePath(locationsTree ?? [], dev.id);
    if (path) {
      setExpandedIds(path);               // Раскрываем все локации по пути к устройству
      setSelectedId("dev_" + String(dev.id));    // Выделяем устройство в дереве
    }
    dispatch(setSelectedDev(dev));
    dispatch(setVisibleDevice(true));
    dispatch(setIsSelected(true));

    if (onClearSearch) onClearSearch();  // Сбрасываем строку поиска, чтобы показать дерево
  };

  // useEffect(() => {
  //   if (filteredDevices.length === 1) {
  //     const dev = filteredDevices[0];
  //     const path = findDevicePath(locationsTree ?? [], dev.id);

  //     if (path) {
  //       setExpandedIds(path); // локации до устройства
  //       setSelectedId("dev_" + dev.id); // для дерева с "dev_" префиксом
  //     }

  //     dispatch(setSelectedDev(dev));
  //     dispatch(setVisibleDevice(true));

  //     if (onClearSearch) {
  //       onClearSearch()
  //     }
  //   }
  // }, [filteredDevices]);

  const handleExpandedChange = (ids: string[]) => {
    setExpandedIds(ids)
  }

  const getColorDevIcon = (dev: IDev) => {
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

  const getMarker = (dev: IDev) => {
    return verifRanges?.data?.some((item: any) => item.dev_id === dev.id);
  };

  const getErrorMarker = (dev: IDev) => {
    return lastSessions?.data?.some(
      (item: any) => item.dev_id === dev.id && item.err === "y"
    );
  };

  return (
    <>
      {isError ? (
        <Alert severity="error">
          Произошла ошибка при загрузке устройств. Обратитесь к администратору.
        </Alert>
      ) : (searchValue && searchValue.trim() !== "") ? (
        filteredDevices.length > 0 ?
          <div className={cx("searchResults")}>
            {filteredDevices.map((dev) => (
              <div
                key={dev.id}
                className={cx("searchResultItem")}
                onClick={() => onClickDeviceFromSearch(dev)}
                style={{ cursor: "pointer", padding: "8px 12px", backgroundColor: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center' }}
              >
                <SvgIcon
                  component={CrisisAlertIcon}
                  sx={{
                    color: getColorDevIcon(dev),
                    fontSize: 20,
                  }}
                />
                <ItemLabel
                  name={dev.number}
                  expireVerifRange={getMarker(dev)}
                  error={getErrorMarker(dev)}
                />
              </div>
            ))}
          </div>
          :
          (
            <div>Устройства не найдены</div>
          )
      ) : (
        <LocationTreeView
          locations={isAdmin ? filteredTree : filteredLocations}
          handleClick={handleSelectLocation}
          isLoading={isLoading}
          verifRanges={verifRanges?.data}
          lastSessions={lastSessions?.data}
          expandedItems={expandedIds}
          selectedItem={selectedId}
          onExpandedChange={handleExpandedChange}
        />
      )
      }
    </>
  );
};



