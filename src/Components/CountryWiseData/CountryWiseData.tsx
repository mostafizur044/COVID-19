import * as React from 'react';
import { ICountryResponse, ITopDeath, ITopCases, ITopRecovered, ITopCritical } from '../../Models/Models';
import { getApi } from '../../configs';
import './CountryWiseData.scss';
import Top5Cases from '../Top5Cases/Top5Cases';
import Top5Deaths from '../Top5Deaths/Top5Deaths';
import Top5Recovered from '../Top5Recovered/Top5Recovered';
import Top5Critical from '../Top5Critical/Top5Critical';
import FormControl from 'react-bootstrap/FormControl';
import { debounce } from "lodash";
import Card from '../Card/Card';

interface IState {
    responseData?: ICountryResponse[];
    topDeath?: ITopDeath[];
    topCases?: ITopCases[];
    topRecovered?: ITopRecovered[];
    topCritical?: ITopCritical[];
    searchResult?: ICountryResponse[];
}

export default class CountryWiseData extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            responseData: [],
            topDeath: [],
            topCases: [],
            topRecovered: [],
            topCritical: [],
            searchResult: []
        };
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    componentDidMount() {
        this.fetchCountriesInfo();
    }
    
    fetchCountriesInfo = async () => {
        try {
            const response = await getApi("countries");
            let result = response.data;
            // console.log(result)
            this.formatDataForAnalytics(result);
        } catch (error) {
            console.error(error);
        }
    };

    private formatDataForAnalytics(data: ICountryResponse[]) {
        let topDeath = [], topCases = [], topRecovered = [], topCritical = [], responseData = [];

        for(let d of data) {
            topDeath.push({country: d.country, deaths: d.deaths, todayDeaths: d.todayDeaths});
            topCases.push({country: d.country, cases: d.cases, todayCases: d.todayCases});
            topRecovered.push({country: d.country, recovered: d.recovered});
            topCritical.push({country: d.country, critical: d.critical});
        }
        this.setState({ 
            ...this.state,
            topDeath: this.getTop5Data(topDeath, 'deaths'), 
            topCases: this.getTop5Data(topCases, 'cases'), 
            topRecovered: this.getTop5Data(topRecovered, 'recovered'), 
            topCritical: this.getTop5Data(topCritical, 'critical') 
        });
        responseData = data.map( m => {
            m.casePosition = this.isExist(this.state.topCases, m.country) + 1;
            m.deathPosition = this.isExist(this.state.topDeath, m.country) + 1;
            m.recoveredPosition = this.isExist(this.state.topRecovered, m.country) + 1;
            m.criticalPosition = this.isExist(this.state.topCritical, m.country) + 1;
            m.searchValue = m.country?.toLowerCase();
            return m;
        });
        this.setState({ ...this.state, responseData });
        // console.log(this.state)
    }

    private isExist(data: any, searchValue: any) {
        return data.findIndex( (f: any) => f.country === searchValue);
    }

    private getTop5Data(data: any[], prop: string) {
        data.sort( (a:any, b: any) => {
            return b[prop] - a[prop];
        });
        if(data.length > 5) {
            return data.slice(0,5);
        }   
        return data;
    }

    private getSingleCountryInfo (search: string) {
        if(search) {
            const searchResult = this.state.responseData?.filter( f => f.searchValue.includes(search.toLowerCase()));
            this.setState({ ...this.state, searchResult });
        } else {
            this.setState({ ...this.state, searchResult: [] });
        }
        console.log(this.state.searchResult)
    };

    keyUpHandler(event: any) {
        const searchValue = event.target.value;
        const f =  debounce(() => this.getSingleCountryInfo(searchValue), 500);
        f();
    }


  render () {
    return (
      <React.Fragment>
        <div className="FlexContainer">
            <div className="BarChart">
                <h5>Top 5 Cases</h5>
                <Top5Cases data={this.state.topCases || []}></Top5Cases>
            </div>
            <div className="BarChart">
                <h5>Top 5 Deaths</h5>
                <Top5Deaths data={this.state.topDeath || []}></Top5Deaths>
            </div>
        </div>
        <div className="FlexContainer">
            <div className="BarChart">
                <h5>Top 5 Recovered</h5>
                <Top5Recovered data={this.state.topRecovered || []}></Top5Recovered>
            </div>
            <div className="BarChart">
                <h5>Top 5 Critical Cases</h5>
                <Top5Critical data={this.state.topCritical || []}></Top5Critical>
            </div>
        </div>

        <div className="SearchSection">
            <div className="Search">
                <FormControl placeholder="Search by country" type="text" name="country" onKeyUp={this.keyUpHandler} />
            </div>
            <div className="PositionColor">
                <div className="items">
                    <span className="color-box case"></span> <small>Cases</small>
                </div>
                <div className="items">
                    <span className="color-box death"></span> <small>Deaths</small>
                </div>
                <div className="items">
                    <span className="color-box recover"></span> <small>Recovered</small>
                </div>
                <div className="items">
                    <span className="color-box critical"></span> <small>Critical</small>
                </div>
            </div>
        </div>
        <div className="CardContainer">
            {this.state.searchResult && this.state.searchResult.length > 0 ? (
                this.state.searchResult.map((info, index) => (
                <Card info={info} key={index} />))
                ) : (
                    this.state.responseData?.map((info, index) => (
                        <Card info={info} key={index} />))
                ) }
        </div>

      </React.Fragment>
    );
  }
}