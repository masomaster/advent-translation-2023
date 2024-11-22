import Header from "../../components/Header/Header";
import Hero from "../../components/HomePageComponents/Hero";
import FeatureSection from "../../components/HomePageComponents/FeatureSection";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

export default function HomePage({ user, authPage, setAuthPage, setCurrentDay }) {
  return (
    <div className="homepage-container">
      <Header authPage={authPage} setAuthPage={setAuthPage} />
      <main className="container">
        <Hero setCurrentDay={setCurrentDay} />
        <FeatureSection />
      </main>
      <Footer user={user} />
    </div>
  );
}
