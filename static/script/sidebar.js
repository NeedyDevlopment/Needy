$(document).ready(function () {
  $(window).scroll(function () {
    var scroller = window.scrollY;
    if (scroller < 44.5) {
      $(".sideNavbar").css("top", 44.5 - scroller);
    } else {
      $(".sideNavbar").css("top", 0);
    }
  });
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
  }
  selectCategoryAndCity("All city", "All Category");
});
