!function ($) {
  $(document).ready(function () {

    /* Search toggles */
    var searchSelector = $("#search");
    $(".toggle-search").click(function (event) {
      event.preventDefault();
      if (searchSelector.is(":hidden")) {
        searchSelector.addClass("active");
        searchSelector.slideDown({
          start:function () {
            $(this).css('display', 'flex');
          }
        })
        $("#search .searchbox").focus();

      } else {
        searchSelector.slideUp(function () {
          $(this).removeClass("active");
        });
      }
    });

    $("#search .close-search").click(function () {
      searchSelector.slideUp(function () {
        $(this).removeClass("active");
      });
    });

    /* Tab Menu Interactions */
    $('.tab-menu > a').click(function (event) {
      event.preventDefault();
      $('.tab-menu > a').removeClass('active');
      $(this).addClass('active');
      var story = $(this).attr("href");
      $(".story-wrapper > div").removeClass('active');
      $(story).addClass('active');
    });

    /* Toggle main menu */
    $('.toggle-mobile-menu').click(function (e) {
      e.preventDefault();
      if ($("#block-homepage-main-menu").hasClass('d-none')) {
        $(".main-menu").addClass('flex-column');
        $('#block-homepage-main-menu').removeClass('d-none');
      } else {
        $(".main-menu").removeClass('flex-column');
        $('#block-homepage-main-menu').addClass('d-none d-lg-block');
      }
    });

    WebFont.load({
      google: {
        families: ['Open+Sans', 'Stratum2WebBold', 'RufinaStencilBold']
      },
      custom: {
        families: ['Font Awesome 5 Free'],
        urls: ['//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css']
      }
    });

  });
}(jQuery);
;
