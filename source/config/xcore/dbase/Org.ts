import { DBase, getDB } from "./DBase";
import CONFIG from '../../config.json';
import { dateTimeToSQL, dateTimeToStr } from './DateStr'

export class OrgsEntity {
    id: number = 0;
    name: string = '';
    full_name: string = '';
    inn: string = "";
    address: string = "";
    latitude: string = "";
    longitude: string = "";
    info: string = "";
    constructor() { }
}

export class Org {
    db: DBase;
    args: any;
    sess_code: string;

    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;
    }

    // Получение организаций
    async selectOrg(): Promise<OrgsEntity[]> {
        var db_response: any = {};

        // Если нет аргумента 
        // получение всех организаций
        if (this.args.id_org === undefined) {
            db_response = await this.db.query("SELECT * FROM orgs");
        }
        // Иначе если есть аргумент id_org, 
        // то получение организации авторизованного пользователя
        else {
            db_response = await this.db.query("SELECT * FROM orgs WHERE id = " + this.args.id_org)
        }

        var result: OrgsEntity[] = new Array();
        for (var o in db_response.rows) {
            result.push(db_response.rows[o]);
        }
        return result;
    }

    // Добавление организации 
    async insertOrg() {
        var db_response = await (this.db.query("INSERT INTO orgs(name, full_name, inn, address, latitude, longitude, created_at, info)" +
            "VALUES (\'" + this.args.name + "\', \'" + this.args.full_name + "\', \'" + this.args.inn + "\', \'" + this.args.address +
            "\', \'0.0\', \'0.0\', \'" + dateTimeToSQL(new Date(Date.now())) + "\', \'" + this.args.info + "\') RETURNING id"));
        return db_response.rows[0];
    }

    // Обновление организации
    async updateOrg(){
        var db_response = await (this.db.query("UPDATE orgs SET name = \'"+this.args.name+"\', full_name =\'"+this.args.full_name+
        "\', inn=\'"+this.args.inn+"\', address = \'"+this.args.address+"\', info = \'"+this.args.info+"\' WHERE id ="+this.args.id+ "RETURNING id"));
        return db_response.rows;

    }
}