import { FormEvent, useState, useEffect } from "react";
import { SessonsTabView } from "./SessonsTabView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useAuth } from "@hooks/useAuth";
import { useAppSelector } from "@hooks/redux";
import { useGetSelectedDevSessionByPeriodQuery } from "@src/redux/services/devsApi";

export const SessionTab = () => {
  const auth = useAuth();
  const { errors, values, handleChange, /*isValid,*/ setValues } = useFormValidation();

  //Установка певое число актуального месяца с 00:00
  useEffect(() => {
    const now = new Date();
    //начало периода
    const firstDayMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0);
    const firstOffsetMinutes = firstDayMonth.getTimezoneOffset();
    const firstLocal = new Date(firstDayMonth.getTime() - firstOffsetMinutes * 60 * 1000);
    const formattedStart = firstLocal.toISOString().slice(0, 16)

    //окончание периода 
    const todayMonth = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
    const todayOffsetMinutes = todayMonth.getTimezoneOffset();
    const todayLocal = new Date(todayMonth.getTime() - todayOffsetMinutes * 60 * 1000);

    const formattedEnd = todayLocal.toISOString().slice(0, 16)

    setValues(prev => ({
      ...prev,
      sess_period_start: formattedStart,
      sess_period_end: formattedEnd
    }));


  }, []);

  const [isPeriod, setIsPeriod] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { selectedDev, isVisibleDevice } = useAppSelector(
    (state) => state.devSlice
  );
  const isNotSkip = isPeriod && isVisibleDevice;

  const {
    data: sessions,
    isError,
    isLoading,
    isSuccess,
  } = useGetSelectedDevSessionByPeriodQuery(
    {
      dev_number: selectedDev?.number,
      sess_period_start: values.sess_period_start,
      sess_period_end: values.sess_period_end,
    },
    { skip: !isNotSkip }
  );


  const setPeriod = (event: FormEvent) => {
    event.preventDefault();

    setIsPeriod(true);
  };




  useEffect(() => {
    // Если у пользователя есть права редактирования:
    if (auth && "user" in auth && auth?.user?.roles_ids.roles[1] === 2)
      setIsAdmin(true);
  }, [auth?.user]);

  return (
    <SessonsTabView
      errors={errors}
      values={values}
      handleChange={handleChange}
      handleSubmit={setPeriod}
      // isValid={isValid}
      sessions={sessions?.data}
      isAdmin={isAdmin}
      device={selectedDev}
      isLoadingGetSessions={isLoading}
      isSuccessGetSession={isSuccess}
      isErrorGetSession={isError}
    />
  );
};
