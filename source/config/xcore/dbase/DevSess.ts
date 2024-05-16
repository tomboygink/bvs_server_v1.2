import { DBase, getDB } from "./DBase";

export class DevSessEntity {
    id: number = 0;
    time_dev: '';
    time_srv: '';
    dev_number: '';
    dev_id: 0;
    level_akb: 0.0;
    sess_data: '';
    constructor() { }
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
        var db_response = await this.db.query("SELECT * FROM dev_sess where dev_number = '" + this.args.dev_number + "' order by id desc limit 1;");

        var result: DevSessEntity[] = new Array();

        for (var lds in db_response.rows) { result.push(db_response.rows[lds]); }
        return result;
    }

    //Добавление контрольной сессии 
    async insertControlDevSess(){
        var db_response = await this.db.query("INSERT INTO control_dev_sess (dev_sess_id, dev_id, dev_number) "+
        "VALUES ("+this.args.dev_sess_id+", "+this.args.dev_id+", "+this.args.dev_number+") RETURNING id");
        return db_response.rows;
    }

    //Получение контрольной сессии 
    async selectControlDevSess(): Promise<DevSessEntity[]> {
        var db_response = await this.db.query("SELECT dev_sess.* from dev_sess INNER JOIN control_dev_sess " +
            "ON dev_sess.id = control_dev_sess.dev_sess_id WHERE control_dev_sess.dev_number = \'" + this.args.dev_number + "\'");
        var result: DevSessEntity[] = new Array();
        for (var cds in db_response.rows) { result.push(db_response.rows[cds]); }
        return result;
    }
    // Удаление контрольной сессии 
    async deleteControlDevSess(){
        try{ await this.db.query("DELETE FROM control_dev_sess WHERE dev_sess_id = ('" + this.args.id + "')"); return true;}
        catch {return false;}
    }
}