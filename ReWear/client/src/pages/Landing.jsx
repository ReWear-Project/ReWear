import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
// import Categories from "../components/landing/Categories";
import CTA from "../components/landing/CTA";

const Landing = () => {
  return (
    <div className="space-y-16">
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Categories /> */}
      <CTA />
    </div>
  );
};

export default Landing;