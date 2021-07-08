$(document).ready(function () {
  // alert("city: " + filter.city + " category: " + filter.category);
  if (window.innerWidth >= 560) {
    var sideNavBarHeight = window.innerHeight - $(".navbar").height();
    $(".sideNavbar").css("height", sideNavBarHeight);
    var headerHeight =
      document.getElementsByClassName("header")[0].offsetHeight;
    var footerHeight =
      document.getElementsByClassName("footerSidebar")[0].offsetHeight;
    $(".content").css(
      "height",
      $(".sideNavbar").height() - footerHeight - 2 * headerHeight
    );
    if ($(window).height() + $("#footer").height() == $(document).height()) {
      bodyFooterHeight = $("#footer").height();
      $(".sideNavbar").css(
        "height",
        window.innerHeight - 2 * bodyFooterHeight - $(".navbar").height()
      );
      $(".content").css(
        "height",
        $(".sideNavbar").height() - footerHeight - 2 * headerHeight
      );
    }
    $(document.body).on("touchmove", onScrollForSideBar); // for mobile
    $(window).on("scroll", onScrollForSideBar);
    function onScrollForSideBar() {
      var scroller = window.scrollY;
      var navHeight = document.getElementsByClassName("navbar")[0].offsetHeight;
      if (scroller < navHeight) {
        $(".sideNavbar").css("top", navHeight - scroller);
        $(".sideNavbar").css("height", sideNavBarHeight + scroller);
      } else {
        $(".sideNavbar").css("top", 0);
        $(".sideNavbar").css("height", window.innerHeight);
      }
      if (
        scroller >=
        $(document).height() - $(window).height() - 2 * $("#footer").height()
      ) {
        bodyFooterHeight =
          scroller -
          ($(document).height() -
            $(window).height() -
            2 * $("#footer").height());
        $(".sideNavbar").css("height", window.innerHeight - bodyFooterHeight);
      }
      $(".content").css(
        "height",
        $(".sideNavbar").height() - footerHeight - 2 * headerHeight
      );
    }
  } else {
    $(document).ready(function () {
      $("#openFilter").click(function () {
        console.log($(this).html());
        if ($(this).html() == '<i class="fa fa-close"></i> Close') {
          $(this).html('<i class="fa fa-filter"></i> Filter');
          $(".sideNavbar").css("display", "none");
          $(".postsContainer").css("display", "block");
        } else {
          $(this).html('<i class="fa fa-close"></i> Close');
          $(".sideNavbar").css("display", "flex");
          $(".postsContainer").css("display", "none");
        }
      });
    });
  }
  $(".optionForCategory").click(function () {
    var category = $(this).children().val();
    $(".optionForCategory").children().removeClass("selectedValue");
    $(this).children().addClass("selectedValue");
    $("#finalCategory").val(category);
    console.log(category);
  });
  $(".optionForCity").click(function () {
    var city = $(this).children().val();
    $(".optionForCity").children().removeClass("selectedValue");
    $(this).children().addClass("selectedValue");
    $("#finalCity").val(city);
    console.log(city);
  });

  function selectCategoryAndCity(city, category) {
    $(".optionForCategory").each((index, element) => {
      if ($(element).children().val() == category) {
        $(element).children().addClass("selectedValue");
      }
    });
    $(".optionForCity").each((index, element) => {
      if ($(element).children().val() == city) {
        $(element).children().addClass("selectedValue");
      }
    });
    $("#finalCity").val(city);
    $("#finalCategory").val(category);
  }
  // selectCategoryAndCity("All city", "All Category");
  selectCategoryAndCity($("#finalCity").val(), $("#finalCategory").val());
});
