import { User } from "../config/xcore/dbase/User";
import { Org } from "../config/xcore/dbase/Org";
import { Jobs } from "../config/xcore/dbase/Jobs";
import { DevsGroups } from "../config/xcore/dbase/DevsGroups";
import { Devs } from "../config/xcore/dbase/Devs";
import { SchemeSvg } from "../config/xcore/dbase/SchemeSvg";
import { DevSess } from "../config/xcore/dbase/DevSess";
import { DevVerif } from "../config/xcore/dbase/DevVerif";
import { ThermalWell } from "../config/xcore/dbase/ThermalWell";

export async function Router(body: any) {
  console.log(body);

  // JSON-объект данных ответа от сервера
  var res: any = {
    cmd: "",
    error: "",
    data: [],
    user_sess_code: "",
  };

  var data: any;

  //Поиск команды запроса
  switch (body.cmd) {
    //------------------------------------------------------------------------ПРОВЕРКА СОЕДИНЕНИЯ АНДРОИД
    case "check":
      {
        res.cmd = body.cmd;
        res.code = null;
        res.data = "ok";
        res.error = null;
      }
      break;

    //-----------------------------------------АВТОРИЗАЦИЯ
    // Авторизация по логину и паролю
    case "get_UserByAuth":
      {
        var u = new User(body.args, body.sess_code);
        // Создание записи сессии пользователя и
        // проверка на наличие пользователя и введенных данных
        var user_sess_code = await u.insertSessionCode();
        console.log(user_sess_code);
        // Проверка на наличие данных от сервера
        // Если данные отсутствуют отправка ошибки
        if (user_sess_code === undefined) {
          res.cmd = body.cmd;
          res.error =
            "Данного пользователя не сушествует или введены неверные данные";
          res.data = null;
          res.user_sess_code = "";
        }
        // Иначе получение информации о пользователе
        else {
          data = await u.selectUser();
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = user_sess_code;
        }
      }
      break;

    //Авторизация по коду сессии
    case "get_UserBySessionCode":
      {
        var u = new User(body.args, body.sess_code);
        data = await u.selectUser();
        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error =
            "Данного кода сессии не существует или закончилось время использования кода";
          res.data = null;
          res.user_sess_code = "";

          // Удаление кода сессии из базы данных
          await u.deleteSessionCode();
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //-----------------------------------------ОРГАНИЗАЦИИ
    // Получение организации авторизованного пользователя
    case "get_Org":
      {
        var o = new Org(body.args, body.sess_code);
        data = await o.selectOrg();
        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в получении данных организации";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Добавление огранизации
    case "set_Org":
      {
        var o = new Org(body.args, body.sess_code);
        data = await o.insertOrg();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в добавлении новой организации";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Обновление организации
    case "set_ChangeOrg":
      {
        var o = new Org(body.args, body.sess_code);
        data = await o.updateOrg();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка при изменении данных организации";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //-----------------------------------------ДОЛЖНОСТИ
    // Получение должности авторизованного пользователя
    case "get_Job":
      {
        var j = new Jobs(body.args, body.sess_code);
        data = await j.selectJob();
        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в получении данных должности";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    // Добавление должности
    case "set_Job":
      {
        var j = new Jobs(body.args, body.sess_code);
        data = await j.insertJob();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в добавлении новой должности";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    // Обновление должности
    case "set_ChangeJob":
      {
        var j = new Jobs(body.args, body.sess_code);
        data = await j.updateJob();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка при изменении данных должности";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //-----------------------------------------ПОЛЬЗОВАТЕЛИ
    //Добавление пользователя
    case "set_User":
      {
        var u = new User(body.args, body.sess_code);
        data = await u.insertUser();

        // Проверка на правильность данных и отстутствие пользователя в системе
        // Если такое происходит то вывод ошибки
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.code = body.sess_code;
          res.data = null;
          res.error =
            "Ошибка добавления пользователя, проверте данные и убедитесь что пользователя с данным логином не существет";
        }
        //Иначе нет ошибки и данные успешно сохранены
        else {
          res.cmd = body.cmd;
          res.code = body.sess_code;
          res.data = null;
          res.error = null;
        }
      }
      break;

    // Получение всех пользователей
    case "get_AllUsers":
      {
        var u = new User(body.args, body.sess_code);
        data = await u.selectAllUser();
        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в получении всех пользователей";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    // Изменение данных пользователя
    // Для изменения данных авторизованного пользователя аргументы isAdmin = true
    // Для изменения данных другому пользователю isAdmin = false, плюс аргумент пароль
    case "set_UpdateUserData":
      {
        var u = new User(body.args, body.sess_code);
        data = await u.updateUser();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка при изменении данных пользователя";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //-----------------------------------------ГРУППЫ УСТРОЙСТВ
    // Получение групп
    case "get_DevsGroups":
      {
        var dg = new DevsGroups(body.args, body.sess_code);
        data = await dg.selectDevsGroups();
        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в получении данных о группе";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    // Получение всех групп
    case "get_AllDevsGroups":
      {
        var dg = new DevsGroups(body.args, body.sess_code);
        data = await dg.selectAllDevsGroups();
        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в получении данных о группе";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    // Добавление группы
    case "set_DevsGroups":
      {
        var dg = new DevsGroups(body.args, body.sess_code);
        data = await dg.insertDevsGroup();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в добавлении новой группы";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Редактирование группы
    case "set_UpdateDevsGroups":
      {
        var dg = new DevsGroups(body.args, body.sess_code);
        data = await dg.updateDevsGroup();
        if (data === false) {
          res.cmd = body.cmd;
          res.error =
            "Ошибка в обновлении данных группы/подгруппы или включенных в группы устройствах";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //-----------------------------------------SVG-СХЕМА ГРУППЫ
    //Получение схемы, если она имеется
    case "get_SchemeSvg":
      {
        var svg = new SchemeSvg(body.args, body.sess_code);
        data = await svg.selectSchemeSVG();
        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в получении SVG-схемы возможно она отсутствует";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;
    //Добавление/обновление схемы SVG группы
    case "set_SchemeSvg":
      {
        var svg = new SchemeSvg(body.args, body.sess_code);
        data = await svg.newUpdateSchemeSVG();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка при добавлении/обновлении схемы группы";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //-----------------------------------------УСТРОЙСТВА
    //Получение устройств
    case "get_Devs":
      {
        var d = new Devs(body.args, body.sess_code);
        data = await d.selectDevs();

        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в получении данных устройства";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;
    //Получение устройств
    case "get_AllDevs":
      {
        var d = new Devs(body.args, body.sess_code);
        data = await d.selectAllDevs();

        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в получении данных устройства";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Добавление устройств
    case "set_Devs":
      {
        var d = new Devs(body.args, body.sess_code);
        data = await d.insertDevs();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в добавлении нового устройства";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Добавление нескольких устройств
    case "set_manyDevs":
      {
        var d = new Devs(body.args, body.sess_code);
        data = await d.insertManyDevs();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в добавлении нового устройства";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Редактирование устройств
    case "set_ChangeDevs":
      {
        var d = new Devs(body.args, body.sess_code);
        data = await d.updateDevs();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в обновлении данных устройства";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //-----------------------------------------СЕССИИ УСТРОЙСТВ
    //Получение последней переданной сессии для отображение цвета маркера
    case "get_LastDevSess":
      {
        var ds = new DevSess(body.args, body.sess_code);
        data = await ds.selectLastDevSess();

        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error =
            "Ошибка в получении последней переданной сессии или данные отсутствуют";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Получение последних сессий всех устройств
    case "get_AllLastDevSess":
      {
        var ds = new DevSess(body.args, body.sess_code);
        data = await ds.selectAllLastDevSess();

        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error =
            "Ошибка в получении последней переданной сессии или данные отсутствуют";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    // Установка контрольной сессии
    case "set_ControlDevSess":
      {
        var ds = new DevSess(body.args, body.sess_code);
        data = await ds.insertControlDevSess();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в добавлении нового устройства";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Удаление контрольной сессии
    case "set_deleteControlDevSess":
      {
        var ds = new DevSess(body.args, body.sess_code);
        data = await ds.deleteControlDevSess();
        if (data === false) {
          res.cmd = body.cmd;
          res.error = "Ошибка при удалении контрольной сессии ";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Получение контрольной сессии установленной ранее администратором
    case "get_ControlDevSess":
      {
        var ds = new DevSess(body.args, body.sess_code);
        data = await ds.selectControlDevSess();
        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error =
            "Ошибка в получении контрольной сессии или она отсутствует";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    // Получение сессий за определённый период
    case "get_DevSess":
      {
        var ds = new DevSess(body.args, body.sess_code);
        data = await ds.selectDevSess();
        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в получении сессий за установленный период";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //-----------------------------------------ПОВЕРОЧНЫЙ ИНТЕРВАЛ УСТРОЙСТВ
    //Установка поверочного интервала
    case "set_DevVerif":
      {
        var dv = new DevVerif(body.args, body.sess_code);
        data = await dv.insertDevVerif();
        if (data.length === 0 || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка при установки поверочного интервала устроства";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Получение поверочного интервала устройства
    case "get_DevVerif":
      {
        var dv = new DevVerif(body.args, body.sess_code);
        data = await dv.selectDevVerif();
        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error =
            "Ошибка при получении поверочного интервала устройства или оно отсутствует";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //-----------------------------------------СКВАЖИНЫ
    //Добавление скважины
    case "set_ThermalWell":
      {
        var tw = new ThermalWell(body.args, body.sess_code);
        data = await tw.insertThermalWell();
        if (data.length === 0 || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка при добавлении термоскважины";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Обноваление скважины
    case "set_ChangeThermalWell":
      {
        var tw = new ThermalWell(body.args, body.sess_code);
        data = await tw.updateThremalWell();
        if (data === null || data === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка в обновлении данных термоскважины";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //Получение скважин при нажатии на группу
    case "get_ThermalWell":
      {
        var tw = new ThermalWell(body.args, body.sess_code);
        data = await tw.selectThermalWell();
        if (data.length === 0 || data[0] === undefined) {
          res.cmd = body.cmd;
          res.error = "Ошибка при получении термометрических скважин группы";
          res.data = null;
          res.user_sess_code = body.sess_code;
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = data;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //----------------------------------------- ПОЧТА
    //Отправка сообщения на почту с кодом
    case "set_ActMail":
      {
        var u = new User(body.args, body.sess_code);
        await u.sencConfirmMail();
      }
      break;

    //Обновление email пользователя
    case "set_MailCode": {
      var u = new User(body.args, body.sess_code);
      data = await u.updateMail();
      if (data === null || data === undefined) {
        res.cmd = body.cmd;
        res.error = "Ошибка в обновлении данных email";
        res.data = null;
        res.user_sess_code = body.sess_code;
      } else {
        res.cmd = body.cmd;
        res.error = null;
        res.data = null;
        res.user_sess_code = body.sess_code;
      }
    }

    //-----------------------------------------ЗАБЫЛИ ПАРОЛЬ
    //Отправка сообщения на почту на смену пароля
    case "set_ForgPass":
      {
        var u = new User(body.args, body.sess_code);
        data = await u.sendForgPassMail();
        if (data === false) {
          res.cmd = body.cmd;
          res.code = body.sess_code;
          res.data = null;
          res.error =
            "Такого email не существует/email не активирован/проверте введенные данные или обратитесть к администратору системы";
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;
    //Обновление пароля
    case "set_Pass":
      {
        var u = new User(body.args, body.sess_code);
        data = await u.updatePassRePass();
        if (data === false) {
          res.cmd = body.cmd;
          res.code = body.sess_code;
          res.data = null;
          res.error = "Произошла ошибка при смене пароля";
        } else {
          res.cmd = body.cmd;
          res.error = null;
          res.data = null;
          res.user_sess_code = body.sess_code;
        }
      }
      break;

    //-----------------------------------------УДАЛЕНИЕ КУКОВ ПОСЛЕ ВЫХОДА
    case "deleteCookie":
      {
        var u = new User(body.args, body.sess_code);
        u.deleteSessionCode();
        res.cmd = body.cmd;
        res.code = null;
        res.data = null;
        res.error = null;
      }
      break;

    //-----------------------------------------ДРУГИЕ КОДЫ, КОТОРЫЕ НЕ ПРОПИСАНЫ
    default: {
      res.cmd = body.cmd;
      res.error = `Команда "${body.cmd}" не распознана`;
      (res.data = []), (res.user_sess_code = body.sess_code);
    }
  }

  return JSON.stringify(res);
}
