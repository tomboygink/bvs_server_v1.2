import { DBase, getDB } from "./DBase";

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
    async selectJobs(): Promise<JobsEntity[]> {
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
}