import React, { Component } from 'react'
import uuid from 'uuid'

import CompaniesActions from '../actions/CompaniesActions'
import EmployeesActions from '../actions/EmployeesActions'

import CompaniesStore from '../stores/CompaniesStore'
import EmployeesStore from '../stores/EmployeesStore'

import Company from './Company'

export default class Companies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: {},
      employess: {},
    }
  }

  componentDidMount() {
    CompaniesStore.addChangeListener(this._onCompaniesStoreChage)
    EmployeesStore.addChangeListener(this._onEmployeesStoreChage)
  }

  componentWillUnmount() {
    CompaniesStore.removeChangeListener(this._onCompaniesStoreChage)
    EmployeesStore.removeChangeListener(this._onEmployeesStoreChage)
  }

  _onCompaniesStoreChage =() => {
    this.setState({
      companies: CompaniesStore.getAll(),
    })
  }

  _onEmployeesStoreChage =() => {
    this.setState({
      employess: EmployeesStore.getAll(),
    })
  }

  handleClickAddCompany =() => {
    const companyUUID = uuid.v4()
    CompaniesActions.createCompany(companyUUID)
    EmployeesActions.linkCompany(companyUUID)
  }

  renderCompanies() {
    const employess = this.state.employess
    const companies = this.state.companies
    const companiesKeys = Object.keys(companies)

    if (!companiesKeys.length) {
      return <h4>Add a new company!</h4>
    }

    return companiesKeys.map((key, index) => {
      const company = companies[key]
      const companyEmployess = employess[key]
      return <Company key={index} employees={companyEmployess} company={company} />
    })
  }

  renderCountCompanies() {
    const companiesLen = Object.keys(this.state.companies).length

    if (companiesLen < 1) {
      return 'Board of Companies'
    }

    if (companiesLen === 1) {
      return `${companiesLen} Company`
    }

    return `${companiesLen} Companies`
  }

  render() {
    return (
      <div>
        <h3>{this.renderCountCompanies()}</h3>
        <button className="waves-effect waves-light btn blue lighten-1"
          onClick={this.handleClickAddCompany}
        >
          <i className="material-icons left">add</i>Add Company
        </button>
        {this.renderCompanies()}
      </div>
    )
  }
}
