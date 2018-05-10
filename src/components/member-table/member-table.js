import React from 'react';
import {connect} from 'react-redux';
import ExpandableMemberRow from '../expandable-member-row';
import CubicLoadingSpinner from "../loading-animations/cubic-loading-spinner";

function MemberTable(props) {
    const { members, searchTerm, fetchedBillsForMember, bills } = props;
    if (Object.keys(members).length === 0) {
        return <CubicLoadingSpinner/>
    }

    let tableData;
    if (searchTerm.length > 2) {
        const filteredMembers = Object.keys(members).filter(memberId => {
            const member = members[memberId];
            const string = `${member.firstName} ${member.lastName} ${member.firstName}`;
            return string.toLowerCase().includes(searchTerm.toLowerCase());
        });

        tableData = filteredMembers.map(memberId => {
            const member = members[memberId];
            const {billsCosponsored, billsSponsored} = member;
            let memberBills = false;
            if (fetchedBillsForMember[memberId]) {
                memberBills = {};
                const billIds = billsSponsored.concat(billsCosponsored);
                billIds.forEach(id => memberBills[id] = bills[id])
            }
            return <ExpandableMemberRow member={member}
                               key={memberId}
                               bills={memberBills}
            />
        });

        if (!tableData.length) {
            tableData = <tbody><tr className="notFound"><td colSpan={5}>No results found</td></tr></tbody>
        }
    }

    return (
        <table cellSpacing={0} className="expandable__table">
            <thead>
            <tr>
                <th colSpan={3}>Member</th>
                <th>Party</th>
                <th>State</th>
            </tr>
            </thead>
            {tableData}
        </table>
    )
}

const mapStateToProps = state => ({
    members: state.polifluence.members,
    searchTerm: state.polifluence.searchTerm,
    fetchedBillsForMember: state.polifluence.fetchedBillsForMember,
    bills: state.polifluence.bills
});

export default connect(mapStateToProps)(MemberTable);