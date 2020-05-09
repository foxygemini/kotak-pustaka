/**
 * 
 * @param {Object} options 
 */

const whereParse = options => {
  const whereQuery = options.whereQuery?options.whereQuery:[];
  if(options.searchField && options.searchQuery){
    const searchList = [];
    options.searchField.map(field => {
      const fieldItem = {};
      fieldItem[field] = {'$regex': `.*${options.searchQuery}.*`, '$options': 'i'};
      searchList.push(fieldItem);
    });
    if(searchList.length>0){
      whereQuery.push({$or: searchList});
    }
  }
  return whereQuery.length>0?{$and: whereQuery}:{};
}

module.exports = (model, method, options, callback) => {
  process.traceLog("info", "Start do model query", __filename, __linenumber, process.scene, {model, method, options});
  let modelObj;
  const whereQuery = whereParse(options);

  switch(method){
    case "findOne":
      modelObj = model.findOne(whereQuery);
      break;
    case "count":
      modelObj = model.countDocuments(whereQuery);
      break;
    default:
      modelObj = model.find(whereQuery);
      break;
  }

  if(options.sort){
    modelObj.sort(options.sort);
  }

  if(method == "find"){
    if(parseInt(options.limitQuery)>0){
      modelObj.limit(parseInt(options.limitQuery));
    }
    if(options.offsetQuery){
      modelObj.skip(parseInt(options.offsetQuery));
    }
  }

  modelObj.exec(callback);
}