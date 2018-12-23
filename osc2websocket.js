var osc = require("osc"),
    http = require("http"),
    WebSocket = require("ws")
    express = require('express');

process.setMaxListeners(0);

var app = express(),
    server = app.listen(8081);

app.use("/", express.static(__dirname + "/static"));

var wss = new WebSocket.Server({
    server: server
});

var socketPort;
wss.on("connection", function (socket) {
    socketPort = new osc.WebSocketPort({
        socket: socket,
        metadata: true
    });

    var relay = new osc.Relay(udpPort, socketPort, {
        raw: false
    });
});

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 6251,
    metadata: true
});


udpPort.on("bundle", function (oscBundle, timeTag, info) {
    //console.log("An OSC bundle just arrived for time tag", timeTag, ":", oscBundle);
});

udpPort.open();