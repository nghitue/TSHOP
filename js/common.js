/* GLOBAL */
var viewportW = jQuery(window).width(),
  viewportH = jQuery(window).height(),
  documentH = 0,
  viewportSP = 768,
  opacity = "opacity:0";

$(document).ready(function () {
  //FIX IE
  0 <
    (function () {
      var a = window.navigator.userAgent,
        b = a.indexOf("MSIE");
      return 0 < b
        ? parseInt(a.substring(b + 5, a.indexOf(".", b)))
        : navigator.userAgent.match(/Trident\/7\./)
        ? 11
        : 0;
    })() && $("html").addClass("fixie");
  // OBJECT FIT IE
  $(".fixie .obj-img").each(function () {
    var a = $(this),
      b = a.find("img").prop("src");
    a.find("img").hide();
    b &&
      a.css("backgroundImage", "url(" + b + ")").addClass("custom-object-fit");
  });
  //END FIX IE

  //DETECT
  var userAgent = window.navigator.userAgent;
  userAgent.match(/iPhone/i) && $("body").addClass("ios");
  "6" === iPhoneVersion() && $("body").addClass("iphone6");
  "X" === iPhoneVersion() && $("body").addClass("iphoneX");
  "Plus" === iPhoneVersion() && $("body").addClass("iphonePlus");
  var isChrome = !!window.chrome,
    isFirefox = userAgent.toLowerCase().indexOf("firefox") > -1;
  isSafari = !!window.safari;
  isEdge = userAgent.indexOf("Edge") > -1;
  isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
  isChrome && !$("body").hasClass("ios") && $("body").addClass("chrome");
  isSafari && !$("body").hasClass("android") && $("body").addClass("safari");
  isFirefox && !$("body").hasClass("android") && $("body").addClass("firefox");
  if (isEdge && $("body").hasClass("chrome")) {
    $("body").removeClass("chrome");
    $("body").addClass("edge");
  }
  if (isAndroid) {
    $("body").addClass("android");
  }
  //END DETECT

  //LOAD FUNCTION
  load_function();
  jQuery(window)
    .resize(function () {
      viewportW = jQuery(window).width();
      viewportH = jQuery(window).height();
    })
    .resize();
  //END LOAD FUNCTION

  //WINDOW SCROLL ADD CLASS
  $(window).scroll(function () {
    var a = $(window).scrollTop();
    150 < a
      ? $("body").addClass("over_150")
      : $("body").removeClass("over_150");
    1400 > $(window).width()
      ? 250 < a
        ? $("body").addClass("over_500")
        : $("body").removeClass("over_500")
      : 250 < a
      ? $("body").addClass("over_500")
      : $("body").removeClass("over_500");
  });
  //END WINDOW SCROLL ADD CLASS

  //ICON NAV MENU
  $(".js-hamburger").click(function (a) {
    a.stopPropagation();
    $("body").toggleClass("menu-open");
    $(".header_nav").toggleClass("show");
    $(this).toggleClass("active");
    $("body").hasClass("menu-open")
      ? ($("body").addClass("menu_fixed"),
        $(document).height(),
        $("body.menu-open").css({
          height: "100%",
        }))
      : ($("body").removeClass("menu_fixed"),
        $("body").css({
          height: "auto",
        }));
  });

  //ADD CLICK OUTSIDE MENU
  // $(window).click(function () {
  // 	$("body").removeClass("menu-open");
  // 	$(".nav").removeClass("show")
  // });
  //END ICON NAV MENU

  //LINK PAGE
  $(".js-linkto").click(function (a) {
    a = $(this).attr("data-to");
    $("body").hasClass("menu-open") && $("body").removeClass("menu-open");
    $("html,body").animate(
      {
        scrollTop: $("#" + a).offset().top,
      },
      0
    );
  });
  //END LINK PAGE

  //HIDDEN SEARCH AREA
  $(".js-i_search a").click(function () {
    $(this).toggleClass("search_active");
    $(".form_search").slideToggle("fast");
    $("input").css({
      opacity: "1",
    });
  });
  //END HIDDEN SEARCH AREA

  //MINUS AND PLUS ICON INPUT
  $(".js-number_quantity").each(function () {
    function a() {
      1 == b
        ? $(c).find(".minus").addClass("m_disabled")
        : $(c).find(".minus").removeClass("m_disabled");
    }
    var b = $(this).find(".quantity").val(),
      c = $(this);
    a();
    $(c)
      .find(".minus")
      .click(function () {
        1 < b && (--b, $(c).find(".quantity").attr("value", b));
        a();
      });
    $(c)
      .find(".plus")
      .click(function () {
        b++;
        $(c).find(".quantity").attr("value", b);
        a();
      });
  });
  //END MINUS AND PLUS ICON INPUT

  //SPLIT TEXT
  jQuery.fn.extend({
    gonoSplitFn: function (b) {
      var a = this;
      a.init = function () {
        if ("split" == b) {
          var c = "",
            d = $(this).html().split("<br>");
          for (i = 0; i < d.length; i++)
            c +=
              d[i]
                .trim()
                .replace(
                  /[\S\s]/g,
                  ' <span style="' + opacity + '">$&</span>'
                ) + "<br>";
          return $(a).html(c);
        }
        "slowDown" == b &&
          ($(a).attr("data-av-animation", "zoomFlexibility"),
          $(a).AniView({ animateThreshold: 100, scrollPollInterval: 50 }));
      };
      a.init();
    },
  });
  //$(".element_need_split").gonoSplitFn("split");
  //END SPLIT TEXT

  //CHANGE COLOR IMG .SVG
  jQuery("js-imgsvg").each(function () {
    var b = jQuery(this),
      c = b.attr("id"),
      d = b.attr("class"),
      e = b.attr("src");
    jQuery.get(
      e,
      function (a) {
        a = jQuery(a).find("svg");
        "undefined" !== typeof c && (a = a.attr("id", c));
        "undefined" !== typeof d && (a = a.attr("class", d + " replaced-svg"));
        a = a.removeAttr("xmlns:a");
        !a.attr("viewBox") &&
          a.attr("height") &&
          a.attr("width") &&
          a.attr("viewBox", "0 0 " + a.attr("height") + " " + a.attr("width"));
        b.replaceWith(a);
      },
      "xml"
    );
  });
  //END CHANGE COLOR IMG .SVG

  //HIDDEN INPUT
  $(".js-checkboxct input").change(function (a) {
    if ($(this).is(":checked")) $(".showinput").slideDown("fast");
    else {
      var b = $(".js-checkboxct input").size(),
        c = 0;
      $(".js-checkboxct input").each(function (a) {
        $(this).is(":checked") ? $(".showinput").slideDown("fast") : c++;
        b == c && $(".showinput").slideUp("fast");
      });
    }
  });
  //END HIDDEN INPUT

  //HOVER CHANGE IMG
  $(".js-hoverimg > li a")
    .mouseover(function (a) {
      $(this)
        .find("img")
        .attr("src", $(this).find("img").attr("src").replace("_off", "_on"));
    })
    .mouseout(function (a) {
      $(this)
        .find("img")
        .attr("src", $(this).find("img").attr("src").replace("_on", "_off"));
    });
  //END HOVER CHANGE IMG

  //SWAP_IMAGE
  $(".js-pagiclick li img").each(function (b) {
    $(this).on("click", function () {
      $(window).scrollTop();
      $("#offsettop");
      var a = $(this).attr("id");
      $(this).parent().addClass("active").siblings().removeClass("active");
      $(".fade" + a).attr("src") !== $(this).attr("src") &&
        $(".fade" + a)
          .css("display", "none")
          .attr("src", $(this).attr("src"))
          .fadeIn(700);
    });
  });
  //END SWAP_IMAGE

  //FIX SCROLL WHEN HEADER FIX
  var heightHD = $("header").outerHeight();
  $(".js-archorlink").each(function () {
    $(this).css({
      "padding-top": heightHD + 10,
      "margin-top": -heightHD,
    });
  });
  //END FIX SCROLL WHEN HEADER FIX

  //BACKTO TOP
  if ($(".backtop").length) {
    var scrollTrigger = 300, // px
      // scroll to display and automatic hide BACK TO TOP after (x) second
      hideTimeout = 0,
      backToTop = function (second) {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
          if (second && second > 0) {
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(function () {
              $(".backtop").fadeOut();
            }, second * 1000);
          }
          $(".backtop").fadeIn();
        } else {
          $(".backtop").fadeOut();
        }
      };
    backToTop(5);
    $(window).on("scroll", function () {
      backToTop(5);
    });
    $(".backtop").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        700
      );
    });
  }
  //END BACKTO TOP

  //CHANGE NAME IMG FOR SP
  String.prototype.filename = function (extension) {
    var s = this.replace(/\\/g, "/");
    s = s.substring(s.lastIndexOf("/") + 1);
    return extension ? s.replace(/[?#].+$/, "") : s.split(".")[0];
  };

  if (viewportW <= 768) {
    $(".js-imgsrc").each(function () {
      var src = $(this).attr("src").filename();
      $(this).attr("src", "./images/" + src + "_sp.png");
    });
  }
});

//LOAD FUNCTION ------------------------------------------------
function load_function() {
  // pageReload();
  smartRollover();
  // flexFont();
  accordion();
  // linkAnchor();
  // mobileHover();
  // setViewport();
  // setImageSp();
  
}

//CREAT FUNCTION ------------------------------------------------

var mobileHover = function () {
  $("*")
    .on("touchstart", function () {
      $(this).trigger("hover");
    })
    .on("touchend", function () {
      $(this).trigger("hover");
    });
};

//RELOAD PAGE WHEN CHANGE VIEWPORT PC <=> SP
function pageReload() {
  var a;
  var b = viewportW > viewportSP ? "is_pc" : "is_smp";
  jQuery(window)
    .resize(function () {
      viewportW = jQuery(window).width();
      a = viewportW > viewportSP ? "is_pc" : "is_smp";
      b != a && (window.location.href = window.location.href);
    })
    .resize();
}
//END RELOAD PAGE WHEN CHANGE VIEWPORT PC <=> SP

//TOGGLE TEXT
$.fn.extend({
  toggleText: function (a, b) {
    return this.text(this.text() == b ? a : b);
  },
});
//END TOGGLE TEXT

//CHANGE IMG WHEN HOVER
function smartRollover() {
  if (document.getElementsByTagName)
    for (var a = document.getElementsByTagName("img"), b = 0; b < a.length; b++)
      a[b].src.match("_off.") &&
        ((a[b].onmouseover = function () {
          this.setAttribute(
            "src",
            this.getAttribute("src").replace("_off.", "_on.")
          );
        }),
        (a[b].onmouseout = function () {
          this.setAttribute(
            "src",
            this.getAttribute("src").replace("_on.", "_off.")
          );
        }));
}
window.addEventListener
  ? window.addEventListener("load", smartRollover, !1)
  : window.attachEvent && window.attachEvent("onload", smartRollover);
//END CHANGE IMG WHEN HOVER

//FLEXIBLE FONTSIZE
function flexFont() {
  for (var a = $(".flexFont"), b = 0; b < a.length; b++)
    a[b].style.fontSize = 0.05 * a[b].offsetWidth + "px";
}
//END FLEXIBLE FONTSIZE

//LINK ANCHOR
function linkAnchor() {
  $("a[href*=#]:not([href=#])").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var a = $(this.hash);
      a = a.length ? a : $("[name=" + this.hash.slice(1) + "]");
      if (a.length)
        return (
          $("html,body").animate(
            {
              scrollTop: a.offset().top,
            },
            300
          ),
          !1
        );
    }
  });
}
//END LINK ANCHOR

//ACCORDION BOX
function accordion() {
  $(".acr_title").on("click", function (a) {
    a.preventDefault();
    a = $(this);
    var b = a.next(".acr_con");
    $(".acr_title").not($(this)).removeClass("open");
    $(".acr_con").not($(this).next()).slideUp("fast");
    a.toggleClass("open");
    b.slideToggle(250);
  });
}
//END ACCORDION BOX

//FIX HEIGHT ELEMENT
//use element.tile(columns)
(function (a) {
  a.fn.tile = function (b) {
    var c,
      e,
      f,
      g,
      h = this.length - 1,
      d;
    b || (b = this.length);
    this.each(function () {
      d = this.style;
      d.removeProperty && d.removeProperty("height");
      d.removeAttribute && d.removeAttribute("height");
    });
    return this.each(function (d) {
      f = d % b;
      0 == f && (c = []);
      c[f] = a(this);
      g = c[f].height();
      if (0 == f || g > e) e = g;
      (d != h && f != b - 1) ||
        a.each(c, function () {
          this.height(e);
        });
    });
  };
})(jQuery);
//END FIX HEIGHT ELEMENT

//DETECT IHONE VERSION
function iPhoneVersion() {
  var a = window.screen.height,
    b = window.screen.width;
  return 320 === b && 480 === a
    ? "4"
    : 320 === b && 568 === a
    ? "5"
    : 375 === b && 667 === a
    ? "6"
    : 414 === b && 736 === a
    ? "Plus"
    : 375 === b && 812 === a
    ? "X"
    : "none";
}
//END DETECT IHONE VERSION

//NAV MENU
function navmenu(parentClass, type) {
  if (type == "click") {
    var navClass = parentClass + " .megamenu > a";
    if (viewportW > 961) {
      $(navClass).eq(0).addClass("open");
    }
    $(navClass).on("click", function (a) {
      a.preventDefault();
      a = $(this);
      var b = a.next(".js-dropdown");
      $(navClass).not(a).removeClass("open");
      $(".js-dropdown").not(a.next()).slideUp("fast");
      a.toggleClass("open");
      b.slideToggle(250);
    });
  } else if (type == "hover") {
    var navClass = parentClass + " .megamenu";
    $(navClass).on({
      mouseenter: function () {
        var e = $(".header_nav").outerHeight();
        $(this)
          .find(".js-dropdown")
          .css("top", e)
          .stop(!0, !0)
          .delay(100)
          .slideDown(400),
          $(this).addClass("is-act");
      },
      mouseleave: function () {
        $(this).find(".js-dropdown").stop(!0, !0).delay(100).slideUp(400),
          $(this).removeClass("is-act");
      },
    });
  }
}

if (viewportW > 751) {
  // navmenu('.navaside', 'click');
  if ($("body").hasClass("navstate_show")) {
    navmenu(".navstate_show .js-navheader", "hover");
  } else {
    navmenu(".navstate_hide .js-navheader", "click");
  }
}

if (viewportW < 750) {
  // navmenu('.navaside', 'click');
  navmenu(".js-navheader", "click");
}
//END NAV MENU

//FIX SQUARE
jQuery(window)
  .resize(function () {
    $(".js-square").each(function () {
      var wbox = $(this).outerWidth();
      $(this).css({ height: wbox });
    });
  })
  .resize();
//END FIX SQUARE

//OPEN POPUP
$("a.clickpop").click(function (e) {
  e.preventDefault();
  var thepopid = $(this).attr("data-for");
  $("#" + thepopid).addClass("showthis");
  $(".btn_close, .cancelbox").click(function (e) {
    e.preventDefault();
    $(".modal").removeClass("showthis");
  });
});
$(".modal-content, .clickpop, .btn_close, .hidden_pop").on(
  "click touchend",
  function (e) {
    e.stopPropagation();
  }
);
if (viewportW > 751) {
  $(document).on("click touchend", function (e) {
    $(".modal").removeClass("showthis");
  });
}
//END POPUP

//TAB
if ($(".js-tab-content").length) {
  $(".js-tab-content").hide();
  $("ul.tabslist li:first").addClass("active");
  $(".js-tab-content:first").addClass("active").show();
  $("ul.tabslist li").click(function (a) {
    a.preventDefault();
    $(".js-tab-content").hide();
    $("ul.tabslist li").not($(this)).removeClass("active");
    $(this).hasClass("active") || $(this).addClass("active");
    a = $(this).attr("data-id");
    $("#tab" + a).fadeIn();
    return !1;
  });
}
//END TAB

//Disable double on Ipad, Iphone For Zooming
(function ($) {
  $.fn.nodoubletapzoom = function () {
    $(this).bind("touchstart", function preventZoom(e) {
      var t2 = e.timeStamp,
        t1 = $(this).data("lastTouch") || t2,
        dt = t2 - t1,
        fingers = e.originalEvent.touches.length;
      $(this).data("lastTouch", t2);
      if (!dt || dt > 500 || fingers > 1) return; // not double-tap

      e.preventDefault(); // double tap - prevent the zoom
      // also synthesize click events we just swallowed up
      $(this).trigger("click").trigger("click");
    });
  };
})(jQuery);

//TEL LINK
$(function () {
  var ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > 0 && ua.indexOf('iPod') == -1 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    $('.tel-link').each(function () {
      var str = $(this).text();
      $(this).html($('<a>').attr('href', 'tel:' + str.replace(/-/g, '')).append(str + '</a>'));
    });
  }
});


$(function () {
  var ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > 0 && ua.indexOf('iPod') == -1 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 && ua.indexOf('SC-01C') == -1 && ua.indexOf('A1_07') == -1) {
    $('.tel-link-img img').each(function () {
      var alt = $(this).attr('alt');
      $(this).wrap($('<a>').attr('href', 'tel:' + alt.replace(/-/g, '')));
    });
  }
});


$(function() {
  var showFlag = false;
  var topBtn = $('#page-top');    
  topBtn.css('bottom', '-950px');
  var showFlag = false;
  //スクロールが100に達したらボタン表示
  $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
          if (showFlag == false) {
              showFlag = true;
              topBtn.stop().animate({'bottom' : '90px'}, 1500); 
          }
      } else {
          if (showFlag) {
              showFlag = false;
              topBtn.stop().animate({'bottom' : '-350px'}, 500); 
          }
      }
  });
  //スクロールしてトップ
  topBtn.click(function () {
      $('body,html').animate({
          scrollTop: 0
      }, 1000);
      return false;
  });
});


$(function(){
	var timer = false;
	$(window).on('load resize', function(){
		if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			setViewport();
      if($(window).width() > 1024){
        setMainmvheight();
      }
		},200);
	});
});


function setViewport() {
	var w = $(window).width();
	var x = 640;
	var viewport = $('meta[name=viewport]');
	if ( w > x && w < 1366 ) {
    viewport.attr('content', 'width=1000');
	} else {
		viewport.attr('content', 'width=device-width, initial-scale=1, maximum-scale=1');
	}
}

/**
 * set mv full width
 */
function setMainmvheight(){
  var mvHeight = $(window).innerHeight();
  var headHeight = $("header").height();
  $('.mainmv').css("height",mvHeight - headHeight);
}

/**
 * reset sp images resolution
 */
function setImageSp(){
  if ($(window).width() < 640) {
    var getlink = $('.tel img').attr('src');
    var spLink = getlink.slice(0, -4);
    $('.tel img').attr('src', `${spLink}_sp.png`);
  }
  else{
    var getlink = $('.tel img').attr('src');
    $('.tel img').attr('src', getlink);
  }
}


/**
 * multiline in placeholder textarea
 */
$(function() {
  var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  
  // Disable for chrome which already supports multiline
  if (! (!!window.chrome && !isOpera)) {
    var style = $('<style>textarea[data-placeholder].active { color: #ccc; }</style>')
    $('html > head').append(style);
    
    $('textarea[placeholder]').each(function(index) {
      var text  = $(this).attr('placeholder');
      var match = /\r|\n/.exec(text);
      
      if (! match)
        return;
      
      $(this).attr('placeholder', '');
      $(this).attr('data-placeholder', text);
      $(this).addClass('active');
      $(this).val(text);
    });
    
    $('textarea[data-placeholder]').on('focus', function() {
      if ($(this).attr('data-placeholder') === $(this).val()) {
        $(this).attr('data-placeholder', $(this).val());
        $(this).val('');
        $(this).removeClass('active');
      }
    });
    
    $('textarea[data-placeholder]').on('blur', function() {
      if ($(this).val() === '') {
        var text = $(this).attr('data-placeholder');
        $(this).val(text);
        $(this).addClass('active');
      }
    });
  }
});


if ($(window).width() < 640) {
  $(".show-cat").click(function() {
    $(this).toggleClass('open');
    $(this).closest('.side-bar').toggleClass('open');
  });
}









