
import Navbar from './components/Navbar';
import { Outlet} from 'react-router-dom'
import ContextProvider from './ContextProvider';



function App() {

  return (
    <ContextProvider>
    <Navbar/>
    <Outlet/>
    </ContextProvider>
  )
}

export default App

