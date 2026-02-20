
import fs from 'fs';
import path from 'path';

const SITE_COLOR = '002B49'; // Dark Blue from brand
const TEXT_COLOR = 'ffffff';

const updates = [
    // Services
    { file: 'src/content/services/plumbing.md', text: 'Commercial+Plumbing' },
    { file: 'src/content/services/electrical.md', text: 'Electrical+Services' },
    { file: 'src/content/services/hvac.md', text: 'HVAC+Systems' },
    { file: 'src/content/services/carpentry.md', text: 'Carpentry+Joinery' },
    { file: 'src/content/services/painting.md', text: 'Painting+Coatings' },
    { file: 'src/content/services/civil-works.md', text: 'Civil+Works' },
    { file: 'src/content/services/preventative-maintenance.md', text: 'Preventative+Maintenance' },
    { file: 'src/content/services/emergency-response.md', text: 'Emergency+Response' },

    // Areas
    { file: 'src/content/areas/auckland.md', text: 'Auckland+Facilities+Maintenance' },
    { file: 'src/content/areas/wellington.md', text: 'Wellington+Facilities+Maintenance' },
    { file: 'src/content/areas/christchurch.md', text: 'Christchurch+Facilities+Maintenance' },
];

// Update Content Files
updates.forEach(({ file, text }) => {
    const filePath = path.resolve(process.cwd(), file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        // Regex to replace heroImage: "..."
        const regex = /heroImage:\s*"([^"]+)"/;
        const match = content.match(regex);

        if (match) {
            const newUrl = `https://placehold.co/1200x800/${SITE_COLOR}/${TEXT_COLOR}?text=${text}`;
            content = content.replace(regex, `heroImage: "${newUrl}"`);
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Updated ${file}`);
        } else {
            console.log(`No heroImage key found in ${file}`);
        }
    } else {
        console.log(`File not found: ${file}`);
    }
});

// Update Hero.astro default
const heroPath = path.resolve(process.cwd(), 'src/components/Hero.astro');
if (fs.existsSync(heroPath)) {
    let content = fs.readFileSync(heroPath, 'utf-8');
    // image = "/images/main-hero.jpg"
    const regex = /image\s*=\s*"\/images\/main-hero\.jpg"/;
    if (regex.test(content)) {
        const newUrl = `https://placehold.co/1920x1080/${SITE_COLOR}/${TEXT_COLOR}?text=Ethyl+Merc+Group`;
        content = content.replace(regex, `image = "${newUrl}"`);
        fs.writeFileSync(heroPath, content, 'utf-8');
        console.log(`Updated Hero.astro`);
    } else {
        console.log(`Hero.astro default image pattern not found`);
    }
}
