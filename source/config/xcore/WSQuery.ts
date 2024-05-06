/**
 * Преобразование объекта в строку
 * @param obj преобразуемый объект
 * @returns
 */
function objToString(obj: any) {
  var sstr = "{";

  var first = true;
  for (var k in obj) {
    if (first) {
      first = false;
    } else {
      sstr += ",";
    }

    if (obj[k] === null) {
      sstr += '"' + k + '":null';
    } else if ("object" == typeof obj[k]) {
      sstr += '"' + k + '":' + objToString(obj[k]);
    } else if ("undefined" == typeof obj[k]) {
      //
    } else if ("string" == typeof obj[k]) {
      sstr += '"' + k + '":"' + obj[k].replaceAll('"', '\\"') + '"';
    } else {
      sstr += '"' + k + '":' + obj[k];
    }
  }
  sstr += "}";
  return sstr;
}

/**
 * Преобразование объекта типов WSQuery или WSResult в строку перед отправкой посредствам сокетов
 * @param obj
 * @returns
 */
export function WSStr(obj: IWSQuery | IWSResult): string {
  return objToString(obj);
}

/**
 * Описание типа запроса на сервер (WebSocket)
 */
export interface IWSQuery {
  cmd: string /* команда запроса */;
  args: any /* аргументы запроса { "arg1":"agr1_value", .... } */;
  sess_code: string /* код сессии чтобы проверять пользователя */;
}

/**
 * Класс запроса на сервер (WebSocket)
 */
export class WSQuery implements IWSQuery {
  cmd = "";
  args: any = {};
  sess_code: string = "";
  constructor(_cmd?: string, _args?: any, _sess_code?: string) {
    this.cmd = _cmd || "";
    this.args = _args || {};
    this.sess_code = _sess_code || "";
  }
}

/**
 * Описание типа ответа с сервера (WebSocket)
 */
export interface IWSResult {
  cmd: string /* команда запроса */;
  error: string /* ошибка */;
  data: any /* строки из запроса */;
  code: string /* дополнительный код ответа */;
}

interface DevResult {
  dev_id: string;
  dev_number: string;
  id: string;
  level_akb: string;
  sess_data: string;
  time_dev: string;
  time_srv: string;
}

//Тип ответа с сервера get_DevFirstLastSessions
export interface IWSResultSessionss {
  cmd: string /* команда запроса */;
  error: string /* ошибка */;
  data: {
    dev_result: DevResult[];
    svg: {
      svg: string;
    };
  } /* объект с данными из запроса */;
  code: string /* дополнительный код ответа */;
}

/**
 * Класс ответа с сервера (WebSocket)
 */
export class WSResult implements IWSResult {
  cmd: string = ""; /* команда запроса */
  error: string = ""; /* ошибка */
  data: any[] = []; /* строки из запроса */
  code: string = ""; /* дополнительный код ответа */
  constructor(_cmd?: string) {
    this.cmd = _cmd || "";
    this.data = new Array();
    this.code = "";
  }
}
