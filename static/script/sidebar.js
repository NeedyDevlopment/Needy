$(document).ready(function () {
  // alert("city: " + filter.city + " category: " + filter.category);
  var height = parseInt($(".content").css("height"));
  $(window).scroll(function () {
    var scroller = window.scrollY;
    var navHeight = document.getElementsByClassName("navbar")[0].offsetHeight;
    if (scroller < navHeight) {
      $(".sideNavbar").css("top", navHeight - scroller);
      $(".content").css("height", height + scroller);
    } else {
      $(".sideNavbar").css("top", 0);
      $(".content").css("height", 449);
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
    $("#finalCity").val(city);
    $("#finalCategory").val(category);
  }
  // selectCategoryAndCity("All city", "All Category");
  selectCategoryAndCity($("#finalCity").val(), $("#finalCategory").val());
});
