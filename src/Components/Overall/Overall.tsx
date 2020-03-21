import * as React from 'react';
import { IAllInformationData, AllInformation } from '../../Models/Models';
import { getApi } from '../../configs';
import './Overall.scss';
import { Pie } from 'react-chartjs-2';


export default class Overall extends React.Component<{}, IAllInformationData> {

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.fetchOverallInfo();
    }
    
    fetchOverallInfo = async () => {
        try {
            const response = await getApi("all");
            let result = new AllInformation(response.data);
            // console.log(result)
            this.setState({ ...result });
        } catch (error) {
            console.error(error);
        }
    };

  render () {
    const {totalCases, totalDeaths, totalRecovered} = this.state;
    const pieData = {
        labels: [
            'Total Cases',
            'Total Deaths',
            'Total Recovered'
        ],
        datasets: [{
            data: [totalCases, totalDeaths, totalRecovered],
            backgroundColor: [
            '#423feb',
            '#b9011a',
            '#35b929'
            ],
            hoverBackgroundColor: [
            '#423feb',
            '#b9011a',
            '#35b929'
            ]
        }]
    };
    return (
      <React.Fragment>
        <div className="UpdatedTime"><span>Last Update: {this.state.updatedDateTime}</span></div>
        <div className="OverAllSection">
            <div className="CountingSection">
                <div className="Count">
                    <small>Total Cases</small>
                    <h5>{this.state.totalCases?.toLocaleString('en-US')}</h5>
                </div>
                <div className="Count">
                    <small>Total Deaths</small>
                    <h5>{this.state.totalDeaths?.toLocaleString('en-US')}</h5>
                </div>
                <div className="Count">
                    <small>Total Recovered</small>
                    <h5>{this.state.totalRecovered?.toLocaleString('en-US')}</h5>
                </div>
            </div>
            <div className="GraphSection">
                <Pie data={pieData} />
            </div>
        </div>
      </React.Fragment>
    );
  }
}