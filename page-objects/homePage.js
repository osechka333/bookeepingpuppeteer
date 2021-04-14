export const homePageTitle = '#comp-k9xahquv4._1Z_nJ';
export const donationButton = '#comp-kmowgapd1label';
export const aboutButton = '#comp-kmowgapd2label';
export const yelpReviewButton = '#comp-kmowgapd4label';
export const knowledgeBaseButton = '#comp-kmowgapd5label';

export const aboutTitle = '#comp-kbjbl2xz4 > h1 > span > span';
export const donationTitle = 'meta:nth-child(10)';


export async function getTitle(page, locator) {
	const cardHeader = await page.$(locator);
	const cardTitle = await page.evaluate(cardHeader => cardHeader.textContent, cardHeader);
	return cardTitle;
}
