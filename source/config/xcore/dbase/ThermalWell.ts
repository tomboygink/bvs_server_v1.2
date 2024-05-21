import { DBase, getDB } from "./DBase";
import crypto from "crypto";
import CONFIG from "../../config.json";
import { dateTimeToSQL, dateTimeToStr } from "./DateStr";

export class ThermalWellEntity {
    id: number = 0;
    number: string = "";
    org_id: number = 0;
    group_id: number = 0;
    dev_id: number = 0;
    create_at: Date = new Date(Date.now());

    constructor() { }
}

export class ThermalWell {
    db: DBase;
    args: any;
    sess_code: string;
    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;
    }

    // Добоваление термоскважины
    async insertThermalWell() {
        var db_response = await this.db.query("INSERT INTO skvazhiny(number, org_id, group_id, dev_id, create_at) " +
            "VALUES(\'" + this.args.number + "\'," + this.args.org_id + "," + this.args.group_id + "," + this.args.dev_id + ",\'" + dateTimeToSQL(new Date(Date.now())) + "\') RETURNING  id");
        return db_response.rows;
    }
    
    // Получение термоскважин при нажатии на группу
    async selectThermalWell(): Promise<ThermalWellEntity[]> {
        var db_response = await this.db.query("SELECT * FROM skvazhiny WHERE group_id = " + this.args.group_dev_id);
        var result: ThermalWellEntity[] = new Array();
        for (var tw in db_response.rows){
            result.push(db_response.rows[tw]);
        }
        return result;

    }
    // Обновление термоскважины
    async updateThremalWell() {
        var db_response = await this.db.query("UPDATE skvazhiny SET dev_id = "+this.args.dev_id+", number = \'"+this.args.number+"\', group_id = "+
        this.args.group_dev_id+", org_id = "+this.args.org_id+" WHERE id = "+this.args.id+" RETURNING id");
        return db_response.rows;
    }

}