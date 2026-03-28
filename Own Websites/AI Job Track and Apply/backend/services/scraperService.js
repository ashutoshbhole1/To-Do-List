import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import Job from '../models/Job.js';
import { processJobDescription } from './aiService.js';

// Random delay to avoid bot detection
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const scrapeNaukri = async () => {
    console.log('Starting Naukri scrape...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set typical user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    try {
        const url = 'https://www.naukri.com/software-engineer-fresher-jobs'; // targeted URL for software engineering trainees/freshers
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        
        await delay(3000); // Wait for dynamic content

        // We can use Cheerio to parse the loaded HTML for faster extraction
        const content = await page.content();
        const $ = cheerio.load(content);

        const jobs = [];
        $('.srp-jobtuple-wrapper').each((i, element) => {
            const title = $(element).find('.title').text().trim();
            const company = $(element).find('.comp-name').text().trim();
            const experience = $(element).find('.expwdth').text().trim();
            const location = $(element).find('.locWdth').text().trim();
            const description = $(element).find('.job-desc').text().trim();
            let applyLink = $(element).find('.title').attr('href');
            
            const skills = [];
            $(element).find('.dot-list li').each((j, skillEl) => {
                skills.push($(skillEl).text().trim());
            });

            if (title && applyLink && jobs.length < 10) {
                jobs.push({
                    title,
                    company,
                    experience,
                    location,
                    description,
                    skills,
                    applyLink,
                    status: 'Not Applied',
                    source: 'Naukri'
                });
            }
        });

        console.log(`Scraped ${jobs.length} jobs from Naukri. Saving to DB in a fast batch...`);

        // Save to DB avoiding duplicates
        for (const jobData of jobs) {
            try {
                // Pass JD through AI to get extracted JSON tags
                const aiData = await processJobDescription(jobData.description);
                if (aiData) {
                    if (aiData.extractedSkills && aiData.extractedSkills.length > 0) {
                        jobData.skills = [...new Set([...jobData.skills, ...aiData.extractedSkills])];
                    }
                    if (aiData.experienceLevel) {
                        jobData.experience = aiData.experienceLevel;
                    }
                    if (aiData.roleTag) {
                        jobData.tags = [aiData.roleTag];
                    }
                }

                await Job.updateOne(
                    { applyLink: jobData.applyLink },
                    { $setOnInsert: jobData },
                    { upsert: true }
                );

                console.log(`Saved ${jobData.title}. Waiting 3s to respect AI rate limits...`);
                await delay(3000); // Wait 3 seconds to avoid 429 Rate Limit
            } catch (err) {
                console.error('Error saving job:', err.message);
            }
        }

    } catch (error) {
        console.error('Error scraping Naukri:', error);
    } finally {
        await browser.close();
    }
};

// Generic scraper scheduler
export const runAllScrapers = async () => {
    await scrapeNaukri();
    // More scrapers can be called here sequentially or in parallel
};
