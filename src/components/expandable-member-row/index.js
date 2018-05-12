import React from 'react';
import { connect } from 'react-redux';
import {fetchBill, fetchBillsByMember} from "../../actions";
import CubicLoadingSpinner from "../loading-animations/cubic-loading-spinner";
import SponsoredBills from "../sponsored-bills-section";
import ContributorSection from "../contributors";
import './member-row.css';
import ToggleButton from "../toggle-button";


const REPUB_LOGO = 'http://res.cloudinary.com/structureless/image/upload/v1526005930/Republican_Disc.svg';
const DEM_LOGO = 'http://res.cloudinary.com/structureless/image/upload/v1526005930/DemocraticLogo.svg';

export class ExpandableMemberRow extends React.Component {
    // returns a tbody object to be used as row in expandable table
    // bills prop is false if bills haven't been fetch for member, or is
    // obj of bills keyed by bill id
    // showBills prop controls whether bill data is displayed (this is used to prevent
    // infinite nesting of tables, where a user table shows a bill, which shows a user, etc.)
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            loading: false,
            billsRequested: {},
            billsVisible: false
        };
        this.handleShowBillsClick = this.handleShowBillsClick.bind(this);
    }

    handleExpandClick() {this.setState({expanded: !this.state.expanded})}

    handleShowBillsClick() {
        const { billsVisible, loading } = this.state;
        if (billsVisible) {
            this.setState({billsVisible: false})
        } else if (!this.props.bills && !loading) {
            this.setState({loading: true, billsVisible: true});
            return this.props.dispatch(fetchBillsByMember(this.props.member.memberId))
                .then(() => {
                    // check billIds for each sponsored/cosponsored bill, if it's not in state request from API
                    const bills = this.props.member.billsCosponsored.concat(this.props.member.billsSponsored);
                    const missingBills = bills.filter(billId => !this.props.bills[billId]);
                    return Promise.all(missingBills.map(billId => this.props.dispatch(fetchBill(billId))))
                })
                .then(() => this.setState({loading: false}))
        } else {
            this.setState({billsVisible: true})
        }
    }

    render() {
        const { member, bills, showBills } = this.props;
        const {
            topContributors, topIndustries, party, state, firstName, lastName,
            portrait, shortTitle, title, billsSponsored, billsCosponsored, nextElection
        } = member;
        const { expanded, loading, billsVisible } = this.state;
        const collapsedStyle = {
            width: 0,
            height: 0,
            display: 'none'
        };
        let sponsoredBills, toggleBillDisplay, partyLogo;
        if (showBills) {
            toggleBillDisplay = <ToggleButton toggleAction={this.handleShowBillsClick} text="Member bills"/>
        }
        if (billsVisible && bills) {
            // render bill items if bills were retrieved
            sponsoredBills = <SponsoredBills bills={bills} billsSponsored={billsSponsored} billsCosponsored={billsCosponsored}/>
        }

        const contributorSection = <ContributorSection topIndustries={topIndustries} topContributors={topContributors}/>;
        if (billsVisible && loading) {
            sponsoredBills = <CubicLoadingSpinner/>
        }

        if (party === 'D') {
            partyLogo = <img src={DEM_LOGO} alt="Democratic party logo" />
        } else if (party === 'R') {
            partyLogo = <img src={REPUB_LOGO} alt="Republican party logo" />
        } else {
            partyLogo = party
        }


        return (
            <tbody key={this.props.key} className={`expandable__member__row ${party}`}>
            <tr onClick={() => this.handleExpandClick()} className={expanded ? "bottom dotted" : "bottom"}>
                <td className="member">
                    <div className="member__image__wrapper">
                        <img src={portrait}
                             alt={`${shortTitle} ${firstName} ${lastName}`}/>
                    </div>
                    <h4>{shortTitle || title } {firstName} {lastName}</h4>
                </td>
                <td className="member__party">
                    {partyLogo}
                </td>
                <td className="member__state">
                    <span className={`stateface stateface-replace stateface-${state.toLowerCase()}`}>{state}</span>
                </td>
            </tr>
            <tr><td  colSpan={3} className={expanded ? 'expanded bottom' : 'collapsed'} style={expanded ? {} : collapsedStyle}>
                <h3>{title} from {state}</h3>
                <h4>Next election: {nextElection}</h4>
                <div>
                    {contributorSection}
                    {toggleBillDisplay}
                    {sponsoredBills}
                </div>
            </td></tr>
            </tbody>
        )
    }
}

export default connect()(ExpandableMemberRow)

