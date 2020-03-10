// 必要なスクリプトを書く

$(function() {
  //backToTop
  $("#backToTop").on("click", function() {
    $("body,html").animate(
      {
        scrollTop: 0
      },
      300
    )
    return false
  });
});

$(function(){
  //gnav action
  $('.nav-link').on('click', function(){
    $('.navbar-collapse').collapse('hide');
  })
});

{
  //gnavの高さ分mainコンテンツのmargin-topを設ける
  const gnav = document.getElementsByClassName("navbar");
  let height = gnav[0].clientHeight;
  const main = document.getElementsByClassName("main");
  main[0].style.margin = `${height}px auto 0`;
}
