# birchlabs-frontpage-2
Attempt 2 to provide a simple plaintext sitemap on the frontpage of Birchlabs.co.uk

Attempt 1 was [here](https://github.com/Birch-san/birchlabs-frontpage).

## Goals

Intention is to optimize frontpage for search engines.

This means:
- no Flash on frontpage.
- fast time-to-initial-paint
- text and hyperlinks up the yin-yang

This will also give mobile users the ability to find their way to any non-Flash content on the website.

## Development

### Pre-requisites

You may as well update Node and `npm` to the very latest versions.

Mac users who installed Node via Homebrew can update both of those [like so](http://stackoverflow.com/a/11298299/5257399):

```bash
brew update
brew upgrade node
npm install -g npm
```

You should globally install bleeding-edge versions of `webpack` and `webpack-dev-server`.

```bash
npm install -g webpack@^2.1.0-beta.4 webpack-dev-server@^2.0.0-beta
```

> Note: it's _possible_ that installing `webpack` and `webpack-dev-server` globally is *not* strictly necessary, as we `npm install` those anyway as dev dependencies, and we launch at least `webpack-dev-server` from the `node_modules` folder.

### Acquiring code

Clone this repository.

```bash
git clone https://github.com/Birch-san/birchlabs-frontpage-2.git
```

### Initial setup

Install, including dev dependencies.

```bash
npm install
```

### Serve website locally for development

This launches (on port 3000) a `webpack-dev-server`

```bash
npm start
```

The website is served on `http://localhost:3000/`.

### Build compressed production bundle

This uses Webpack, Babel, and UglifyJS to make a (relatively) small production distribution of the website.

```bash
npm run build
```

## Notes

When designing the original layout: I used [`Brackets.app`](http://brackets.io/) to edit the webpage live.

### Page-load

#### Deferred CSS

I had some cheeky code from [Google PageSpeed](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#example) to defer CSS loading.

I edited it to have less conditions, and to favor binding over assignment:

```js
(requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame || window.addEventListener.bind(null, 'load'))(function() {
	["https://cdnjs.cloudflare.com/ajax/libs/marx/1.3.0/marx.min.css"].forEach(function(s) {
		var l = document.createElement('link');
		l.rel = 'stylesheet';
		l.href = s;
		var h = document.getElementsByTagName('head')[0];
		h.parentNode.insertBefore(l, h);
	});
});
```

This enabled me to present quickly a "minimum viable site" — styling can arrive slightly later.

Buuut, the "Flash of Unstyled Content" got to me, and I reasoned that it is an acceptable amount of CSS, and it's cacheable and comes from a CDN.

#### Deferred Image loading

Code from [Varvy](https://varvy.com/pagespeed/defer-images.html).

We prevent images from having the power to prevent a page's becoming "loaded".

We set the image `src` to a base64-encoded 1px image, so that the image can begin its life "already loaded" — without waiting for data.

Once the page has finished its initial paint, we can begin fetching images.

Also: we reserve in advance the dimensions of the image, so that there is no reflowing of content once the image arrives.

## Further Attribution

### CSS reset
I've always wanted an excuse to use Matthew Blode's [Marx CSS](https://github.com/mblode/marx) stylesheet. So here we go.

### Elevator
We use Tim Holman's [`Elevator.js`](https://github.com/tholman/elevator.js) for scrolling large webpages.

#### Elevator sounds

##### Bell
[BenSound](http://www.bensound.com/)

##### Music
[Full Moon Samba](http://homepage3.nifty.com/shibayan/stal1301/)  
Arrange: _だ_  
Album: _TOHO BOSSA NOVA 2_  
Album Artist: _ShibayanRecords_  

### Scrollspy
[Bootstrap 4 Scrollspy](http://v4-alpha.getbootstrap.com/components/scrollspy/)

Thanks to [Gableroux's example](https://jsfiddle.net/gableroux/S2SMK/)