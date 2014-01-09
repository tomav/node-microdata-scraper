var $       = require('cheerio')
var request = require('request')
var md5     = require('MD5')

/*
 * get the correct sanitized value from html 'tag'
 */
function getPropValue(tag) {
  if ($(tag).attr('content')) {
    value = $(tag).attr('content');
  } else if($(tag).attr('itemprop') == 'image' && $(tag).attr('src')) {
    value = $(tag).attr('src');
  } else if($(tag).attr('itemprop') == 'availability' && $(tag).attr('href')) {
    value = $(tag).attr('href').split('/')[3]
  } else {
    value = $(tag).text().replace(/[\n\t\r]+/g,'').replace(/ +(?= )/g,'');
  };
  return value.trim();
}

/*
 * returns index matching the id
 */
function arraySearch(arr,val) {
  for (var i=0; i<arr.length; i++)
    if (arr[i].id == val) {
      return i;      
    }   
}

/*
 * process given item with given type
 */
function processTag(type, item) {
  switch(type) {
  case 'itemtype':
    // console.log(i+" TYPE => "+md5($(item).html())+" => "+$(item).attr('itemtype'));
    items.push({'id': md5($(item).html()), 'name': $(item).attr('itemtype'), 'properties': {} });
    break;
  case 'itemprop':
    // console.log(i+" PROP => "+md5($(item).parents("[itemtype]").html())+" => "+$(item).attr('itemprop')+" from "+$(item).parents("[itemtype]").attr("itemtype"));
    property    = $(item).attr('itemprop');
    value       = getPropValue(item);
    item_index  = arraySearch(items, md5($(item).parents("[itemtype]").html()));
    items[item_index].properties[property] = value;
    break;
  default:
  }

}

/*
 * parse HTML content and return a JSON 
 */
function parse(err, resp, html) {
  items = [];
  if (err) return console.error(err)
  var parsedHTML = $.load(html)

  parsedHTML('[itemtype], [itemprop]').map(function(i, item) {

    if ( $(item).attr("itemtype") && $(item).attr("itemprop") ) {
      processTag('itemtype', item);
      processTag('itemprop', item);
    } else if ( $(item).attr("itemtype") ) {
      processTag('itemtype', item);
    } else if ( $(item).attr("itemprop") ) {
      processTag('itemprop', item);
    }

  })

  return JSON.stringify(items);

}

/*
 * get HTML from url and parse it 
 */
function parseUrl(url, callback) {
  var options = {
    uri: url,
    method: "GET",
    followRedirect: false
  }
  request(options, function(err, res, body) {
    if (err) {
    } else {
      callback(err, parse(err, res, body));
      body = null;
    }
  });
}

exports.parse     = parse;
exports.parseUrl  = parseUrl;
