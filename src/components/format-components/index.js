import React from 'react';

export function formatMemberExpanded(member) {
    const {chamber, nextElection, title, website, billSponsored,
        billsCosponsored, topContributors, topIndustries} = member;
    return (
        <div>
            <section className="contributions">
                <ul>
                    {topContributors.map((contrib, index) => {
                        return <li key={index}>`${contrib.contributor}: $${contrib.totla}`</li>
                    })}
                </ul>
            </section>
        </div>
    )
}

export function formatMemberTopData(member) {
    const {memberId, party, state, firstName, lastName,
        portrait, shortTitle} = member;
    const cells = [];
    cells.push(
        <td key={`${memberId}_portrait`} className="memberImageCell">
            <div className="memberImageWrapper">
                <img src={portrait}
                     alt={`${shortTitle} ${firstName} ${lastName}`}/>
            </div>
        </td>
    );
    cells.push(
        <td key={`${memberId}_title`}>
            {shortTitle}
        </td>
    );
    cells.push(
        <td key={`${memberId}_name`}>
            {firstName} {lastName}
        </td>
    );
    cells.push(
        <td key={`${memberId}_party`}>
            {party}
        </td>
    );
    cells.push(
        <td key={`${memberId}_state`}>
            {state}
        </td>
    );
    return cells;
}