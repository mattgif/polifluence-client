import React from 'react';
import { connect } from 'react-redux';
import { toCurrency, renderTitle } from "../utilities";
import {fetchBill, fetchBillsByMember} from "../../actions";
import CubicLoadingSpinner from "../loading-animations/cubic-loading-spinner";

export class ExpandableMemberRow extends React.Component {
    // returns a tbody object to be used as row in expandable table
    // bills prop is false if bills haven't been fetch for member, or is
    // obj of bills keyed by bill id
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            loading: false,
            billsRequested: {}
        };
    }

    handleExpandClick() {
        // request full bill details for all (co)sponsored bills,
        // and expand the row
        if (!this.props.bills && !this.state.loading) {
            this.setState({loading: true, expanded: !this.state.expanded})
            return this.props.dispatch(fetchBillsByMember(this.props.member.memberId)).then(
                () => this.setState({loading: false})
            )
        } else {
            this.setState({expanded: !this.state.expanded})
        }
    }

    fetchMissingBill(billId) {
        // if somehow a bill didn't come back from the server in the initial batch,
        // request is specifically (but only once!)
        if (!this.state.billsRequested[billId]) {
            this.setState({billsRequested: {...this.state.billsRequested, [billId]: true}})
            return this.props.dispatch(fetchBill(billId))
        }
    }

    render() {
        const { member, bills } = this.props;
        const {
            chamber, nextElection, title, website, topContributors, topIndustries, memberId,
            party, state, firstName, lastName, portrait, shortTitle, billsSponsored, billsCosponsored
        } = member;
        const { expanded, loading } = this.state;
        const collapsedStyle = {
            width: 0,
            height: 0,
            display: 'none'
        };
        let sponsored, cosponsored, loadingAnimation, topContribSection, topIndusSection, noContribData;
        if (bills) {
            // render bill items if bills were retrieved
            const billsSponsoredItems = billsSponsored.map(billId => {
                const bill = bills[billId];
                return <li key={bill.id}>{renderTitle(bill)}</li>
            });
            sponsored = (
                <section>
                    <h4>Bills sponsored</h4>
                    <ul>
                        {billsSponsoredItems}
                    </ul>
                </section>
            );

            const billsCoSponsoredItems = billsCosponsored.map(billId => {
                const bill = bills[billId];
                if (!bill) {
                    this.fetchMissingBill(billId);
                    return '';
                }
                return <li key={`${billId}_item`}>{renderTitle(bill)}</li>
            });
            cosponsored = (
                <section>
                    <h4>Bill co-sponsored</h4>
                    <ul>
                        {billsCoSponsoredItems}
                    </ul>
                </section>
            )
        }
        if (loading) {
            loadingAnimation = <CubicLoadingSpinner/>
        }

        if (topContributors.length) {
            // successfully retrieved donations by company - create section
            topContribSection = (
                <ul>
                    <h4>Top contributors by company:</h4>
                    {topContributors.map((contrib, index) => {
                        return <li key={index}>{contrib.contributor}: {toCurrency.format(contrib.total)}</li>
                    })}
                </ul>
            )
        }

        if (topIndustries.length) {
            // successfully retrieved donations by industry
            topIndusSection = (
                <ul>
                    <h4>Top contributors by industry:</h4>
                    {topIndustries.map((industry, index) => {
                        return <li key={index}>{industry.name}: {toCurrency.format(industry.total)}</li>
                    })}
                </ul>
            )
        }

        if (!topContributors.length && !topIndustries.length) {
            // no donation info found
            noContribData = <h2 className="notFound">No donation information available</h2>
        }

        return (
            <tbody key={this.props.key}>
            <tr onClick={() => this.handleExpandClick()}>
                <td className="memberImageCell">
                    <div className="memberImageWrapper">
                        <img src={portrait}
                             alt={`${shortTitle} ${firstName} ${lastName}`}/>
                    </div>
                </td>
                <td className="member__title">
                    {shortTitle}
                </td>
                <td className="member__name">
                    {firstName} {lastName}
                </td>
                <td className="member__party">
                    {party}
                </td>
                <td className="member__state">
                    {state}
                </td>
            </tr>
            <tr><td  colSpan={5} className={expanded ? 'expanded' : 'collapsed'} style={expanded ? {} : collapsedStyle}>
                <section className="contributions">
                    {topContribSection}
                    {topIndusSection}
                    {noContribData}
                </section>
                <section>
                    <h4>Member info</h4>
                    <dl>
                        <dt>Chamber:</dt>
                        <dd>{chamber}</dd>
                        <dt>Website:</dt>
                        <dd>{website}</dd>
                        <dt>Next election:</dt>
                        <dd>{nextElection}</dd>
                    </dl>
                </section>
                {loadingAnimation}
                {sponsored}
                {cosponsored}
            </td></tr>
            </tbody>
        )
    }
}

export default connect()(ExpandableMemberRow)

