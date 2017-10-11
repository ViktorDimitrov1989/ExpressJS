const mongodb = require('mongodb');
const mongoose = require('mongoose');
const connString = 'mongodb://localhost:27017/demoDB';

//Create connection to the DB with mongoose

//'FK'
let ObjectId = mongoose.Schema.ObjectId;

mongoose.connect(connString, (err) => {
    if (err) {
        console.warn(err.message);
        return;
    }

    //create schema for every entity
    let classSchema = new mongoose.Schema({
        className: { type: String, require: true },
        schoolName: { type: String, require: true }
    });

    let studentSchema = new mongoose.Schema({
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        age: { type: Number },
        facultyNumber: { type: String, require: true, unique: true },
        classId: { type: mongoose.Schema.Types.ObjectId }
    });

    //add adittional methods to the schema
    studentSchema.methods.getInfo = function () {
        return `Hello my name is ${this.firstName} ${this.lastName}.`
    }

    //add vitrual properties - stored locall
    studentSchema.virtual('fullName').get(function() {
        return this.firstName + ' ' + this.lastName;
    })

    //property validation (validate prop when persist to the db)
    studentSchema.path('firstName').validate(function(){
        return this.firstName.length >= 2 &&
        this.firstName.length <= 10
    }, 'First name must be between 2 and 10 symbols long.')

    let Class = mongoose.model('Class', classSchema);
    let Student = mongoose.model('Student', studentSchema);

    let firstStudent = new Student({ firstName: 'Pesho', lastName: 'Peshev', age: 19, facultyNumber: '23851' });
    let firstClass = new Class({ className: '1A', schoolName: '132 SOU Vania Voinova' })

    //CREATE entity to the DB
    // firstStudent.save()
    // .then((studentInfo) => {
    //     console.log(studentInfo);
    // })
    // .catch(handleError)

    //READ data from table - find all students
    // Student
    //     .find({})
    //     .exec()
    //     .then((students) => {
    //         for (let stud of students) {
    //             console.log(stud.fullName);
    //         }
    //     })
    //     .catch(handleError);

    //I. UPDATE data - find row from table by ID and update it
    // Student.findById("59de19569bf304248cd38498", (err,student) => {
    //     if(err){
    //         console.warn(err.message);
    //         return;
    //     }

    //     student.firstName = 'Viktor';
    //     student.save()
    //     .then((newStudent) => {console.log(newStudent)})
    //     .catch(handleError)
    // })

    //II. UPDATE
    // Student.findByIdAndUpdate("59de19569bf304248cd38498", {$set: {firstName: 'findByIdAndUpdateName'}} ,(err,student) => {
    //     if(err){
    //         console.warn(err.message);
    //         return;
    //     }
        //returns data for the row before to be updated
    //     console.log(student);
    // })

    //DELETE
    // Student.findByIdAndRemove("59de19569bf304248cd38498", (err,student) => {
    //     if(err){
    //         console.warn(err.message);
    //         return;
    //     }
    //     //returns the data for the removed row
    //     console.log(student)
    // })


    //QUERY data
    // Student.find({})
    // .where('age')
    // .gt(20)
    // .lt(25)
    // .exec()
    // .then((students) => {
    //     console.log(students);
    // })

})

function handleError(err) {

    if (err) {
        console.warn(err.message);
    }

}


//Vanilla mongodb 
// mongodb.MongoClient.connect(connString, (err, db) => {

//     if(err){
//         console.warn(err.message);
//         return;
//     }

//     let people = db.collection('people');

//     people.insert({name: 'Penka', gender: 'female'}, (err, personInfo) => {

//         if(err){
//             console.warn(err.message);
//             return;
//         }

//         //loads all data to the local memory
//         people.find({name: 'Penka'}).toArray((err, data) => {

//             if(err){
//                 console.warn(err.message);
//                 return;
//             }

//             console.log(data);
//         })
//     })

// })