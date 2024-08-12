import { FC, useEffect, useState, useRef } from "react";
import { SchemeView } from "./SchemeView";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { setVisibleDevice } from "@src/redux/reducers/devSlice";
import { useGetWellsByLocationIdQuery } from "@src/redux/services/wellApi";
import { api } from "@api/api";
import { createBodyQuery } from "@src/utils/functions";
import { ECOMMAND } from "@src/types/ECommand";
import { useGetDevByIdQuery } from "@src/redux/services/devsApi";
import { setSelectedDev } from "@src/redux/reducers/devSlice";
import { IWell } from "@src/types/IWell";

interface Props {
  isLoading: boolean;
}
interface MutableRefObject<T> {
  current: T;
}
export const Scheme: FC<Props> = (props) => {
  const { ...other } = props;
  const dispatch = useAppDispatch();
  const svgRef: MutableRefObject<SVGElement | undefined> = useRef();
  const [devId, setDevId] = useState("");
  const { selectedLocation, locations, locationsTree } = useAppSelector(
    (state) => state.locationSlice
  );
  const { data: wells } = useGetWellsByLocationIdQuery(
    { group_dev_id: selectedLocation?.id },
    { skip: !Boolean(selectedLocation?.id) }
  );
  const { data: dev } = useGetDevByIdQuery(
    {
      id: devId,
    },
    { skip: !Boolean(devId) }
  );
  const [svg, setSvg] = useState("");
  const [transformedWells, setTransformedWells] = useState<IWell[]>([]);

  // Отрисовка схемы расположения: всплывающие подсказки с номерами скважин. Обработка наведения мыши и клика по элементу схемы.
  const drawShemeSvg = () => {
    let tooltip = document.getElementById("tooltip") as HTMLElement;
    const devTooltip = tooltip?.querySelector(".tooltip__dev") as HTMLElement;
    const wellTooltip = tooltip?.querySelector(".tooltip__well") as HTMLElement;
    if ("current" in svgRef && svgRef.current && tooltip) {
      const hrefs: SVGElement[] = Array.from(
        svgRef.current.querySelectorAll(".well")
      );

      hrefs?.forEach((item) => {
        item.addEventListener("mouseout", () => {
          item.style.stroke = "";
          tooltip.style.display = "none";
        });
        item.addEventListener("mousemove", () => {
          transformedWells?.forEach((well, j) => {
            if (item.id.slice(5) === well.id) {
              item.style.stroke = "#25E48B";
              const clientRectangle = item.getBoundingClientRect();
              devTooltip.textContent = `Номер косы - ${transformedWells[j].dev_number}`;
              wellTooltip.textContent = `Номер скважины - ${transformedWells[j].number}`;
              tooltip.style.display = "block";
              tooltip.style.left = clientRectangle.left + 10 + "px";
              tooltip.style.top = clientRectangle.top + 10 + "px";
            }
          });
        });

        item.addEventListener("click", () => {
          transformedWells?.forEach((well, j) => {
            if (item.id.slice(5) === well.id) {
              setDevId(well.dev_id);
            }
          });
        });
      });
    }
  };

  //Если у выбранной локации есть svg, записываем ее в переменную svg
  useEffect(() => {
    if (
      selectedLocation &&
      "svg" in selectedLocation &&
      typeof selectedLocation?.svg === "string"
    ) {
      const svg = atob(
        selectedLocation?.svg?.replace(/data:image\/svg\+xml;base64,/, "")
      );
      setSvg(svg);
    } else setSvg("");
  }, [selectedLocation]);

  //Если есть svg, запускаем функцию для drawShemeSvg
  useEffect(() => {
    // wells?.data.forEach((well) => setDevId(well.d))
    if (svg) drawShemeSvg();
  }, [wells?.data, svg, transformedWells]);

  //Если с сервера пришли данные по устройству (запрос по устройству уходит по клику на элемент схемы), обновляем данные выбранного устройства selectedDev
  useEffect(() => {
    if (dev?.data) {
      dispatch(setSelectedDev(dev?.data[0]));
      dispatch(setVisibleDevice(true));
    } else {
      dispatch(setVisibleDevice(false));
    }
  }, [dev?.data]);

  // Если с сервера пришли данные со скважинами, обновляем их массив, добавляя в каждый элемент развернутые данные по устройству
  useEffect(() => {
    if (wells?.data) {
      wells?.data.forEach((well: IWell) => {
        const query = createBodyQuery(ECOMMAND.GETDEVBYID, {
          id: well.dev_id,
        });
        api.fetch(query).then((res) => {
          setTransformedWells((prev) => [
            ...prev,
            { ...well, dev_number: res?.data?.[0].number },
          ]);
        });
      });
    }
  }, [wells?.data]);

  return <SchemeView {...other} svg={svg} svgRef={svgRef} />;
};
