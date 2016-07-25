'use strict';
/**
 * Created by Adrian on 23-Jul-16.
 */
module.exports = function(modelObj, Seq) {

  modelObj
    .field('id', Seq.PRIMARY)
    .field('email', Seq.STRING(50))
    .field('first_name', Seq.STRING(100))
    .field('last_name', Seq.STRING(100));

  modelObj
    .json(function() {
      var acc = {
        id: this.id,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name
      };
      return acc;
    });
};