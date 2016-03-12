require('bootstrap/dist/js/umd/scrollspy');
const $ = require('jquery');

$('body').scrollspy({
    target: '#maincontent',
    offset: 40
});