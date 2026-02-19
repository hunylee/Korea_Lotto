
const https = require('https');

const options = {
    hostname: 'www.dhlottery.co.kr',
    port: 443,
    path: '/gameResult.do?method=byWin',
    method: 'GET',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
    }
};

const req = https.request(options, (res) => {
    let data = '';

    console.log('Status Code:', res.statusCode);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Body Preview:', data.slice(0, 2000));

        // Simple check for prize table
        if (data.includes('등위')) {
            console.log('Ref: Found prize table keyword');
        }
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.end();
