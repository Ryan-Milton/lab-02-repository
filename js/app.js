'use strict';

function Horn(hornObject) {
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}

Horn.allHorns = [];

Horn.prototype.render = function() {
  $('main').append('<section class="clone"></section>');
  const $hornClone = $('section[class="clone"]');
  const $hornHtml = $('#photo-template').html();
  $hornClone.html($hornHtml);

  $hornClone.find('h2').text(this.title);
  $hornClone.find('img').attr('src', this.image_url);
  $hornClone.find('p').text(this.description);
  $hornClone.removeClass('clone');
  $hornClone.addClass(this.title);
}

Horn.readJson = () => {
  $.get('/data/page-1.json', 'json')
    .then(data => {
      data.forEach(horn => {
        Horn.allHorns.push(new Horn(horn));
      })
    })
    .then(Horn.loadHorns)
}

Horn.loadHorns = () => {
  console.log(Horn.allHorns);
  Horn.allHorns.forEach(horn => horn.render());
}

$(() => Horn.readJson());

