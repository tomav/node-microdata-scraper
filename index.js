var $       = require('cheerio');
var request = require('request');
var md5     = require('MD5');

/**
 * @description get the correct sanitized value from html 'tag'
 * @param {Object} tag cheerio HTML node
 * @returns {string} tag microdata value
 */
function getPropValue(tag) {
  var value;

  if ($(tag).attr('content')) {
    value = $(tag).attr('content');
  } else if ($(tag).attr('itemprop') === 'image' && $(tag).attr('src')) {
    value = $(tag).attr('src');
  } else if ($(tag).attr('itemprop') === 'availability' && $(tag).attr('href')) {
    value = $(tag).attr('href').split('/')[3]
  } else {
    value = $(tag).text().replace(/[\n\t\r]+/g, '').replace(/ +(?= )/g, '');
  }
  return value.trim();
}

/**
 * @description Returns array item with provided id
 *
 * @param {Array} items Collection of objects having id property
 * @param {string} id Id of the object to search
 *
 * @returns {Object} Item with provided id
 */
function arraySearch(items, id) {
  for (var i = 0; i < items.length; i++)
    if (items[i].id === id) {
      return items[i];
    }
}

/**
 * @description process given itemtype item and puts it into provided collection for processed items
 *
 * @param {Object} item cheerio HTML node
 * @param {Array} processedItems Collection with already processed items
 */
function processItemtype(item, processedItems) {
  processedItems.push({
    'id':         md5($(item).html()),
    'name':       $(item).attr('itemtype'),
    'properties': {}
  });

}

/**
 * @description process given itemprop item and puts it into provided collection for processed items
 *
 * @param {Object} item cheerio HTML node
 * @param {Array} processedItems Collection with already processed items
 */
function processItemprop(item, processedItems) {
  var property, value, itemtypeHtml, currentItem;

  itemtypeHtml = $(item).parents("[itemtype]").html();

  if (itemtypeHtml) {
    property = $(item).attr('itemprop');
    value    = getPropValue(item);

    currentItem   = arraySearch(processedItems, md5(itemtypeHtml));

    if (currentItem.properties[property]) {
      if (!Array.isArray(currentItem.properties[property])) {
        currentItem.properties[property] = [currentItem.properties[property]];
      }
      currentItem.properties[property].push(value);
    } else {
      currentItem.properties[property] = value;
    }
  }
}

/**
 * @description parse HTML content and return a Object/JSON
 *
 * @param {string} html HTML to parse
 * @returns {object|string} Resulting data object, stringified if microdata.returnJson == true
 */
function parse(html) {
  // compatibility with the old signature
  html = arguments[arguments.length - 1];

  var items      = [];
  var parsedHTML = $.load(html);

  parsedHTML('[itemtype]').map(function (i, item) {
    processItemtype(item, items);
  });

  parsedHTML('[itemprop]').map(function (i, item) {
    processItemprop(item, items);
  });

  return exports.returnJson ? JSON.stringify(items) : items;
}

/**
 * @description get HTML from url and parse it
 *
 * @param {string} url Url to download
 * @param {function} callback classic node function(error: null|object, result: string|object){} callback
 */
function parseUrl(url, callback) {
  var options = {
    uri:            url,
    method:         "GET",
    followRedirect: true
  };

  request(options, function (err, res, body) {
    if (err) {
      callback(err);
    } else {
      callback(null, parse(body));
    }
  });
}

exports.parse      = parse;
exports.parseUrl   = parseUrl;

/**
 * @description Flag to switch whether parser returns result as object or stringified JSON
 * @type {boolean}
 */
exports.returnJson = true;
/**
 * @description switch result mode
 * @param {boolean} value If true, library will return JSON, if false - Object
 * @returns {Object} library itself
 */
exports.json       = function (value) {
  exports.returnJson = value;
  return exports;
};
