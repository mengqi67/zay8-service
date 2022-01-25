/*
 * @Author: ymq
 * @Date: 2022-01-25 17:15:02
 * @LastEditTime: 2022-01-25 18:21:04
 * @LastEditors: ymq
 * @Description: 
 */
const fs = require('fs');
const express = require('express');
const router = express.Router()

const isLogin = false

router.get('/', (req, res) => {
    if(!isLogin) {
        res.redirect('/login');
        return 
    }else {
        fs.readFile('./index1.html', 'utf-8', (error, data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        })
    }
    
})

router.get('/login', (req, res) => {
    fs.readFile('./login.html', 'utf-8', (error, data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    })
})

module.exports = router