function Translate() {
  //initialization
  this.init = function (attribute, lng) {
    this.attribute = attribute;
    this.lng = lng;
  };

  //translate
  this.process = function () {
    _self = this;
    var xrhFile = new XMLHttpRequest();
    //load content data
    xrhFile.open("GET", "../translate/language/" + this.lng + ".json", false);
    xrhFile.onreadystatechange = function () {
      if (xrhFile.readyState === 4) {
        if (xrhFile.status === 200 || xrhFile.status == 0) {
          var LngObject = JSON.parse(xrhFile.responseText);

          //get all DOM from iFrame / child HTML
          var iframe = document.getElementById("page-frame");
          let innerDoc =
            iframe.contentDocument || iframe.contentWindow.document;

          var allDomIframe = innerDoc.getElementsByTagName("*");

          //change the language of the iFrame
          let iFrameHTML = innerDoc.getElementsByTagName("html")[0];

          iFrameHTML.setAttribute("lang", _self.lng);

          //get all DOM from parent HTML
          var allDomCurent = document.getElementsByTagName("*");

          for (
            var currentRunner = 0;
            currentRunner < allDomCurent.length;
            currentRunner++
          ) {
            var elem = allDomCurent[currentRunner];
            var key = elem.getAttribute(_self.attribute);

            if (key != null) {
              elem.innerHTML = LngObject[key];
            }
          }

          for (var iRunner = 0; iRunner < allDomIframe.length; iRunner++) {
            var elem = allDomIframe[iRunner];
            var key = elem.getAttribute(_self.attribute);
            if (key != null) {
              elem.innerHTML = LngObject[key];
            }
          }
        }
      }
    };
    xrhFile.send();
  };

  this.processIframe = function () {
    _self = this;
    var xrhFile = new XMLHttpRequest();
    //load content data
    xrhFile.open("GET", "../translate/language/" + this.lng + ".json", false);
    xrhFile.onreadystatechange = function () {
      if (xrhFile.readyState === 4) {
        if (xrhFile.status === 200 || xrhFile.status == 0) {
          var LngObject = JSON.parse(xrhFile.responseText);

          var allDomCurent = document.getElementsByTagName("*");

          for (
            var currentRunner = 0;
            currentRunner < allDomCurent.length;
            currentRunner++
          ) {
            var elem = allDomCurent[currentRunner];
            var key = elem.getAttribute(_self.attribute);
            if (key != null) {
              elem.innerHTML = LngObject[key];
            }
          }
        }
      }
    };
    xrhFile.send();
  };
}
