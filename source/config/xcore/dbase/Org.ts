import { DBase, getDB } from "./DBase";
import CONFIG from '../../config.json';
import { dateTimeToSQL, dateTimeToStr } from './DateStr'

export class OrgsEntity{
    id:number = 0;
    name: string ='';
    full_name: string ='';
    inn: string = "";
    address: string = "";
    latitude: string = "";
    longitude: string = "";
    info: string = "";
    constructor(){}
}

export class Org{
    db: DBase;
    args: any;
    sess_code: string;

    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;
    }

    // Получение организаций
    async selectOrg():Promise<OrgsEntity[]>
    {
        var db_response:any = {};

        // Если нет аргумента 
        // получение всех организаций
        if (this.args.id_org === undefined){
            db_response = await this.db.query("SELECT * FROM orgs");            
        }
        // Иначе если есть аргумент org_id, 
        // то получение организации авторизованного пользователя
        else{
            db_response = await this.db.query("SELECT * FROM orgs WHERE id = "+this.args.id_org)
        }

        var result: OrgsEntity[] = new Array();

        for (var o in db_response.rows){
            result.push(db_response.rows[o]);
        }

        return result;



    }

}