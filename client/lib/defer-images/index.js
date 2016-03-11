/**
	Defer image loading
	https://varvy.com/pagespeed/defer-images.html
	*/
function imgGet() {
	var imgDefer = document.getElementsByTagName('img');
	for (var i=0; i<imgDefer.length; i++) {
		if (imgDefer[i].getAttribute('data-src')) {
			imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
		}
	}
}

require('../defer-until-loaded')(imgGet);