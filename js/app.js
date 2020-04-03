'use strict';
let ArryKeys = [];
let allHorns = [];
let page1 = [];
let page2 = [];
$(document).ready(function () {
    function Horns(horn) {
        this.title = horn.title;
        this.image_url = horn.image_url;
        this.description = horn.description;
        this.keyword = horn.keyword;
        this.horns = horn.horns;
        allHorns.push(this);
    }

    Horns.prototype.render = function () {
        let $hornClone = $("#photo-template").html();
        var rendered = Mustache.render($hornClone , this);
        $("main").append(rendered);
    };
    
    Horns.prototype.renderSelect =function() {
        let selectMenu = $('.sel');
        if(!(ArryKeys.includes(this.keyword))){
            ArryKeys.push(this.keyword);
            selectMenu.append(`<option> ${this.keyword} </option>`);
        }
   };

       
    const readJson = (num) => {
        $.ajax(`data/page-${num}.json`, { method: "GET", dataType: "JSON" }).then(data => {
            data.forEach(hornItem => {
                let horn = new Horns(hornItem);
                horn.renderSelect();
                horn.render();
            });
       })
    };
    readJson(1);
    readJson(2);


    $('#p1').on('click', function(){
              
    });


    $('#p2').on('click', function(){
       
    });
});

        $('.sel').change(function() {
            let keys = $(this).children('option:selected').val();
            ArryKeys.forEach(function(val){
                if(keys === val){
                    $('div').hide();
                    $(`.${val}`).show();
                    
                }
            });
         });

/////////////////////////////////////////////////////////////////////////////////////////////////////////

