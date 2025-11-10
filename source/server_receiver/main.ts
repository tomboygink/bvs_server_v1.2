import net from 'net';
import * as fs from 'fs';
import * as path from 'path';

import CONFIG from "../config/config.json"

import { ParcingData } from './parcing_data';
import { ParcingNewData } from './parcing_new_data';



export class ServerReceiver {
    debug: boolean;
    timeout: number;
    host: string;
    port: number;
    server: net.Server;
    scount: number;

//
    constructor() {
        this.debug = true;
        this.timeout = 10000;
        this.host = CONFIG.server_receiver_config.host;
        this.port = CONFIG.server_receiver_config.port;
        this.server = net.createServer();
        this.scount = 0;
    }


    async startServer() {

        //Создание логов файла 
        var dir = 'logs';
        var logsPath = path.join(__dirname, '..', '..', 'logs');
        if (!fs.existsSync(dir)) {
            console.log("Создаю папку логов");
            fs.mkdirSync(dir);
        }

        //Максимальное количество подключений
        this.server.maxConnections = 200;

        this.server.on('connection', async (socket: net.Socket) => {
            //Установка времени ожидания
            socket.setTimeout(this.timeout);
            //Если время ожидания вышло 
            socket.on('timeout', () => {
                if (this.debug) { console.log("Время ожидания вышло") }
                if (!socket.connecting) { return; }
                socket.end();
                // socket.destroy();
            });

            //создание счетчика подключений 
            var s_ind = this.scount;
            this.scount++;
            if (this.scount > 10000) this.scount = 0

            //Если произошла ошибка вывод ошибки и закрытие сокета 
            socket.on('error', (err) => {
                console.log("\x1b[31m Ошибка ", err)
                socket.end();
                // socket.destroy();
            });

            //При отключении сокета 
            socket.on('close', () => {
                if (this.debug) console.log(s_ind, ' - Клиент закрыл сокет');
                if (!socket.connecting) socket.end();
                // socket.destroy();
            });

            //При получении данных 
            socket.on('data', (data) => {
                //Создание файла логов 
                //месяц + 1  тк начало начинается с 0
                var month = new Date().getMonth() + 1;
                //Название файла лога 
                var fileName = 'log ' + new Date().getFullYear() + '.' + month + '.' + new Date().getDate() + '.txt';

                //Проверка на наличие файла лога с актуальной датой 
                if (!fs.existsSync(path.join(logsPath, fileName))) {
                    console.log('Создаю файл лога с сегодняшней датой');
                    fs.createWriteStream(path.join(logsPath, fileName), 'utf-8');
                }

                //Время записи лога 
                var time_log = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + '| ';
                //Запись принятых данных в буфер 
                var data_str = Buffer.from(data).toString().trim();

                if (data_str.length > 500) {
                    //отображение принятых данных в консоле 
                    console.log("\x1b[33m" + s_ind + " << \x1B[37m " + data_str);
                    data_str = data_str.substr(0, 500);
                    socket.write('505', () => { if (this.debug) console.log("\x1b[33m" + s_ind + " >> !505!"); });
                    socket.end();
                } else {

                    if (data_str[0] + data_str[1] + data_str[2] + data_str[3] + data_str[4] === ',Time' ||
                        data_str[0] + data_str[1] === '10' ||
                        data_str[1] + data_str[2] + data_str[3] + data_str[4] === 'TEST') {

                        //Запись логов в файл 
                        fs.appendFile(path.join(logsPath, fileName), time_log + data_str + '\n', 'utf-8', function (err) { });
                        fs.appendFile(path.join(logsPath, fileName), '________________________________________________________________________________\n', 'utf-8', function (err) { });

                        //отображение принятых данных в консоле 
                        console.log("\x1b[33m" + s_ind + " << \x1B[37m " + data_str);

                        if (data_str.length < 1) { socket.write('25', () => { if (this.debug) console.log("\x1b[33m" + s_ind + " >> \x1B[37m!25!"); }); return; }
                        if (data_str === "10") { socket.write('30', () => { if (this.debug) console.log("\x1b[33m" + s_ind + " >> \x1B[37m 10 -> !30!"); }); return; }
                        if (data_str.trim() === ',TEST') { socket.write('TEST - OK', () => { if (this.debug) console.log("\x1b[33m" + s_ind + " >>\x1B[37m TEST -> !TEST - OK!"); }); return; }
                        socket.write('20', () => { if (this.debug) console.log("\x1b[33m" + s_ind + " >> \x1B[37m !20!"); });

                        if (data_str.includes('Error')) {
                            var new_parcing: ParcingNewData = new ParcingNewData(data_str, s_ind);
                            new_parcing.Run();
                        }
                        else{
                            var parcing: ParcingData = new ParcingData(data_str, s_ind);
                            parcing.Run();
                        }

                        //Закрытие сокета
                        socket.end();


                    }
                    else {
                        console.log("\x1b[33m" + s_ind + " << \x1B[37m " + data_str);
                        console.log("\x1b[33m" + s_ind + " << \x1b[31mПопытка взлома");
                         //Запись логов в файл 
                        fs.appendFile(path.join(logsPath, fileName), time_log + data_str + '\n', 'utf-8', function (err) { });
                        fs.appendFile(path.join(logsPath, fileName), '________________________________________________________________________________\n', 'utf-8', function (err) { });
                        socket.end();
                    }
                }

            });


        });



        //Запуск сервера 
        this.server.listen(this.port, this.host, () => {
            console.log("Слушаю порт ", this.port, "\nГотов к приему данных");
        })

    }
}


var server = new ServerReceiver();
server.startServer();
