import puppeteer from 'puppeteer';
import chai from 'chai';
let expect = chai.expect;

import {
	homePageTitle, donationButton,
	aboutButton, yelpReviewButton,
	knowledgeBaseButton, donationTitle, aboutTitle,
	getTitle
} from '../page-objects/homePage.js';
import {baseUrl, donationUrl, aboutUrl, knowledgeBaseUrl, yelpReviewUrl} from "./testData";

let browser, page;

describe('Check bookkeeping guru home page for the unauthorized user', function () {
	before(async () => {
		browser = await puppeteer.launch({slowMo: 100, headless: true});
		page = await browser.newPage();
		await page.setViewport({ width: 1536, height: 864 });
		await page.goto(baseUrl);
	});

	after(async function(){
		browser.close();
	});

	it('Open Home page and check the title', async function () {
		await page.waitForSelector(homePageTitle, {visible: true});
		const mainTitle = await page.title();
		const pageTitle = await getTitle(page, homePageTitle);

		expect(await page.url()).equal(baseUrl);
		expect(mainTitle).contains('Home | Bookkeeping Guru');
		expect(pageTitle).contains('DISCOVER ACCOUNTING TODAY');
	});

	it('Open About section and check redirect', async function () {

		await page.waitForSelector(aboutButton, {visible: true});
		await page.click(aboutButton);
		await page.waitForTimeout(1000);
		const aboutPageTitle = await page.title(aboutTitle);

		expect(await page.url()).to.include(aboutUrl);
		expect(aboutPageTitle).contains('About');

	});

	it('Check Yelp review redirect', async function () {
		await page.waitForSelector(yelpReviewButton, {visible: true});
		await page.click(yelpReviewButton);
		await page.waitForTimeout(10000);

		let pages = await browser.pages();
		await pages[2].setViewport({ width: 1536, height: 864 });
		const yelpReviewTitle = await pages[2].title();

		expect(await pages[2].url()).to.include(yelpReviewUrl);
		expect(yelpReviewTitle).contains('Restaurants, Dentists, Bars, Beauty Salons, Doctors - Yelp');

		await pages[2].close();
	});

	it('Check Knowledge Base redirect', async function () {
		await page.waitForSelector(knowledgeBaseButton, {visible: true});
		await page.click(knowledgeBaseButton);
		await page.waitForTimeout(10000);

		let pages = await browser.pages();
		await pages[2].setViewport({ width: 1536, height: 864 });
		const pageTitle = await pages[2].title('page-title');

		expect(await pages[2].url()).to.include(knowledgeBaseUrl);
		expect(pageTitle).contains('Knowledge Base and Help Articles | Ace Cloud Hosting');

		await pages[2].close();
	});

	it.skip('Open donation section and check redirect', async function () {
		await page.goto(baseUrl);
		await page.waitForSelector(donationButton, {visible: true});
		await page.click(donationButton);

		let pages = await browser.pages();
		await pages[2].setViewport({ width: 1536, height: 864 });
		const paypalDonationTitle = await pages[2].title(donationTitle);
		expect(await pages[2].url()).to.include(donationUrl);
		expect(paypalDonationTitle).contains('Donate');

		await pages[2].close();
	});
});