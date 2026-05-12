import React from 'react';
import { useState } from 'react'

import './Homepage.css'

const Homepage = () => {
  const [image, setImage] = useState()

  const imgOne = image === 'two' ? 'hide' :
  image === 'three' ? 'hide' : 'home-article';

  const imgTwo = image === 'one' ? 'hide' :
  image === 'three' ? 'hide' : 'home-article';

  const imgThree = image === 'one' ? 'hide' :
  image === 'two' ? 'hide' : 'home-article';

  const handleImg = (id) => {
    if (!image) {
      setImage(id)
    }
    if (image) {
      setImage()
    }
  }

  return (
    <>
    <h1>HomePage</h1>
    <div id="home-display">
    <button onClick={() => handleImg('one')}><img className={imgOne} id={image === 'one' ? "one" : ""} src="https://www.financestrategists.com/uploads/featured/Budgeting-Overview.png" alt="Finance Strategies 'creativecommons.org' "  /></button>
    <button onClick={() => handleImg('two')}><img className={imgTwo} id={image === 'two' ? "two" : ""} src="https://www.financestrategists.com/uploads/featured/Personal_Finance_Best_Practices.png" alt="Finance Strategies 'creativecommons.org' " /></button>
    <button onClick={() => handleImg('three')}><img className={imgThree} id={image === 'three' ? "three" : ""} src="https://www.financestrategists.com/uploads/featured/Tips-for-Creating-a-Successful-Budget.png" alt="Finance Strategies 'creativecommons.org' " /></button>
    </div>
    </>
  )
}

export default Homepage;