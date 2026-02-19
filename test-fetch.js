
async function run() {
    const url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=1100';
    try {
        const res = await fetch(url);
        const text = await res.text();
        console.log("Status:", res.status);
        console.log("Content-Type:", res.headers.get('content-type'));
        console.log("Body Preview:", text.slice(0, 500));
        try {
            const json = JSON.parse(text);
            console.log("JSON Parse Success:", json);
        } catch (e) {
            console.log("JSON Parse Failed");
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}
run();
