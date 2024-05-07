import { DBase, getDB } from "./DBase";

export class DevSessEntity {
    id: number = 0;
    time_dev: '';
    time_srv: '';
    dev_number:'';
    dev_id: 0;
    level_akb: 0.0;
    sess_data: '';
    constructor() { }
}

export class DevSess{
    db: DBase;
    args: any;
    sess_code: string;

    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;
    }

    async selectLastDevSess():Promise<DevSessEntity[]>{
        var db_response = await this.db.query("SELECT * FROM dev_sess where dev_number = '" + this.args.dev_number + "' order by id desc limit 1;");

        var result: DevSessEntity[] = new Array();

        for (var lds in db_response.rows) {
            result.push(db_response.rows[lds]);
        }
        return result;
    }
}