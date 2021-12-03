var mongoose = require('mongoose');

// Setup schema
var boatSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },


}, {
    timestamps: true,
})


boatSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
boatSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('boat', boatSchema)