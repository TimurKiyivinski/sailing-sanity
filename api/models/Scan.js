/**
* Scan.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoCreatedAt: true,
  autoUpdatedAt: true,

  attributes: {
      id: {
        type: 'integer',
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: 'string',
        unique: true
      }
  }
};

