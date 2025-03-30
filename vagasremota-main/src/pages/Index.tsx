
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryFilters from "@/components/CategoryFilters";
import FeaturedJobs from "@/components/FeaturedJobs";
import KeyFeatures from "@/components/KeyFeatures";
import WhyUseRemotando from "@/components/WhyUseRemotando";
import ForCompanies from "@/components/ForCompanies";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <CategoryFilters />
        <FeaturedJobs />
        <FeaturesSection />
        <KeyFeatures />
        <WhyUseRemotando />
        <ForCompanies />
        <BlogSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
