import React from 'react';
import { ITopCritical } from '../../Models/Models';
import { Bar } from 'react-chartjs-2';

interface IProps {
  data: ITopCritical[]
}

export default function Top5Critical(props: IProps) {
    const country = props.data.map( m => m.country);
    const critical = props.data.map( m => m.critical);
    const barData = {
        labels: country,
        datasets: [
          {
            label: 'Total Critical Cases',
            backgroundColor: 'rgba(77,8,8,1)',
            borderColor: 'rgba(77,8,8,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(77,8,8,1)',
            hoverBorderColor: 'rgba(77,8,8,1)',
            data: critical
          }
        ]
      };

  return (
    <Bar data={barData} />
  );
}
