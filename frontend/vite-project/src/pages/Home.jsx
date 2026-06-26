import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Categories from "../components/Categories"
import FeaturedProducts from "../components/FeaturedProducts"
import Footer from "../components/Footer"
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