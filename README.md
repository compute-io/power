Power
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise [exponentiation](https://en.wikipedia.org/wiki/Exponentiation).

Calculates the [exponentiation](https://en.wikipedia.org/wiki/Exponentiation) of a `base` to the `exponent` power, i.e. the function returns `base^exponent`.

performs

## Installation

``` bash
$ npm install compute-power
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var power = require( 'compute-power' );
```

#### power( base, exponent[, opts] )

Computes an element-wise power. `base` can be a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix). `exponent` has to be either an `array` or `matrix` of equal dimensions as `base` or a single number. The function returns either an `array` with the same length as the base `array`, a `matrix` with the same dimensions as the base `matrix` or a single number.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = power( 6, 2 );
// returns 36

out = power( -7, 3 );
// returns -343

data = [ 1, 2, 3 ];
out = power( data, 2 );
// returns [ 1, 4, 9 ]

data = [ 1, 2, 3 ];
out = power( 2, data );
// returns [ 2, 4, 8 ]

data = [ 1, 2, 3 ];
out = power( data, [ 1, 2, 3 ] )
// returns [ 1, 4, 27 ]


data = new Int8Array( [1,2,3] );
out = power( data, 2 );
// returns Float64Array( [1,4,9] )

data = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'int16' );
/*
	[  0  1
	   2  3
	   4  5 ]
*/

out = power( mat, 2 );
/*
	[  0  1
	   4  9
	  16 25 ]
*/

out = power( mat, mat );
/*
	[  1   1
	   4  27
	  16 256 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = power( data, 2, {
	'accessor': getValue
});
// returns [ 25, 9, 64, 9, 4 ]
```

When calculating the power for values between two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

var arr = [
	{'x': 0},
	{'x': 1},
	{'x': 2},
	{'x': 3},
	{'x': 4}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = power( data, arr, {
	'accessor': getValue
});
// returns [ 1, 3, 64, 27, 16 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,2]},
	{'x':[1,3]},
	{'x':[2,5]},
	{'x':[3,7]},
	{'x':[4,11]}
];

var out = power( data, 2, 'x|1', '|' );
/*
	[
		{'x':[0,4]},
		{'x':[1,9]},
		{'x':[2,25]},
		{'x':[3,49},
		{'x':[4,121]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [ 1, 2, 3 ] );

out = power( data, 2, {
	'dtype': 'int32'
});
// returns Int32Array( [1,4,9] )

// Works for plain arrays, as well...
out = power( [ 1, 2, 3 ], 2, {
	'dtype': 'uint8'
});
// returns Uint8Array( [1,4,9] )
```

By default, the function returns a new data structure. To mutate the input data structure, set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 1, 2, 3 ];

out = power( data, 2, {
	'copy': false
});
// returns [ 1, 4, 9 ]

bool = ( data === out );
// returns true

data = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'int16' );
/*
	[  0  1
	   2  3
	   4  5 ]
*/

out = power( mat, 4, {
	'copy': false
});
/*
	[  1   1
	   4  27
	  16 256 ]
*/

bool = ( mat === out );
// returns true
```

__Note__: mutation is the `array` or `matrix` equivalent of an __times-equal__ (`*=`).

## Notes

*	If an element is __not__ a numeric value, the result of the multiplication is `NaN`.

	``` javascript
	var data, out;

	out = power( null, 1 );
	// returns NaN

	out = power( true, 1 );
	// returns NaN

	out = power( {'a':'b'}, 1 );
	// returns NaN

	out = power( [ true, null, [] ], 1 );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = power( data, 1, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = power( data, 1, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = power( [ true, null, [] ], 1, {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```

*	When calling the function with a numeric value as the first argument and a `matrix` or `array` as the second argument, only the `dtype` option is applicable.

	``` javascript
		// Valid:
		var out = power( 2.1, [ 0, 1, 2 ], {
			'dtype': 'int8'
		});
		// returns Int8Array( [1,2,4] )

		// Not valid:
		var out = add( 0.5, [ 0, 1, 2 ], {
			'copy': false
		});
		// throws an error
	```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	power = require( 'compute-power' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*10 );
}
out = power( data, 2 );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = power( data, 2, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = power( data, 2, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 10;
}
tmp = power( data, 2 );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = power( mat, 2 );

// Matrices (custom output data type)...
out = power( mat, 10, {
	'dtype': 'uint16'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-power.svg
[npm-url]: https://npmjs.org/package/compute-power

[travis-image]: http://img.shields.io/travis/compute-io/power/master.svg
[travis-url]: https://travis-ci.org/compute-io/power

[coveralls-image]: https://img.shields.io/coveralls/compute-io/power/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/power?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/power.svg
[dependencies-url]: https://david-dm.org/compute-io/power

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/power.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/power

[github-issues-image]: http://img.shields.io/github/issues/compute-io/power.svg
[github-issues-url]: https://github.com/compute-io/power/issues
