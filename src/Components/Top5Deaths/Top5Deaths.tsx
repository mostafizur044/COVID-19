import React from 'react';
import { ITopDeath } from '../../Models/Models';
import { Bar } from 'react-chartjs-2';

interface IProps {
  data: ITopDeath[]
}

export default function Top5Deaths(props: IProps) {
    const country = props.data.map( m => m.country);
    const deaths = props.data.map( m => m.deaths);
    const todayDeaths = props.data.map( m => m.todayDeaths);
    const barData = {
        labels: country,
        datasets: [
          {
            label: 'Total Deaths',
            backgroundColor: 'rgba(231,18,29,1)',
            borderColor: 'rgba(231,18,29,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(231,18,29,1)',
            hoverBorderColor: 'rgba(231,18,29,1)',
            data: deaths
          },
          {
            label: 'Todays Deaths',
            backgroundColor: 'rgba(131,4,10, 1)',
            borderColor: 'rgba(131,4,10, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(131,4,10, 1)',
            hoverBorderColor: 'rgba(131,4,10, 1)',
            data: todayDeaths
          }
        ]
      };

  return (
    <Bar data={barData} />
  );
}
