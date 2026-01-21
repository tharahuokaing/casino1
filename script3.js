// --- មុខងារបញ្ជូនសារដែលបានកែលម្អ (Updated send function) ---
async function send() {
    const input = document.getElementById('userInput');
    const val = input.value.trim();
    if(!val) return;

    append('user', val);
    input.value = '';
    let reply;

    if(val.toLowerCase().includes("បាការ៉ាត់")) {
        const parts = val.split(" ");
        reply = Baccarat.play(parseInt(parts[1]) || 10, parts[2] || 'player');
    } else if(navigator.onLine) {
        try {
            // បន្ថែម Time-out ដើម្បីកុំឱ្យចាំយូរពេក
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // ១០ វិនាទី

            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                signal: controller.signal,
                body: JSON.stringify({contents:[{parts:[{text:`អ្នកគឺជា AI របស់អធិរាជ។ មហានិធិ: $${balance}។ \nUser: ${val}`}]}]})
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                const errorData = await res.json();
                reply = `⚠️ ព្រះរាជទានទោស! Google API បានឆ្លើយតបថា៖ ${errorData.error.message}`;
            } else {
                const data = await res.json();
                reply = data.candidates[0].content.parts[0].text;
            }
        } catch(e) { 
            reply = "❌ Error: មិនអាចទាក់ទងខួរក្បាលកណ្តាលបានទេ។ សូមពិនិត្យ API Key ឬការភ្ជាប់អ៊ីនធឺណិតរបស់ព្រះអង្គ។"; 
            console.error("Gemini API Error:", e);
        }
    } else {
        reply = "🚫 Offline Mode: ទូលព្រះបង្គំរង់ចាំអ៊ីនធឺណិតដើម្បីប្រើប្រាស់ Gemini Brain។";
    }

    append('bot', reply);
    speak(reply.replace(/[*#]/g, ''));
}
