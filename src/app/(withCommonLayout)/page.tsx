import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import Specialties from "@/components/UI/HomePage/Specialties/Specialties";
import TopRatedDoctors from "@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/UI/HomePage/WhyUs/WhyUs";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Specialties />
      <TopRatedDoctors />
      <WhyUs/>
    </>
  );
};

export default HomePage;
