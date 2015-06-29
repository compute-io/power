/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pow = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset pow', function tests() {

	it( 'should export a function', function test() {
		expect( pow ).to.be.a( 'function' );
	});

	it( 'should compute an element-wise power using a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		actual = pow( data, 2, 'x' );

		expected = [
			{'x':0},
			{'x':1},
			{'x':4},
			{'x':9}
		];

		assert.strictEqual( data, actual );
		assert.deepEqual( data, expected);

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = pow( data, 2, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,4]},
			{'x':[9,9]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should perform an element-wise multiplication using an array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [ 0, 1, 2, 3 ];

		actual = pow( data, y, 'x' );

		expected = [
			{'x':1},
			{'x':1},
			{'x':4},
			{'x':27}
		];

		assert.strictEqual( data, actual );
		assert.deepEqual( data, expected);

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = pow( data, y, 'x/1', '/' );
		expected = [
			{'x':[9,1]},
			{'x':[9,1]},
			{'x':[9,4]},
			{'x':[9,27]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		var arr = [];
		assert.deepEqual( pow( arr, 1, 'x' ), [] );
		assert.deepEqual( pow( arr, 1, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// raising to a non-numeric value
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = pow( data, null, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]}
		];
		assert.deepEqual( data, expected );

		// raising to a scalar
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = pow( data, 1, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,3]}
		];
		assert.deepEqual( data, expected );

		// raising to exponents in an array
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = [ 0, 1, 2, 3];
		actual = pow( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,27]}
		];
		assert.deepEqual( data, expected );

		//raising to exponents in a typed array
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = new Int32Array( [0,1,2,3] );
		actual = pow( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,27]}
		];
		assert.deepEqual( data, expected );

	});

});
