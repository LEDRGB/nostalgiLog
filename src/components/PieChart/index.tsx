import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { IChart } from '@/interfaces/interfaces';
import './styles.css'; 
import { WindowComponent } from '../WindowComponent';
import vocabulary from '../../vocabulary'




interface IcalculatedData {
    [key: string]: number 
}
export default function CardPieChart({data}: IChart) {
  const calculatedData: IcalculatedData = {}
  data?.forEach(e => {
    if(e.response_code){
      if(calculatedData[e.response_code]){
        calculatedData[e.response_code] = calculatedData[e.response_code] + 1
      }else{
        calculatedData[e.response_code] = 1
      }
    }
  })
  return (
    (data && Object.keys(calculatedData).length) ? 
      <WindowComponent title={vocabulary.pieTitle} description={vocabulary.pieDescription}> 
        <div className='chartContainer'>
          <PieChart
          title='Distribution of HTTP methods'
          series={[
              {
                  data: Object.keys(calculatedData).map((e,index)=> {
                      return { id: index, value: calculatedData[e], label: e }
                  }),
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
          ]}
          />     
        </div>
    </WindowComponent>: <></>
  )
}