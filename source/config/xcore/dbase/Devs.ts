import { DBase, getDB } from "./DBase";

export class DevsEntity {
    id: number = 0;
    group_dev_id: number = 0;
    number: string = '';
    name: string = '';
    latitude: string = "";
    longitude: string = "";
    sensors: string = "";
    deleted: boolean = false;
    info: string = "";
    period_sess:number = 0;
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

    async selectDevs():Promise<DevsEntity[]>{

        var db_response = await this.db.query("SELECT * FROM devs WHERE group_dev_id = " + this.args.group_dev_id);
        var result: DevsEntity[] = new Array();
        for (var d in db_response.rows) {
            result.push(db_response.rows[d]);
        }
        return result;
    }

}