var mongoose = require('mongoose');

// Setup schema
var surviverSchema = mongoose.Schema({
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
        type: String,
        required: true
    },


}, {
    timestamps: true,
})


surviverSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
surviverSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('surviver', surviverSchema)