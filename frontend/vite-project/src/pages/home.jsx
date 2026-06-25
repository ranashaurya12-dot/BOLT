import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import FeaturedProducts from "../components/featureproducts"
import Categories from "../components/Categories"
import Footer from "../components/footer"
function Home() {
  return (
    <>
    
      <Hero />
      <FeaturedProducts></FeaturedProducts>
      <Categories></Categories>
      <Footer></Footer>
    </>
  )
}

export default Home