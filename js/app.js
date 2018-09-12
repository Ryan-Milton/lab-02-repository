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
  $hornClone.addClass(this.keyword);
}

Horn.readJson = () => {
  $.get('/data/page-1.json', 'json')
    .then(data => {
      data.forEach(horn => {
        Horn.allHorns.push(new Horn(horn));
      })
    })
    .then(Horn.loadHorns)
    .then(Horn.createFilter)
}

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => horn.render());
}

$(() => Horn.readJson());

//Filter set up

let hornedAnimals = [];

Horn.createFilter = () => {
  Horn.allHorns.forEach(horn => {
    if(hornedAnimals.indexOf(horn.keyword) === -1) {
      hornedAnimals.push(horn.keyword);
    }
  })
  console.log(hornedAnimals)
}

let createDropdown = function() {
  $('select').append('<option class="clone"></option>');
  const $hornFilter = $('option[class="clone"]');

  $hornFilter.find('option').text(hornedAnimals.toString());
  $hornFilter.removeClass('clone');
}

Horn.loadFilters = () => {
  hornedAnimals.forEach(horn => createDropdown(horn));
}

Horn.loadFilters();


