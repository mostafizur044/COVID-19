import * as React from 'react';
import { CountryResponse } from '../../Models/Models';
import './YourCountryInfo.scss';
import { getIp, getLocation, getApi } from '../../configs';

interface IYourCountryInfo {
    data: CountryResponse;
    ip: string;
    country: string;
}

export default class YourCountryInfo extends React.Component<{}, IYourCountryInfo> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: new CountryResponse(),
            ip: '',
            country: ''
        };
    }

    componentDidMount() {
        this.fetchOverallInfo();
    }
    
    fetchOverallInfo = async () => {
        try {
            const response = await getIp();
            if(response.status === 200 && response.data.ip) {
                const result = await getLocation(response.data.ip);
                this.setState({ ...this.state, ip: response.data.ip});
                if(result.status === 200 && result.data) {
                    const country = result.data.country_name;
                    this.setState({ ...this.state, country});
                    const actualData = await getApi(`countries/${country}`);
                    this.setState({ ...this.state, data: actualData.data});
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

  render () {
    return (
      <React.Fragment>
        {this.state.ip && this.state.country ? (
            <React.Fragment>
                <div className="CurrentPosition">
                    <span>Your Current Location: <b>{this.state.country}</b></span><br/>
                    <span>Current COVID-19 situation in your location</span>
                </div>
                <div className="CurrentLocationInfo">
                    <p>
                        <small>Today Cases:</small>{' '}
                        <span className="number-tag">
                            {this.state.data.cases.toLocaleString('en-US')}
                        </span>
                    </p>
                    <p>
                        <small>Total Deaths:</small>{' '}
                        <span className="number-tag">
                            {this.state.data.deaths.toLocaleString('en-US')}
                        </span>
                    </p>
                    <p>
                        <small>Total Recovered:</small>{' '}
                        <span className="number-tag">
                            {this.state.data.recovered.toLocaleString('en-US')}
                        </span>
                    </p>
                    <p>
                        <small>Critical:</small>{' '}
                        <span className="number-tag">
                            {this.state.data.critical.toLocaleString('en-US')}
                        </span>
                    </p>
                    <p>
                        <small>Today Cases:</small>{' '}
                        <span className="number-tag">
                            {this.state.data.todayCases.toLocaleString('en-US')}
                        </span>
                    </p>
                    <p>
                        <small>Today Deaths:</small>{' '}
                        <span className="number-tag">
                            {this.state.data.todayDeaths.toLocaleString('en-US')}
                        </span>
                    </p>
                    <p>
                        <small>Cases Per One Million:</small>{' '}
                        <span className="number-tag">
                            {this.state.data.casesPerOneMillion.toLocaleString('en-US')}
                        </span>
                    </p>
                </div>
            </React.Fragment>
        ) : ''}
      </React.Fragment>
    );
  }
}