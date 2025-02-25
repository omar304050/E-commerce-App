import React from "react";
import Slider from "react-slick";
import useApi from "../../Hooks/useApi";

// تأكد من استيراد ملفات CSS الخاصة بـ react-slick إذا لم تكن مستوردة في مكان آخر
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {
  const { data, isLoading, isError, error } = useApi("categories");

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    // حاوية مركزية مع padding أفقي لضمان عدم خروج المحتوى عن المسار
    <div className="container mx-auto px-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen bg-green-200">
          <span className="loader"></span>
        </div>
      ) : (
        <Slider {...settings}>
          {data?.data?.data?.map((category) => (
            <div key={category._id}>
              <img
                src={category.image}
                className="w-full h-48 object-cover object-top"
                alt={category.name}
              />
              <h3 className="text-center">{category.name}</h3>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
