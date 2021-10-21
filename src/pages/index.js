import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateMainCat } from "../redux/mainCatSlice";

// Slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const sliderSetting = {
  dots: true,
  fade: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  adaptiveHeight: false,
  swipeToSlide: true,
  pauseOnHover: true,
};

export default function Home() {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <Slider {...sliderSetting}>
          <>
            <Link href="/category" as="/horoscope">
              <img
                src="/assets/images/landing/slide_1.jpg"
                alt="1"
                className={styles.img}
                onClick={() => {
                  dispatch(updateMainCat("horoscope"));
                }}
              />
            </Link>
          </>
          <>
            <Link href="/category" as="/women">
              <img
                src="/assets/images/landing/slide_2.jpg"
                alt="2"
                className={styles.img}
                onClick={() => dispatch(updateMainCat("women"))}
              />
            </Link>
          </>
          <>
            <Link href="/category" as="/men">
              <img
                src="/assets/images/landing/slide_3.jpg"
                alt="3"
                className={styles.img}
                onClick={() => dispatch(updateMainCat("men"))}
              />
            </Link>
          </>
        </Slider>
      </div>
    </div>
  );
}
