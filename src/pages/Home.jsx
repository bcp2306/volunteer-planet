import volunteers from '../assets/volunteer-home.jpg'
import volunteers2 from '../assets/volunteer-home 2.jpg'


function Home() {
    return (
        <div className="hPage">
            <h1 className="hColor">Home</h1>
            <div className="image-container">
            <div className='hImg'><img src={volunteers} className="hImg" alt="Plant" /></div>
            <div className='hImg2'><img src={volunteers2} className="hImg2" alt="wall" /></div>
        </div>
    </div>
    )
}
 
export default Home