var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

function f1() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if(err) throw err;
        var dbase = db.db("school");
        dbase.collection("students").find({$and: [{scores: {$elemMatch: {type: "exam", score:{$gt: 70}}}},
                {scores: {$elemMatch: {type: "quiz", score: {$gt: 80}}}}]}).toArray(function (err, res) {
            if(err) throw err;
            res.forEach(a=>{
                console.log(a);
            });
        });
        db.close(false);
    });
}

function f2() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if(err) throw err;
        var dbase = db.db("school");
        dbase.collection("students").updateMany({$and: [
                {scores: {$elemMatch: {type: "exam", score:{$gt: 60, $lt: 70}}}},
                {scores: {$elemMatch: {type: "homework", score: {$gt: 90}}}}
                ]}, {$set: {average: 80}},{}, function (err, res) {
           if(err) throw err;
           console.log("successful!");
        });
        db.close(false);
    });
}

function f3() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if(err) throw err;
        var dbase = db.db("school");
        dbase.collection("students").find({scores: {$elemMatch: {type: "quiz", score: {$gt: 90}}}}).toArray(function (err, res) {
            if(err) throw err;
            res.forEach(one=>console.log(one));
        });
        dbase.collection("students").updateMany({scores:
                {$elemMatch: {type: "quiz", score: {$gt: 90}}}}, {$pop: {scores: -1}}, {}, function (err, res) {
            if(err) throw err;
            console.log("update successful!");
        });
        dbase.collection("students").find({scores: {$elemMatch: {type: "quiz", score: {$gt: 90}}}}).toArray(function (err, res) {
            if(err) throw err;
            res.forEach(one=>console.log(one));
        });
        db.close(false);
    });
}

function f4() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if(err) throw err;
        var dbase = db.db("school");
        dbase.collection("students").updateMany({scores:
                {$elemMatch: {type: "homework", score: {$gt: 80}}}},
            {$addToSet: {scores: {
                type: "project",
                        score: 85
                    }}},{}, function (err, res) {
                if(err) throw err;
                console.log("update successful!");
            });
        dbase.collection("students").find({scores: {$elemMatch: {type: "homework", score: {$gt: 80}}}})
            .toArray(function (err, res) {
                if(err) throw err;
                res.forEach(one=>console.log(one));
            });
        db.close(false);
    });
}

function f5() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if(err) throw err;
        var dbase = db.db("school");
        dbase.collection("students").updateMany({scores: {$elemMatch: {type: "quiz", score: {$lt: 50}}}},
            {$pull: {scores: {type: "homework"}}},{}, function (err, res) {
                if(err) throw err;
                console.log("update successful!");
            });
        db.close(false);
    });
}

// f1();
// f2();
// f3();
// f4();
f5();