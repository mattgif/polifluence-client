import React from 'react';
import {toCurrency} from "../utilities";
import ToggleButton from "../toggle-button";
import './contributors-table.css';

export default class ContributorSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIndustry: false,
            showCompany: false
        };
        this.handleShowIndustryClick = this.handleShowIndustryClick.bind(this)
        this.handleShowCompanyClick = this.handleShowCompanyClick.bind(this)
    }

    handleShowIndustryClick() {this.setState({showIndustry: !this.state.showIndustry})}
    handleShowCompanyClick() {this.setState({showCompany: !this.state.showCompany})}

    render() {
        const { topContributors, topIndustries } = this.props;
        const { showIndustry, showCompany } = this.state;
        const collapsedStyle = {
            width: 0,
            height: 0,
            display: 'none'
        };

        if (!topContributors.length && !topIndustries.length) {
            // no donation info found
            return <h2 className="notFound">No donation information available</h2>
        }
        let topContribSection, topIndusSection;
        if (topContributors.length) {
            // successfully retrieved donations by company - create section
            topContribSection = (
                <section>
                    <ToggleButton text={'Top contributors by company'} toggleAction={this.handleShowCompanyClick}/>
                    <table className="contributor__table company embedded__expandable__table" style={showCompany ? {color: '#808080'} : collapsedStyle}>
                        <thead>
                        <tr>
                            <th>Company</th>
                            <th>Total</th>
                            <th>Individual</th>
                            <th>PACs</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topContributors.map((contrib, index) => {
                            return (
                                <tr key={index}>
                                    <td>{contrib.contributor}</td>
                                    <td>{toCurrency.format(contrib.total)}</td>
                                    <td>{toCurrency.format(contrib.indivs)}</td>
                                    <td>{toCurrency.format(contrib.pacs)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </section>
            )
        }

        if (topIndustries.length) {
            // successfully retrieved donations by industry
            topIndusSection = (
                <section>
                    <ToggleButton text={'Top contributors by industry'} toggleAction={this.handleShowIndustryClick}/>
                    <table className="contributor__table industry embedded__expandable__table" style={showIndustry ? {color: '#808080'} : collapsedStyle}>
                        <thead>
                        <tr>
                            <th>Industry</th>
                            <th>Total</th>
                            <th>Individual</th>
                            <th>PACs</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topIndustries.map((industry, index) => {
                            return (
                                <tr key={index}>
                                    <td>{industry.name}</td>
                                    <td>{toCurrency.format(industry.total)}</td>
                                    <td>{toCurrency.format(industry.indivs)}</td>
                                    <td>{toCurrency.format(industry.pacs)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </section>
            )
        }

        return (
            <section className="contributors">
                {topContribSection}
                {topIndusSection}
            </section>
        )
    }
}