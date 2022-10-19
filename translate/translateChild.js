function translate(lng, tagAttr) {
  var translate = new Translate();
  translate.init(tagAttr, lng);
  translate.process();
  if (lng == "en") {
    $("#enTranslator").css("color", "teal");
    $("#roTranslator").css("color", "white");
  }
  if (lng == "ro") {
    $("#roTranslator").css("color", "teal");
    $("#enTranslator").css("color", "white");
  }
}

// if not present, iframe does not load corectly until you press a language
function translateIframe(lng, tagAttr) {
  var translate = new Translate();
  translate.init(tagAttr, lng);
  translate.processIframe();
}

//translate & change the language of parent HTML
$(document).ready(function () {
  $("#enTranslator").click(function () {
    translate("en", "lng-tag");
    $("html").attr("lang", "en");
  });

  $("#roTranslator").click(function () {
    translate("ro", "lng-tag");
    $("html").attr("lang", "ro");
  });
});
