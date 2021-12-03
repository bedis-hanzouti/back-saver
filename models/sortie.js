var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Setup schema
var sortieSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    savers: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'saver',

    }],
    boats: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'boat',

    }],
    survivers: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'surviver',

    }],


}, {
    timestamps: true,
})


sortieSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
sortieSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('sortie', sortieSchema)