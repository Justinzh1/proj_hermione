const mongoose = require('mongoose');

const DATABASE_URL = 'mongodb://localhost/users';
mongoose.connect(DATABASE_URL);

var classSchema = mongoose.Schema({
    title: String,
    description: String,
    professors: [{ name: String }],
    videos: [{ 
                title: String, 
                id: Number, 
                link: String, 
                date: Date,
                timestamps : [{ time: Number, subject: String }]
            }],
    code: String,
    year: String,
    students: Number,
    week: Number,
    start: Date
}, {
    collection: 'classes'
});

module.exports = {
    Class: mongoose.model('Class', classSchema)
}
