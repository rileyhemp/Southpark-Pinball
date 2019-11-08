"use strict";

var PATHS = {
  center: [[{
    "x": 36,
    "y": 2.24
  }, {
    "x": 44.57,
    "y": 2.24
  }, {
    "x": 55.020179748535156,
    "y": 19.666889190673828
  }, {
    "x": 79.25,
    "y": 30.46
  }, {
    "x": 81.87390899658203,
    "y": 30.349853515625
  }, {
    "x": 105.85296630859375,
    "y": 14.270150184631348
  }, {
    "x": 111.56,
    "y": 1.4600000000000009
  }, {
    "x": 118.56,
    "y": 2.120000000000001
  }, {
    "x": 151.26,
    "y": 27.830000000000002
  }, {
    "x": 153.10999999999999,
    "y": 39.300000000000004
  }, {
    "x": 142.20065307617188,
    "y": 46.305519104003906
  }, {
    "x": 125.40999999999998,
    "y": 46.82000000000001
  }, {
    "x": 12,
    "y": 46.82000000000001
  }, {
    "x": 1.58,
    "y": 41.82000000000001
  }, {
    "x": 0.19799311459064484,
    "y": 34.324710845947266
  }, {
    "x": 2.76,
    "y": 28.35
  }]],
  dome: [[{
    "x": 446.24,
    "y": 827.87
  }, {
    "x": 444.13,
    "y": 238.14999999999998
  }, {
    "x": 442.10211181640625,
    "y": 228.07742309570312
  }, {
    "x": 433.84619140625,
    "y": 199.24974060058594
  }, {
    "x": 422.76007080078125,
    "y": 171.3866729736328
  }, {
    "x": 408.84393310546875,
    "y": 144.82647705078125
  }, {
    "x": 391.9287414550781,
    "y": 120.07354736328125
  }, {
    "x": 371.87274169921875,
    "y": 97.79727172851562
  }, {
    "x": 348.7080078125,
    "y": 78.78357696533203
  }, {
    "x": 322.7689208984375,
    "y": 63.7807502746582
  }, {
    "x": 294.707763671875,
    "y": 53.265907287597656
  }, {
    "x": 265.3387756347656,
    "y": 47.285682678222656
  }, {
    "x": 236.41,
    "y": 45.49
  }, {
    "x": 235.41392517089844,
    "y": 45.49195861816406
  }, {
    "x": 205.49740600585938,
    "y": 47.4446907043457
  }, {
    "x": 176.1228485107422,
    "y": 53.409400939941406
  }, {
    "x": 147.9877471923828,
    "y": 63.73202896118164
  }, {
    "x": 121.86506652832031,
    "y": 78.41664123535156
  }, {
    "x": 98.40857696533203,
    "y": 97.070556640625
  }, {
    "x": 77.99871063232422,
    "y": 119.02275085449219
  }, {
    "x": 60.73136520385742,
    "y": 143.5303497314453
  }, {
    "x": 46.52604293823242,
    "y": 169.93565368652344
  }, {
    "x": 35.27866744995117,
    "y": 197.7322235107422
  }, {
    "x": 27.170276641845703,
    "y": 226.5957489013672
  }, {
    "x": 26.77,
    "y": 228.66
  }, {
    "x": 25.84931755065918,
    "y": 256.5382080078125
  }, {
    "x": 27.333667755126953,
    "y": 286.4796447753906
  }, {
    "x": 30.07,
    "y": 298.28999999999996
  }, {
    "x": 38.10345458984375,
    "y": 314.219970703125
  }, {
    "x": 52.78065490722656,
    "y": 340.3835754394531
  }, {
    "x": 65.75999999999999,
    "y": 362.72999999999996
  }, {
    "x": 67.5577392578125,
    "y": 366.4654541015625
  }, {
    "x": 59.92999999999999,
    "y": 381.43999999999994
  }, {
    "x": 49.58372116088867,
    "y": 385.9788818359375
  }, {
    "x": 39.22999999999999,
    "y": 390.25999999999993
  }, {
    "x": 76.41999999999999,
    "y": 467.2099999999999
  }, {
    "x": 73.64999999999999,
    "y": 482.8399999999999
  }, {
    "x": 68.88726043701172,
    "y": 485.5157470703125
  }, {
    "x": 42.216888427734375,
    "y": 499.24908447265625
  }, {
    "x": 41.40999999999999,
    "y": 499.6499999999999
  }, {
    "x": 67.91,
    "y": 554
  }, {
    "x": 62,
    "y": 573.43
  }, {
    "x": 57.1133918762207,
    "y": 575.7965698242188
  }, {
    "x": 29.80116081237793,
    "y": 588.2052612304688
  }, {
    "x": 27,
    "y": 589.43
  }, {
    "x": 25.88,
    "y": 762.43
  }, {
    "x": 0,
    "y": 763
  }, {
    "x": 0,
    "y": 0
  }, {
    "x": 493.58,
    "y": 0
  }, {
    "x": 493.58,
    "y": 827.87
  }]],
  wallRight: [[{
    "x": 0,
    "y": 11.6
  }, {
    "x": 9.49,
    "y": 0
  }, {
    "x": 21.214332580566406,
    "y": 9.372706413269043
  }, {
    "x": 43.1563606262207,
    "y": 29.814062118530273
  }, {
    "x": 62.77341079711914,
    "y": 52.486385345458984
  }, {
    "x": 78.70394897460938,
    "y": 77.8544692993164
  }, {
    "x": 83.34,
    "y": 88.62
  }, {
    "x": 87.53771209716797,
    "y": 106.37994384765625
  }, {
    "x": 91.1250228881836,
    "y": 136.15789794921875
  }, {
    "x": 93.28205871582031,
    "y": 166.0790557861328
  }, {
    "x": 94.72172546386719,
    "y": 196.04403686523438
  }, {
    "x": 95.70508575439453,
    "y": 226.0277099609375
  }, {
    "x": 96.36056518554688,
    "y": 256.02044677734375
  }, {
    "x": 96.7603988647461,
    "y": 286.0176696777344
  }, {
    "x": 96.95246124267578,
    "y": 316.0169982910156
  }, {
    "x": 96.96210479736328,
    "y": 346.0169372558594
  }, {
    "x": 96.80140686035156,
    "y": 376.0164489746094
  }, {
    "x": 96.53,
    "y": 400.35
  }, {
    "x": 72.79,
    "y": 400.35
  }, {
    "x": 41.27,
    "y": 374.84
  }, {
    "x": 40.34124755859375,
    "y": 373.8278503417969
  }, {
    "x": 39.27,
    "y": 362.36999999999995
  }, {
    "x": 47.136573791503906,
    "y": 346.34210205078125
  }, {
    "x": 60.53083419799805,
    "y": 319.49822998046875
  }, {
    "x": 73.96661376953125,
    "y": 292.6750793457031
  }, {
    "x": 86.74000000000001,
    "y": 267.22999999999996
  }, {
    "x": 61.45,
    "y": 253.58
  }, {
    "x": 59.40736389160156,
    "y": 251.73934936523438
  }, {
    "x": 60.86,
    "y": 239.74
  }, {
    "x": 68.41696166992188,
    "y": 224.0526580810547
  }, {
    "x": 77.67,
    "y": 203.14000000000001
  }, {
    "x": 78.5342788696289,
    "y": 196.07095336914062
  }, {
    "x": 80.44832611083984,
    "y": 166.1365509033203
  }, {
    "x": 80.02020263671875,
    "y": 136.15713500976562
  }, {
    "x": 78.86,
    "y": 127.78000000000002
  }, {
    "x": 73.57482147216797,
    "y": 106.90953063964844
  }, {
    "x": 62.37949752807617,
    "y": 79.11400604248047
  }, {
    "x": 46.56938934326172,
    "y": 53.66512680053711
  }, {
    "x": 26.42408561706543,
    "y": 31.49163246154785
  }, {
    "x": 2.6473591327667236,
    "y": 13.2598237991333
  }]]
};
//# sourceMappingURL=paths.js.map
