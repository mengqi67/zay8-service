/*
 * @Author: ymq
 * @Date: 2022-01-05 18:50:55
 * @LastEditTime: 2022-01-06 19:09:16
 * @LastEditors: ymq
 * @Description: 
 */
const http = require('http');
const fs = require('fs');
const express = require('express')
const path = require('path')


const hostname = '0.0.0.0';
const port = 443;
const app = express()

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

app.all('/', (req, res) => {
    if(req.url === '/') {
        fs.readFile('./index.html', 'utf-8', (error, data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        })
    }
})

app.listen(port)