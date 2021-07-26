import styles from "../styles/Home.module.scss";
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
};

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <Slider {...sliderSetting}>
          <div>
            <img
              src="/assets/images/landing/slide_1.jpg"
              alt="1"
              className={styles.img}
            />
          </div>
          <div>
            <img
              src="/assets/images/landing/slide_2.jpg"
              alt="2"
              className={styles.img}
            />
          </div>
          <div>
            <img
              src="/assets/images/landing/slide_3.jpg"
              alt="3"
              className={styles.img}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}
