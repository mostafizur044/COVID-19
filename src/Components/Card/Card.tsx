import './Card.scss';
import React from 'react';
import { ICountryResponse } from '../../Models/Models';


interface IProps {
  info: ICountryResponse;
  key: number;
}
export default function Card(props: IProps) {
  return (
    <div className="CardItem">
      <div className="country-info">
        <h5>{props.info.country}</h5>
        <p>
          <small>Total Cases:</small>{' '}
          <span className="number-tag">
            {props.info.cases.toLocaleString('en-US')}
          </span>
          {props.info.casePosition ? (<span className="badges case">{props.info.casePosition}</span>) : ''}
        </p>
        <p>
          <small>Total Deaths:</small>{' '}
          <span className="number-tag">
            {props.info.deaths.toLocaleString('en-US')}
          </span>
          {props.info.deathPosition ? (<span className="badges death">{props.info.deathPosition}</span>) : ''}
        </p>
        <p>
          <small>Total Recovered:</small>{' '}
          <span className="number-tag recover-tag">
            {props.info.recovered.toLocaleString('en-US')}
          </span>
          {props.info.recoveredPosition ? (<span className="badges recover">{props.info.recoveredPosition}</span>) : ''}
        </p>
        <p>
          <small>Critical:</small>{' '}
          <span className="number-tag">
            {props.info.critical.toLocaleString('en-US')}
          </span>
          {props.info.criticalPosition ? (<span className="badges critical">{props.info.criticalPosition}</span>) : ''}
        </p>
        <p>
          <small>Todays Cases:</small>{' '}
          <span className="number-tag">
            {props.info.todayCases.toLocaleString('en-US')}
          </span>
        </p>
        <p>
          <small>Todays Deaths:</small>{' '}
          <span className="number-tag">
            {props.info.todayDeaths.toLocaleString('en-US')}
          </span>
        </p>
      </div>
    </div>
  );
}
