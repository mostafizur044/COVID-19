import React from 'react';
import { ITopRecovered } from '../../Models/Models';
import { Bar } from 'react-chartjs-2';

interface IProps {
  data: ITopRecovered[]
}

export default function Top5Recovered(props: IProps) {
    const country = props.data.map( m => m.country);
    const recovered = props.data.map( m => m.recovered);
    const barData = {
        labels: country,
        datasets: [
          {
            label: 'Total Recovered',
            backgroundColor: 'rgba(14,126,22,1)',
            borderColor: 'rgba(14,126,22,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(14,126,22,1)',
            hoverBorderColor: 'rgba(14,126,22,1)',
            data: recovered
          }
        ]
      };

  return (
    <Bar data={barData} />
  );
}
