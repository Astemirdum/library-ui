import React, {useState, useEffect} from 'react';
import GatewayService from "../API/GatewayService";
import StatsList from "../components/Stats/StatsList"


function Stats() {
    const [stats, setStats] = useState([]);
    const [error, setError] = useState('');

    const fetchStats = async () => {
        try {
            const response = await GatewayService.fetchStatistics();
            setStats(response.data.data)
        } catch(error){
            setError(error)
            console.error('fetchStatistics error:', error)
        } 
    }

    useEffect(() => {
        fetchStats();
    }, [])

    return (
        <div className="App">
            <hr style={{margin: '15px 0'}}/>
            {error && <h1>Произошла ошибка ${error}</h1>}
            <StatsList stats={stats}/>
        </div>
    );
}

export default Stats;
