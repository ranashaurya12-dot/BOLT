import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Categories from "../components/Categories"
import FeaturedProducts from "../components/FeaturedProducts"
import Footer from "../components/Footer"
import ScientificPower from "../components/ScientificPower"
import Slideshow from "../components/slideshow"
function Home() {
  return (
    <>
    <Slideshow></Slideshow>
      <Hero />
      <FeaturedProducts></FeaturedProducts>
       <ScientificPower></ScientificPower>
      <Categories></Categories>
      <Footer></Footer>
    </>
  )
}

export default Home