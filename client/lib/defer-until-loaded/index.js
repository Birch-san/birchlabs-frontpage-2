module.exports = function(callback) {
	(window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.addEventListener.bind(null, 'load'))(function() {
		callback();
	});
};