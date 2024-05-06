import { User } from "../config/xcore/dbase/User"
import { Org } from "../config/xcore/dbase/Org"


export async function Router(body: any) {

    console.log(body);

    // JSON-объект данных ответа от сервера 
    var res: any = {
        cmd: '',
        error: '',
        data: [],
        user_sess_code: ''
    };

    var data: any;

    //Поиск команды запроса
    switch (body.cmd) {
        //-----------------------------------------АВТОРИЗАЦИЯ ПОЛЬЗВОАТЕЛЯ ПО ЛОГИНУ И ПАРОЛЮ
        // Авторизация по логину и паролю
        case 'get_UserByAuth': {
            var u = new User(body.args, body.sess_code);
            // Создание записи сессии пользователя и 
            // проверка на наличие пользователя и введенных данных 
            var user_sess_code = await u.insertSessionCode();
            console.log(user_sess_code);
            // Проверка на наличие данных от сервера 
            // Если данные отсутствуют отправка ошибки 
            if (user_sess_code === undefined) {
                res.cmd = body.cmd;
                res.error = 'Данного пользователя не сушествует или введены неверные данные';
                res.data = null;
                res.user_sess_code = '';
            }
            // Иначе получение информации о пользователе
            else {
                data = await u.selectUser();
                res.cmd = body.cmd;
                res.error = null;
                res.data = data;
                res.user_sess_code = user_sess_code;
            }
        } break;

        //Авторизация по коду сессии
        case 'get_UserBySessionCode': {
            var u = new User(body.args, body.sess_code);
            data = await u.selectUser();
            if (data.length === 0 || data[0] === undefined) {
                res.cmd = body.cmd;
                res.error = 'Данного кода сессии не существует или закончилось время использования кода';
                res.data = null;
                res.user_sess_code = '';

                // Удаление кода сессии из базы данных
                await u.deleteSessionCode();
            }
            else {
                res.cmd = body.cmd;
                res.error = null;
                res.data = data;
                res.user_sess_code = body.sess_code;
            }
        } break;

        //-----------------------------------------ОРГАНИЗАЦИИ
        // Получение организации авторизованного пользователя
        case 'get_Org': {
            var o = new Org(body.args, body.sess_code);
            data = await o.selectOrg();
            if (data.length === 0 || data[0] === undefined) {
                res.cmd = body.cmd;
                res.error = 'Ошибка в получении данных организации';
                res.data = null;
                res.user_sess_code = body.sess_code;
            }
            else {
                res.cmd = body.cmd;
                res.error = null;
                res.data = data;
                res.user_sess_code = body.sess_code;
            }
        } break;

        //-----------------------------------------ДОБАВЛЕНИЕ/ИЗМЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЕМ
        //Добавление пользователя
        case 'set_NewUser': {
            var u = new User(body.args, body.sess_code);
            data = await u.insertUser();

            // Проверка на правильность данных и отстутствие пользователя в системе
            // Если такое происходит то вывод ошибки
            if (data === null || data === undefined) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Ошибка добавления пользователя, проверте данные и убедитесь что пользователя с данным логином не существет";
            }
            //Иначе нет ошибки и данные успешно сохранены
            else {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = null;
            }
        }

        case 'set_UpdateUserData': {

        } break;




        //-----------------------------------------ДРУГИЕ КОДЫ, КОТОРЫЕ НЕ ПРОПИСАНЫ
        default: {
            res.cmd = body.cmd;
            res.error = `Команда "${body.cmd}" не распознана`
            res.data = [],
                res.user_sess_code = body.sess_code

        }


    }

    return JSON.stringify(res);

}