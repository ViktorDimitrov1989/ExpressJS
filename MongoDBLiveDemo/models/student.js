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
