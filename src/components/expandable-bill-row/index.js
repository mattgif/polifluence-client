import React from 'react';
import { connect } from 'react-redux';
import { renderTitle, formatDate } from "../utilities";
import {fetchBill} from "../../actions";
import IoChevronRight from 'react-icons/lib/io/chevron-right';
import IoChevronDown from 'react-icons/lib/io/chevron-down';
import './bill-row.css'
import {ExpandableMemberRow} from "../expandable-member-row";

export class ExpandableBillRow extends React.Component {
    // returns a tbody object to be used as row in expandable table
    // bills prop is false if bills haven't been fetch for member, or is
    // obj of bills keyed by bill id
    // showSponsor prop controls whether sponsor info is displayed (not needed if row occurs
    // embedded in sponsor row)
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            requestedCosponsors: false,
            showSummary: !!this.props.bill.summary
        };
    }

    handleExpandClick() {
        // expand the row, request full bill including co-sponsors if not present
        if (!this.props.bill.cosponsors && !this.state.requestedCosponsors) {
            return this.props.dispatch(fetchBill(this.props.bill.id))
                .then(() => this.setState({expanded: !this.state.expanded, requestedCoSponsors: true}))
        }
        this.setState({expanded: !this.state.expanded})
    }

    handleShowSummaryClick() {
        this.setState({showSummary: !this.state.showSummary})
    }

    render() {
        const { members, bill, showSponsor } = this.props;
        const { expanded, showSummary } = this.state;
        const sponsor = members[bill.sponsor];
        let sponsorHead;
        if (showSponsor) {
            sponsorHead = <td className="bill__sponsor">{`${sponsor.shortTitle} ${sponsor.firstName} ${sponsor.lastName} ${sponsor.party}-${sponsor.state}`}</td>
        }

        let cosponsors;
        if (bill.cosponsors) {
            console.log('cosponsors!')
            const cosponsorItems = bill.cosponsors.map(m => {
                const member = members[m];
                return (
                    <ExpandableMemberRow member={member} showBills={false}/>
                )
            });
            cosponsors = (
                <dd>
                    <table>
                        {cosponsorItems}
                    </table>
                </dd>
            )
        }
        const title = renderTitle(bill);
        const { subject, number, introducedDate, summary, enacted, housePassage, senatePassage } = bill;
        const collapsedStyle = {
            width: 0,
            height: 0,
            display: 'none'
        };

        let passageSection, enactedItem, houseItem, senateItem;
        if (enacted) {
            enactedItem = <li><span className="label">Enacted:</span> {formatDate(enacted)}</li>
        }

        if (housePassage) {
            houseItem = <li><span className="label">Passed House:</span> {formatDate(housePassage)}</li>
        }

        if (senatePassage) {
            senateItem = <li><span className="label">Passed Senate:</span> {formatDate(senatePassage)}</li>
        }
        if (enacted || housePassage || senatePassage) {
            passageSection = (
                <ul>
                    {enactedItem}
                    {houseItem}
                    {senateItem}
                </ul>
            )
        }

        return (
            <tbody key={this.props.key} className="expandable__bill__row">
            <tr onClick={() => this.handleExpandClick()}
                className={expanded ? "bottom dotted" : "bottom"}
                style={expanded ? {color: "#333"} : {}}
            >
                <td className="bill__number">{number}</td>
                <td className="bill__title">{title}</td>
                <td className="bill__subject">{subject}</td>
                <td className="bill__introduction">{formatDate(introducedDate)}</td>
                {sponsorHead}
            </tr>
            <tr className={expanded ? 'expanded' : 'collapsed'}><td  colSpan={5}
                     className={expanded ? 'expanded bottom' : 'collapsed'}
                     style={expanded ? {color: "#333"} : collapsedStyle}
            >
                {passageSection}
                <dl>
                    <dt>Full title</dt>
                    <dd>{bill.title}</dd>
                    <dt onClick={() => this.handleShowSummaryClick()} style={{cursor:'pointer'}}>{showSummary ? <IoChevronDown/> : <IoChevronRight/>} Summary</dt>
                    <dd style={showSummary ? {} : collapsedStyle}>{summary ? summary : 'No summary data available'}</dd>
                    <dt>Sponsor</dt>
                    <dd>
                        <table>
                            <ExpandableMemberRow member={sponsor} showBills={false}/>
                        </table>
                    </dd>
                    {cosponsors ? <dt>Cosponsors</dt> : ''}
                    {cosponsors}
                </dl>
            </td></tr>
            </tbody>
        )
    }
}

const mapStateToProps = state => ({
    members: state.polifluence.members
});

export default connect(mapStateToProps)(ExpandableBillRow)

