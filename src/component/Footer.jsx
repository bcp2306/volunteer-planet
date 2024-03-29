 /**
 * Footer component 
 *
 * Class to display name, student number and course information
 * at the end of every route in app.
 *
 * @author Bradley Pearson
 */

function Footer() 
{
    const name = "-- Bradley Pearson -- Reece Pearson -- Abid Rahman -- Kevin Osminski -- Sean Molloy --"
    const text = "Coursework assignment for KV6002 - Team Project and Professionalism, Northumbria University."

    return (
        <div className="footer">
        <footer>
            <h4 className="fColor">Authors</h4>
            <p className="fColor">{name}</p>
            <p className="fColor">{text}</p>
        </footer>
        </div>
    )
   
}

export default Footer