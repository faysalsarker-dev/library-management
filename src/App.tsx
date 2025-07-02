
import './App.css'
import { GenresSection, HeroSection,BookCardList ,TopBorrowedBooks} from './components/custom'
function App() {

  return (
    <>
    <HeroSection/>
 <div className='max-w-6xl mx-auto px-2'>
      <GenresSection/>
   <BookCardList/>
   <TopBorrowedBooks/>
 </div>
    </>
  )
}

export default App
