/*
 * Copyright (C) 2015 Sean T. McBeth <sean@seanmcbeth.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global Assert */

"use strict";

Primrose.Text.Grammar.tests = {
  aSimpleString: function () {
    var src = "\"a\"";
    var tokens = Primrose.Text.Grammars.JavaScript.tokenize( src );
    var res = tokens.map( function ( t ) {
      return t.value;
    } )
        .join( "" );
    Assert.areEqual( src, res );
    Assert.areEqual( "strings", tokens[0].type, "token types do not match" );
  },
  twoStrings: function () {
    var src = "\"a\" b \"c\"";
    var tokens = Primrose.Text.Grammars.JavaScript.tokenize( src );
    var res = tokens.map( function ( t ) {
      return t.value;
    } )
        .join( "" );
    Assert.areEqual( src, res );
    Assert.areEqual( "strings", tokens[0].type, "0: token incorrect type" );
    Assert.areEqual( "regular", tokens[1].type, "1: token incorrect type" );
    Assert.areEqual( "strings", tokens[2].type, "2: token incorrect type" );
  },
  singleLineBlockComment: function () {
    var src = "/* asdf one 2 three 4 */";
    var tokens = Primrose.Text.Grammars.JavaScript.tokenize( src );
    var res = tokens.map( function ( t ) {
      return t.value;
    } )
        .join( "" );
    Assert.areEqual( src, res );
    Assert.areEqual( "comments", tokens[0].type,
        "token types do not match" );
  },
  multiLineBlockComment: function () {
    var src = "/*\n asdf one\n2 three 4\n*/";
    var tokens = Primrose.Text.Grammars.JavaScript.tokenize( src );
    var res = tokens.map( function ( t ) {
      return t.value;
    } )
        .join( "" );
    Assert.areEqual( src, res );
    Assert.areEqual( "comments", tokens[0].type,
        "token types do not match" );
  },
  multipleMultiLineBlockComment: function () {
    var src =
        "/*\n asdf one\n2 three 4\n*/\nfunction(){\n/*\n asdf one\n2 three 4\n*/\n}";
    var tokens = Primrose.Text.Grammars.JavaScript.tokenize( src );
    var res = tokens.map( function ( t ) {
      return t.value;
    } )
        .join( "" );
    Assert.areEqual( src, res );
    Assert.areEqual( "comments", tokens[0].type,
        "0: token types do not match" );
    Assert.areEqual( "comments", tokens[4].type,
        "4: token types do not match." + tokens[5].value );
  },
  bigTest: function () {
    var src = "function Hello (){\n" +
        "    // a comment\n" +
        "    function MyFunc ( ) {\n" +
        "        var x = \"Whatever\";\n" +
        "        console.log(x + \" World\");\n" +
        "        /*\n" +
        "          a longer comment\n" +
        "        */\n" +
        "    }\n" +
        "}";
    var tokens = Primrose.Text.Grammars.JavaScript.tokenize( src );
    var res = tokens.map( function ( t ) {
      return t.value;
    } )
        .join( "" );
    Assert.areEqual( src, res );
  }
};