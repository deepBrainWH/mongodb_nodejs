var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

function f1() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("student");
        dbase.collection("scores").find({
            type: "quiz",
            score: {$gte: 60, $lte: 80}
        }, {student_id: true}).toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close();
        });
    });
}

function f2() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("student");
        dbase.collection("scores").find({type: {$in: ["exam", "quiz"]}}).toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close(false);
        });
    });
}

function f3() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("student");
        dbase.collection("scores").find({$or: [{student_id: 170}, {type: "homework"}]}).toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close(false);
        });
    });
}

function f4() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("student");
        dbase.collection("scores").find({type: {$nin: ["exam", "quiz"]}}).toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close(false);
        });
    });
}

function f5() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("student");
        dbase.collection("scores").updateMany({student_id: {$in: [190, 165]}}, {$inc: {score: 5}}, {}, function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close(false);
        })
    });
}

function f6() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("student");
        dbase.collection("scores").updateMany({student_id: 60}, {$set: {score: 96}}, {}, function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close(false);
        })
    });
}

function f7() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("student");
        dbase.collection("scores").find({$or: [{score: {$lt: 60}}, {score: {$eq: 89.86863789238588}}]}).sort({score: -1}).toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close(false);
        })
    });
}

function f8() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("mydb");
        dbase.collection("customers").find({firstName: /^A/, surname: /^K/}).toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close(false);
        })
    });
}

function f9() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("mydb");
        dbase.collection("customers").find({city: /Helsingborg/, gender: /M/}, {projection: {
            firstName: 1,
            surname: 1,
            gender: 1,
            city: 1,_id:0
        }}).toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close(false);
        })
    });
}

function f10() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbase = db.db("mydb");
        dbase.collection("customers").find({country: "JP", status: "AAA"}).limit(3).toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
            db.close(false);
        })
    });
}
// f1();
// f2();
// f3();
// f4();
// f5();
// f6();
// f7();
// f8();
// f9();
// f10();
