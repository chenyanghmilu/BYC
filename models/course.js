var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  image: String,

  price: Number,

  location: String,

  description: String,

  coach: [{type: Schema.Types.ObjectId, ref: 'Coach'}],

  comments: [
    {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
],

  startDate: {
    type: Date,
    default: function () {
      return new Date().setFullYear(new Date().getFullYear());
    }
  },

  star: String,

  author: {
    id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

}
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
