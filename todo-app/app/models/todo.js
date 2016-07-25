'use strict';
/**
 * Created by Adrian on 23-Jul-16.
 */
module.exports = function(modelObj, Seq) {

  modelObj
    .field('id', Seq.PRIMARY)
    .field('name', Seq.STRING(50), {
      filter: true,
      update: true
    })
    .field('text', Seq.STRING(100), {
      update: true
    })
    .field('is_done', Seq.BOOLEAN, {
      filter: true,
      update: true
    });

  modelObj
    .belongsTo('account', {
      private: true
    });

};