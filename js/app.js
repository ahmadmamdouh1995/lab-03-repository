'use strict';
let ArryKeys = [];
let allHorns = [];
$(document).ready(function () {
    function Horns(horn) {
        this.title = horn.title;
        this.image_url = horn.image_url;
        this.description = horn.description;
        this.keyword = horn.keyword;
        this.horns = horn.horns;
        allHorns.push(this);
    }
  //0 new array for keywords

    Horns.prototype.render = function () {
        let $hornClone = $("#photo-template").clone();
        $hornClone.find("h2").text(`Name : ${this.title}`);
        $hornClone.find("img").attr("src", this.image_url);
        $hornClone.find('p').text(`Description :${this.description}`);
        $hornClone.removeAttr('id');
        $hornClone.attr('class', this.keyword);
        $("main").append($hornClone);
    };
    
    Horns.prototype.renderSelect =function() {
        let selectMenu = $('.sel');
        if(!(ArryKeys.includes(this.keyword))){
            ArryKeys.push(this.keyword);
            selectMenu.append(`<option> ${this.keyword} </option>`);
        }
        // get the select
        // loop through all the keywords
        // add it to the select Hint (.append()) TODO search for it
    };
    
    const readJson = () => {
        $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(data => {
            data.forEach(hornItem => {
                let horn = new Horns(hornItem);
                horn.renderSelect();
                horn.render();
                 // if its not in the keyword array
                 // added it there
            });
            // renderSelect();
        })
    };
    readJson();
});
        $('.sel').change(function() {
            let keys = $(this).children('option:selected').val();
            ArryKeys.forEach(function(val){
                if(keys === val){
                    $('div').hide();
                    $(`.${val}`).show();
                    console.log(5);
                }
            });
            // 1 get the value ===> keyword hint $(this)
            // 2 hide the elements and only show the ones with id == keyword
          });

/////////////////////////////////////////////////////////////////////////////////////////////////////////

