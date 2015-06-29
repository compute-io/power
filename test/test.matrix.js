/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	pow = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix pow', function tests() {

	var out1, out2,
		mat,
		d1,
		d2,
		d3,
		i;

	d1 = new Float64Array( 25 );
	d2 = new Float64Array( 25 );
	d3 = new Float64Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i;
		d2[ i ] = Math.pow( i, i );
		d3[ i ] = Math.pow( i, 2 );
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'float64' );
		out1 = matrix( d2, [5,5], 'float64' );
		out2 = matrix( d3, [5,5], 'float64' );
	});

	it( 'should export a function', function test() {
		expect( pow ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			pow( matrix( [10,10] ), mat, 1 );
		}
	});

	it( 'should throw an error if provided an exponent matrix which is not of equal dimensionality as the base matrix', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			pow( matrix( [5,5] ), mat, matrix( [10,10] ) );
		}
	});

	it( 'should raise each matrix element to a scalar power', function test() {
		var actual;

		actual = matrix( [5,5], 'float64' );
		actual = pow( actual, mat, 2 );

		assert.deepEqual( actual.data, out2.data );
	});

	it( 'should compute the power of a base matrix and exponent matrix', function test() {
		var actual;

		actual = matrix( [5,5], 'float64' );
		actual = pow( actual, mat, mat );

		assert.deepEqual( actual.data, out1.data );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( pow( out, mat, 1 ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( pow( out, mat, 1 ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( pow( out, mat, 1 ).data, expected );
	});

});
