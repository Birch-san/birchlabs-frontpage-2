require('bootstrap/dist/js/umd/scrollspy');
const $ = require('jquery');

$('body').scrollspy({
    target: '.bs-docs-sidebar',
    offset: 40
});