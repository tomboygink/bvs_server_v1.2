import { DBase, getDB } from "./DBase";

export class DevsGroupsEntity {
    id: number = 0;
    parent_id: number = 0;
    g_name: string = '';
    latitude: string = "";
    longitude: string = "";
    org_id: number = 0;
    ord_num: number = 0;
    deleted: boolean = false;
    g_info: string = "";
    constructor() { }
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
        var db_response = await this.db.query("SELECT * FROM devs_groups WHERE parent_id = " + this.args.parent_id);
        var result: DevsGroupsEntity[] = new Array();
        for (var dg in db_response.rows) {
            result.push(db_response.rows[dg]);
        }
        return result;
    }
}