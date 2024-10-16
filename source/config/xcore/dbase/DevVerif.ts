import { DBase, getDB } from "./DBase";
import crypto from "crypto";
import CONFIG from "../../config.json";
import { dateTimeToSQL, dateTimeToStr } from "./DateStr";

export class DevVerifEntity {
  id: number = 0;
  dev_id: number = 0;
  dev_number: string = "";
  start_povs: Date = new Date(Date.now());
  end_povs: Date = new Date(Date.now());
  old_dev_povs: number = 0;

  constructor() { }
}

export class DevVerif {
  db: DBase;
  args: any;
  sess_code: string;
  constructor(_args: any, _sess_code: string) {
    this.db = getDB();
    this.args = _args;
    this.sess_code = _sess_code;
  }

  //Добавление поверочного интервала
  async insertDevVerif() {
    var db_response = await this.db.query(
      "INSERT INTO dev_povs(dev_id, dev_number, start_povs, end_povs, old_dev_povs) " +
      "VALUES(" +
      this.args.dev_id +
      ", '" +
      this.args.dev_number +
      "', '" +
      dateTimeToSQL(new Date(this.args.start_povs)) +
      "', '" +
      dateTimeToSQL(new Date(this.args.end_povs)) +
      "', " +
      this.args.old_dev_povs +
      ") " +
      "RETURNING id"
    );

    return db_response.rows;
  }

  //Получение поверочного интервала
  async selectDevVerif(): Promise<DevVerifEntity[]> {
    try {
      var db_response = await this.db.query(
        "SELECT * FROM dev_povs WHERE dev_id = " +
        this.args.dev_id +
        " AND dev_number = '" +
        this.args.dev_number +
        "'"
      );
      var result: DevVerifEntity[] = new Array();
      for (var dv in db_response.rows) {
        result.push(db_response.rows[dv]);
      }
      return result;
    }
    catch {
      return [];
    }
  }

  //Получение поверочных интервалов, у которых истекает срок поверки
  async selectExpireDevVerif(): Promise<DevVerifEntity[]> {
    let d = new Date();
    d.setMonth(d.getMonth() + 1);
    const data = dateTimeToSQL(d);
    var db_response = await this.db.query(
      `SELECT * FROM dev_povs WHERE end_povs <= '${data}'`
    );
    var result: DevVerifEntity[] = new Array();
    for (var dv in db_response.rows) {
      result.push(db_response.rows[dv]);
    }
    return result;
  }
}
