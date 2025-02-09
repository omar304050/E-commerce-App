import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg"
import img2 from "../../assets/images/slider-image-2.jpeg"
import img3 from "../../assets/images/slider-image-3.jpeg"


export default function MainSlider() {
    let settings = {
        infinite: true,
        speed: 100,
        autoplay:true,
        slidesToShow: 1,
        arrows: false,
      
    };
    return (
        <div className=" md:flex  ">
            <div className="w-full md:w-9/12 ">
                <Slider {...settings}>
                    <div>
                        <img src={img1} className="w-full h-96 object-cover " alt="" />
                    </div>
                    <div>
                        <img src={img2} className="w-full h-96 object-cover" alt="" />
                    </div>
                    <div>
                        <img src={img3} className="w-full  h-96   object-cover" alt="" />
                    </div>
                </Slider>
            </div>
            <div className=" flex-row md:w-3/12 flex pb-7 md:flex-col">
                <img src={img1} className=" h-48 md:w-full w-1/2 object-cover" alt="" />
                <img src={img2} className=" h-48 md:w-full  w-1/2 object-cover " alt="" />
            </div>
        </div>
    );
}