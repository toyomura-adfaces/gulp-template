
$(function () {
    $(".slick").slick({
        dots: true,
        arrow: true,

        responsive: [
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    });
});
