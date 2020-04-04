'use strict';
// let ArryKeys = [];
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
        var rendered = Mustache.render($hornClone, this);
        $("main").append(rendered);
    };

    Horns.prototype.render2 = function () {
        let $hornClone = $("#photo-template").html();
        let rendered2 = Mustache.render($hornClone, this);
        $("main").append(rendered2);
    };

    Horns.prototype.renderSelect = function (arry) {
        arry.forEach((val) => {
            let selectMenu = $('.sel');
            // if(!(ArryKeys.includes(this.keyword))){
            //     ArryKeys.push(this.keyword);
            selectMenu.append(`<option> ${val} </option>`);
        });
    };


    const readJson0 = () => {
        $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(data => {
            data.forEach(hornItem0 => {
                let horn = new Horns(hornItem0);
                if (!(page1.includes(horn.keyword))) {
                    page1.push(horn.keyword);
                }
                horn.render();
                console.log(page1)

                horn.renderSelect(page1);
            });
        });
    };

    const readJson1 = () => {
        $.ajax("data/page-2.json", { method: "GET", dataType: "JSON" }).then(data => {
            data.forEach(hornItem1 => {
                let horn = new Horns(hornItem1);
                if (!(page2.includes(horn.keyword))) {
                    page2.push(horn.keyword);
                }
                horn.render2();
                console.log(page2)
                horn.renderSelect(page1);
            });
        });
    };
    readJson0();
    // readJson1();


    $('#pages').on('click', function (input) {
        if (input.target.id === "p1") {
            allHorns = [];
            $('div').remove();
            $('select option').remove();
            readJson0();
        } else
            if (input.target.id === "p2") {
                allHorns = [];
                $('div').remove();
                $('select option').remove();
                readJson1();
            }
    });

    $('input').click(() => {

    });


    // $('#p2').on('click', function(){
    //     $('main').empty();
    //     readJson(2); 
    // });
});

$('.sel').change(function () {
    let val = $(this).children('option:selected').val();
    // ArryKeys.forEach(function(val){
    // if(keys === val){
    $('div').hide();
    $(`.${val}`).show();
});

// helper function idea..from https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
function sortBy(arry, value) {
    return arry.sort(function (a, b) {
        let x = a[value]; let y = b[value];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


$('#sortByTitle').click(function () {
    $('div').remove();
    sortBy(allHorns, 'title');
    allHorns.forEach((value) => {
        value.render();
        $('#sort').show();
    });
});

$('#sortByHorns').click(function () {
    $('div').remove();
    sortBy(allHorns, 'horns');
    allHorns.forEach((value) => {
        value.render();
        $('#sort').show();
    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////

