import * as cookie from 'cookie';

const handler = (req, res) => {
    const { method } = req;

    if (method === 'POST') {
        const { username, password } = req.body;
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", process.env.ADMIN_TOKEN, {
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.status(200).json({ success: "Success" });
        }
        else {
            res.status(400).json({ error: "Wrong credentials" });
        }
    }
    if (method === 'PUT') {
        const { username, password } = req.body;
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", process.env.ADMIN_TOKEN, {
                maxAge: -1,
                path: "/",
            })
        );
        res.status(200).json({ success: "Logout Success" });
    }
}

export default handler;