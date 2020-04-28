import React, {Component} from "react";

class Footer extends Component {

    render() {
        return(
            <footer className="footer_part">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-sm-6 col-lg-2">
                            <div className="single_footer_part">
                                <h4>Category</h4>
                                <ul className="list-unstyled">
                                    <li><a href="#">Male</a></li>
                                    <li><a href="#">Female</a></li>
                                    <li><a href="#">Shoes</a></li>
                                    <li><a href="#">Fashion</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                            <div className="single_footer_part">
                                <h4>Company</h4>
                                <ul className="list-unstyled">
                                    <li><a href="">About</a></li>
                                    <li><a href="">News</a></li>
                                    <li><a href="">FAQ</a></li>
                                    <li><a href="">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="single_footer_part">
                                <h4>Address</h4>
                                <ul className="list-unstyled">
                                    <li><a href="#">200, Green block, NewYork</a></li>
                                    <li><a href="#">+10 456 267 1678</a></li>
                                    <li><span>contact89@winter.com</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            <div className="single_footer_part">
                                <h4>Newsletter</h4>
                                <div id="mc_embed_signup">
                                    <form target="_blank"
                                          action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                                          method="get" className="subscribe_form relative mail_part">
                                        <input type="email" name="email" id="newsletter-form-email"
                                               placeholder="Email Address"
                                               className="placeholder hide-on-focus" onFocus="this.placeholder = ''"
                                               onBlur="this.placeholder = ' Email Address '" />
                                            <button type="submit" name="submit" id="newsletter-submit"
                                                    className="email_icon newsletter-submit button-contactForm">subscribe
                                            </button>
                                            <div className="mt-10 info"></div>
                                    </form>
                                </div>
                                <div className="social_icon">
                                    <a href="#"><i className="ti-facebook"></i></a>
                                    <a href="#"><i className="ti-twitter-alt"></i></a>
                                    <a href="#"><i className="ti-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="copyright_text">
                                <p>
                                    Copyright &copy;
                                    <script>document.write(new Date().getFullYear());</script>
                                    All rights reserved | This template is made with <i className="ti-heart"
                                                                                        aria-hidden="true"></i> by <a
                                        href="https://colorlib.com" target="_blank">Colorlib</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;