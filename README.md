node-microdata-scraper
======================

Scrape & parse a webpage to return a JSON with found microdata.

Supports :
* schema.org

##Build status
[![Build Status](https://travis-ci.org/tomav/node-microdata-scraper.png?branch=master)](https://travis-ci.org/tomav/node-microdata-scraper)

##Install

```npm install node-microdata-scraper```

##Example
```javascript
var microdata = require('node-microdata-scraper');
var url       = 'https://raw.github.com/mhausenblas/schema-org-rdf/master/examples/Thing/Product/Product.microdata';

microdata.parseUrl(url, function(err, json) {
  if (!err && json) {
    console.log(json);
  }
});
```

Will return:
```javascript
[{
    "id": "d65c65f16a36bea9552a1a77d5ec2c54",
    "name": "http://schema.org/Product",
    "properties": {
        "name": "Kenmore White 17\" Microwave",
        "aggregateRating": "Rated 3.5/5 based on 11 customer reviews",
        "offers": "$55.00 In stock",
        "description": "0.7 cubic feet countertop microwave. Has six preset cooking categories and convenience features like Add-A-Minute and Child Lock.",
        "reviews": "Value purchase - by Lucas, March 25, 2011 4/ 5stars Great microwave for the price. It is small and fits in my apartment."
    }
}, {
    "id": "c8f6b91f0c8027ef569a993c4f5fe76a",
    "name": "http://schema.org/AggregateRating",
    "properties": {
        "ratingValue": "3.5",
        "reviewCount": "11"
    }
}, {
    "id": "02667b2b6fe19cb30594b4017f71cd54",
    "name": "http://schema.org/Offer",
    "properties": {
        "price": "$55.00",
        "availability": "InStock"
    }
}, {
    "id": "304f4861b83f0543c8e2bbbeac26ac4b",
    "name": "http://schema.org/Review",
    "properties": {
        "name": "Not a happy camper",
        "author": "Ellie",
        "publishDate": "2011-04-01",
        "reviewRating": "1/ 5stars",
        "description": "The lamp burned out and now I have to replace it."
    }
}, {
    "id": "41167faa486de23d0ba712cf19cde8cb",
    "name": "http://schema.org/Rating",
    "properties": {
        "worstRating": "1",
        "ratingValue": "1",
        "bestRating": "5"
    }
}, {
    "id": "3d5bc54a1a6cad9b638e68c64cd0abfd",
    "name": "http://schema.org/Review",
    "properties": {
        "name": "Value purchase",
        "author": "Lucas",
        "publishDate": "2011-03-25",
        "reviewRating": "4/ 5stars",
        "description": "Great microwave for the price. It is small and fits in my apartment."
    }
}, {
    "id": "cbaea6353af6272f8528fbe2941adee9",
    "name": "http://schema.org/Rating",
    "properties": {
        "worstRating": "1",
        "ratingValue": "4",
        "bestRating": "5"
    }
}]
```

##Todo

Add support for :
* OpenGraph

##License
MIT