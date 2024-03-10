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
                the second one starts with "- in this game:" which is the game's description
                the third one starts with "- A being:"
                the forth is "- B being:"
            
                - your behaviour:
                respond in JSON format like { "answer", "equals": false, "reason" }, answer needs to be a boolean,
                if the two are equals return { "answer": true, "equals": true, "reason" } instead,
                if there are more than that return an error and its reason like: { "error": true, "reason" },
                the response needs to be as a one line string,
                if you are to reply in response to A or B use the respective input value instead.
            
                - in this game: "I am", which is similar to rock, paper, scissors, where any option is a allowed, not limited to rock, paper or scissors would A beat B? and how so?
                - A being: "${A}"
                - B being: "${B}"
            `.split('\n').map(str => str.trim()).join('\n')

        }],
        model: "gpt-3.5-turbo",
    });

    const { content } = completion.choices?.[0]?.message ?? {}

    var response = { error: true };
    if (content) {
        try {
            response = JSON.parse(content)
        } catch (err) { }
    }

    return response;
}