import { useState, useEffect, useMemo } from "react";

import { LocationTreeView } from "./LocationTreeView";
import { Alert } from "@mui/material";

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

let old_id_dev = "0";
let old_id_location = "0";
// let old_svg = "";

export const LocationTree = () => {
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
      else{
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

      if (currentLocation?.id !== id || old_id_dev !== currentLocation?.id || old_id_dev !== devId){
        const selectedDev = devs?.data.find((dev: IDev) => dev.id === devId);
        dispatch(setVisibleDevice(true));
        if (old_id_dev !== devId) {
          old_id_dev = devId;
          old_id_location = "0"
          dispatch(setSelectedDev(selectedDev));
        }
      }
      else{
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

  useEffect(() => {
    if (devs && "data" in devs) {
      dispatch(setDevs(devs.data));
    }
  }, [devs]);

  return (
    <>
      {isError ? (
        <Alert severity="error">
          Произошла ошибка при загрузке устройств. Обратитесь к администратору.
        </Alert>
      ) : (
        <LocationTreeView
          // TODO: проверить под пользователем, у которого нет прав редактирования
          locations={isAdmin ? locationsTree : filteredLocations}
          handleClick={handleSelectLocation}
          isLoading={isLoading}
          verifRanges={verifRanges?.data}
          lastSessions={lastSessions?.data}
        // devs={devsByLocation?.data}
        />
      )}
    </>
  );
};



