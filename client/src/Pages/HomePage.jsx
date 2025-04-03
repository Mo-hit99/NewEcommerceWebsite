import { CarouselSlider } from "../Components/CarouselSlider";
import TopReviewSelectProduct from "../Components/TopReviewSelectProduct";
import CompanyServices from "../Components/CompanyServices";
import PromoSections from "../Components/PromoSections";
import ProductFeatures from "../Components/ProductFeatures";
import ProductFeatures2 from "../Components/ProductFeatures2";
import ProductFeatures3 from "../Components/ProductFeatures3";
import BestSellingItems from "../Components/BestSellingItems";
import AllCollectionsItems from "../Components/AllCollectionsItems";
export default function HomePage() {
  return (
    <section>
    <CarouselSlider/>
    <TopReviewSelectProduct/>
    <CompanyServices/>
    <PromoSections/>
    <BestSellingItems/>
    <ProductFeatures/>
    <ProductFeatures2/>
    <ProductFeatures3/>
    <AllCollectionsItems/>
    </section>
  )
}
