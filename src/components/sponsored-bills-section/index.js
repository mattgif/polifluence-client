import React from 'react';
import ExpandableBillRow from "../expandable-bill-row";
import ToggleButton from "../toggle-button";
import './sponsored-bills.css';

export default class SponsoredBills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSponsored: true,
            showCosponsored: false
        };
        this.toggleSponsored = this.toggleSponsored.bind(this);
        this.toggleCosponsored = this.toggleCosponsored.bind(this);
    }

    toggleSponsored() {
        this.setState({showSponsored: !this.state.showSponsored})
    }

    toggleCosponsored() {
        this.setState({showCosponsored: !this.state.showCosponsored})
    }
    render() {
        const collapsedStyle = {
            width: 0,
            height: 0,
            display: 'none'
        };
        const { bills, billsSponsored, billsCosponsored } = this.props;
        const { showSponsored, showCosponsored } = this.state;
        const billsSponsoredItems = billsSponsored.map(billId => {
            const bill = bills[billId];
            return <ExpandableBillRow key={`${billId}_item`} bill={bill} showSponsor={false}/>
        });
        const sponsored = (
            <div className="sponsored" style={showSponsored ? {} : collapsedStyle}>
                <table cellSpacing={0} className="embedded bill expandable__table">
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Introduced</th>
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
        const cosponsored = (
            <div className="cosponsored" style={showCosponsored ? {} : collapsedStyle}>
                <table cellSpacing={0} className="embedded bill expandable__table">
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Introduced</th>
                        <th>Sponsor</th>
                    </tr>
                    </thead>
                    {billsCoSponsoredItems}
                </table>
            </div>
        );
        return (
            <section className="bills__sponsored">
                <ToggleButton toggleAction={this.toggleSponsored} className='blue' startOpen={true} text='Sponsored' />
                {sponsored}
                <ToggleButton toggleAction={this.toggleCosponsored} className='blue' text='Cosponsored' />
                {cosponsored}
            </section>
        )
    }
}
