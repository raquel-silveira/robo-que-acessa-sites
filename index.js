const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

console.log('Bem vindo');

async function robot() {
    const browser = await puppeteer.launch({ headless: true });

    try {
        const page = await browser.newPage();
        const baseCurency = readlineSync.question('Informe uma moeda base: ') || 'dolar';
        const finalCurency = readlineSync.question('Informe uma moeda final: ') || 'real';
        const someUrl = `https://www.google.com/search?q=${baseCurency}+para+${finalCurency}&oq=${baseCurency}+para+${finalCurency}&aqs=chrome..69i57j0j0i10i433j0l5.3016j1j7&sourceid=chrome&ie=UTF-8`;
        await page.goto(someUrl);
        // await page.screenshot({ path: 'example.png' });
    
        const result = await page.evaluate(() => {
            return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
        });
    
        console.log(`O valor de 1 ${baseCurency} em ${finalCurency} é ${result}`);
    } catch (error) {
        console.log("Não foi possível encontrar o resultado, verifique se a ortografia está correta e tente novamente.")
    } finally {
        await browser.close();
    }
}

robot();