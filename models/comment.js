var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: String,

    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        username: String,

        googleId: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);