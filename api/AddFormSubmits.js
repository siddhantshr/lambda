const needle = require("needle")

export default async function handler(request, response) {
    const options = {
        headers: {
            "Content-Type": "application/json",
            authorization: process.env.AUTHORIZATION,
        },
    }

    needle.get(
        "https://hgc3fo.deta.dev/api/AddFormSubmits",
        options,
        function (error, resp) {
            if (!error && resp.statusCode === 200)
                return response.status(200).json({ ...resp.body })
        }
    )
}
