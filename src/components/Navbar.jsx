import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../ContextProvider';
const Navbar = () => {
 const [search, setSearch] = useState('');
 const{handleSearch}=useContext(Context)

//Search keywords in the app 
const handleSubmit=(e)=>{
e.preventDefault()
handleSearch(search)
}
  return (
  <>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className="navbar-brand" to="/">Home</Link>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/favourites">Favourites</Link>
        </li>
      </ul>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={
          (e)=>{
            console.log(("target",e.target.value));
          setSearch(e.target.value)
        }}/>
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  </>
  )
}

export default Navbar
