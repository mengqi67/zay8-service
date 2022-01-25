/*
 * @Author: ymq
 * @Date: 2022-01-05 18:50:55
 * @LastEditTime: 2022-01-25 17:51:43
 * @LastEditors: ymq
 * @Description: 
 */
const http = require('http');
const fs = require('fs');
const express = require('express')
const path = require('path')
const expressWs = require('express-ws')
const baseRouter = require('./route/base')

const hostname = '0.0.0.0';
const port = 443;
const userIndex = 0;
const app = express()
const wxInstance = expressWs(app)
const wss = wxInstance.getWss()

// const server = http.createServer((req, res) => {
//     if (req.url == '/') {
//         fs.readFile('./index.html','utf-8', (error, data) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'text/html');
//             res.end(data);
//         })
        
//     }
    
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

app.use(express.static(__dirname))

app.use(baseRouter)


app.ws('/chat', (ws, req) => {
    console.log('有聊天用户链接上来');
    // console.log(req);
    // ws.userId = ++userIndex
    
    // console.log(ws.userId);
    ws.on('message', function (msg) {
        msg = JSON.parse(msg)
        if(msg.type == 'message') {
            const date = new Date()
            msg.value['time'] = `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
        }
        broadcast(JSON.stringify(msg))
    })

})

function broadcast(msg) {
    wss.clients.forEach(item => {
        item.send(msg)
    })
}

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})