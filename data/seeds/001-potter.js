exports.seed = function(knex, Promise) {
  return knex('potter')
    .truncate()
    .then(function() {
      return knex('potter').insert([
        { name: 'Harry' },
        { name: 'Hermione' },
        { name: 'Ron' },
        { name: 'Ginny' },
        { name: 'Dumbledore' },
      ]);
    });
};
