import { useContext, useEffect } from "react";
import { AppContext } from "../services/appProvider";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateMainCat } from "../redux/mainCatSlice";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination";
import "swiper/components/navigation";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function Home() {
  const dispatch = useDispatch();
  const context = useContext(AppContext);

  useEffect(() => {
    typeof window !== "undefined" && window.innerWidth <= 1024
      ? context.setFullWidth(false)
      : context.setFullWidth(true);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link href="/category" as="/horoscope_of_the_month">
              <img
                src="/assets/images/landing/slide_1.jpg"
                alt="1"
                className={styles.img}
                onClick={() => {
                  context.setLoading(true);
                  dispatch(updateMainCat("horoscope"));
                }}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/category" as="/women">
              <img
                src="/assets/images/landing/slide_2.jpg"
                alt="2"
                className={styles.img}
                onClick={() => {
                  context.setLoading(true);
                  dispatch(updateMainCat("women"));
                }}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/category" as="/men">
              <img
                src="/assets/images/landing/slide_3.jpg"
                alt="3"
                className={styles.img}
                onClick={() => {
                  context.setLoading(true);
                  dispatch(updateMainCat("men"));
                }}
              />
            </Link>
          </SwiperSlide>
        </Swiper>

        {typeof window !== "undefined" && window.innerWidth <= 1340 && (
          <div className={styles.wrapper}>
            <>
              <Link href="/category" as="/women">
                <img
                  src="/assets/images/landing/shop_women.jpg"
                  alt="women"
                  style={{ width: "48%" }}
                  onClick={() => {
                    context.setLoading(true);
                    dispatch(updateMainCat("women"));
                  }}
                />
              </Link>
            </>
            <>
              <Link href="/category" as="/men">
                <img
                  src="/assets/images/landing/shop_men.jpg"
                  alt="men"
                  style={{ width: "48%" }}
                  onClick={() => {
                    context.setLoading(true);
                    dispatch(updateMainCat("men"));
                  }}
                />
              </Link>
            </>
          </div>
        )}
      </div>
    </div>
  );
}
