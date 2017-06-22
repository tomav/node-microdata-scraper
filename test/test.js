var assert    = require('assert');
var microdata = require('../index');

var testArr = [
  [
    'Product',
    'https://raw.github.com/mhausenblas/schema-org-rdf/master/examples/Thing/Product/Product.microdata',
    [{
      "id":         "d65c65f16a36bea9552a1a77d5ec2c54",
      "name":       "http://schema.org/Product",
      "properties": {
        "name":            "Kenmore White 17\" Microwave",
        "aggregateRating": "Rated 3.5/5 based on 11 customer reviews",
        "offers":          "$55.00 In stock",
        "description":     "0.7 cubic feet countertop microwave. Has six preset cooking categories and convenience features like Add-A-Minute and Child Lock.",
        "reviews":         [
          'Not a happy camper - by Ellie, April 1, 2011 1/ 5stars The lamp burned out and now I have to replace it.',
          'Value purchase - by Lucas, March 25, 2011 4/ 5stars Great microwave for the price. It is small and fits in my apartment.'
        ]
      }
    }, {
      "id":         "c8f6b91f0c8027ef569a993c4f5fe76a",
      "name":       "http://schema.org/AggregateRating",
      "properties": {"ratingValue": "3.5", "reviewCount": "11"}
    }, {
      "id":         "02667b2b6fe19cb30594b4017f71cd54",
      "name":       "http://schema.org/Offer",
      "properties": {"price": "$55.00", "availability": "InStock"}
    }, {
      "id":         "304f4861b83f0543c8e2bbbeac26ac4b",
      "name":       "http://schema.org/Review",
      "properties": {
        "name":         "Not a happy camper",
        "author":       "Ellie",
        "publishDate":  "2011-04-01",
        "reviewRating": "1/ 5stars",
        "description":  "The lamp burned out and now I have to replace it."
      }
    }, {
      "id":         "41167faa486de23d0ba712cf19cde8cb",
      "name":       "http://schema.org/Rating",
      "properties": {"worstRating": "1", "ratingValue": "1", "bestRating": "5"}
    }, {
      "id":         "3d5bc54a1a6cad9b638e68c64cd0abfd",
      "name":       "http://schema.org/Review",
      "properties": {
        "name":         "Value purchase",
        "author":       "Lucas",
        "publishDate":  "2011-03-25",
        "reviewRating": "4/ 5stars",
        "description":  "Great microwave for the price. It is small and fits in my apartment."
      }
    }, {
      "id":         "cbaea6353af6272f8528fbe2941adee9",
      "name":       "http://schema.org/Rating",
      "properties": {"worstRating": "1", "ratingValue": "4", "bestRating": "5"}
    }]
  ],
  [
    'Place',
    'https://raw.github.com/mhausenblas/schema-org-rdf/master/examples/Thing/Place/Place.microdata',
    [{
      "id":         "7e55ee16fc20cbd63a6a3b7e1c013f97",
      "name":       "http://schema.org/LocalBusiness",
      "properties": {
        "name":        "Beachwalk Beachwear & Giftware",
        "description": "A superb collection of fine gifts and clothing to accent your stay in Mexico Beach.",
        "address":     "3102 Highway 98 Mexico Beach, FL",
        "telephone":   "850-648-4200"
      }
    }, {
      "id":         "88503ff3d5d725b6b885fbfbabb9dc52",
      "name":       "http://schema.org/PostalAddress",
      "properties": {"streetAddress": "3102 Highway 98", "addressLocality": "Mexico Beach", "addressRegion": "FL"}
    }]
  ],
  [
    'Person',
    'https://raw.github.com/mhausenblas/schema-org-rdf/master/examples/Thing/Person/Person.microdata',
    [{
      "id":         "5422357c8aa8619418cccf9023c4477d",
      "name":       "http://schema.org/Person",
      "properties": {
        "name":       "Jane Doe",
        "image":      "janedoe.jpg",
        "jobTitle":   "Professor",
        "address":    "20341 Whitworth Institute 405 N. Whitworth Seattle, WA 98052",
        "telephone":  "(425) 123-4567",
        "email":      "jane-doe@xyz.edu",
        "url":        "janedoe.com",
        "colleagues": ["Alice Jones", "Bob Smith"]
      }
    }, {
      "id":         "5832e50426b3f1acd4219e94f9b96495",
      "name":       "http://schema.org/PostalAddress",
      "properties": {
        "streetAddress":   "20341 Whitworth Institute 405 N. Whitworth",
        "addressLocality": "Seattle",
        "addressRegion":   "WA",
        "postalCode":      "98052"
      }
    }],
    true
  ]
];

testArr.forEach(function (arr) {
  var test_name = arr[0];
  var url       = arr[1];
  var expected  = arr[2];
  var json      = arr[3];

  describe(test_name + ' data structure', function () {
    it('should be deep equal to expected value', function (done) {
      microdata.json(json).parseUrl(url, function (err, result) {
        assert.deepEqual(json ? JSON.parse(result) : result, expected);
        done();
      });
    })
  })
});




