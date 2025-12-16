import { FC, useEffect } from "react";
import {
  TableCell,
  Table,
  TableRow,
  TableBody,
  TableHead,
} from "@mui/material";
import { ISession } from "@src/types/ISession";
import { IDev } from "@src/types/IDev";
import moment from "moment";

interface Props {
  sessions: ISession[];
  selectedDev: IDev | null;
}
export const ExportExelTableSessions: FC<Props> = ({
  sessions,
  selectedDev,
}) => {

  return (
    <>
      {sessions?.length > 0 && (
        <Table id="sessions-exel" sx={{ display: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell >Устройство</TableCell>
              <TableCell>Время устройства</TableCell>
              <TableCell>Время сервера</TableCell>
              <TableCell>АКБ</TableCell>
              {selectedDev?.sensors?.s.map((sensor, i) => {
                return <TableCell key={i}>{sensor.depth}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => {
              return (
                <TableRow key={session.id}>
                  <TableCell >{session.dev_number}</TableCell>
                  <TableCell data-type='s' sx={{ "@media all": { msoNumberFormat: 'dd\\.mm\\.yyyy hh:mm:ss' } }}>
                    {moment(session.time_dev).format("YYYY-MM-DD HH:mm:ss")}
                    {/* {String(session.time_dev)} */}
                  </TableCell>
                  <TableCell data-type='s' sx={{ "@media all": { msoNumberFormat: 'dd\\.mm\\.yyyy hh:mm:ss' } }}>
                    {moment(session.time_srv).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell>{session.level_akb}</TableCell>

                  {JSON.parse(session.sess_data).s.map(
                    (value: { depth: string; data: string }, idx: number) => (
                      <TableCell key={idx}>{value.data}</TableCell>
                    )
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};
