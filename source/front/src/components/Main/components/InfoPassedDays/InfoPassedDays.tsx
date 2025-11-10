import { FC } from "react";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  period: number | undefined;
  timeSession: Date | undefined;
  isTimeSession: boolean;
  isVisible: boolean;
}

export const InfoPassedDays: FC<Props> = (props) => {
  const cx = useStyles(styles);
  const { period, isTimeSession, isVisible, timeSession } = props;
  
  const days = Math.floor((new Date().getTime() - Date.parse(String(timeSession))) / 1000 / 60 / 60 / 24);
  const hours = Math.floor((new Date().getTime() - Date.parse(String(timeSession))) / 1000 / 60 / 60);
  const minutes = Math.floor((new Date().getTime() - Date.parse(String(timeSession))) / 1000 / 60);

  return (
    <>
      {isVisible ? (
        <div className={cx("container")}>
          <svg
            className={cx("svg")}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#75A4FF" />
            <path
              d="M24 10H8V12H6V10C6 8.89543 6.89543 8 8 8H24C25.1046 8 26 8.89543 26 10V22C26 23.1046 25.1046 24 24 24H19V22H24V10Z"
              fill="white"
            />
            <path
              d="M6 17C9.86599 17 13 20.134 13 24H11C11 21.2386 8.76142 19 6 19V17Z"
              fill="white"
            />
            <path d="M6 21C7.65685 21 9 22.3431 9 24H6V21Z" fill="white" />
            <path
              d="M6 13C12.0751 13 17 17.9249 17 24H15C15 19.0294 10.9706 15 6 15V13Z"
              fill="white"
            />
          </svg>
          {isTimeSession ?
            period === 1 || period === 7 || period == 14 || period === 31 ?
              <div>
                <p className={cx("text")}>Прошло - {days} день/дня/дней</p>
                <p className={cx("span")}>(с момента приема данных)</p>
              </div>
              : period === 4 || period === 8 || period === 24 ?
                <div>
                  <p className={cx("text")}>Прошло - {hours} час(а/ов)</p>
                  <p className={cx("span")}>(с момента приема данных)</p>
                </div> : period === 144 ? <div>
                  <p className={cx("text")}>Прошло - {minutes} минут(а/ы)</p>
                  <p className={cx("span")}>(с момента приема данных)</p>
                </div>
                  : null :
            <p className={cx("text")}>Нет данных</p>

          }

          {/* <div className={cx("icon-wrapper")}>
            <SignalCellularAltIcon sx={{ color: "#fff" }} />
          </div> */}
        </div>
      ) : null}
    </>
  );
};
