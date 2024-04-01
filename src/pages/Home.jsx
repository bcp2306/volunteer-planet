import volunteers from '../assets/volunteer-home.jpg'

function Home() {
    return (
        <div className="hPage">
            <h1 className="hColor">Home</h1>
            <div className='hImg'><img src={volunteers} className="hImg" alt="Plant" /></div>
        </div>
    )
}
 
export default Home