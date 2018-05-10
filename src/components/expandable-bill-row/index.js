import React from 'react';
import { connect } from 'react-redux';
import { toCurrency, renderTitle, formatDate } from "../utilities";
import {fetchBill} from "../../actions";

export class ExpandableBillRow extends React.Component {
    // returns a tbody object to be used as row in expandable table
    // bills prop is false if bills haven't been fetch for member, or is
    // obj of bills keyed by bill id
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            requestedCosponsors: false
        };
    }

    handleExpandClick() {
        // expand the row
        this.setState({expanded: !this.state.expanded})
    }

    requestCosponsors() {
        // cosponsors missing - put in request to dB
        if (!this.state.requestedCosponsors) {
            this.setState({requestedCosponsors: true});
            return this.props.dispatch(fetchBill(this.props.bill.id))
        }
    }

    render() {
        const { members, bill } = this.props;
        const { expanded } = this.state;
        const sponsor = members[bill.sponsor];
        let cosponsors;
        if (bill.cosponsors) {
            cosponsors = bill.cosponsors.map(m => members[m]);
        } else {
            this.requestCosponsors();
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
            <tr onClick={() => this.handleExpandClick()}>
                <td className="bill__number">{number}</td>
                <td className="bill__title">{title}</td>
                <td className="bill__subject">{subject}</td>
                <td className="bill__introduction">{formatDate(introducedDate)}</td>
                <td className="bill__sponsor">{`${sponsor.shortTitle} ${sponsor.firstName} ${sponsor.lastName} ${sponsor.party}-${sponsor.state}`}</td>
            </tr>
            <tr><td  colSpan={5} className={expanded ? 'expanded' : 'collapsed'} style={expanded ? {} : collapsedStyle}>
                {passageSection}
                <dl>
                    <dt>Summary</dt>
                    <dd>{summary}</dd>
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

