import React, {Component} from "react";
import '../pages/Main.css'
import {withTranslation} from "react-i18next";
import WorkflowLine from "../pie/WorkflowLine";

class Main extends Component {

    render() {
        const {t} = this.props;
        return (
            <>
                <section className="banner_part">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-7">
                                <div className="banner_slider">
                                    <div className="single_banner_slider">
                                        <div className="banner_text">
                                            <div className="banner_text_iner">
                                                <h1>{t('employee productivity')}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="feature_part pt-4">
                    <div className="container-fluid p-lg-0 overflow-hidden">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-lg-4 col-sm-6">
                                <div className="single_feature_post_text">
                                    <img src="img/feature_1.jpeg" alt="#" />
                                        <div className="hover_text">
                                            <a href="single-product.html" className="btn_2">Effectiveness</a>
                                        </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="single_feature_post_text">
                                    <img src="img/feature_2.jpeg" alt="#" />
                                        <div className="hover_text">
                                            <a href="single-product.html" className="btn_2">Productivity</a>
                                        </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="single_feature_post_text">
                                    <img src="img/feature_3.jpeg" alt="#" />
                                        <div className="hover_text">
                                            <a href="single-product.html" className="btn_2">Time management</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    )
    }
    }

    export default withTranslation()(Main);