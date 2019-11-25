import $ from 'jquery';

let right = document.getElementsByClassName("right");
let left = document.getElementsByClassName("left");

// document.getElementsByClassName("r-btn").click(console.log("clicked"));
$('.r-btn').on('click', function(event){
    right.addClass('r-active').removeClass('r-inactive');
    right.css('transform', 'rotate(-31deg) translate(-650px, 115px)');
    right.css('transition', '0.4s ease-in-out');
    $(this).fadeOut(100);
    $('.r-disc').fadeOut(400);
    $('.l-btn').fadeIn(400);
    $('.l-disc').fadeIn(400);
    left.addClass('l-active').removeClass('l-inactive');
    left.css('transform', 'rotate(-31deg) translate(-60px, -184px)');
    left.css('transition', '0.4s ease-in-out');
});

$('.l-btn').on('click', function(event){
    right.addClass('r-inactive').removeClass('r-active');
    right.css('transform', 'rotate(-31deg) translate(-50px, 116px)');
    right.css('transition', '0.4s ease-in-out');
    $(this).fadeOut(100);
    $('.l-disc').fadeOut(400);
    $('.r-btn').fadeIn(400);
    $('.r-disc').fadeIn(400);
    left.addClass('l-active').removeClass('l-inactive');
    left.css('transform', 'rotate(-31deg) translate(-660px, -184px)');
    left.css('transition', '0.4s ease-in-out');
});
