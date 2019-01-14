(function() {
    var input = $(".input");
    var select = $("#select");
    var nextUrl;

    function checkNextUrl(data) {
        if (data.next) {
            nextUrl = data.next;
            nextUrl = nextUrl.replace(
                "https://api.spotify.com/v1/search",
                "https://elegant-croissant.glitch.me/spotify"
            );
            $("#more").show();
        } else {
            $("#more").hide();
        }
    }

    $("#go").on("click", function(e) {
        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",

            data: {
                q: input.val(),
                type: select.val()
            },
            success: function(data) {
                data = data.artists || data.albums;
                console.log(data);
                var resultHtml = "";
                for (var i = 0; i < data.items.length; i++) {
                    var image;
                    if (data.items[i].images[0]) {
                        image = data.items[i].images[0].url;
                    } else {
                        image = "default.jpg";
                    }
                    resultHtml += "<div class='result'>";
                    resultHtml +=
                        "<a target='_blank' href='" +
                        data.items[i].external_urls.spotify +
                        "'>";
                    resultHtml += "<img class='images' src='" + image + "'/>"; //
                    resultHtml += "</a>";
                    resultHtml +=
                        "<a target='_blank' href='" +
                        data.items[i].external_urls.spotify +
                        ">";
                    resultHtml +=
                        "<h3 class='title'>" + data.items[i].name + "</h3>";
                    resultHtml += "</a>";
                    resultHtml += "</div>";
                }
                $(".results").html(resultHtml);
                $(".searchresult").text("Results for '" + input.val() + "'");
                checkNextUrl(data);

                if (location.search.indexOf("scroll=infinite" > -1)) {
                    $("#more").hide();
                    checkInfiniteScroll();
                }

                console.log(checkInfiniteScroll);
            }
        });
    });

    $("#more").on("click", function(e) {
        $.ajax({
            url: nextUrl,
            success: function(data) {
                data = data.artists || data.albums;
                console.log(data);
                var resultHtml = "";

                for (var i = 0; i < data.items.length; i++) {
                    var image;
                    if (data.items[i].images[0]) {
                        image = data.items[i].images[0].url;
                    } else {
                        image = "default.jpg";
                    }
                    resultHtml += "<div class='result'>";
                    resultHtml +=
                        "<a target='_blank' href='" +
                        data.items[i].external_urls.spotify +
                        "'>";
                    resultHtml += "<img class='images' src='" + image + "'/>"; //
                    resultHtml += "</a>";
                    resultHtml +=
                        "<a target='_blank' href='" +
                        data.items[i].external_urls.spotify +
                        ">";
                    resultHtml +=
                        "<h3 class='title'>" + data.items[i].name + "</h3>";
                    resultHtml += "</a>";
                    resultHtml += "</div>";
                }

                $(".results").append(resultHtml);
                checkNextUrl(data);
            }
        });
    });

    var timeoutId;
    function checkInfiniteScroll() {
        clearTimeout(timeoutId);
        if (
            $(window).height() + $(document).scrollTop() >=
            $(document).height() - 500
        ) {
            $.ajax({
                url: nextUrl,
                success: function(data) {
                    data = data.artists || data.albums;
                    console.log(data);
                    var resultHtml = "";

                    for (var i = 0; i < data.items.length; i++) {
                        var image;
                        if (data.items[i].images[0]) {
                            image = data.items[i].images[0].url;
                        } else {
                            image = "default.jpg";
                        }
                        resultHtml += "<div class='result'>";
                        resultHtml +=
                            "<a target='_blank' href='" +
                            data.items[i].external_urls.spotify +
                            "'>";
                        resultHtml +=
                            "<img class='images' src='" + image + "'/>"; //
                        resultHtml += "</a>";
                        resultHtml +=
                            "<a target='_blank' href='" +
                            data.items[i].external_urls.spotify +
                            ">";
                        resultHtml +=
                            "<h3 class='title'>" + data.items[i].name + "</h3>";
                        resultHtml += "</a>";
                        resultHtml += "</div>";
                    }

                    $(".results").append(resultHtml);
                    checkNextUrl(data);
                    $("#more").hide();
                    checkInfiniteScroll();
                }
            });
        } else {
            timeoutId = setTimeout(checkInfiniteScroll, 1000);
        }
    }
})();
