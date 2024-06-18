import { DBase, getDB } from "./DBase";

export class DevsEntity {
  id: number = 0;
  group_dev_id: number = 0;
  number: string = "";
  name: string = "";
  latitude: string = "";
  longitude: string = "";
  sensors: string = "";
  deleted: boolean = false;
  info: string = "";
  period_sess: number = 0;
  constructor() {}
}

export class Devs {
  db: DBase;
  args: any;
  sess_code: string;

  constructor(_args: any, _sess_code: string) {
    this.db = getDB();
    this.args = _args;
    this.sess_code = _sess_code;
  }

  //Получение устройств при нажатии на группу
  async selectDevs(): Promise<DevsEntity[]> {
    var db_response = await this.db.query(
      "SELECT * FROM devs WHERE group_dev_id = " + this.args.group_dev_id
    );
    var result: DevsEntity[] = new Array();
    for (var d in db_response.rows) {
      result.push(db_response.rows[d]);
    }
    return result;
  }

  //Получение всех устройств
  async selectAllDevs(): Promise<DevsEntity[]> {
    var db_response = await this.db.query("SELECT * FROM devs ");
    var result: DevsEntity[] = new Array();
    for (var d in db_response.rows) {
      result.push(db_response.rows[d]);
    }
    return result;
  }

  //Добавление устройств в группу
  async insertDevs() {
    var db_response = await this.db.query(
      "INSERT INTO devs(group_dev_id, number, name, latitude, longitude, sensors, deleted, info, period_sess) " +
        "VALUES (" +
        this.args.group_dev_id +
        ", '" +
        this.args.number +
        "', '" +
        this.args.name +
        "', '" +
        this.args.latitude +
        "', '" +
        this.args.longitude +
        "', '" +
        this.args.sensors +
        "', " +
        this.args.deleted +
        ", '" +
        this.args.info +
        "', " +
        this.args.period_sess +
        ") RETURNING id"
    );
    return db_response.rows;
  }

  //Обновление данных устройсва
  async updateDevs() {
    var db_response = await this.db.query(
      "UPDATE devs SET group_dev_id = " +
        this.args.group_dev_id +
        ", number = '" +
        this.args.number +
        "', name = '" +
        this.args.name +
        "', latitude = '" +
        this.args.latitude +
        "', " +
        "longitude = '" +
        this.args.longitude +
        "', sensors = '" +
        this.args.sensors +
        "', deleted = " +
        this.args.deleted +
        ", info = '" +
        this.args.info +
        "', period_sess = " +
        this.args.period_sess +
        " RETURNING id"
    );

    return db_response.rows;
  }
}
