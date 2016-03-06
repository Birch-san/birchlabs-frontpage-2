# birchlabs-frontpage-2
Attempt 2 to provide a simple plaintext sitemap on the frontpage of Birchlabs.co.uk

Attempt 1 was [here](https://github.com/Birch-san/birchlabs-frontpage).

## Goals

Intention is to optimize frontpage for search engines.

This means:
- no Flash on frontpage.
- fast time-to-initial-paint
  - deferred CSS loading
- text and hyperlinks up the yin-yang

This will also give mobile users the ability to find their way to any non-Flash content on the website.

## Development

For now I will be using [`Brackets.app`](http://brackets.io/) to edit the webpage live.

### Page-load

I am deferring CSS loading, using code from [Google PageSpeed](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#example).

This enables me to present quickly a "minimum viable site" — styling can arrive slightly later. I don't mind the "Flash of Unstyled Content". _Yet._

## Attribution

### CSS reset
I've always wanted an excuse to use Matthew Blode's [Marx CSS](https://github.com/mblode/marx) stylesheet. So here we go.

### `Elevator.js`
We use Tim Holman's [`Elevator.js`](https://github.com/tholman/elevator.js) for scrolling large webpages.

#### Elevator sounds

##### Bell
[BenSound](http://www.bensound.com/)

##### Music
[Full Moon Samba](http://homepage3.nifty.com/shibayan/stal1301/)

Arrange: _だ_  
Album: _TOHO BOSSA NOVA 2_  
Album Artist: _ShibayanRecords_  