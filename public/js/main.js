// se01

gsap.timeline()
.from('._m .se01 .wrap .lbx .about-greeting', { opacity: 0, y: -20, duration: .6 })
.from('._m .se01 .wrap .lbx .about-divider', { opacity: 0, scale: 0, duration: .5 }, '-=40%')
.from('._m .se01 .wrap .lbx .about-editorial-title', { opacity: 0, x: -40, duration: .8 }, '-=60%')
.from('._m .se01 .wrap .rbx .visual-container', { scale: 0.9, opacity: 0, duration: 1, ease: 'back.out(1.2)' }, '-=100%')
.from('._m .se01 .wrap .rbx .curved-text-wrap', { rotate: -180, opacity: 0, scale: 0.8, duration: 1.5, ease: 'power2.out' }, '-=80%')
.from('._m .se01 .wrap .rbx .star-ornament', { rotate: 90, scale: 0, opacity: 0, duration: 1.2, ease: 'back.out(1.5)' }, '-=120%')
.to('._m .se01 .wrap .snslist li', { transform: "translateY(0)", opacity: 1, duration: .6, stagger: .1 }, '-=80%')

ScrollTrigger.matchMedia({
    "(min-width: 821px)" : function () {
        // Handled naturally by flexbox layout
    },

    "(max-width: 820px)" : function () {
        // Handled naturally by responsive styles
    }

});





// se02
gsap.timeline({
    scrollTrigger: {
        id: 'se02Trigger',
        trigger: '._m .se02',
        start: 'top top',
        end: '+=50%',
        scrub: true,
        pin: true,
        onLeaveBack: function () {
            se02mo.reverse();
        },
    }
})
    .from('._m .se02 .motionTitle', { yPercent: 0 })
    
    .add(function () {
        se02mo.play();
    })
    .from('._m .se02 .motionTitle', { opacity: 1 }, '+=70%')
    

let se02mo = gsap.timeline();
se02mo
    .to('._m .se02 .motionTitle strong.whi', { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", duration: .6 })
    .from('._m .se02 .wrap dl dt', { yPercent: 30, opacity: 0, duration: .6 }, '-=100%')
    .from('._m .se02 .wrap dl dd', { yPercent: 30, opacity: 0, duration: .6 }, '-=80%')

se02mo.pause();



// se03

gsap.timeline({
    scrollTrigger: {
        trigger: '._m .se03',
        start: 'top center',
        toggleActions: 'play none none reverse',
    }
})
    .from('._m .se03 .wrap .secTitle', { opacity: 0, x: 40, duration: .8 })
    .from('._m .se03 .wrap .secDesc', { opacity: 0, x: 40, duration: .8 }, '-=80%')
    .from('._m .se03 .wrap > p', { opacity: 0, x: -40, duration: .8 }, '-=50%')






// se04











// se06
gsap.timeline({
    scrollTrigger: {
        trigger: '._m .se06',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
    }
})
.from('._m .se06 .wrap .secTitle', { opacity: 0, x: 40, duration: .8 })
.from('._m .se06 .wrap .secDesc', { opacity: 0, x: 40, duration: .8 }, '-=80%')

ScrollTrigger.matchMedia({
    "(min-width: 821px)" : function () {
        gsap.timeline({
            scrollTrigger: {
                trigger: '._m .se06',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        })
        .from('._m .se06 .wrap .stackCategory', { opacity: 0, stagger: .15, duration: .8, clearProps: "all" })
    },
    "(max-width: 820px)" : function () {
        gsap.timeline({
            scrollTrigger:{
                trigger:'._m .se06',
                start: 'top 85%',
                toggleActions:'play none none reverse',
            }                                                            
        })
        .from('._m .se06 .wrap .stackCategory', { opacity: 0, stagger: .15, duration: .8, clearProps: "all" })
    }
});





// 네비게이션 메뉴 클릭 시 해당 섹션으로 부드러운 스크롤 이동 연동
$('.menu a[href^="#"], .m_menu a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    let target = $(this).attr('href');
    
    // 모바일 메뉴가 열려있을 경우 닫기
    if ($('.header').hasClass('ham')) {
        $('.header').removeClass('ham');
        hamchk = 0;
    }
    
    let targetScroll;
    if (target === '#about') {
        targetScroll = 0;
    } else if (target === '#value') {
        let trigger = ScrollTrigger.getById("se02Trigger");
        if (trigger) {
            targetScroll = trigger.start + (trigger.end - trigger.start) * 0.5;
            // 인터랙션 즉시 완료 상태로 적용
            se02mo.progress(1);
        } else {
            targetScroll = $(target).offset().top + 200;
        }
    } else {
        targetScroll = target;
    }
    
    // 앵커 이동 처리 (ScrollSmoother가 활성화되어 있으면 scrollTo 사용, 모바일 등 비활성화 시 gsap scrollTo 사용)
    let smoother = ScrollSmoother.get();
    if (smoother) {
        if (typeof targetScroll === 'string') {
            smoother.scrollTo(targetScroll, true, "top 80px");
        } else {
            smoother.scrollTo(targetScroll, true);
        }
    } else {
        let scrollToOptions = { y: targetScroll, autoKill: true };
        if (typeof targetScroll === 'string') {
            scrollToOptions.offsetY = 80;
        }
        gsap.to(window, { scrollTo: scrollToOptions, duration: 0.8, ease: "power2.out" });
    }
});

// 스크롤 시 현재 활성화된 섹션에 따라 네비게이션 메뉴 하이라이팅 (on 클래스 적용)
const sections = ['#about', '#bio', '#value', '#metrics', '#projects', '#stacks'];
sections.forEach(id => {
    ScrollTrigger.create({
        trigger: id,
        start: (id === '#about' || id === '#bio') ? 'top 10%' : 'top 60%',
        end: 'bottom 60%',
        onToggle: self => {
            if (self.isActive) {
                // 데스크톱 메뉴 하이라이팅
                $('.header .wrap nav .menu li').removeClass('on');
                $(`.header .wrap nav .menu li a[href="${id}"]`).parent().addClass('on');
                
                // 모바일 메뉴 하이라이팅
                $('.total .m_menu > li').removeClass('on');
                $(`.total .m_menu > li a[href="${id}"]`).parent().addClass('on');
            }
        }
    });
});


// PROJECTS 섹션 Learn More 모달 오픈 연동
$('._m .se04 .wrap .bx .lbx .morebtn').on('click', function(e) {
    e.preventDefault();
    let $parent = $(this).closest('.bx');
    
    // 개편된 구조에 맞춰 텍스트 파싱
    let title = $parent.find('.lbx dl dd').text(); 
    let tags = $parent.find('.lbx .projTags .tag').map(function() {
        return $(this).text();
    }).get().join(' / ');
    
    // 복사할 데이터들 추출
    let overviewHtml = $parent.find('.modalData .overviewContent').html();
    let sessionsHtml = $parent.find('.rbx .sessions').html();
    let troubleHtml = $parent.find('.modalData .troubleContent').html();
    
    // Populate modal content
    $('#projectModal .modalCategory').text(tags);
    $('#projectModal .modalTitle').text(title);
    
    // Inject into corresponding columns (Left & Right)
    $('#modal-overview-section').html(overviewHtml);
    $('#modal-tasks-section').html('<div class="modalTasksSection"><h3>상세 구현 과제</h3><ul class="sessions">' + sessionsHtml + '</ul></div>');
    $('#modal-trouble-section').html(troubleHtml);
    
    // Show modal (flex display 유지하며 페이드인)
    $('#projectModal').css('display', 'flex').hide().fadeIn(300);
});


// 모달 닫기 (X 버튼 클릭 또는 모달 바깥 영역 클릭 시)
$(document).on('click', '#projectModal, #projectModal .modalClose, #projectModal .modalBg', function(e) {
    // 클릭된 요소가 modalInn 내부(닫기 버튼 제외)인 경우 닫지 않음
    if ($(e.target).closest('.modalInn').length > 0 && $(e.target).closest('.modalClose').length === 0) {
        return;
    }
    $('#projectModal').fadeOut(200);
});

// STACKS 기술 스택 마우스 포인터 추적형 툴팁 구현
$('._m .se06 .wrap .logolist > li').on('mouseenter', function() {
    let $tooltip = $(this).find('.stackTooltip');
    $tooltip.css({
        opacity: 1,
        pointerEvents: 'auto'
    });
}).on('mouseleave', function() {
    let $tooltip = $(this).find('.stackTooltip');
    $tooltip.css({
        opacity: 0,
        pointerEvents: 'none'
    });
}).on('mousemove', function(e) {
    let $tooltip = $(this).find('.stackTooltip');
    let rect = this.getBoundingClientRect();
    
    let tooltipWidth = $tooltip.outerWidth() || 260;
    let tooltipHeight = $tooltip.outerHeight() || 150;
    
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    
    let left = mouseX + 15;
    let top = mouseY - tooltipHeight - 15;
    
    // 오른쪽 경계 검사
    if (e.clientX + 15 + tooltipWidth > window.innerWidth) {
        left = mouseX - tooltipWidth - 15;
    }
    
    // 상단 경계 검사 (상단으로 넘칠 경우 마우스 아래쪽에 배치)
    if (e.clientY - tooltipHeight - 15 < 0) {
        top = mouseY + 20;
    }
    
    $tooltip.css({
        left: left + 'px',
        top: top + 'px'
    });
});

// 커스텀 프리미엄 팝업 헬퍼 함수
function showCustomConfirm(message, actionText, onConfirm, showCancel = true) {
    const $popup = $('#customConfirmPopup');
    $popup.find('.popup-message').text(message);
    $popup.find('.popup-action-btn').text(actionText).off('click').on('click', function() {
        $popup.removeClass('on');
        if (onConfirm) onConfirm();
    });
    if (showCancel) {
        $popup.find('.popup-cancel-btn').show();
    } else {
        $popup.find('.popup-cancel-btn').hide();
    }
    $popup.find('.popup-cancel-btn, .popup-close-btn, .popup-overlay').off('click').on('click', function() {
        $popup.removeClass('on');
    });
    $popup.addClass('on');
}

// 이력서 다운로드 이벤트 위임 처리
$(document).on('click', '.footer-resume-btn', function(e) {
    e.preventDefault();
    const downloadUrl = $(this).attr('href') || '#';
    showCustomConfirm("개발자 명민주의 상세 이력서(PDF)를\n다운로드하시겠습니까?", "다운로드", function() {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

// 깃허브 및 티스토리 이동 이벤트 위임 처리
$(document).on('click', '.snslist li a', function(e) {
    const $link = $(this);
    if ($link.hasClass('footer-resume-btn') || $link.hasClass('instagram-link')) {
        return;
    }
    e.preventDefault();
    const targetUrl = $link.attr('href');
    
    let message = "외부 사이트로 이동하여\n상세 내용을 확인하시겠습니까?";
    let actionText = "이동하기";
    
    if (targetUrl.indexOf('github.com') !== -1) {
        message = "개발자 명민주의 GitHub 저장소로 이동하여\n다양한 프로젝트 소스 코드를 확인하시겠습니까?";
        actionText = "방문하기";
    } else if (targetUrl.indexOf('tistory.com') !== -1) {
        message = "개발자 명민주의 기술 블로그로 이동하여\n다양한 기술 회고와 학습 기록을 확인하시겠습니까?";
        actionText = "방문하기";
    }
    
    showCustomConfirm(message, actionText, function() {
        window.open(targetUrl, '_blank');
    });
});

// 인스타그램 클릭 시 준비 중입니다 알림 팝업
$(document).on('click', '.instagram-link', function(e) {
    e.preventDefault();
    showCustomConfirm("현재 인스타그램 채널은 준비 중입니다.\n더 유익한 콘텐츠로 곧 찾아뵙겠습니다!", "확인", null, false);
});

// 이메일 클릭 시 클립보드 복사 기능
$(document).on('click', '.copy-email-btn', function(e) {
    e.preventDefault();
    const email = $(this).attr('data-email');
    const $tooltip = $(this).find('.copy-tooltip');
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function() {
            showCopyTooltip($tooltip);
        }).catch(function(err) {
            console.error('Clipboard API copy failed: ', err);
            fallbackCopy(email, $tooltip);
        });
    } else {
        fallbackCopy(email, $tooltip);
    }
});

function showCopyTooltip($tooltip) {
    $tooltip.text('복사 완료!').addClass('show');
    setTimeout(function() {
        $tooltip.removeClass('show');
        setTimeout(function() {
            $tooltip.text('복사하기');
        }, 200);
    }, 1200);
}

function fallbackCopy(text, $tooltip) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyTooltip($tooltip);
        } else {
            console.error('fallbackCopy failed');
        }
    } catch (err) {
        console.error('fallbackCopy error: ', err);
    }
    document.body.removeChild(textArea);
}
