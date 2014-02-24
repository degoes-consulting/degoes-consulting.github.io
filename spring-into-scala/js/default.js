var currentLocation = window.location.href;

$(document).ready(function(){

    //CURRENT LOCATION
    if (currentLocation == "") {
        console.log("Correct Page Reached");
    }

    //SCROLL ANIMATIONS
    $(window).scroll(function(){
        var scrollPosition = $('body').scrollTop();

        if (scrollPosition >= "100") {
            $("#to-top").stop().animate({opacity: 1.0},1000)
            

        } else if (scrollPosition <= "100") {
            $("#to-top").stop().animate({opacity: 0.0},1000)
        }
    });

    //DYNAMIC FLOAT CLEARING
    $(".js-clear-float").after("<div class='clear'></div>")

    $(".add-menu").each(function(){
        var thisLink = $(this).html();
        var hashLink = thisLink.replace(/ /g,"_")

        $(this).attr('id', "autolink_" + hashLink);

        var newLink = "<a href='#autolink_" + hashLink + "'>" + thisLink + "</a>"
        $("#header-menu").append(newLink);
    });

    //SMOOTH SCROLL
    $("#header-menu").on("click", "a", function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 52
        }, 500);
    });

    //CREATE DIV
    function createIntDiv(){
        $("body").prepend("<div id='interactive-div'></div>");
    }

    function createOverlay(imageHeight, imageWidth) {
        $("body").prepend("<div id='overlay'></div>");

        $("#overlay").on("click", function(){
            $(this).remove();

            $("#interactive-div").animate({
                opacity: 0.0,
                zIndex: 0
            }, 200);

        });

        $("#interactive-div").css({
            width: imageWidth + "px",
            height: imageHeight + "px",
            zIndex: 1100
        });

        function positionDiv(imageHeight, imageWidth) {
            var hDivPosition = (($(window).width()) -imageWidth) / 2;
            var vDivPosition = (($(window).height()) -imageHeight) / 2;

            $("#interactive-div").css({
            left: hDivPosition,
            top: vDivPosition,
            zIndex: 1100
            });
        }

        $(window).resize(function(){
            positionDiv();
        });
        positionDiv(imageHeight, imageWidth);

        $("#interactive-div").animate({
            opacity: 1.0
        }, 500);
    }

    function rotateBulllets(){
        currentBullet = $(".bullet-active").index();

        if (currentBullet <= 1) {         

            $(".bullet-active").next("p").addClass("bullet-active");
            $(".bullet-active:nth-child(" + (currentBullet + 1) + ")").removeClass("bullet-active");
        } else {
            $(".bullet-active").removeClass("bullet-active");
            $("#header-bullets p:first-child").addClass("bullet-active");
        }
    }

    setInterval(function(){
        rotateBulllets();
    } ,8000);

    $("#to-top").click(function(){
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    $('.tooltip').tooltipster();

});
