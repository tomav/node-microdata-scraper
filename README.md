node-microdata-scraper
======================

Scrape & parse a webpage to return a JSON with found microdata.

Supports :
* schema.org

##Install

```npm install node-microdata-scraper```

##Example
```javascript
var microdata = require('node-microdata-scraper');
microdata.parseUrl('http://www.site.com/page-with-microdata.html', function(err, json) {
  if (!err && json) {
    console.log(json);
  }
});
```

Will return:
```javascript

```

##Todo

Add support for :
* OpenGraph

##License
MIT