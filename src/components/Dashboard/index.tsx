"use client";

import { IDataItem } from '@/interfaces/interfaces';
import React, { useEffect, useState } from 'react';
import CardBarChart from '../BarChart';
import CardLateralBarchart from '../LateralBarChart';
import CardLineChart from '../LineChart';
import CardPieChart from '../PieChart';
import './styles.css'; // Import the CSS file
import { ThemeProvider } from 'styled-components';
import vocabulary from '../../vocabulary'
import { Hourglass } from 'react95';
4


/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';
import  { AppBarComponent } from '../AppBar';



const Dashboard = () => {
    const [data, setData] = useState<IDataItem[]>([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch('formatted_data.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <ThemeProvider theme={original}>
            <div className="container">
                {loading 
                ?  <Hourglass size={32} style={{ margin: '25px 25px 25px 50%' }} /> 
                : <>
                    {vocabulary.comapnyDescription}
                    <AppBarComponent/>
                    <CardLineChart data={data}/>
                    <CardPieChart data={data}/>
                    <CardBarChart data={data}/>
                    <CardLateralBarchart data={data}/>
                    <Hourglass size={32} style={{ margin: 20 }} />
                  </>
                }

            </div>
        </ThemeProvider>

    )
}

export default Dashboard