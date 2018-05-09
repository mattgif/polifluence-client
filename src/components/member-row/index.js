import React from 'react';
import { connect } from 'react-redux';
import { toCurrency, renderTitle } from "../utilities";
import {fetchBillsByMember} from "../../actions";

export class MemberRow extends React.Component {
    // returns a tbody object to be used as row in expandable table
    // bills prop is false if bills haven't been fetch for member, or is
    // obj of bills keyed by bill id
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            loading: false
        };
    }

    handleExpandClick() {
        if (!this.props.bills && !this.props.loading) {
            this.setState({loading: true, expanded: !this.state.expanded})
            return this.props.dispatch(fetchBillsByMember(this.props.member.memberId)).then(
                () => this.setState({loading: false})
            )
        } else {
            this.setState({expanded: !this.state.expanded})
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
        let sponsored;
        if (bills) {
            sponsored = billsSponsored.map(billId => {
                const bill = bills[billId];
                return <li>{renderTitle(bill)}</li>
            })
        }

        return (
            <tbody>
            <tr onClick={() => this.handleExpandClick()}>
                <td key={`${memberId}_portrait`} className="memberImageCell">
                    <div className="memberImageWrapper">
                        <img src={portrait}
                             alt={`${shortTitle} ${firstName} ${lastName}`}/>
                    </div>
                </td>
                <td key={`${memberId}_title`}>
                    {shortTitle}
                </td>
                <td key={`${memberId}_name`}>
                    {firstName} {lastName}
                </td>
                <td key={`${memberId}_party`}>
                    {party}
                </td>
                <td key={`${memberId}_state`}>
                    {state}
                </td>
            </tr>
            <tr><td  colSpan={5} className={expanded ? 'expanded' : 'collapsed'} style={expanded ? {} : collapsedStyle}>
                <div>
                    <section className="contributions">
                        <h4>Top contributors by company:</h4>
                        <ul>
                            {topContributors.map((contrib, index) => {
                                return <li key={index}>{contrib.contributor}: {toCurrency.format(contrib.total)}</li>
                            })}
                        </ul>

                        <h4>Top contributors by industry:</h4>
                        <ul>
                            {topIndustries.map((industry, index) => {
                                return <li key={index}>{industry.name}: {toCurrency.format(industry.total)}</li>
                            })}
                        </ul>
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
                    <section>
                        <h4>Bills sponsored</h4>
                        <ul>
                            {sponsored}
                        </ul>
                    </section>
                </div>
            </td></tr>
            </tbody>
        )
    }
}

export default connect()(MemberRow)

