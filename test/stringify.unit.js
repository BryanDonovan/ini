var tap = require("tap");
var ini = require("../");
var test = tap.test;

var config = {
    Section1: {
        WOOHOO: 'stuff'
    },
    Section2: {
        'ZIPPY.*': '@WOOHOO@',
        'SOME_ARRAY.*': [
            'one,',
            'two,',
            'three,'
        ],
        'MY_ARGS.*': [
            'a',
            '-e b',
            '-p c',
            '-@foo@'
        ]
    },
    Section3: {
        'foo bar': '',
        'buzz fuzz': ''
    }
};

var expected = [
    '[Section1]',
    'WOOHOO = stuff',
    '',
    '[Section2]',
    'ZIPPY.* = @WOOHOO@',
    'SOME_ARRAY.* = one,',
    'SOME_ARRAY.* = two,',
    'SOME_ARRAY.* = three,',
    'MY_ARGS.* = a',
    'MY_ARGS.* = -e b',
    'MY_ARGS.* = -p c',
    'MY_ARGS.* = -@foo@',
    '',
    '[Section3]',
    'foo bar',
    'buzz fuzz'
].join('\n') + '\n';

test("encode from data", function (t) {
    var e = ini.encode(config, {whitespace: true});
    t.deepEqual(e, expected);
    t.end();
});
