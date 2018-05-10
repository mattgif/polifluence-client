const BILL_TITLE_MAX_LENGTH = 220;

export const toCurrency = new Intl.NumberFormat('en-US', {
    // for some number, num, use toCurrency.format(num) to return value formatted as USD
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

export function renderTitle(billItem) {
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

export function formatDate(_date) {
    // takes in a string date (e.g., "2017-11-07") and returns a string date in the format:
    // "Nov 7, 2017"
    const options = { weekday: 'narrow', year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(_date);
    return date.toLocaleDateString('en-US',options).slice(3)
}