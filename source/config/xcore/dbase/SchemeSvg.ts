import { DBase, getDB } from "./DBase";

export class SchemeSvgEntity {
    id: number = 0;
    id_devs_groups: number = 0;
    svg: string = "";
    constructor() { }
}

export class SchemeSvg{
    db: DBase;
    args: any;
    sess_code: string;

    constructor(_args: any, _sess_code: string) {
        this.db = getDB();
        this.args = _args;
        this.sess_code = _sess_code;
    }

    async selectSchemeSVG():Promise<SchemeSvgEntity[]>{

        var db_response = await this.db.query("SELECT * FROM scheme_svg WHERE id_devs_groups = "+this.args.id_devs_groups);
        var result: SchemeSvgEntity[] = new Array();

        for (var svg in db_response.rows) {
            result.push(db_response.rows[svg]);
        }
        return result;
    } 
}


