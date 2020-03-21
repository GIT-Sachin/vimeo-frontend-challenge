import React from "react";
import MaterialTable from "material-table";

const headerStyle = {
  backgroundColor:"#01579b",
  color:"white",
  fontWeight:"bold"
}
export default class AccountDetails extends React.Component{
  constructor(props){
    super(props);
    this.state={
      accountData:null
    }
  }

  async componentDidMount(){
    let accountDataResponse = await fetch("http://starlord.hackerearth.com/bankAccount");
    if(accountDataResponse.ok){
      this.setState({accountData:await accountDataResponse.json()});
    }
  }

  render(){
    return(
      <React.Fragment>
      {this.state.accountData ?
        <div className="pageBody">
          <div style={{"width":"100%"}}>
            <MaterialTable
              columns={[
                { title: "Date", field: "Date",type: "date",headerStyle:{...headerStyle}},
                { title: "Transaction Details", field: "Transaction Details",headerStyle:{...headerStyle},sorting:false},
                { title: "Value Date", field: "Value Date", type: "date",headerStyle:{...headerStyle}},
                { title: "Withdrawl Amount",field: "Withdrawal AMT",sorting:false,headerStyle:{...headerStyle},render:rowData=>rowData["Withdrawal AMT"] ? rowData["Withdrawal AMT"] : "NA"},
                { title: "Deposit Amount",field: "Deposit AMT",sorting:false,headerStyle:{...headerStyle},render:rowData=>rowData["Deposit AMT"] ? rowData["Deposit AMT"] : "NA"},
                { title: "Balance Amount",field: "Balance AMT",headerStyle:{...headerStyle}}
              ]}
              data={this.state.accountData}
              title={`Account No : ${this.state.accountData[0]["Account No"]}`}
            />
        </div>
        </div>
        : null}
      </React.Fragment>
    )
  }
}
