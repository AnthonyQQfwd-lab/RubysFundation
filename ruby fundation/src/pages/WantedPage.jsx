import React from 'react'
import NavBar from '../components/NavBar'
import OutPutWanted from '../components/OutPutWanted'
import OutPutMissing from '../components/OutPutMissing'
import '../styles/WantedPage/wantedPage.css'
function WantedPage() {
  return (
    <div>
        <NavBar />
        <div id="wantedPage">
          <OutPutWanted />
          <OutPutMissing />
        </div>
        
    </div>
  )
}

export default WantedPage