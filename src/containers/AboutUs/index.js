import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {MemberCard} from "../../components/MemberCard";

class AboutUs extends Component {
	render() {
		return (
			<Fragment>
                <div className="wrapper public-wrapper">
					<div className="main-panel">
                        <div className="about-page">
                            <section className="content-wrapper">
                                <div className="grid-wrapper hero-banner">
                                    <div className="grid">
                                        <div className="grid__cell">
                                            <h1 className="hero-banner__title">
                                                <Link to="/">We are CodeBrewers </Link>
                                            </h1>
                                            <div className="hero-banner__subtitle" data-type="plain_text">
                                                A community of passionate individuals whose purpose is to revolutionize software design, creation and delivery, taking the challenges from the world.
                                            </div>
                                            <div className="contact-us-wrapper">
                                                <a href="mailto:benchmark.codebrewers@gmail.com" title="Contact Us!" class="contact-link">
                                                    <i class="fa fa-envelope"></i><span>Contact Us</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="space"></div>
                            <section className="">
                                <div className="grid-wrapper hero-banner hero-banner--about-us ">
                                    <div className="grid">
                                        <div className="grid__cell grid__display">
                                            <MemberCard 
                                                username="Naincy Gupta" 
                                                usertitle="Cloud Engineer"
                                                useravatar="naincy.jpg"
                                                userfb="https://www.facebook.com/naincy.gupta.35574"
                                                usergithub="https://www.github.com/naincy"
                                                userlinkedin="https://www.linkedin.com/in/naincy-g-6a344066/"
                                                userclass="" />

                                            <MemberCard 
                                                username="Anurag Gautam" 
                                                usertitle="Full Stack Developer"
                                                useravatar="anurag.jpeg"
                                                userfb="https://www.facebook.com/anuraggautam77"
                                                usergithub="https://github.com/anuraggautam77"
                                                userlinkedin="https://www.linkedin.com/in/anuraggautam77/"
                                                userclass="anurag" />

                                            <MemberCard 
                                                username="Soumya Mishra" 
                                                usertitle="Creative Designer"
                                                useravatar="soumya1.jpg"
                                                userfb="https://www.facebook.com/soumyaranjan.mishra.90"
                                                usergithub="#"
                                                userlinkedin="https://www.linkedin.com/in/soumya-ranjan-mishra-071aa72a/"
                                                userclass="soumya" />

                                            <MemberCard 
                                                username="Kartik Karnayil" 
                                                usertitle="Backend Expert"
                                                useravatar="kartik.jpg"
                                                userfb="https://www.facebook.com/kkarnayil"
                                                usergithub="https://github.com/kkarnayil"
                                                userlinkedin="https://www.linkedin.com/in/kkarnayil/"
                                                userclass="kartik" />

                                            <MemberCard 
                                                username="Anshul Kabra" 
                                                usertitle="Frontend Expert"
                                                useravatar="anshul.jpg"
                                                userfb="https://www.facebook.com/anshul990"
                                                usergithub="https://github.com/anuraggautam77"
                                                userlinkedin="#"
                                                userclass="anshul" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(AboutUs);
