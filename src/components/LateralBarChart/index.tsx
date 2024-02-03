import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { IChart } from '@/interfaces/interfaces';
import './styles.css'
import { WindowComponent } from '../WindowComponent';
import vocabulary from '../../vocabulary'



const chartSetting = {
  xAxis: [
    {
      label: 'Number of request',
    },
  ],
};

const valueFormatter = (value: number) => `${value}`;

interface IcalculatedData {
    [key: number]: number | string 
}

export default function HorizontalBars({data}: IChart) {
  const calculatedData: IcalculatedData = {}
  data.forEach(e=> {
      if(e.response_code === '200' && +e.document_size > 1000){
        let interval =Math.floor(+e.document_size/1000)
        if(interval > 10){
            interval = Math.floor(interval / 10)*10
            if(interval >50){
                interval = 50
            }
        }
        if(calculatedData[interval]){
            calculatedData[interval] = +calculatedData[interval] + 1
        }else{
            calculatedData[interval] = 1
        }
      }
      
  })
  return (
    (data && Object.keys(calculatedData).length) ? 
    <WindowComponent title={vocabulary.lateralBarTitle} description={vocabulary.leteralBarDescription}> 
    <div className='chartContainer'>
    <BarChart
      dataset={Object.keys(calculatedData).map((e: string) => {
          return {
            number: calculatedData[+e],
            interval: '>' + (+e * 1000)
          }
      })}
      yAxis={[{ scaleType: 'band', dataKey: 'interval' }]}
      series={[{ dataKey: 'number', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    /> </div>
    </WindowComponent> : <></>
  );
}
