import React, {useState} from 'react'
import './Search.css'

const Search = ({history}) => {

    const [keyword,setkeyword] = useState("")

    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            history.pushState(`/products/${keyword}`)
        }else{
          history.push("/products")
        }
    }

  return (
    <>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input 
          type="text"
          placeholder='Search a Product...'
          onChange={(e)=>setkeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </>
  )
}

export default Search