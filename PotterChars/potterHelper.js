const db = require('../dbConfig');

module.exports = {
    add: function(potter) {
        return db('potterpals').insert(potter);
    },

    remove: function(potter) {
        return db('potterpals').where('name', potter.name).del();
    },

} 