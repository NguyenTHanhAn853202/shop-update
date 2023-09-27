import classNames from "classnames/bind";
import styles from './statistic.module.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { statistic } from "~/api-server/bought";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê',
      },
    },
  };

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September', 'October', 'November', 'December'];



const  cx = classNames.bind(styles)

function Statistic() {
  const [data,setData] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [year,setYear] = useState(new Date())
  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Năm '+new Date(year).getFullYear(),
        data: data,
        backgroundColor: ['rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(46, 57, 138, 0.8)',
        'rgba(46, 147, 138, 0.8)',
        'rgba(193, 199, 74, 0.8)',
        'rgba(17, 27, 23, 0.8)',
        'rgba(17, 27, 23, 0.8)',
        'rgba(243, 241, 23, 0.8)'
      ]
      }
    ],
  };
  useEffect(()=>{
    (async()=>{
      const data = await statistic(new Date(year).getFullYear())
      if(data.success) {
        const dataMonth = data.data
        let newData = []
        for(const key in dataMonth){
          newData.push(dataMonth[key])
        }
        setData(newData)
      }
    })()
  },[year])
  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };
    return <div className={cx('wrapper')}>
        <div className={cx('date-picker')}>
            <label>Chọn năm: </label>
            <DatePicker 
              selected={year}
              renderYearContent={renderYearContent}
              showYearPicker
              onChange={(data) =>setYear(data)}
              dateFormat="yyyy"
            />
        </div>
         <Bar options={options} data={dataChart} />
    </div>;
}

export default Statistic;

