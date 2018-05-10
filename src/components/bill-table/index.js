import React from 'react';
import {connect} from 'react-redux';
import CubicLoadingSpinner from "../loading-animations/cubic-loading-spinner";
import ExpandableBillRow from "../expandable-bill-row";

function BillTable(props) {
    const { bills, billResults, searchingBills } = props;

    if ( searchingBills ) {
        return <CubicLoadingSpinner/>
    }

    if ( billResults.length === 0) {
        return <h2 className="notFound">No results found</h2>
    }

    const tableData = billResults.map(billId => {
        const bill = bills[billId];
        return <ExpandableBillRow bill={bill}
                                  key={billId}
        />
    });

    return (
        <table cellSpacing={0} className="expandable__table">
            <thead>
            <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Subject</th>
                <th>Date Introduced</th>
                <th>Sponsor</th>
            </tr>
            </thead>
            {tableData}
        </table>
    )
}

const mapStateToProps = state => ({
    bills: state.polifluence.bills,
    billResults: state.polifluence.billResults,
    searchingBills: state.polifluence.searchingBills
});

export default connect(mapStateToProps)(BillTable);