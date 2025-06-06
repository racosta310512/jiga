// src/components/BannerCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import usePexelsBannerImages from "../hooks/usePexelsBannerImages";

const BannerCarousel = () => {
  const { banners, loading } = usePexelsBannerImages();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="w-full h-44 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center bg-gray-100 text-gray-500">
        Cargando promociones...
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      pagination={{ clickable: true }}
      navigation
      className="w-full h-44 sm:h-56 md:h-64 lg:h-72 rounded-xl overflow-hidden"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-white text-lg sm:text-2xl font-bold">{banner.title}</h2>
              <p className="text-white text-xs sm:text-sm mt-1">{banner.subtitle}</p>
              <button
                onClick={() => navigate(`/?category=${banner.category}`)}
                className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm"
              >
                Ver ofertas
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerCarousel;

