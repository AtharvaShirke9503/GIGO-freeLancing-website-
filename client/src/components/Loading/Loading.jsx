import { HashLoader } from 'react-spinners'
import "./Loading.scss"

export default function Loading() {
    return (
        <div className="loading-spinner">
            <HashLoader
                color="#1AA68D"
                size={100}
                speedMultiplier={1.5}
            />
        </div>
    )
}
