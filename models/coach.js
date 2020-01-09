var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coachSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  experience: Number,

  description: String,

  image: String,

  location: String,

  course: [{type: Schema.Types.ObjectId, ref: 'Course'}],

  comments: [
    {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
  ],

  author: {
    id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},
  }, {
  timestamps: true
});

module.exports = mongoose.model('Coach', coachSchema);
