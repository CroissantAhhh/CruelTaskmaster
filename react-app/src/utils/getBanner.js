

export default function getBanner() {
    const bannerURLs = [
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971507/banners/banner3_vk9nby.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971507/banners/banner9_mqqi9h.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971508/banners/banner4_d0fyne.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971508/banners/banner2_neeaxg.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971505/banners/banner7_w8fa6i.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971505/banners/banner5_cxud1a.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971506/banners/banner10_wa6vc6.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971504/banners/banner6_bdksig.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971504/banners/banner8_buf9zs.jpg",
    ];

    return bannerURLs[Math.floor(Math.random() * bannerURLs.length)];
}
