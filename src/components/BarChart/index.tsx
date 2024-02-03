import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { IChart } from "@/interfaces/interfaces";
import './styles.css'; // Import the CSS file
import { WindowComponent } from "../WindowComponent";
import vocabulary from '../../vocabulary'




interface IcalculatedData {
    [key: string]: number 
}

export default function CardBarChart({data}: IChart) {
    const calculatedData: IcalculatedData = {}
    data?.forEach(e => {
        if(e.request.method){
            if(calculatedData[e.request.method]){
            calculatedData[e.request.method] = calculatedData[e.request.method] + 1
            }else{
            calculatedData[e.request.method] = 1
            }
        }
    })
    return (data && Object.keys(calculatedData).length)? 
    <WindowComponent title={vocabulary.barTitle} description={vocabulary.barDesciption}> 

        <div className='chartContainer'>
        <BarChart
            xAxis={[
            {
                id: 'HTTP Answer Codes',
                data: Object.keys(calculatedData),
                scaleType: 'band',
            },
            ]}
            series={[
            {
                data: Object.values(calculatedData),
            },
            ]}
        /> </div>
    </WindowComponent> 
: <></>
}