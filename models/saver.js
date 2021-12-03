var mongoose = require('mongoose');

// Setup schema
var saverSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },


}, {
    timestamps: true,
})


saverSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
saverSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('saver', saverSchema)