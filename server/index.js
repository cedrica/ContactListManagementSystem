var http = require('http');
var express = require("express");
var myParser = require("body-parser");
var mm = require('./mongo-module');
var app = express();
var url = require('url');

/* Create Server */
var server = http.createServer(app);


app.use(myParser.json());       /* used to support JSON-encoded bodies*/
app.use(myParser.urlencoded({extended : true}));
/* Set Header Options*/
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});
/************
 *  USER 
 * **********/
app.post("/user", function(req, res) {
	mm.insertUser(req,res);
});

app.put("/updateUser", function(req, res) {
	var user = req.body;
	mm.updateUser(user,res);
});

app.post("/register", function(req, res) {
    mm.insertUser(req,res);
});

app.get("/users", function(req, res) {
	mm.findAllUsers(res);
});

app.post("/login", function(req, res) {
	var user = req.body;
	mm.login(user,res);
});

app.delete("/user:id", function(req, res) {
	var id = req.params.id;
	var _id = id.substring(1,id.length);
	mm.deleteUser(_id,res);
});

app.get("/user:id", function(req, res) {
	var id = req.params.id;
	var _id = id.substring(1,id.length);
	console.log('id = '+id);
	mm.findUserById(_id,res);
});

/************
 *  CONTACT 
 * **********/
app.put("/updateContact", function(req, res) {
	var user = req.body;
	mm.updateContact(user,res);
});

app.post("/createContact", function(req, res) {
	var user = req.body;
    mm.insertContact(user,res);
});

app.get("/contacts", function(req, res) {
	var user = req.body;
	mm.findMyContacts(res,user);
});

app.delete("/contact:id", function(req, res) {
	var id = req.params.id;
	var _id = id.substring(1,id.length);
	mm.deleteContact(_id,res);
});

app.get("/contact:id", function(req, res) {
	var id = req.params.id;
	var _id = id.substring(1,id.length);
	console.log('id = '+id);
	mm.findContactById(_id,res);
});

app.post("/fileUpload", function(req,res){
	console.log('file uploading');
	mm.fileUpload(req,res)
});

server.listen(3000, "127.0.0.1");



