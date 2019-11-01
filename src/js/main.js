/*var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
var moveToSeg = path.createSVGPathSegMovetoRel(10, 10);
var lineToSeg = path.createSVGPathSegLinetoRel(100, 100);
path.pathSegList.appendItem(moveToSeg);
path.pathSegList.appendItem(lineToSeg);
console.log(path.getAttribute('d')); // m 10 10 l 100 100
moveToSeg.x += 200;
moveToSeg.y += 200;
console.log(path.getAttribute('d')); // m 210 210 l 100 100
VM398:6 m 10 10 l 100 100
VM398:9 m 210 210 l 100 100
undefined
path
<path d=​"m 210 210 l 100 100">​</path>​
path.createSVGPathSegMovetoRel(10, 10)
window.SVGPathSegMovetoRel {pathSegType: 3, pathSegTypeAsLetter: "m", _owningPathSegList: undefined, _x: 10, _y: 10}
Matter.Svg.pathToVertices(path.getAttribute('d'))
matter.js:7554 Uncaught TypeError: Cannot read property 'numberOfItems' of undefined
    at Object.Svg._svgPathToAbsolute (matter.js:7554)
    at Object.Svg.pathToVertices (matter.js:7496)
    at <anonymous>:1:12
Svg._svgPathToAbsolute @ matter.js:7554
Svg.pathToVertices @ matter.js:7496
(anonymous) @ VM768:1
path.pathSegList
window.SVGPathSegList {_pathElement: path, _list: Array(2), _mutationObserverConfig: {…}, _pathElementMutationObserver: MutationObserver}length: 2numberOfItems: 2_list: (2) [w…w.SVGPathSegMovetoRel, w…w.SVGPathSegLinetoRel]_mutationObserverConfig: {attributes: true, attributeFilter: Array(1)}_pathElement: path_pathElementMutationObserver: MutationObserver {}__proto__: Object
Matter.Svg.pathToVertices(path)
(2) [{…}, {…}]0: x: 210y: 210__proto__: Object1: x: 310y: 310__proto__: Objectlength: 2__proto__: Array(0)
let vertices = Matter.Svg.pathToVertices(path)
undefined
vertices
(2) [{…}, {…}]
let vertices = Matter.Svg.pathToVertices(path, [sampleLength=15])
VM1072:1 Uncaught SyntaxError: Identifier 'vertices' has already been declared
    at <anonymous>:1:1
(anonymous) @ VM1072:1
Matter.Svg.pathToVertices(path, [sampleLength=15])
(2) [{…}, {…}]0: {x: 210, y: 210}1: {x: 310, y: 310}length: 2__proto__: Array(0)*/