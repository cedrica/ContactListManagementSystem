var mongo = require('mongodb');
var formidable = require('formidable');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectID;

exports.login = function(user, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("userdb");
		var query = { email: user.email, password: user.password };
        dbo.collection("users").find(query).toArray(function(err, searchedUser) {
            console.log('searchedUser = '+searchedUser.length);
            if (err || searchedUser.length == 0) {
                console.log('User not found');
                var failure = { 'status': 'Failure', 'message': 'Service Error' };
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
            }else{
                console.log('searched user: '+ JSON.stringify(searchedUser));
                var success = { 'status': 'Success', 'user':searchedUser};
                res.header({ "Content-Type": "json/application" });
                res.json(success);
            }
            res.end();
            db.close();
        });
	}); 
}


exports.findUserById = function(id, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
        var dbo = db.db("userdb");
        var query = { _id: new ObjectId(id) };
        dbo.collection("users").find(query).toArray(function(err, searchedUser) {
            if (err) {
                var failure = { 'status': 'Failure', 'message': 'User could not be found' };
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
            }else{
                console.log('searched user: '+ JSON.stringify(searchedUser));
                var success = { 'status': 'Success', 'user':searchedUser};
                res.header({ "Content-Type": "json/application" });
                res.json(success);
            }
            res.end();
            db.close();
        });
	}); 
}

exports.findContactById = function(id, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
        var dbo = db.db("userdb");
        var query = { _id: new ObjectId(id) };
        dbo.collection("contacts").find(query).toArray(function(err, searchedUser) {
            if (err) {
                var failure = { 'status': 'Failure', 'message': 'User could not be found' };
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
            }else{
                console.log('searched user: '+ JSON.stringify(searchedUser));
                var success = { 'status': 'Success', 'user':searchedUser};
                res.header({ "Content-Type": "json/application" });
                res.json(success);
            }
            res.end();
            db.close();
        });
	}); 
}

exports.insertUser = function(req,res){
	MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        user = req.body;
        var dbo = db.db("userdb");
        var query = { email: user.email };
        dbo.collection("users").find(query).toArray(function(err, searchedUser) {
            if (err) { throw err
            }else if(searchedUser.length > 0){
                console.log('searched user: '+ JSON.stringify(searchedUser));
                var failure = { 'status': 'Failure', 'message':'email already register'};
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
                res.end();
                db.close();
            }else{
                dbo.collection("users").insertOne(user, function(err, insertedUser) {
                    if (err) {
                        var failure = { 'status': 'Failure', 'message': 'user could not be inserted' };
                        res.header({ "Content-Type": "json/application" });
                        res.json(failure);
                    }else{
                        var form = new formidable.IncomingForm();
                        console.log(form);
                        form.parse(req, function (err, fields, files) {
                            var oldpath = files.filetoupload.path;
                            var newpath = './' + files.filetoupload.name;
                            console.log('fileupload: '+files.filetoupload.name);
                            fs.rename(oldpath, newpath, function (err) {
                                if (err) throw err;
                            });
                        });
                        var success = { 'status': 'Success'};
                        res.header({ "Content-Type": "json/application" });
                        res.json(success);
                    }
                    res.end();
                    db.close();
                });
            }
        });
		
    }); 
}

exports.insertContact = function(contact,res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
        var dbo = db.db("userdb");
        var query = { email: contact.email };
        dbo.collection("contacts").find(query).toArray(function(err, searchedContact) {
            if (err) { throw err
            }else if(searchedContact.length > 0){
                console.log('searched user: '+ JSON.stringify(searchedContact));
                var failure = { 'status': 'Failure', 'message':'email already register'};
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
                res.end();
                db.close();
            }else{
                dbo.collection("contacts").insertOne(contact, function(err, insertedContact) {
                    if (err) {
                        var failure = { 'status': 'Failure', 'message': 'user could not be inserted' };
                        res.header({ "Content-Type": "json/application" });
                        res.json(failure);
                    }else{
                        var success = { 'status': 'Success'};
                        res.header({ "Content-Type": "json/application" });
                        res.json(success);
                    }
                    res.end();
                    db.close();
                });
            }
        });
		
    }); 
}

exports.updateUser = function(user,res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
        var dbo = db.db("userdb");
        var myquery = {email:user.email};
        dbo.collection("users").updateOne(myquery,user, function(err, response) {
            if (err) {
                var failure = { 'status': 'Failure', 'message': 'no users found' };
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
                throw err;
            }else{
                console.log('user updated new user:'+ JSON.stringify(user));
                var success = { 'status': 'Success'};
                res.header({ "Content-Type": "json/application" });
                res.json(success);
            }
            res.end();
			db.close();
        });
    }); 
}
exports.updateContact = function(contact,res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
        var dbo = db.db("userdb");
        var myquery = {email:contact.email};
        dbo.collection("users").updateOne(myquery,contact, function(err, response) {
            if (err) {
                var failure = { 'status': 'Failure', 'message': 'no users found' };
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
                throw err;
            }else{
                var success = { 'status': 'Success'};
                res.header({ "Content-Type": "json/application" });
                res.json(success);
            }
            res.end();
			db.close();
        });
    }); 
}

exports.findAllUsers = function(res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
        var dbo = db.db("userdb");
        var query = { email: /^((?!admin@yahoo.fr).)*$/gm };
		dbo.collection("users").find(query).toArray(function(err, users) {
            if (err) {
                var failure = { 'status': 'Failure', 'message': 'no users found' };
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
            }else{
                var success = { 'status': 'Success', 'users':users};
                res.header({ "Content-Type": "json/application" });
                res.json(success);
            }
            res.end();
			db.close();
		});
	}); 
}


exports.findMyContacts = function(res, user){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
        var dbo = db.db("userdb");
        if(user == null){
            var failure = { 'status': 'Failure', 'message': 'logged user is null' };
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
        }
        var query = {'createdBy':user.email};
		dbo.collection("contacts").find(query).toArray(function(err, users) {
            if (err) {
                var failure = { 'status': 'Failure', 'message': 'no users found' };
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
            }else{
                var success = { 'status': 'Success', 'users':users};
                res.header({ "Content-Type": "json/application" });
                res.json(success);
            }
            res.end();
			db.close();
		});
	}); 
}

exports.deleteUser = function(tobedeletedId,res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
        var dbo = db.db("userdb");
        var query = { _id: new ObjectId(tobedeletedId) };
        dbo.collection("users").deleteOne(query, function(err, obj) {
            if (err) {
                var failure = { 'status': 'Failure', 'message': 'no users found' };
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
            }else{
                console.log(JSON.stringify(obj));
                var success = { 'status': 'Success'};
                res.header({ "Content-Type": "json/application" });
                res.json(success);
            }
            res.end();
			db.close();
		});
	}); 
}

exports.deleteContact = function(tobedeletedId,res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
        var dbo = db.db("userdb");
        var query = { _id: new ObjectId(tobedeletedId) };
        dbo.collection("contacts").deleteOne(query, function(err, obj) {
            if (err) {
                var failure = { 'status': 'Failure', 'message': 'no users found' };
                res.header({ "Content-Type": "json/application" });
                res.json(failure);
            }else{
                console.log(JSON.stringify(obj));
                var success = { 'status': 'Success'};
                res.header({ "Content-Type": "json/application" });
                res.json(success);
            }
            res.end();
			db.close();
		});
	}); 
}
exports.fileUpload = function(req, res){
    var form = new formidable.IncomingForm();
    form.on('file', (field, file) => {
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path
        console.log('file ===== '+ JSON.stringify(file));
        var oldpath = file.path;
        console.log('oldPath: '+oldpath);
        var newpath = '../src/assets/' + file.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.end();
        });
    });
    form.on('end', () => {
        res.json();
    });
    form.parse(req);
};


