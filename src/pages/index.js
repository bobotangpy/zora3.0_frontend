import WebHead from "../components/webHead";
import NavBar from "../components/navbar";
import styles from "../styles/Home.module.scss";
// Slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/footer";
const sliderSetting = {
  dots: true,
  fade: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 2500,
  adaptiveHeight: false,
};

export default function Home() {
  return (
    <div className={styles.container}>
      <WebHead />

      <NavBar />

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

      <Footer />
    </div>
  );
}

// https://github.com/vercel/next.js/tree/canary/examples/with-styletron
