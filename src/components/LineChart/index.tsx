import { IChart } from '@/interfaces/interfaces';
import { LineChart } from '@mui/x-charts/LineChart';
import { WindowComponent } from '../WindowComponent';
import './styles.css'
import vocabulary from '../../vocabulary'


export default function CardLineChart({data}: IChart) {
    const xAxis: string[] = []
    const yAxis: number[] = []
    //visual bug, need to be investigated
  
    data?.forEach((e, index) => {
      if(e.datetime.minute !== data[index-1]?.datetime.minute){
        xAxis.push(`${e.datetime.hour}:${e.datetime.minute}`)
        yAxis.push(1)
      }else{
          yAxis[yAxis.length-1] = yAxis[yAxis.length-1] + 1
      }
    })
    //visual bug, need to be investigated
    xAxis.pop()
    yAxis.pop()
    return (
      (data && xAxis.length && yAxis.length) ? 
      <WindowComponent title={vocabulary.lineTitle} description={vocabulary.lineDescription}> 
        <div className='chartContainer'>
          <LineChart
            xAxis={[{ data: xAxis, scaleType: 'point' }]}
            series={[
              {
                data: yAxis,
                stack: 'total',
                area: true,
                showMark: false,
              },
            ]}
          />
          </div>
        </WindowComponent> : <></>
      );
 }
