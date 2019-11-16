const PATHS = {

    bumperA: [[{"x":31,"y":44.22},{"x":4.79292106628418,"y":32.15681457519531},{"x":2,"y":23.11},{"x":12.630586624145508,"y":6.777872562408447},{"x":31,"y":2},{"x":41.656150817871094,"y":3.4725441932678223},{"x":60,"y":23.11},{"x":59.95499038696289,"y":24.29776954650879},{"x":39.362300872802734,"y":43.332698822021484}]],

    leftRampRight: [[{"x":37.3,"y":45.48},{"x":22.52,"y":34.3},{"x":8.8,"y":20.05},{"x":0,"y":4.57},{"x":32.19,"y":0},{"x":39.41,"y":40.11}]],
    
    rightLane: [[{"x":13.55,"y":149.36},{"x":9.68,"y":140.74},{"x":0,"y":133.7},{"x":69.31,"y":91},{"x":81.22344207763672,"y":78.9212875366211},{"x":84.79,"y":63.51},{"x":84.13349151611328,"y":49.542930603027344},{"x":82.36869049072266,"y":19.594987869262695},{"x":81.1,"y":0},{"x":86.38,"y":0},{"x":93.06,"y":98}]],
    
    rightTrapCowl: [[{"x":49,"y":67.4},{"x":54,"y":25.500000000000007},{"x":32.27,"y":18.16},{"x":0,"y":81.54},{"x":3.17,"y":0},{"x":50.86,"y":6},{"x":67.42,"y":18.16},{"x":72.57,"y":33},{"x":68.35,"y":50.67},{"x":45.12,"y":97.37},{"x":41.629999999999995,"y":95.88000000000001}]],    
    
    farRightWall: [[{"x":12.82,"y":2},{"x":76.45,"y":726.35},{"x":62.21,"y":726.35},{"x":2.17,"y":2}]],
    
    leftRampLeft: [[{"x":9,"y":51.72},{"x":2.37,"y":34},{"x":0,"y":0},{"x":4.22,"y":0},{"x":9.219999999999999,"y":37.73},{"x":30.59,"y":69.53},{"x":84.16,"y":114.53},{"x":47.5,"y":131.94}]],
    
    rightRampLeft: [[{"x":20.18,"y":59},{"x":31,"y":100.27},{"x":29,"y":127.72},{"x":23.53,"y":127.72},{"x":20.18,"y":90.25},{"x":18.18,"y":78.64},{"x":5,"y":63.77},{"x":1.58,"y":21.88},{"x":0,"y":0},{"x":20.18,"y":0},{"x":29,"y":21.88},{"x":18,"y":46.93}]],
    
    rightWallA: [[{"x":0.7899999999999999,"y":157.62},{"x":0,"y":0},{"x":7.39,"y":0},{"x":14,"y":157.62}]],
    
    killZone: [[{"x":0,"y":206},{"x":505.2,"y":206},{"x":496.34,"y":99.13},{"x":459.68,"y":99.13},{"x":451.76,"y":0},{"x":431.71,"y":0},{"x":296.07,"y":105.2},{"x":279.1683654785156,"y":115.37567901611328},{"x":250.9095458984375,"y":125.18033599853516},{"x":234.32999999999998,"y":126.84},{"x":221.08441162109375,"y":125.68494415283203},{"x":192.63621520996094,"y":116.4526138305664},{"x":169.94,"y":103},{"x":40.11,"y":0},{"x":17.42,"y":0}]],
    
    leftSlingshot: [[{"x":33.78,"y":89.81},{"x":5.780000000000001,"y":72.22},{"x":0.88,"y":67.64},{"x":0,"y":61.13},{"x":3,"y":3.25},{"x":19.18,"y":0},{"x":51.18,"y":79.43}]],
    
    rightRampRight: [[{"x":14.25,"y":42.78},{"x":0,"y":0.64},{"x":5.39,"y":0},{"x":30.08,"y":9},{"x":33.51,"y":13.219999999999999},{"x":39.629999999999995,"y":35.91}]],
    
    rightWallB: [[{"x":33,"y":209},{"x":26.39,"y":83.12},{"x":20.19,"y":81.80000000000001},{"x":16.36,"y":73.89000000000001},{"x":7.92,"y":71},{"x":2.37,"y":71.8},{"x":0,"y":70.72},{"x":23,"y":0},{"x":27.48,"y":0},{"x":40.37,"y":209}]],
    
    leftLane: [[{"x":79.52,"y":149.36},{"x":83.39,"y":140.74},{"x":93.06,"y":133.74},{"x":23.75,"y":91},{"x":11.831374168395996,"y":78.91203308105469},{"x":8.27,"y":63.51},{"x":8.931233406066895,"y":49.53251647949219},{"x":10.715677261352539,"y":19.58576011657715},{"x":12,"y":0},{"x":6.68,"y":0},{"x":0,"y":98}]],
    
    leftWall: [[{"x":0,"y":180.23},{"x":14.51,"y":0.6599999999999999},{"x":48.82,"y":0},{"x":47.23,"y":31.23},{"x":34.41,"y":47.08},{"x":22.409999999999997,"y":81.36},{"x":22.409999999999997,"y":81.36},{"x":14.489999999999997,"y":181.36}]],    
    
    rightSlingshot: [[{"x":0,"y":79.43},{"x":32,"y":0},{"x":48.2,"y":3.25},{"x":51.2,"y":61.13},{"x":50.32,"y":67.64},{"x":45.4,"y":72.22},{"x":17.4,"y":89.81}]],
    
    topLoop: [[{"x":0,"y":414.42},{"x":38,"y":0},{"x":417.46,"y":0},{"x":424.14,"y":76.79},{"x":413.5,"y":76.79},{"x":409.81,"y":53.440000000000005},{"x":406.64,"y":44.330000000000005},{"x":401.49,"y":35.620000000000005},{"x":394.76,"y":28.240000000000006},{"x":386.76,"y":22.170000000000005},{"x":377.26,"y":17.420000000000005},{"x":367.76,"y":13.850000000000005},{"x":352.98,"y":10.420000000000005},{"x":336.45,"y":8.84},{"x":318.5,"y":8.84},{"x":293.3,"y":11.48},{"x":266.52,"y":14.25},{"x":244.08999999999997,"y":16.62},{"x":223,"y":19.4},{"x":205.56,"y":22},{"x":189.73,"y":24.8},{"x":172.04999999999998,"y":28.240000000000002},{"x":154.63,"y":32.190000000000005},{"x":129.74,"y":38.09},{"x":116.81,"y":42.220000000000006},{"x":103.81,"y":47.06},{"x":89.28,"y":53.83},{"x":77,"y":60.78},{"x":67.5,"y":67.78},{"x":59.4,"y":75.17},{"x":51.9,"y":83.39},{"x":44.86,"y":97},{"x":42,"y":116.2},{"x":44.5,"y":145.27},{"x":53.21,"y":194.74},{"x":78.9,"y":302.8},{"x":67.27,"y":413.13}]],
    
    leftLoopTop: [[{"x":57.09,"y":61.34},{"x":0,"y":68.47},{"x":5.94,"y":36.69},{"x":15.309999999999999,"y":23.61},{"x":47,"y":0}]],
    
    midTargetLeft: [[{"x":30.53,"y":37.48},{"x":2.530000000000001,"y":42.66},{"x":0,"y":25.05},{"x":110,"y":0},{"x":111,"y":24.94},{"x":82,"y":24.94},{"x":82,"y":46.81},{"x":75.65,"y":81},{"x":77.5,"y":88.76},{"x":61.93,"y":107.8},{"x":66.07,"y":153.49},{"x":65.83999999999999,"y":161.89000000000001},{"x":61.139999999999986,"y":161.89000000000001},{"x":33.92,"y":37.48}]],
    
    rightTargets: [[{"x":30.88,"y":49.48},{"x":22.79,"y":62.94},{"x":12,"y":69.74},{"x":0,"y":69.74},{"x":6,"y":0},{"x":18.3,"y":1.58},{"x":30.880000000000003,"y":20.58},{"x":30.880000000000003,"y":49.48}]],
    
    leftRampBottomLeft: [[{"x":25,"y":0},{"x":25,"y":60.55},{"x":41.7,"y":86.63},{"x":66.94,"y":119.91999999999999},{"x":35.08,"y":146.84},{"x":0,"y":146.84},{"x":11.39,"y":0}]],

    leftRampBottomRight: [[{"x":0.23,"y":0},{"x":0.0005625783232972026,"y":29.998876571655273},{"x":0.23,"y":39.71},{"x":8.730074882507324,"y":58.11648178100586},{"x":14.23,"y":69.37},{"x":33.64,"y":96.86},{"x":40.26,"y":105},{"x":47.86,"y":99.46},{"x":30.68,"y":0}]],

    rightRampBottom: [[{"x":0,"y":16.78},{"x":23.60584259033203,"y":0.3867253363132477},{"x":28,"y":0},{"x":50.96710205078125,"y":9.243999481201172},{"x":50.96710205078125,"y":9.243999481201172}]],

    rightRampTop: [[{"x":38.53,"y":63.33},{"x":46.26211166381836,"y":35.074588775634766},{"x":65.18,"y":21.9},{"x":71.42157745361328,"y":19.655244827270508},{"x":91.3,"y":13.46},{"x":107.14,"y":11.080000000000002},{"x":124.08,"y":11.080000000000002},{"x":129.3667449951172,"y":12.119851112365723},{"x":150.37,"y":16.62},{"x":181.81,"y":29.82},{"x":200.55,"y":49.61},{"x":207.15,"y":76.78999999999999},{"x":219.15,"y":76.78999999999999},{"x":212.42,"y":0},{"x":10.63,"y":0},{"x":0,"y":32.88},{"x":9.76,"y":50.88},{"x":31.93,"y":63.33}]],

    rightRampDivider: [[{"x":35.84,"y":126.05},{"x":8.9,"y":128.33},{"x":4.75,"y":121},{"x":0,"y":99},{"x":0,"y":54.9},{"x":3.83,"y":0},{"x":22.41,"y":0}]],

    leftRampTop: [[{"x":119.05,"y":45},{"x":110.6,"y":29.29},{"x":93.6,"y":18.74},{"x":66.8,"y":14.51},{"x":43.58,"y":15.83},{"x":20.88,"y":26.92},{"x":10.059999999999999,"y":40.92},{"x":8.219999999999999,"y":59.92},{"x":0,"y":59.92},{"x":4.26,"y":13.46},{"x":5.84,"y":0},{"x":119.05,"y":0},{"x":132.35999999999999,"y":43.19}]],

    leftRampBottom: [[{"x":0,"y":16.78},{"x":23.60584259033203,"y":0.3867253363132477},{"x":28,"y":0},{"x":50.96710205078125,"y":9.243999481201172},{"x":50.96710205078125,"y":9.243999481201172}]],

    leftRampDiverter: [[{"x":49.18,"y":51.83},{"x":43.77,"y":33},{"x":30.4,"y":23.84},{"x":10.399999999999999,"y":22.78},{"x":0,"y":25.48},{"x":2.25,"y":0},{"x":67.17,"y":0},{"x":68.35000000000001,"y":50.93}]],
}