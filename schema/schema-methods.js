/**
 * Extends model schema to hook delete to soft delete
 * @author Juniawan
 * @since 1.0.0
 * @param {object} modelSchema - Model schema
 */

module.exports = (modelSchema) => {
  const mongoose = require("mongoose");
  modelSchema.add({'deleted': Boolean});
  modelSchema.path('deleted').default(false);
  modelSchema.add({'deletedAt': Date});
  modelSchema.add({'deletedById': mongoose.Schema.Types.ObjectId});
  modelSchema.add({'deletedByType': String});
  modelSchema.add({'deletedByName': String});

  /**
   * Alias for findOne, but with query deleted false
   * @since 1.0.0
   * @param {object} query - Query condition object
   * @param {requestCallback} cb - Query callback   
   }}
   */
  modelSchema.static('findSingle', function(query, cb,){
    query.deleted = false;
    return this.findOne(query, cb);
  })

  /**
   * Alias for find multiple, but with deleted false
   * @since 1.0.0
   */
  modelSchema.static('findMultiple', function() {
    if(arguments.length>1){      
      arguments[0].deleted = false;
    }
    switch(arguments.length){
      case 1:
        return this.find({deleted: false}, arguments[0]);
      case 2:
        return this.find(arguments[0], arguments[1]);
      case 3:
        return this.find(arguments[0], arguments[1], arguments[2]);
      case 4:
        return this.find(arguments[0], arguments[1], arguments[2], arguments[3]);
      default:
        throw new Error("Invalid arguments");
    }
  })

  /**
   * Soft delete single object from database
   */
  modelSchema.static('deleteSingle', function(query, cb) {
    return this.updateOne(query, {
      deleted: true
    }, cb);
  });

  /**
   * Soft delete multi object from database
   */
  modelSchema.static('deleteMultiple', function(query, cb) {
    return this.updateMany(query, {
      deleted: true
    }, cb);
  })
}