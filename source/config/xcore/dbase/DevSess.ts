import { DBase, getDB } from "./DBase";
import { dateTimeToSQL, dateTimeToStr } from "./DateStr";

export class DevSessEntity {
  id: number = 0;
  time_dev: "";
  time_srv: "";
  dev_number: "";
  dev_id: 0;
  level_akb: 0.0;
  sess_data: "";
  constructor() {}
}

export class DevSess {
  db: DBase;
  args: any;
  sess_code: string;

  constructor(_args: any, _sess_code: string) {
    this.db = getDB();
    this.args = _args;
    this.sess_code = _sess_code;
  }

  //Получение последней переданной сессии
  async selectLastDevSess(): Promise<DevSessEntity[]> {
    var db_response = await this.db.query(
      "SELECT * FROM dev_sess WHERE dev_number = '" +
        this.args.dev_number +
        "' order by id desc limit 1;"
    );

    var result: DevSessEntity[] = new Array();

    for (var lds in db_response.rows) {
      result.push(db_response.rows[lds]);
    }
    return result;
  }

  //Получение последних сессий всех устройство
  async selectAllLastDevSess(): Promise<DevSessEntity[]> {
    var db_response = await this.db.query(
      //"SELECT * FROM dev_sess order by id desc;"
      "WITH test AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY dev_number ORDER BY time_dev desc) as rn FROM dev_sess) SELECT * FROM test WHERE rn = 1"
    );

    var result: DevSessEntity[] = new Array();

    for (var lds in db_response.rows) {
      result.push(db_response.rows[lds]);
    }
    return result;
  }

  //Добавление контрольной сессии
  async insertControlDevSess() {
    var db_response = await this.db.query(
      "INSERT INTO control_dev_sess (dev_sess_id, dev_id, dev_number) " +
        "VALUES (" +
        this.args.dev_sess_id +
        ", " +
        this.args.dev_id +
        ", " +
        this.args.dev_number +
        ") RETURNING id"
    );
    return db_response.rows;
  }

  //Получение контрольной сессии
  async selectControlDevSess(): Promise<DevSessEntity[]> {
    var db_response = await this.db.query(
      "SELECT dev_sess.* from dev_sess INNER JOIN control_dev_sess " +
        "ON dev_sess.id = control_dev_sess.dev_sess_id WHERE control_dev_sess.dev_number = '" +
        this.args.dev_number +
        "'"
    );
    var result: DevSessEntity[] = new Array();
    for (var cds in db_response.rows) {
      result.push(db_response.rows[cds]);
    }
    return result;
  }

  async selectDevSess(): Promise<DevSessEntity[]> {
    var start_date = dateTimeToSQL(new Date(this.args.sess_period_start));
    var end_date = dateTimeToSQL(new Date(this.args.sess_period_end));

    var db_response = await this.db.query(
      "SELECT * FROM dev_sess WHERE dev_number = '" +
        this.args.dev_number +
        "' AND time_dev >= '" +
        start_date +
        "' AND " +
        "time_dev<= '" +
        end_date +
        "' order by time_dev asc"
    );

    var result: DevSessEntity[] = new Array();
    for (var ds in db_response.rows) {
      result.push(db_response.rows[ds]);
    }
    return result;
  }

  // Удаление контрольной сессии
  async deleteControlDevSess() {
    try {
      await this.db.query(
        "DELETE FROM control_dev_sess WHERE dev_sess_id = ('" +
          this.args.id +
          "')"
      );
      return true;
    } catch {
      return false;
    }
  }
}
