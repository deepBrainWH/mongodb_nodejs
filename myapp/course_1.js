var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

function test_1(){
    MongoClient.connect(url, true, function(err, db) {
        if (err) throw err;
        console.log("数据库已创建!");
        db.close();
    });
}

function test_2(){
    /**
     * create collection.
     */
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        console.log("Database has already created!");
        var dbase = db.db("mongodb_test");
        dbase.createCollection("nodejs_create", function (err, res) {
            if (err) throw err;
            console.log("the collection has already created!");
            db.close();
        });
    });
}

var test_3 = function(someFunction){
    /**
     * MongoDB CURD operation.
     */
    someFunction();
};

function c() {
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        var _db = db.db("mongodb_test");
        var obj = {name:"mongodb从入门到入土-", price:40, url:"www.mongodb.org"};
        _db.collection("nodejs_create").insertOne(obj, function (err, res) {
            if(err) throw err;
            console.log("Insertion succeed!");
            db.close();
        });
    });
}

function r() {
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        var _db = db.db("city");
        _db.collection("restaurants").find({}).toArray(function (err, res) {
            if(err) throw err;
            console.log(res);
            db.close();
        });
    });
}
function mongodb_view(){
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        var _db = db.db("city");
        _db.collection("restaurants").find({}, {"_id":1, "name":1, "borough":1, "cuisine":1}).toArray(function (err, res) {
            if(err) throw err;
            console.log(res);
            db.close();
        });
    })
}
function r_by_condition(){
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        var _db = db.db("mongodb_test");
        _db.collection("nodejs_create").find({name:"mongodb从入门到入土"}).toArray(function (err, res) {
            if(err) throw err;
            console.log(res);
            db.close();
        });
    });
}
function update() {
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        var _db = db.db("mongodb_test");
        var where_str = {name:"mongodb从入门到入土-"};
        var update_str = {$set: {url: "wangheng"}};
        _db.collection("nodejs_create").updateOne(where_str, update_str, function (err, res) {
            if(err) throw err;
            _db.collection("nodejs_create").find({}).toArray(function (err, res) {
                console.log(res);
                console.log("Update succeed!");
                db.close();
            });
        });
    });
}

// test_1();
// test_2();
// test_3(c);
// test_3(r);
// test_3(r_by_condition);
// test_3(update);
mongodb_view();
