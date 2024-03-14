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
                - your behaviour:
                  Respond in JSON format with keys and boolean values for "answer" and "draw" like { "answer": false, "draw": false, "reason": "explanation" }.
                  If "A" would beat "B", set "answer" to true; otherwise, set it to false.
                  If you cannot confidently pick one, or they have similar abilities, return { "answer": true, "draw": true, "reason": "explanation" }.
                  If "A" and "B" are equals or have similar abilities, return { "answer": true, "draw": true, "reason": "Both are equally matched in strength and abilities." }.
                  If there are more than two options or the scenario is unclear, return an error and its reason like: { "error": true, "reason": "explanation" }.
                  The response should be a one-line string.
                  When referring to "A" or "B" in your response, use the respective input value provided by the player only if they are not equals.
                  Provide a detailed explanation in the "reason" field, describing why "A" and "B" are equals or have similar abilities.
                  An example response would be { "answer": true, "draw": true, "reason": "Both are equally matched in strength and abilities because they are of the same species and have similar physical characteristics." }.

                - question:
                  Would "{A}" be able to beat "{B}"? If so, how?

                - A being: "${A}"

                - B being: "${B}"
            `.split('\n').map(str => str.trim()).join('\n')
        }],
        model: "gpt-3.5-turbo",
    });

    let { content } = completion.choices?.[0]?.message ?? {}
    var response = { error: true };
    if (content) {
        try {
            response = JSON.parse(content)
            console.log(response);
        } catch (err) {
            console.log(content);
            console.log(err);
        }
    }

    return response;
}