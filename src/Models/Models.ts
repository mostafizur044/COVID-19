export interface IAllInformationData {
    totalCases?: number;
    totalDeaths?: number;
    totalRecovered?: number;
    updatedDateTime?: any;
  }
  
  export class AllInformation<T> {
    totalCases?: number;
    totalDeaths?: number;
    totalRecovered?: number;
    updatedDateTime: any;
    constructor(serverData: any) {
      this.totalCases = serverData.cases ? serverData.cases : 0;
      this.totalDeaths = serverData.deaths ? serverData.deaths : 0;
      this.totalRecovered = serverData.recovered ? serverData.recovered : 0;
      this.updatedDateTime = serverData.updated
        ? new Date(serverData.updated).toLocaleString()
        : 0;
    }
  }
  
  export interface ICountryResponse {
    country: string;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    critical: number;
    casesPerOneMillion: number;
    deathPosition?: number;
    casePosition?: number;
    recoveredPosition?: number;
    criticalPosition?: number;
    searchValue: string;
  }

  export interface ITopRecovered {
    country: string;
    recovered: number;
  }

  export interface ITopDeath {
    country: string;
    deaths: number;
    todayDeaths: number;
  }

  export interface ITopCases {
    country: string;
    cases: number;
    todayCases: number;
  }
  export interface ITopCritical {
    country: string;
    critical: number;
  }

  