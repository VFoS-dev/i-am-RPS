const OpenAI = require("openai");
const openai = new OpenAI();

module.exports = {
    AbeatsB
}

async function AbeatsB(A, B) {
    const completion = await openai.chat.completions.create({
        messages: [{
            role: "system",
            content: "the following is a set of directions each separated by \"-\"" +
                " the first one starts with \"- in this game\" which is the game's description," +
                " the second one starts with \"- A being:\"," +
                " the third is \"- B being:\"," +
                " if you are to reply in response to A or B please use the respective input value instead\n" +
                " respond in JSON format like { \"answer\", \"reason\"}, answer needs to be a boolean, if the two are equals please change answer to -1\n" +
                " an example response would be \"{ \"answer\": true, \"reason\": \"A ferret would beat a flea by being able to catch and eat it.\" }\"\n" +
                " please return the content as a one line string\n" +
                "- in this game \"I am\" is like rock, paper, scissors, where any option is a allowed, not limited to rock, paper or scissors would A beat B? and how so?\n" +
                `- A being: "${A}"\n` +
                `- B being: "${B}"`
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