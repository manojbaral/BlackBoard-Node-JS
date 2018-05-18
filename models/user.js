var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');

// User Schema

var userSchema = mongoose.Schema({

    username: {
        type: String
    },
    email: {
        type: String
    },
    password:{
        type: String,
        bcrypt: true
    },

    type:{
        type: String
    }

});

var User =  module.exports = mongoose.model('User', userSchema);


// Fetch All Classes
module.exports.getUserById = function(id, callback){
    User.findById(id,callback);
};

// //Fetch Single Class
module.exports.getUserByUsername=function (username, callback) {
    var query={username: username};
    Class.findOne(query, callback);
};

// Save Student
module.exports.saveStudent = function(newUser, newStudent, callback){
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if(err) throw err;

        //Set Hash for Student
        newUser.password = hash;
        console.log('Student is being saved');
         //async.parallel([newUser.save, newStudent.save], callback);
        async.parallel([newUser.save.bind(newUser), newStudent.save.bind(newStudent)], callback);

    });
};

// Save Instructor
module.exports.saveInstructor = function(newUser, newInstructor, callback){
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if(err) throw err;

        //Set Hash for Instructor
        newUser.password = hash;
        console.log('Instructor is being saved');
        //async.parallel([newUser.save, newInstructor.save], callback);
        async.parallel([newUser.save.bind(newUser), newInstructor.save.bind(newInstructor)], callback);

    });
};

// //Fetch Add Lesson
// module.exports.addLesson=function (id, callback) {
//
// //    Add Lesson Schema
//     class_id  = info['class_id'];
//     lesson_number  = info['lesson_number'];
//     lesson_title  = info['lesson_title'];
//     lesson_body  = info['lesson_body'];
// };
//
// //Class update by id
// Class.findByIdAndUpdate(class_id, {
//     $push: {
//         "lessons": {
//             lesson_number: lesson_number,
//             lesson_title: lesson_title,
//             lesson_body: lesson_body
//         }}
//
// },
//     {
//         safe: true,
//         upsert: true
//     }, callback)
// };
