import { server } from "./app";

const port = process.env.PORT || 5000;

server.listen(port).then(({ url, err }) => {
    if (err) {
        console.error(`ERROR: ${err.message}`);
    } else {
        console.log(`🚀 Listening on port ${url}`);
    }
});
