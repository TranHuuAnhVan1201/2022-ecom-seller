import React, { useState } from 'react';
import { useSelector } from "react-redux";

import "./scss/Banking.scss";

function Banking(props) {
    const dataLogin = useSelector((state) => state.Login.dataLogin);    
    const [route, setRoute] = useState('profile');
    const [inputUser, setInputUser] = useState({
        id: dataLogin.id,
        lastName: dataLogin.lastName,
        firstName: dataLogin.first,
        phone: dataLogin.phoneNumber,
        email: dataLogin.email,
        password: "",
        passwordConfirm: "",
        urlIDCardBefore: "",
        urlIDcCardAffter: "",
        urlAvatar: "",
        iDrecommend: dataLogin.iDrecommend,
        commune: dataLogin.commune
    });
    const [state, setState] = useState({
        ammount: 0,
        errors: [],
        memo: {
            text: "",
            len: 0
        },
    });

   
    
    // ACTIONS
    	//Handle Form Submitting
	    const handleSubmitUser = (event) => {
        event.preventDefault();
        console.log('da chay ');
       
        // setCheckInputUser(true);
    
    
    };
      function handleChangeValueUser(event) {
          event.preventDefault();
          console.log('da chay ');

        var value = event.target.value;
        setInputUser({
        ...inputUser,
        [event.target.name]: value,
        });
        console.log(event.target.value);
        // setCheckInputUser(true);
      }
    


    const Header = (props) => {
        return(
            <div>
                <div className="btnMenu" >
                    <label htmlFor="chkMenu">
                    <i className="fa fa-bars"></i>
                    </label>
                </div>
                <input type="checkbox" id="chkMenu" />
                <nav className="menu">
                    <div className="title">VÍ NEWEE</div>
                <ul>
                    <li><label htmlFor="chkMenu" onClick={() => props.setRoute("profile")}>Transfer Activity</label></li>
                    <li><label htmlFor="chkMenu" onClick={() => props.setRoute("form")}>Transactions</label></li>
                    <li><label htmlFor="chkMenu" onClick={() => props.setRoute("contact")}>Contact</label></li>
                    </ul>
                </nav>
            </div>
        );
    }
    const Profile = (props) => {
        return(
            <div className="transfer-activity profile">
            <h3>Transfer Activity</h3>
            <h4>Pending Transfers</h4>
            <SimpleTable data={processedData}/>
            <h4>Processed Transfers</h4>
            <SimpleTable data={pendingData}/>
            </div>
        );
    }
    class SimpleTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        header:[]     
        }
    }
    
    componentWillMount(){
        this.setState({header:Object.getOwnPropertyNames(this.props.data[0])});
    }
    
    renderHeader(columns){
        return(
        <thead>
            <tr>
            {columns.map((column, index) => {
                return(
                <td key={index}>{column}</td>
                );
            })}
            </tr>
        </thead>
        );
    }
    
    renderBody(rows, columns){
        return(
        <tbody>
            {rows.map((row,index) => {
            return(
                <tr key={index}>
                {columns.map((column,innerIndex) => {
                    return (
                    <td key={innerIndex}>{row[column]}</td>
                    );
                })}
                </tr>
            )
            })}
        </tbody>
        );
    }
    
    render(){
        if(this.state.header.length === 0) return false;
        return(
        <div className="transfer-activity-table">
            <table className="">
            {this.renderHeader(this.state.header)}
            {this.renderBody(this.props.data,this.state.header)}
            </table>
        </div>
        );
    }
    }
    const pendingData = [
        {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"},
        {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"},
        {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"},
        {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"},
        {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"},
        {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"}
    ];

    const processedData = [
        {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
        {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
        {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
        {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
        {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
        {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
        {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
        {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
    ];

    const FormActions = (props) => {
        return (
            <div className="form-actions">
                <h3>Transfer Funds</h3>
                <div className="col-xl-12">
                    <div className="card">
                    <div className="card-header px-xs-0 mx-3 mx-xs-0">
                        <h4 className="card-title">
                        <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>
                            Thông tin cá nhân
                            </font>
                        </font>
                        </h4>
                    </div>
                    <div className="card-body px-xs-0 mx-xs-0">
                        <form
                        onSubmit={handleSubmitUser}
                        method="post"
                        name="myform2"
                        className="personal_validate"
                        noValidate="novalidate"
                        id="edit-user"
                        >
                        <div className="form-row">
                            <div className="form-group col-xl-6 col-6 col-sm-12">
                            <label className="mr-sm-2">Họ *</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Họ"
                                // value={input.ammount}
                                name="ammount"
                                onChange={handleChangeValueUser}
                                
                                required
                            />
                            </div>
                            
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Họ"
                                        value={inputUser.firstName}
                                        defaultValue={inputUser.firstName} 
                                name="firstName"
                                onChange={handleChangeValueUser}
                                // required
                            />
                        

                    

                        
                    
                            
                         
                            
                        
                            <div className="form-group col-12 col-sm-12">
                            <button
                                type="submit"
                                className="btn btn-success pl-5 pr-5 waves-effect"
                            >
                                Lưu
                            </button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
    class Select extends React.Component{
    
    constructor(props) {
        super(props);
    }
        
        componentWillMount(){
            //Load Data here!
        }
        
        render(){
            return( 
                <fieldset className={this.props.css_class}>
                    <label>{this.props.title}</label>
                    <i className="fa fa-user fa-fw"></i>
                    <select onChange={this.props.onChange} value={this.props.account}>
                        {this.props.serverResponse.map( (option) => { 
                            return (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            );
                        })}
                    </select>
                </fieldset>
            );
        }
    }
    const Memo = (props) => {
        return(
            <fieldset>
                <label className="main-label">Memo (OPTIONAL: Maximum of {props.maxlen} characters)</label>
                <textarea maxLength={props.maxlen} id="memoText" onChange={props.onChange} value={props.memo.text}/> 
                <span>{props.maxlen - props.memo.len} characters remaining.</span>
            </fieldset>
        );
    }
        
    return (
        <div className="body-cate analysis">
            <h2>THÔNG TIN VÍ </h2>

            <Header setRoute={setRoute}/>
            <section className="mainSection">
                <FormActions/>
                {/* {route === 'profile' ?  <Profile/> : route === 'form' ? <FormActions/> : null} */}
                
            </section>
          
            
        </div>
    );
}

export default Banking;