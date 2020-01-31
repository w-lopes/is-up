const request  = require("request");
const socket   = require('net');
const telegram = require("telegram-bot-api");

class Check {

    constructor () {
        this.loop    = 15 * 1000;
        this.chat_id = "<CHAT_ID>";
        this.sockets = {};
        this.bot     = new telegram({
            token: "<TOKEN>"
        });
    }

    async notify (host, port, enabled, label="") {
        let flag = enabled ? "ON" : "OFF";
        let msg  = `<b>[${label} ${flag}]</b> ${host}:${port}`;

        this.bot.sendMessage({
            chat_id    : this.chat_id,
            text       : msg,
            parse_mode : "HTML"
        });
    }

    async socket (label, host, port) {
        let attr = `${host}:${port}`;
        let that = this;
        if (typeof that.sockets[attr] === "undefined") {
            that.sockets[attr] = null;
        }

        let last   = that.sockets[attr];
        let client = new socket.Socket();

        client.connect(port, host, function(e) {
            that.sockets[attr] = true;
            that._compare(last, that.sockets[attr], label, host, port);
        }).on("error", () => {
            that.sockets[attr] = false;
            that._compare(last, that.sockets[attr], label, host, port);
        });
    }

    _compare (before, after, label, host, port) {
        if (before === after) {
            setTimeout(this.socket.bind(this), 1 * 1000, label, host, port);
            return;
        }
        this.notify(host, port, after, label);
        setTimeout(this.socket.bind(this), 1 * 1000, label, host, port);
    }
}

const watch = new Check();

watch.socket("Site", "google.com", 80);
watch.socket("Banco de dados", "bancodedados.google.com", 5432);
