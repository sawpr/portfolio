/* ----------------------------------------------------------
 pageScroll
---------------------------------------------------------- */
export var pageScroll = function() {
  $(".js-scroll").click(function() {
    var speed = 400 // スクロールスピード
    var href = $(this).attr("href")
    var target = $(href == "#" || href == "" ? "html" : href)
    var position = target.offset().top
    if (href == "#") {
      // リンク#のときはページの先頭へ
      $("body,html").animate({ scrollTop: 0 }, speed, "swing")
    } else {
      // それ以外は指定idへ
      $("body,html").animate({ scrollTop: position }, speed, "swing")
    }
    return false
  })
}
