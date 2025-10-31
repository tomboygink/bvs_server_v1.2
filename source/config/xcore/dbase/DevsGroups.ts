import { DBase, getDB } from "./DBase";

export class DevsGroupsEntity {
  id: number = 0;
  parent_id: number = 0;
  g_name: string = "";
  latitude: string = "";
  longitude: string = "";
  org_id: number = 0;
  ord_num: number = 0;
  deleted: boolean = false;
  g_info: string = "";
  constructor() {}
}

export class DevsGroups {
  db: DBase;
  args: any;
  sess_code: string;

  constructor(_args: any, _sess_code: string) {
    this.db = getDB();
    this.args = _args;
    this.sess_code = _sess_code;
  }

  // Получение групп
  async selectDevsGroups(): Promise<DevsGroupsEntity[]> {
    if (this.args.id !== undefined ) {
      var db_response = await this.db.query(
        "SELECT * FROM devs_groups WHERE id = " + this.args.id
      );
    }
    else{
      var db_response = await this.db.query(
        "SELECT * FROM devs_groups WHERE parent_id = " + this.args.parent_id
      );
    }

    var result: DevsGroupsEntity[] = new Array();
    for (var dg in db_response.rows) {
      result.push(db_response.rows[dg]);
    }
    return result;
  }

  // Получение всех групп
  async selectAllDevsGroups(): Promise<DevsGroupsEntity[]> {
    var db_response = await this.db.query("SELECT * FROM devs_groups ORDER BY g_name ASC");
    var result: DevsGroupsEntity[] = new Array();
    for (var dg in db_response.rows) {
      result.push(db_response.rows[dg]);
    }
    return result;
  }
  // Добавление новой группы
  async insertDevsGroup() {
    //добавление группы
    var db_response = await this.db.query(
      "INSERT INTO devs_groups(parent_id, g_name, latitude, longitude, org_id, ord_num, deleted, g_info)" +
        "VALUES(" +
        this.args.parent_id +
        ", '" +
        this.args.g_name +
        "', '" +
        this.args.latitude +
        "', '" +
        this.args.longitude +
        "', " +
        this.args.id_org +
        ", 0, " +
        this.args.deleted +
        ", '" +
        this.args.g_info +
        "') RETURNING id"
    );

    //Добавление пустого SVG
    await this.db.query(
      "INSERT INTO scheme_svg (id_devs_groups, svg) VALUES (" +
        db_response.rows[0].id +
        ", '')"
    );

    return db_response.rows;
  }

  // Обновление группы
  async updateDevsGroup() {
    try {
      // Обновление основной группы пользователем
      await this.db.query(
        "UPDATE devs_groups SET parent_id =" +
          this.args.parent_id +
          ", g_name = '" +
          this.args.g_name +
          "', latitude = '" +
          this.args.latitude +
          "', longitude = '" +
          this.args.longitude +
          "', org_id = " +
          this.args.org_id +
          ", deleted = " +
          this.args.deleted +
          ", g_info = '" +
          this.args.g_info +
          "' WHERE id = " +
          this.args.id
      );

      // Рекурсивный запрос на получение данных о подгруппах
      var data = await this.db.query(
        "with recursive temp1 (id, parent_id, g_name, latitude, longitude, org_id, ord_num, deleted, g_info, path) " +
          "as (select t1.id, t1.parent_id, t1.g_name, t1.latitude, t1.longitude, t1.org_id, t1.ord_num, t1.deleted, t1.g_info, cast (t1.g_name as varchar (50)) as path " +
          "from devs_groups t1 where id = " +
          this.args.id +
          " union " +
          "select t2.id, t2.parent_id, t2.g_name, t2.latitude, t2.longitude, t2.org_id, t2.ord_num, t2.deleted, t2.g_info, cast (temp1.path || '->'|| t2.g_name as varchar(50)) " +
          "from devs_groups t2 inner join temp1 on (temp1.id = t2.parent_id)) " +
          "select * from temp1"
      );

      // Обновление данных подгрупп/устройств/скважин
      for (var i = 0; i < data.rows.length; i++) {
        // Обновление подгрупп
        await this.db.query(
          "UPDATE devs_groups SET org_id = " +
            this.args.org_id +
            ", deleted = " +
            this.args.deleted +
            " WHERE id = " +
            data.rows[i].id
        );

        //Получение устройств
        var data_dev = await this.db.query(
          "SELECT * FROM Devs WHERE group_dev_id=" +
            data.rows[i].id +
            " order by number asc"
        );

        //редактирование устройств
        for (var j = 0; j < data_dev.rows.length; j++) {
          await this.db.query(
            "UPDATE Devs SET " +
              "deleted = " +
              this.args.deleted +
              " WHERE id=" +
              data_dev.rows[j].id
          );
        }
        //Получение скважин
        var data_well = await this.db.query(
          "SELECT * FROM skvazhiny WHERE group_id = " + data.rows[i].id
        );

        //Редактирование скважин при изменении организации
        for (var j = 0; j < data_well.rows.length; j++) {
          await this.db.query(
            "UPDATE skvazhiny SET org_id =" +
              this.args.org_id +
              " WHERE id = " +
              data_well.rows[j].id
          );
        }
      }
      return true;
    } catch {
      return false;
    }
  }
}
