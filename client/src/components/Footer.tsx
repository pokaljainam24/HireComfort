import logo from "../assets/imgs/logo.png";
import appStore from "../assets/imgs/template/icons/app-store.png";
import android from "../assets/imgs/template/icons/android.png";

function Footer() {
  return (
    <footer className="footer mt-50">
      <div className="container">
        <div className="row">
          <div className="footer-col-1 col-md-3 col-sm-12">
            <a href="/">
              <img alt="HireComfort" src={logo} />
            </a>
            <div className="mt-20 mb-20 font-xs color-text-paragraph-2">
              HireComfort is the heart of the hiring community and the best
              resource to discover and connect with talent and jobs worldwide.
            </div>
            <div className="footer-social">
              <a className="icon-socials icon-facebook" href="#"></a>
              <a className="icon-socials icon-twitter" href="#"></a>
              <a className="icon-socials icon-linkedin" href="#"></a>
            </div>
          </div>
          <div className="footer-col-2 col-md-2 col-xs-6">
            <h6 className="mb-20">Resources</h6>
            <ul className="menu-footer">
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
              <li>
                <a href="/services">Products</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-col-3 col-md-2 col-xs-6">
            <h6 className="mb-20">Community</h6>
            <ul className="menu-footer">
              <li>
                <a href="#">Feature</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Credit</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="footer-col-4 col-md-2 col-xs-6">
            <h6 className="mb-20">Quick links</h6>
            <ul className="menu-footer">
              <li>
                <a href="#">iOS</a>
              </li>
              <li>
                <a href="#">Android</a>
              </li>
              <li>
                <a href="#">Microsoft</a>
              </li>
              <li>
                <a href="#">Desktop</a>
              </li>
            </ul>
          </div>
          <div className="footer-col-5 col-md-2 col-xs-6">
            <h6 className="mb-20">More</h6>
            <ul className="menu-footer">
              <li>
                <a href="/privacy">Privacy</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="/terms">Terms</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="footer-col-6 col-md-3 col-sm-12">
            <h6 className="mb-20">Download App</h6>
            <p className="color-text-paragraph-2 font-xs">
              Download our Apps and get extra 15% Discount on your first
              Order&mldr;!
            </p>
            <div className="mt-15">
              <a className="mr-5" href="#">
                <img src={appStore} alt="HireComfort" />
              </a>

              <a href="#">
                <img src={android} alt="HireComfort" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom mt-50">
          <div className="row">
            <div className="col-md-6">
              <span className="font-xs color-text-paragraph">
                Copyright &copy; 2026. HireComfort all right reserved
              </span>
            </div>
            <div className="col-md-6 text-md-end text-start">
              <div className="footer-social">
                <a className="font-xs color-text-paragraph" href="/privacy">
                  Privacy Policy
                </a>
                <a
                  className="font-xs color-text-paragraph mr-30 ml-30"
                  href="/terms"
                >
                  Terms &amp; Conditions
                </a>
                <a className="font-xs color-text-paragraph" href="#">
                  Security
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
