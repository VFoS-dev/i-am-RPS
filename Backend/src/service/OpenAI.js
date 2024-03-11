const OpenAI = require("openai");
const openai = new OpenAI();

module.exports = {
    AbeatsB
}

async function AbeatsB(A, B) {
    const completion = await openai.chat.completions.create({
        messages: [{
            role: "system",
            content: `
                the following is a set of directions each separated by "-"
                the first one starts with "- your behaviour:" which is how you need to act and respond
                the second one starts with "- question:"
                the third one starts with "- A being:"
                the forth is "- B being:"

                - your behaviour:
                respond in JSON format like { "answer", "equals": false, "reason" }, answer needs to be a boolean,
                if you cannot pick one confidently or there are no clear winners or they have similar abilities and characteristics or
                you consider them to be equals instead return { "answer", "equals": true, "reason" } instead.
                if there are more than that return an error and its reason like: { "error": true, "reason" },
                the response needs to be as a one line string,
                if you are to reply in response to "A" or "B" use the respective input value instead,
                an example response would be \"{ \"answer\": true, \"reason\": \"A ferret would beat a flea by being able to catch and eat it.\" },
                 
                - question: would "A" be able to beat "B"? and how so?
                - A being: "${A}"
                - B being: "${B}"
            `.split('\n').map(str => str.trim()).join('\n')
        }],
        model: "gpt-3.5-turbo",
    });

    let { content } = completion.choices?.[0]?.message ?? {}
    console.log(content);
    console.log("A", A);
    console.log("B", B);
    content = content.match(/\{.+\}/)[0]
    var response = { error: true };
    if (content) {
        try {
            response = JSON.parse(content)
        } catch (err) {
            console.log(err);
        }
    }

    return response;
}