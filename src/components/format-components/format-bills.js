import React from 'react';
import { connect } from 'react-redux';

const BILL_TITLE_MAX_LENGTH = 220;

function formatBillTop(bill) {
    const { id, number, sponsor, introducedDate, enacted } = bill;
    const cells = [];
    cells.push(
        <td key={`${id}_number`} className="billNumber">
            {number}
        </td>
    );
    cells.push(
        <td key={`${id}_title`} className="billTitle">
            {renderTitle(bill)}
        </td>
    );
    cells.push(
        <td key={`${id}_sponsor`}>

        </td>
    )
}

function renderTitle(billItem) {
    // makes sure bill titles are reasonable length
    let title = billItem.shortTitle || billItem.title;
    if (title.length > BILL_TITLE_MAX_LENGTH) {
        title = truncate(title);
    }
    return title;
}

function truncate(title) {
    // truncates obscenely long titles at the last space before the 125th char
    const snip = title.slice(0,BILL_TITLE_MAX_LENGTH);
    const finalSpace = snip.lastIndexOf(" ");
    return snip.slice(0,finalSpace) + "…";
}