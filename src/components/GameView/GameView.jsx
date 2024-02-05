import './GameView.css'

export const GameView = () => {
    return (
        <div className='container'>
            <h2>GAVERSNATCH</h2>
            <div className='row'>
                <div className="adventure-text"></div>
                <div className="inventory"></div>
            </div>
            <div className="inputs">
                <button className='n'>Go North</button>
                <button className='e'>Go East</button>
                <button className='s'>Go South</button>
                <button className='w'>Go West</button>
            </div>
            <div className="tips">

            </div>
        </div>
    )
}