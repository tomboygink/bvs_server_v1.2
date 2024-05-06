/**
 * Преобразование объекта типов WSQuery или WSResult в строку перед отправкой посредствам сокетов
 * @param obj
 * @returns
 */
export declare function WSStr(obj: IWSQuery | IWSResult): string;
/**
 * Описание типа запроса на сервер (WebSocket)
 */
export interface IWSQuery {
    cmd: string;
    args: any;
    sess_code: string;
}
/**
 * Класс запроса на сервер (WebSocket)
 */
export declare class WSQuery implements IWSQuery {
    cmd: string;
    args: any;
    sess_code: string;
    constructor(_cmd?: string, _args?: any, _sess_code?: string);
}
/**
 * Описание типа ответа с сервера (WebSocket)
 */
export interface IWSResult {
    cmd: string;
    error: string;
    data: any[];
    code: string;
}
/**
 * Класс ответа с сервера (WebSocket)
 */
export declare class WSResult implements IWSResult {
    cmd: string;
    error: string;
    data: any[];
    code: string;
    constructor(_cmd?: string);
}
