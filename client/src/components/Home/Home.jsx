import hero from "../../assets/svgs/Hero.svg";
import blob from "../../assets/svgs/blob.svg";
import webDeveloperService from "../../assets/svgs/web developer.svg";
import webDesignService from "../../assets/svgs/web design.svg";
import mobileService from "../../assets/svgs/mobile developer.svg";
import aboutUs from "../../assets/svgs/about us.svg";
import contactUs from "../../assets/svgs/contact us.svg";
import { HashLink } from "react-router-hash-link";
import { tokenExists } from "../../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";
import "./Home.scss";
import Bento from "../Bento/Bento";
import Tab from "../Tab/Tab";

export default function Home() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fullName = useRef();
  const email = useRef();
  const message = useRef();

  useEffect(() => {
    tokenExists(token, navigate, dispatch);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let err = [];
    const myForm = {
      fullName: fullName.current.value.trim(),
      email: email.current.value.trim(),
      message: message.current.value.trim(),
    };
    if (!/^[a-zA-Z\s]+$/.test(myForm.fullName)) {
      err.push("Full Name invalid. It must only contain letters and space");
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(myForm.email)
    ) {
      err.push("Email invalid. It must be in the format example@example.com");
    }
    if (myForm.message.length < 10) {
      err.push("Message Should Contain More Than 10 Caracters");
    }
    if (
      (myForm.fullName == "" &&
        myForm.email == "" &&
        myForm.message.value == "") ||
      err.length != 0
    ) {
      if (
        myForm.fullName == "" &&
        myForm.email == "" &&
        message.current.value == ""
      ) {
        toast.error("Please Fill The Inputs");
      } else
        toast.error(
          <div>
            {err.map((e, i) => (
              <p key={i}>{e}</p>
            ))}
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
    } else {
      fullName.current.value = "";
      email.current.value = "";
      message.current.value = "";
      toast.success(
        <p>
          Thank You For Contacting Us.
          <br />
          <br /> We Will Look At Your Message As Soon As Possible
        </p>
      );
    }
  };
  return (
    <div className="Home">
      <div className="main">
        <img
          className="scribble1"
          src="abstract-chalk-brush-texture-line-shapes.png"
          alt=""
        />
        <img className="scribble2" src="blob-haikei.png" alt="" />
        <img className="scribble3" src="scribbles-scribbles-47.png" alt="" />
        <img
          className="scribble4"
          src="pixeltrue-icons-web-design-planning (1).png"
          alt=""
        />
        <img className="scribble5" src="scribbles-scribbles-62.png" alt="" />
        <img className="scribble6" src="blob-haikei (6).png" alt="" />
        <img className="scribble7" src="scribbles-scribbles-31.png" alt="" />

        <h1>
          <span>A COMMUNITY OF </span>
          <br /> <span>EXCELLENT AND BRILLIENT </span>{" "}
          <span className="people">people </span>
        </h1>
      </div>
      <section>
        <div className="box" id="services">
          <h2>What's in the box?</h2>
          <p>
            randomtext The shape in the image looks like a stylized flower or
            splash-like icon with
          </p>

          <Bento />
        </div>
        {/* <div className="about-us" id="aboutus">
          <div className="custom-headline">About Us</div>
          <div className="about-us-description reverse">
            <div data-aos="fade-up">
              <img src={aboutUs} alt="About Us Image" />
            </div>
            <div className="about-us-info" data-aos="fade-right">
              
            </div>
          </div>
        </div> */}
        <div className="tabface">
        <Tab/>
      </div>
      </section>

      <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          
          <span className="footer-title">GIGO</span>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>ABOUT</h4>
            <a href="#">one</a>
            <a href="#">two </a>
          </div>
          <div className="footer-column">
            <h4>FOLLOW US</h4>
            <a href="#">Github</a>
            <a href="#">Discord</a>
          </div>
          <div className="footer-column">
            <h4>LEGAL</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 GIGO™</p>
        <div className="footer-social">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaGithub />
          
        </div>
      </div>
    </footer>
    </div>
  );
}
