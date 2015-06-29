/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pow = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array pow', function tests() {

	it( 'should export a function', function test() {
		expect( pow).to.be.a( 'function' );
	});

	it( 'should raise elements in an array to a scalar power', function test() {
		var data, actual, expected;

		data = [
			1,
			2,
			3,
			4,
			5
		];
		actual = new Array( data.length );

		actual = pow( actual, data, 2 );

		expected = [
			1,
			4,
			9,
			16,
			25
		];

		assert.deepEqual( actual, expected );

		// Typed arrays...
		data = new Int32Array( data );
		actual = new Int32Array( data.length );

		actual = pow( actual, data, 2 );
		expected = new Int32Array( expected );

		assert.deepEqual( actual, expected );
	});

	it( 'should raise a base array element-wise to powers from another array', function test() {
		var data, actual, expected, y;

		data = [
			0,
			1,
			2,
			3,
			4
		];

	 	y = [
			0,
			1,
			2,
			3,
			4
		];
		actual = new Array( data.length );

		actual = pow( actual, data, y );

		expected = [
			1,
			1,
			4,
			27,
			256
		];

		assert.deepEqual( actual, expected );

		// Typed arrays...
		data = new Int32Array( data );
		actual = new Int32Array( data.length );

		actual = pow( actual, data, y );
		expected = new Int32Array( expected );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pow( [], [], 1 ), [] );
		assert.deepEqual( pow( new Int8Array(), new Int8Array(), 1 ), new Int8Array() );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = pow( actual, data, 1 );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		actual = new Array( data.length );
		y = [ 1, 2, 3, 4 ];
		actual = pow( actual, data, y );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		data = [ 1, 2, 3 ];
		y = null;
		actual = new Array( data.length );
		actual = pow( actual, data, y );
		expected = [ NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		data = [ 1, null, 3 ];
		y = new Int32Array( [1,2,3] );
		actual = new Array( data.length );
		actual = pow( actual, data, y );
		expected = [ 1, NaN, 27 ];

		assert.deepEqual( actual, expected );

	});

	it( 'should throw an error if provided an exponent array which is not of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			pow( [], [1,2], [1,2,3] );
		}
		expect( foo2 ).to.throw( Error );
		function foo2() {
			pow( [], [1,2], new Int32Array( [1,2,3] ) );
		}
	});

});
