import React from 'react';
import { ITopCases } from '../../Models/Models';
import { Bar } from 'react-chartjs-2';

interface IProps {
  data: ITopCases[]
}

export default function Top5Cases(props: IProps) {
    const country = props.data.map( m => m.country);
    const cases = props.data.map( m => m.cases);
    const todayCases = props.data.map( m => m.todayCases);
    const barData = {
        labels: country,
        datasets: [
          {
            label: 'Total Cases',
            backgroundColor: 'rgba(51,135,229,1)',
            borderColor: 'rgba(51,135,229,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(51,135,229,1)',
            hoverBorderColor: 'rgba(51,135,229,1)',
            data: cases
          },
          {
            label: 'Todays Cases',
            backgroundColor: 'rgba(138,51,229, 1)',
            borderColor: 'rgba(138,51,229, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(138,51,229, 1)',
            hoverBorderColor: 'rgba(138,51,229, 1)',
            data: todayCases
          }
        ]
      };

  return (
    <Bar data={barData} />
  );
}
