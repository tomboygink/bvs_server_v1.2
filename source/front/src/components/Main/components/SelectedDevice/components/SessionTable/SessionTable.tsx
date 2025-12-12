import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Box,
  TableHead,
  Paper,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
  Alert,
} from "@mui/material";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// import { Button } from "@components/_shared/Button";
import moment from "moment";
import { writeFile, utils } from "xlsx";
import { ExportExelTableSessions } from "../ExportExelTableSessions";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setSelectedDev } from "@src/redux/reducers/devSlice";
import { useCreateControlSessMutation } from "@src/redux/services/devsApi";
import { ISession } from "@src/types/ISession";
import { IDev } from "@src/types/IDev";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  sessions: ISession[];
  isAdmin: boolean;
  device: IDev | null;
  isLoadingGetSessions: boolean;
  isSuccessGetSession: boolean;
  isErrorGetSession: boolean;
  sess_period_start?: string;
  sess_period_end?: string;
}
export const SessionTable: FC<Props> = ({
  sessions,
  isAdmin,
  device,
  isLoadingGetSessions,
  isSuccessGetSession,
  isErrorGetSession,
  sess_period_start,
  sess_period_end,
}) => {
  const dispatch = useAppDispatch();
  const cx = useStyles(styles);
  const { selectedDev } = useAppSelector((state) => state.devSlice);
  const [createControlSess, { isError, isLoading, isSuccess }] =
    useCreateControlSessMutation();
  const [selectedSession, setSelectedSession] = useState<ISession | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getColorIcon = (value: number) => {
    if (value >= 2.7) {
      return "#14AE5C ";
    } else if (value < 2.7 && value >= 2.2) {
      return "#FFCC40";
    } else return "#FF4848";
  };

  const generateArgs = (session: ISession) => {
    const args = {
      dev_sess_id: session.id,
      dev_id: session.dev_id,
      dev_number: session.dev_number,
    };
    return args;
  };
  const createNewControlSess = (session: ISession) => {
    setSelectedSession(session);
    const args = generateArgs(session);
    createControlSess(args);
  };
  const showChart = (session: ISession) => {
    dispatch(setSelectedDev({ ...(device as IDev), selectedSession: session }));
  };

  const handleExportExel = () => {
    const table = document.getElementById("sessions-exel");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "Report_" + device?.number + "_" + sess_period_start?.replace("T00:00","") + "_" + sess_period_end?.replace("T23:59","") + "_.xlsx");
  };

  const handleExoprtCsv = () => {
    const table = document.getElementById("sessions-exel");
    const workbook = utils.table_to_book(table, { sheet: "Sheet JS" });
    const ws1 = workbook.Sheets[workbook.SheetNames[0]];
    var csv = utils.sheet_to_csv(ws1, { strip: true, FS: "|" });
    download_file_csv(csv);
  };
  const download_file_csv = (content: any) => {
    var csvString = content;
    var universalBOM = "\uFEFF";
    var a = window.document.createElement("a");
    a.setAttribute(
      "href",
      "data:text/csv; charset=utf-8," +
      encodeURIComponent(universalBOM + csvString)
    );
    a.setAttribute("download", "Report.csv");
    window.document.body.appendChild(a);
    a.click();
  };

  useEffect(() => {
    isSuccess &&
      selectedSession &&
      dispatch(
        setSelectedDev({
          ...(selectedDev as IDev),
          control_sess: selectedSession,
        })
      );
  }, [isSuccess]);
  useEffect(() => {
    isError && console.log("Error");
  }, [isError]);

  return (
    <div className={cx("container")}>
      {isLoadingGetSessions ? (
        <CircularProgress />
      ) : (
        <>
          {isSuccessGetSession && (
            <>
              {" "}
              {sessions?.length > 0 ? (
                <>
                  <p className={cx("title")}>
                    Таблица сессий по периоду (кол-во: {sessions?.length})
                  </p>
                  <Paper sx={{ width: "100%", overflow: "hidden", mb: "12px" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table>
                        <TableHead>
                          <TableRow key={"row_head"}>
                            <TableCell align="center" sx={{ padding: "12px" }}>
                              Номер устройства
                            </TableCell>

                            <TableCell align="center" sx={{ padding: "12px" }}>
                              Время сессии
                            </TableCell>
                            <TableCell align="center" sx={{ padding: "12px" }}>
                              Заряд
                            </TableCell>
                            {isAdmin && (
                              <TableCell
                                align="center"
                                sx={{ padding: "12px" }}
                              >
                                Контрольная сессия
                              </TableCell>
                            )}
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ padding: "12px" }}
                            >
                              На графике
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sessions
                            ?.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((session) => (
                              <TableRow key={session.id}>
                                <TableCell
                                  component="td"
                                  scope="row"
                                  align="center"
                                  sx={{ padding: "12px" }}
                                >
                                  {session.dev_number}
                                </TableCell>
                                <TableCell
                                  component="td"
                                  scope="row"
                                  align="center"
                                  sx={{ padding: "12px" }}
                                >
                                  {moment(session.time_dev).format(
                                    "DD.MM.YYYY HH:mm"
                                  )}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ padding: "12px" }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {String(session.level_akb).replace(".", ",")} В
                                    <BatteryChargingFullIcon
                                      fontSize="small"
                                      sx={{
                                        color: getColorIcon(session.level_akb),
                                      }}
                                    />
                                  </Box>
                                </TableCell>
                                {isAdmin &&
                                  !device?.control_sess &&
                                  device?.last_sess?.id !== session.id && (
                                    <TableCell
                                      align="center"
                                      sx={{ padding: "12px" }}
                                    >
                                      {isLoading &&
                                        session.id === selectedSession?.id ? (
                                        <CircularProgress />
                                      ) : (
                                        <Button
                                          onClick={() =>
                                            createNewControlSess(session)
                                          }
                                          size="small"
                                        >
                                          Установить
                                        </Button>
                                      )}
                                      {isError &&
                                        session.id === selectedSession?.id && (
                                          <Alert severity="error">
                                            Произошла ошибка
                                          </Alert>
                                        )}
                                    </TableCell>
                                  )}
                                {isAdmin &&
                                  !device?.control_sess?.id &&
                                  device?.last_sess?.id === session.id && (
                                    <TableCell
                                      component="td"
                                      scope="row"
                                      align="center"
                                    >
                                      Текущая контрольная сессия
                                    </TableCell>
                                  )}
                                {isAdmin &&
                                  device?.control_sess &&
                                  device?.control_sess?.id === session.id && (
                                    <TableCell
                                      component="td"
                                      scope="row"
                                      align="center"
                                    >
                                      Установлено
                                    </TableCell>
                                  )}
                                {isAdmin &&
                                  device?.control_sess &&
                                  device?.control_sess?.id !== session.id && (
                                    <TableCell
                                      component="td"
                                      scope="row"
                                      align="center"
                                    ></TableCell>
                                  )}
                                <TableCell
                                  component="td"
                                  scope="row"
                                  align="center"
                                >
                                  <Button
                                    onClick={() => showChart(session)}
                                    size="small"
                                  >
                                    Показать
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      labelDisplayedRows={({ from, to, count }) =>
                        `Сессии с ${from} по ${to} из ${count}`
                      }
                      component="div"
                      count={sessions?.length}
                      labelRowsPerPage={"Сессий на странице"}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                  <div className={cx("buttons")}>
                    <Button
                      sx={{
                        background: "#038F54",
                        color: "#fff;",
                        fontSize: "12px",
                        mt: "12px",
                        mr: "16px",
                      }}
                      onClick={handleExportExel}
                    >
                      Документ в формате XLSX
                      <FileDownloadOutlinedIcon
                        fontSize="small"
                        sx={{
                          color: "#fff",
                          background: "#3FAE7F",
                          borderRadius: "4px",
                          ml: "4px",
                        }}
                      />
                    </Button>

                    <Button
                      sx={{
                        background: "#E1BE08",
                        color: "#fff;",
                        fontSize: "12px",
                        mt: "12px",
                      }}
                      onClick={handleExoprtCsv}
                    >
                      Документ в формате CSV{" "}
                      <FileDownloadOutlinedIcon
                        fontSize="small"
                        sx={{
                          color: "#fff",
                          background: "#EAD460",
                          borderRadius: "4px",
                          ml: "4px",
                        }}
                      />
                    </Button>
                  </div>
                  <ExportExelTableSessions
                    sessions={sessions}
                    selectedDev={selectedDev}
                  />
                </>
              ) : (
                <p className="notfound">Ничего не найдено</p>
              )}
            </>
          )}
          {isErrorGetSession && (
            <Alert severity="error">
              Произошла ошибка. Попробуйте еще раз.
            </Alert>
          )}
        </>
      )}
    </div>
  );
};
