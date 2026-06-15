
// 모바일
function mob() {
    if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        navigator.maxTouchPoints == 5
    ) {
        return true;
    } else {
        return false;
    }
}



// 스크롤시 헤더 배경, 서브 사이드버튼 노출
let scrollh = 0;

$(window).scroll(function () {
    let sctop = $(window).scrollTop();
    
    if(sctop > 150){
        $('.header').addClass('scroll');
        $('.sideFix').addClass('show');
        scrollh = 1;
    }else{
        $('.header').removeClass('scroll');
        $('.sideFix').removeClass('show');
        scrollh = 0;
    }
});





// 헤더 햄버거메뉴

let hamchk = 0;

$('.header .wrap .hamWrap').click(function () {
    if(hamchk == 0){
        $('.header').addClass('ham');
        
        hamchk = 1;
    }else{
        $('.header').removeClass('ham');

        hamchk = 0;
    }
});







// 서브 사이드 - top버튼
$('.sideFix .totop').click(function () {
    gsap.to(window, { scrollTo: 0, duration: .4 });
});




