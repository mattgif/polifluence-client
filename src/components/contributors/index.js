import React from 'react';
import {toCurrency} from "../utilities";

export default function ContributorSection(props) {
    const { topContributors, topIndustries } = props;

    if (!topContributors.length && !topIndustries.length) {
        // no donation info found
        return <h2 className="notFound">No donation information available</h2>
    }
    let topContribSection, topIndusSection;
    if (topContributors.length) {
        // successfully retrieved donations by company - create section
        topContribSection = (
            <section>
                <h4>Top contributors by company:</h4>
                <table className="contributor__table company">
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

                <ul>


                </ul>
            </section>
        )
    }

    if (topIndustries.length) {
        // successfully retrieved donations by industry
        topIndusSection = (
            <section>
                <h4>Top contributors by industry:</h4>
                <table className="contributor__table industry">
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