import React from 'react';
import {connect} from 'react-redux';
import MemberRow from '../member-row';

function MemberTable(props) {
    const { members, searchTerm, fetchedBillsForMember, bills } = props;

    let tableData;
    if (searchTerm.length > 2) {
        const filteredMembers = members.filter(member => {
            const string = `${member.firstName} ${member.lastName} ${member.firstName}`;
            return string.toLowerCase().includes(searchTerm.toLowerCase());
        });

        tableData = filteredMembers.map(member => {
            const {memberId, billsCosponsored, billsSponsored} = member;
            let memberBills = false;
            if (fetchedBillsForMember[memberId]) {
                memberBills = {};
                const billIds = billsSponsored.concat(billsCosponsored);
                billIds.forEach(id => memberBills[id] = bills[id])
            }
            return <MemberRow member={member}
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