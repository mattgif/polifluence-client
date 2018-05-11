import React from 'react';
import ExpandableBillRow from "../expandable-bill-row";

export default function SponsoredBills(props) {
    const {bills, billsSponsored, billsCosponsored} = props;
    let sponsored, cosponsored;

    const billsSponsoredItems = billsSponsored.map(billId => {
        const bill = bills[billId];
        return <ExpandableBillRow key={`${billId}_item`} bill={bill} showSponsor={false}/>
    });
    sponsored = (
        <div className="sponsored">
            <h4>Bills sponsored</h4>
            <table cellSpacing={0} className="embedded__expandable__table">
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Date Introduced</th>
                    <th>Sponsor</th>
                </tr>
                </thead>
                {billsSponsoredItems}
            </table>
        </div>
    );

    const billsCoSponsoredItems = [];
    billsCosponsored.forEach(billId => {
        const bill = bills[billId];
        if (bill) {
            billsCoSponsoredItems.push(<ExpandableBillRow key={`${billId}_item`} bill={bill} showSponsor={true}/>)
        }
    });
    cosponsored = (
        <div className="cosponsored">
            <h4>Bills cosponsored</h4>
            <table cellSpacing={0} className="embedded__expandable__table">
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Date Introduced</th>
                    <th>Sponsor</th>
                </tr>
                </thead>
                {billsCoSponsoredItems}
            </table>
        </div>
    );
    return (
        <section className="bills__sponsored">
            {sponsored}
            {cosponsored}
        </section>
    )

}
