import { DBase, getDB } from "./DBase";
import { dateTimeToSQL } from "./DateStr";

export class JobsEntity {
    id: number = 0;
    org_id: number = 0;
    name: string = '';
    info: string = '';

    constructor() { }
}


export class Jobs {
    db: DBase;
    args: any;
    sess_code: string;

    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;
    }

    // Получение должности
    async selectJob(): Promise<JobsEntity[]> {
        var db_response: any = {};

        // Если нет аргумента 
        // получение всех должностей
        if (this.args.id_jobs === undefined) {
            db_response = await this.db.query("SELECT * FROM jobs_titles");
        }
        // Иначе если есть аргумент jobs_id, 
        // то получение должности авторизованного пользователя
        else {
            db_response = await this.db.query("SELECT * FROM jobs_titles WHERE id = " + this.args.id_jobs)
        }
        var result: JobsEntity[] = new Array();
        for (var j in db_response.rows) {
            result.push(db_response.rows[j]);
        }
        return result;
    }

    // Добавление должности
    async insertJob() {
        var db_response = await (this.db.query("INSERT INTO jobs_titles(org_id, name, created_at, info)" +
            "VALUES(" + this.args.id_org + ", \'" + this.args.name + "\', \'" + dateTimeToSQL(new Date(Date.now())) + "\', \'" + this.args.info + "\') RETURNING id"));
        return db_response.rows;
    }

    //Обновление должности
    async updateJob() {
        var db_response = await (this.db.query("UPDATE jobs_titles SET org_id = " + this.args.id_org + ", name = \'" + this.args.name +
            "\', info = \'" + this.args.info + "\' WHERE id = " + this.args.id + " RETURNING id"));
        return db_response.rows;
    }
}