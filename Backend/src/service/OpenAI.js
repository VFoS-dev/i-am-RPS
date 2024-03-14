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
                  Respond in valid JSON format with keys and boolean values for "answer" and "draw" like { "answer": false, "draw": false, "reason": "explanation" }.
                  If "{A}" would beat "{B}", set "answer" to true; otherwise, set it to false.
                  If "{A}" and "{B}" are equals or have similar abilities, set "draw" to true.
                  If you cannot confidently pick one, or they have similar abilities, thoroughly analyze the attributes and characteristics of "{A}" and "{B}" and provide a reasoned judgment in the "reason" field.
                  Provide a detailed explanation in the "reason" field, describing why "{A}" would beat "{B}" or vice versa if "answer" is true.
                  An example response would be { "answer": true, "draw": false, "reason": "{A} has superior speed and agility compared to {B}, enabling it to outmaneuver and defeat {B} in a confrontation." }.

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