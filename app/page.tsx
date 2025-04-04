'use client';

// Components
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Categories from './components/Categories/Categories';
import NewProducts from './components/NewProducts/NewProducts';
import BestSellers from './components/BestSellers/BestSellers';
import FlashSale from './components/FlashSale/FlashSale';
import Footer from './components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Banner />
      <FlashSale />
      <Categories />
      <NewProducts />
      <BestSellers />
      <Footer />
    </main>
  );
}
