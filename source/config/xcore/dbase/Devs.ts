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
  constructor() { }
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

  // Получения устройства по id

  async selectDevById(): Promise<DevsEntity[]> {
    const db_response = await this.db.query(
      "SELECT * FROM devs WHERE id = " + this.args.id
    );
    return db_response.rows;
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
    var db_response = await this.db.query("SELECT * FROM devs");
    var result: DevsEntity[] = new Array();
    result = [...db_response.rows];
    return result;
  }
  // async selectAllDevs(): Promise<DevsEntity[]> {
  //   var db_response = await this.db.query("SELECT * FROM devs");
  //   var result: DevsEntity[] = new Array();
  //   await Promise.all(
  //     db_response.rows.map(async (dev) => {
  //       let time;
  //       const res = await this.db.query(
  //         ` SELECT time_srv as time from dev_sess WHERE dev_number = '${dev.number}'
  //           order by id desc limit 1`
  //       );

  //       const tzoffset = new Date().getTimezoneOffset() * 60000;
  //       const timeServer = res.rows[0]?.time;
  //       if (!timeServer) {
  //         time = null;
  //       } else {
  //         time = new Date(timeServer - tzoffset).toISOString().slice(0, -8);
  //       }

  //       result.push({ ...dev, time });
  //     })
  //   );

  //   return result;
  // }

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

  //Добавление нескольких устройств в группу
  async insertManyDevs() {
    const db_response = await this.db.query(
      `INSERT INTO devs(group_dev_id, number, name, latitude, longitude, sensors, deleted, info, period_sess) VALUES 
      ${this.args.map(
        (item: DevsEntity) =>
          ` ('${item.group_dev_id}', '${item.number}','${item.name}', '${item.latitude}', '${item.longitude}', '${item.sensors}', ${item.deleted}, '${item.info}', '${item.period_sess}')`
      )}
       RETURNING id`
    );

    return db_response.rows;
  }

  //Обновление данных устройсва
  async updateDevs() {
    //Запрос на получение данных
    var data = await this.db.query(
      "select * from devs where number = '" + this.args.number + "' "
    );

    if (data.rows[0] === undefined || data.rows[0].id === this.args.id) {
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
        " WHERE id = " +
        this.args.id +
        " RETURNING id"
      );

      await this.db.query(
        "UPDATE control_dev_sess SET dev_number = '" +
        this.args.number +
        "' WHERE dev_id = " +
        this.args.id +
        ""
      );
      //обновление устройства в принятых сессиях
      await this.db.query(
        "UPDATE dev_sess SET dev_number = '" +
        this.args.number +
        "' WHERE dev_id=" +
        this.args.id +
        ""
      );
    }
    else {db_response.rows = [];}

    return db_response.rows;
  }
}
